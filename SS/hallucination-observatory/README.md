# Local Development Guide

Follow these steps to spin up the entire **Hallucination Intelligence Platform** stack locally.

## Prerequisites
- **Docker**: Make sure Docker Desktop or OrbStack is open and running on your Mac.
- **Node.js & npm**: Required for the Next.js frontend.
- **Python 3.9+**: Required for the FastAPI backend.

## Step 1: Start the Databases (Docker)
First, we need to spin up PostgreSQL, Neo4j, and Redis.
Open a terminal, navigate to the project root, and run:
```bash
cd /Users/thrilokm/Thrilok_M/SS/hallucination-observatory
docker compose up -d
```
*Note: The `-d` flag runs it in detached mode so it doesn't block your terminal.*

## Step 2: Start the FastAPI Backend
Open a **new terminal tab/window**, navigate to the backend folder, set up your Python environment, and start the server:
```bash
cd /Users/thrilokm/Thrilok_M/SS/hallucination-observatory/backend

# Create a virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the FastAPI development server
python app/main.py
```
*The backend API will now be running at http://localhost:8000. You can view the automatic API docs at http://localhost:8000/docs.*

## Step 3: Start the Next.js Frontend
Open a **third terminal tab/window**, navigate to the frontend folder, and start the React app:
```bash
cd /Users/thrilokm/Thrilok_M/SS/hallucination-observatory/frontend

# Run the Next.js development server
npm run dev
```
*The frontend dashboard will now be running at http://localhost:3000.*

---
**Shutting Down:**
To shut down the databases when you're done working, go back to the root directory and run:
```bash
docker compose down
```
