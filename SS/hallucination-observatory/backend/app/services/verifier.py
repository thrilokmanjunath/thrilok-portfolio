from app.models.sql import AtomicClaim, VerificationResult
from app.models.graph import neo4j_client
from app.adapters.factory import LLMFactory
import json

class ClaimVerifier:
    def __init__(self, provider: str = "openai", api_key: str = "dummy", model_name: str = "gpt-4o"):
        self.adapter = LLMFactory.get_adapter(provider=provider, api_key=api_key, model_name=model_name)
    
    async def verify_claim_async(self, claim: AtomicClaim, context: str) -> VerificationResult:
        """
        Takes an AtomicClaim and the original context/source material.
        1. Checks graph for explicit edge (mocked for now).
        2. Falls back to LLM to evaluate the claim against the context.
        3. Returns a populated VerificationResult object.
        """
        
        prompt = f"""
You are an expert factual verification system.
Given the following Source Context and a specific Atomic Claim, evaluate whether the claim is supported by the context.
Respond ONLY with a JSON object in this exact format:
{{"category": "Supported" | "Contradicted" | "Unverifiable", "score": float between 0.0 and 1.0}}

Context: {context}
Claim: {claim.claim_text}
"""
        response = await self.adapter.generate_async(prompt, temperature=0.0, max_tokens=100)
        
        cleaned = response.strip()
        if cleaned.startswith("```json"):
            cleaned = cleaned[7:]
        if cleaned.startswith("```"):
            cleaned = cleaned[3:]
        if cleaned.endswith("```"):
            cleaned = cleaned[:-3]
        cleaned = cleaned.strip()

        try:
            result_data = json.loads(cleaned)
            category = result_data.get("category", "Unverifiable")
            score = float(result_data.get("score", 0.0))
        except (json.JSONDecodeError, ValueError):
            category = "Unverifiable"
            score = 0.0
            
        result = VerificationResult(
            atomic_claim_id=claim.id,
            hallucination_category=category,
            evidence_density_score=score,
            raw_evaluation_json=cleaned
        )
        
        # Dynamically add this knowledge to the Graph
        try:
            claim_node_id = f"claim_{claim.id}"
            neo4j_client.create_claim_node(claim_node_id, claim.claim_text)
            
            if category == "Supported":
                evidence_id = "doc_1" # Mock source document ID
                neo4j_client.create_evidence_node(evidence_id, context)
                neo4j_client.link_claim_to_evidence(claim_node_id, evidence_id, "SUPPORTED_BY")
            elif category == "Contradicted":
                evidence_id = "doc_1"
                neo4j_client.create_evidence_node(evidence_id, context)
                neo4j_client.link_claim_to_evidence(claim_node_id, evidence_id, "CONTRADICTS")
        except Exception as e:
            print(f"Warning: Failed to update Neo4j graph (is Docker running?): {e}")
            
        return result
