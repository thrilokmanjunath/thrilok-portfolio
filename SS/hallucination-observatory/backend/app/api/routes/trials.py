from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.sql import Trial, Generation, AtomicClaim
from app.schemas.generation import TrialRunRequest
from app.services.extractor import AtomicClaimExtractor
from app.services.verifier import ClaimVerifier
import time

router = APIRouter()

async def run_trial_pipeline(trial_id: int, db: Session):
    """
    Background task to run the LLM, extract claims, and verify them.
    """
    # 1. Fetch Trial
    trial = db.query(Trial).filter(Trial.id == trial_id).first()
    if not trial:
        return
    
    # 2. Simulate LLM Generation
    start_time = time.time()
    mock_raw_output = "The capital of France is Paris. The moon is made of green cheese."
    latency = (time.time() - start_time) * 1000
    
    generation = Generation(trial_id=trial.id, raw_output=mock_raw_output, latency_ms=latency)
    db.add(generation)
    db.commit()
    db.refresh(generation)
    
    # 3. Simulate Claim Extraction
    claims = ["The capital of France is Paris.", "The moon is made of green cheese."]
    
    for claim_text in claims:
        ac = AtomicClaim(generation_id=generation.id, claim_text=claim_text)
        db.add(ac)
    db.commit()
    
    # 4. Verify Claims
    verifier = ClaimVerifier(provider="openai", api_key="dummy", model_name="gpt-4o")
    saved_claims = db.query(AtomicClaim).filter(AtomicClaim.generation_id == generation.id).all()
    
    for ac in saved_claims:
        try:
            result = await verifier.verify_claim_async(ac, mock_raw_output)
            db.add(result)
        except Exception as e:
            print(f"Mock Verification bypassed due to dummy key: {e}")
        
    trial.status = "completed"
    db.commit()

@router.post("/run", status_code=202)
def run_trial(request: TrialRunRequest, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    """
    Kicks off an asynchronous trial run.
    """
    new_trial = Trial(
        experiment_id=request.experiment_id,
        prompt_id=request.prompt_id,
        model_config_id=request.model_config_id,
        status="running"
    )
    db.add(new_trial)
    db.commit()
    db.refresh(new_trial)
    
    background_tasks.add_task(run_trial_pipeline, new_trial.id, db)
    return {"message": "Trial accepted and running in background", "trial_id": new_trial.id}
