from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base

class Experiment(Base):
    __tablename__ = "experiments"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    trials = relationship("Trial", back_populates="experiment")

class Dataset(Base):
    __tablename__ = "datasets"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    description = Column(String, nullable=True)
    
    prompts = relationship("Prompt", back_populates="dataset")

class Prompt(Base):
    __tablename__ = "prompts"
    id = Column(Integer, primary_key=True, index=True)
    dataset_id = Column(Integer, ForeignKey("datasets.id"))
    text = Column(String)
    domain = Column(String, nullable=True)
    complexity_level = Column(String, nullable=True)
    
    dataset = relationship("Dataset", back_populates="prompts")
    trials = relationship("Trial", back_populates="prompt")

class ModelConfig(Base):
    __tablename__ = "model_configs"
    id = Column(Integer, primary_key=True, index=True)
    provider = Column(String)
    model_name = Column(String)
    temperature = Column(Float, default=0.0)
    
    trials = relationship("Trial", back_populates="model_config")

class Trial(Base):
    __tablename__ = "trials"
    id = Column(Integer, primary_key=True, index=True)
    experiment_id = Column(Integer, ForeignKey("experiments.id"))
    prompt_id = Column(Integer, ForeignKey("prompts.id"))
    model_config_id = Column(Integer, ForeignKey("model_configs.id"))
    status = Column(String, default="pending")
    
    experiment = relationship("Experiment", back_populates="trials")
    prompt = relationship("Prompt", back_populates="trials")
    model_config = relationship("ModelConfig", back_populates="trials")
    generations = relationship("Generation", back_populates="trial")

class Generation(Base):
    __tablename__ = "generations"
    id = Column(Integer, primary_key=True, index=True)
    trial_id = Column(Integer, ForeignKey("trials.id"))
    raw_output = Column(String)
    latency_ms = Column(Float, nullable=True)
    avg_confidence = Column(Float, nullable=True)
    
    trial = relationship("Trial", back_populates="generations")
    atomic_claims = relationship("AtomicClaim", back_populates="generation")

class AtomicClaim(Base):
    __tablename__ = "atomic_claims"
    id = Column(Integer, primary_key=True, index=True)
    generation_id = Column(Integer, ForeignKey("generations.id"))
    claim_text = Column(String)
    
    generation = relationship("Generation", back_populates="atomic_claims")
    verification_results = relationship("VerificationResult", back_populates="atomic_claim")

class VerificationResult(Base):
    __tablename__ = "verification_results"
    id = Column(Integer, primary_key=True, index=True)
    atomic_claim_id = Column(Integer, ForeignKey("atomic_claims.id"))
    hallucination_category = Column(String)
    evidence_density_score = Column(Float, nullable=True)
    raw_evaluation_json = Column(JSON, nullable=True)
    
    atomic_claim = relationship("AtomicClaim", back_populates="verification_results")
