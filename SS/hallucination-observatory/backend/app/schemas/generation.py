from pydantic import BaseModel
from typing import List, Optional

class TrialRunRequest(BaseModel):
    experiment_id: int
    prompt_id: int
    model_config_id: int

class AtomicClaimResponse(BaseModel):
    id: int
    claim_text: str
    
    class Config:
        from_attributes = True

class GenerationResponse(BaseModel):
    id: int
    raw_output: str
    latency_ms: Optional[float] = None
    atomic_claims: List[AtomicClaimResponse] = []
    
    class Config:
        from_attributes = True
