import json
from app.adapters.factory import LLMFactory

class AtomicClaimExtractor:
    def __init__(self, provider: str = "openai", api_key: str = "", model_name: str = "gpt-4o"):
        """
        Initializes the Claim Extractor with a 'Judge LLM'.
        Requires an API key for the provider in a real environment.
        """
        self.adapter = LLMFactory.get_adapter(provider=provider, api_key=api_key, model_name=model_name)
        
    async def extract_claims_async(self, text: str) -> list[str]:
        prompt = f"""
You are an expert NLP reasoning system designed for hallucination detection research.
Given the following text, break it down into a list of atomic, verifiable factual claims.
Rules:
1. An atomic claim must contain exactly one piece of independent information.
2. Resolve pronouns (he, she, it) to their explicit subject from the text.
3. Do not add outside information.
4. Respond ONLY with a valid JSON array of strings. Do not include Markdown blocks.

Text:
{text}
"""
        response = await self.adapter.generate_async(prompt, temperature=0.0, max_tokens=1500)
        
        # Cleanup potential Markdown injection from the LLM
        cleaned = response.strip()
        if cleaned.startswith("```json"):
            cleaned = cleaned[7:]
        if cleaned.startswith("```"):
            cleaned = cleaned[3:]
        if cleaned.endswith("```"):
            cleaned = cleaned[:-3]
        cleaned = cleaned.strip()
        
        try:
            claims = json.loads(cleaned)
            if isinstance(claims, list):
                return claims
            return []
        except json.JSONDecodeError:
            print(f"Failed to parse LLM JSON output. Raw output: {response}")
            return []
