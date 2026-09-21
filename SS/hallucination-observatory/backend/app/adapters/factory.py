from app.adapters.base import BaseLLMAdapter
from app.adapters.openai_adapter import OpenAIAdapter
from app.adapters.anthropic_adapter import AnthropicAdapter
from app.adapters.gemini_adapter import GeminiAdapter

class LLMFactory:
    @staticmethod
    def get_adapter(provider: str, api_key: str, model_name: str, **kwargs) -> BaseLLMAdapter:
        provider = provider.lower()
        if provider == "openai":
            return OpenAIAdapter(api_key=api_key, model_name=model_name, **kwargs)
        elif provider == "anthropic":
            return AnthropicAdapter(api_key=api_key, model_name=model_name, **kwargs)
        elif provider in ["google", "gemini"]:
            return GeminiAdapter(api_key=api_key, model_name=model_name, **kwargs)
        else:
            raise ValueError(f"Unsupported provider: {provider}")
