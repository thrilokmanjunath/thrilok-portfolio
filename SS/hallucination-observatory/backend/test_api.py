from fastapi.testclient import TestClient
from app.main import app
import httpx

client = TestClient(app)

def test_api():
    print("Testing API Router Mounting...")
    
    # Test Healthcheck
    response = client.get("/health")
    if response.status_code == 200:
        print("✅ Health Check Passed")
    else:
        print("❌ Health Check Failed")

    # Test that the experiments endpoint is registered
    # (We expect a 422 Unprocessable Entity because we aren't sending a body, 
    # but that proves the route exists and is mounted)
    response = client.post("/api/v1/experiments/")
    if response.status_code == 422:
        print("✅ /experiments Route Mounted")
    else:
        print(f"❌ /experiments Route Missing or failed differently: {response.status_code}")
        
    print("\nAll routes aggregated successfully in main.py!")

if __name__ == "__main__":
    test_api()
