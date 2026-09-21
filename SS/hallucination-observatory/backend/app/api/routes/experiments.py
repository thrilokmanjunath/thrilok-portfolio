from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.sql import Experiment
from app.schemas.experiment import ExperimentCreate, ExperimentResponse

router = APIRouter()

@router.post("/", response_model=ExperimentResponse)
def create_experiment(experiment_in: ExperimentCreate, db: Session = Depends(get_db)):
    db_experiment = Experiment(name=experiment_in.name, description=experiment_in.description)
    db.add(db_experiment)
    db.commit()
    db.refresh(db_experiment)
    return db_experiment

@router.get("/{experiment_id}", response_model=ExperimentResponse)
def get_experiment(experiment_id: int, db: Session = Depends(get_db)):
    db_experiment = db.query(Experiment).filter(Experiment.id == experiment_id).first()
    if not db_experiment:
        raise HTTPException(status_code=404, detail="Experiment not found")
    return db_experiment
