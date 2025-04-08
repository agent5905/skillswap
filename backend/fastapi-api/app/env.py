from dotenv import load_dotenv
import os
from pathlib import Path

env_path = Path(__file__).resolve().parents[0] / ".env"
load_dotenv(dotenv_path=env_path)

def get_env(key: str, default=None):
    value = os.getenv(key, default)
    if value is None:
        print(f"Missing env var: {key}")
    return value
