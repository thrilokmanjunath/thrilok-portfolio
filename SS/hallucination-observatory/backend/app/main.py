from fastapi import FastAPI
from app.api.router import api_router

app = FastAPI(
    title="Hallucination Intelligence Platform API",
    description="Backend API for managing experiments and evaluating LLM hallucinations.",
    version="0.1.0"
)

app.include_router(api_router, prefix="/api/v1")

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
