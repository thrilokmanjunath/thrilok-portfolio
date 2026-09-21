from app.adapters.factory import LLMFactory

def test_factory():
    print("Testing LLM Factory instantiation...")
    
    openai_adapter = LLMFactory.get_adapter("openai", "dummy_key", "gpt-4o")
    print(f"OpenAI adapter instantiated: {type(openai_adapter)}")
    
    anthropic_adapter = LLMFactory.get_adapter("anthropic", "dummy_key", "claude-3-5-sonnet-20240620")
    print(f"Anthropic adapter instantiated: {type(anthropic_adapter)}")
    
    gemini_adapter = LLMFactory.get_adapter("gemini", "dummy_key", "gemini-1.5-pro")
    print(f"Gemini adapter instantiated: {type(gemini_adapter)}")
    
    print("All adapters successfully instantiated!")

if __name__ == "__main__":
    test_factory()
