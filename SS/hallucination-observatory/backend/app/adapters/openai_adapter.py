from app.adapters.base import BaseLLMAdapter
import openai

class OpenAIAdapter(BaseLLMAdapter):
    def __init__(self, api_key: str, model_name: str = "gpt-4o", **kwargs):
        self.model_name = model_name
        self.client = openai.AsyncOpenAI(api_key=api_key)
        self.sync_client = openai.OpenAI(api_key=api_key)

    async def generate_async(
        self, 
        prompt: str, 
        temperature: float = 0.0, 
        max_tokens: int = 1024,
        **kwargs
    ) -> str:
        response = await self.client.chat.completions.create(
            model=self.model_name,
            messages=[{"role": "user", "content": prompt}],
            temperature=temperature,
            max_tokens=max_tokens,
            **kwargs
        )
        return response.choices[0].message.content

    def generate(
        self, 
        prompt: str, 
        temperature: float = 0.0, 
        max_tokens: int = 1024,
        **kwargs
    ) -> str:
        response = self.sync_client.chat.completions.create(
            model=self.model_name,
            messages=[{"role": "user", "content": prompt}],
            temperature=temperature,
            max_tokens=max_tokens,
            **kwargs
        )
        return response.choices[0].message.content
