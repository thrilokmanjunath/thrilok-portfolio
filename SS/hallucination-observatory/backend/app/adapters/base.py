from abc import ABC, abstractmethod
from typing import Dict, Any, Optional

class BaseLLMAdapter(ABC):
    """
    Abstract Base Class for all LLM Adapters.
    Enforces a consistent interface across different providers (OpenAI, Anthropic, Gemini).
    """
    
    @abstractmethod
    def __init__(self, api_key: str, model_name: str, **kwargs):
        pass

    @abstractmethod
    async def generate_async(
        self, 
        prompt: str, 
        temperature: float = 0.0, 
        max_tokens: int = 1024,
        **kwargs
    ) -> str:
        """
        Asynchronously generates a response from the LLM.
        
        Args:
            prompt: The input text to send to the model.
            temperature: Sampling temperature.
            max_tokens: Maximum tokens to generate.
            
        Returns:
            The generated text string.
        """
        pass
    
    @abstractmethod
    def generate(
        self, 
        prompt: str, 
        temperature: float = 0.0, 
        max_tokens: int = 1024,
        **kwargs
    ) -> str:
        """
        Synchronously generates a response from the LLM.
        """
        pass
