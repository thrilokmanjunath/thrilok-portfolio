from app.adapters.base import BaseLLMAdapter
import anthropic

class AnthropicAdapter(BaseLLMAdapter):
    def __init__(self, api_key: str, model_name: str = "claude-3-5-sonnet-20240620", **kwargs):
        self.model_name = model_name
        self.client = anthropic.AsyncAnthropic(api_key=api_key)
        self.sync_client = anthropic.Anthropic(api_key=api_key)

    async def generate_async(
        self, 
        prompt: str, 
        temperature: float = 0.0, 
        max_tokens: int = 1024,
        **kwargs
    ) -> str:
        response = await self.client.messages.create(
            model=self.model_name,
            messages=[{"role": "user", "content": prompt}],
            temperature=temperature,
            max_tokens=max_tokens,
            **kwargs
        )
        return response.content[0].text

    def generate(
        self, 
        prompt: str, 
        temperature: float = 0.0, 
        max_tokens: int = 1024,
        **kwargs
    ) -> str:
        response = self.sync_client.messages.create(
            model=self.model_name,
            messages=[{"role": "user", "content": prompt}],
            temperature=temperature,
            max_tokens=max_tokens,
            **kwargs
        )
        return response.content[0].text
