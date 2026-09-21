from app.core.database import engine, Base
# Import all models so Base knows about them before creating tables
from app.models import sql

def init_db():
    print("Creating database tables in PostgreSQL...")
    Base.metadata.create_all(bind=engine)
    print("Tables created successfully.")

if __name__ == "__main__":
    init_db()
