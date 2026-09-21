from neo4j import GraphDatabase
from app.core.config import settings

class KnowledgeGraphClient:
    def __init__(self):
        self._driver = GraphDatabase.driver(
            settings.NEO4J_URI, 
            auth=(settings.NEO4J_USER, settings.NEO4J_PASSWORD)
        )

    def close(self):
        self._driver.close()

    def create_evidence_node(self, source_id: str, text: str):
        query = (
            "MERGE (e:Evidence {source_id: $source_id}) "
            "SET e.text = $text"
        )
        with self._driver.session() as session:
            session.run(query, source_id=source_id, text=text)

    def create_claim_node(self, claim_id: str, text: str):
        query = (
            "MERGE (c:Claim {claim_id: $claim_id}) "
            "SET c.text = $text"
        )
        with self._driver.session() as session:
            session.run(query, claim_id=claim_id, text=text)

    def link_claim_to_evidence(self, claim_id: str, source_id: str, relationship: str = "SUPPORTED_BY"):
        query = (
            f"MATCH (c:Claim {{claim_id: $claim_id}}) "
            f"MATCH (e:Evidence {{source_id: $source_id}}) "
            f"MERGE (c)-[:{relationship}]->(e)"
        )
        with self._driver.session() as session:
            session.run(query, claim_id=claim_id, source_id=source_id)

neo4j_client = KnowledgeGraphClient()
