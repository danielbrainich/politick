from fastapi import FastAPI
from dotenv import load_dotenv

load_dotenv()

from routers import civic_info
from routers import news_api
from routers import open_secrets
from dependencies import setup_dependencies

app = FastAPI()

setup_dependencies(app)

app.include_router(civic_info.civic_info)
app.include_router(news_api.news_api)
app.include_router(open_secrets.open_secrets_ids)
