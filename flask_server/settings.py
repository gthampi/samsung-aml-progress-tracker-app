import os
from dotenv import load_dotenv

load_dotenv()


def get_env(variable_name, default=None):
    value = os.getenv(variable_name, default)
    if value and str(value).lower() in ("true", "false"):
        return str(value).lower() == "true"
    return value


# Postgres
POSTGRES_HOST = get_env("POSTGRES_HOST", "localhost")  # host.docker.internal "postgres:5432" localhost
POSTGRES_DB = get_env("POSTGRES_DB", "postgres")
POSTGRES_USER = get_env("POSTGRES_USER", "postgres")
POSTGRES_PASSWORD = get_env("POSTGRES_PASSWORD", "password")

POSTGRES_DB_URL: str = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}/{POSTGRES_DB}"