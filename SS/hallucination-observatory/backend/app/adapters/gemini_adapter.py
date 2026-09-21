from app.adapters.base import BaseLLMAdapter
from google import genai
from google.genai import types

class GeminiAdapter(BaseLLMAdapter):
    def __init__(self, api_key: str, model_name: str = "gemini-1.5-pro", **kwargs):
        self.model_name = model_name
        self.client = genai.Client(api_key=api_key)

    async def generate_async(
        self, 
        prompt: str, 
        temperature: float = 0.0, 
        max_tokens: int = 1024,
        **kwargs
    ) -> str:
        config = types.GenerateContentConfig(
            temperature=temperature,
            max_output_tokens=max_tokens,
            **kwargs
        )
        response = await self.client.aio.models.generate_content(
            model=self.model_name,
            contents=prompt,
            config=config,
        )
        return response.text

    def generate(
        self, 
        prompt: str, 
        temperature: float = 0.0, 
        max_tokens: int = 1024,
        **kwargs
    ) -> str:
        config = types.GenerateContentConfig(
            temperature=temperature,
            max_output_tokens=max_tokens,
            **kwargs
        )
        response = self.client.models.generate_content(
            model=self.model_name,
            contents=prompt,
            config=config,
        )
        return response.text
