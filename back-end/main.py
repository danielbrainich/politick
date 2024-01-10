from fastapi import FastAPI
from dotenv import load_dotenv

load_dotenv()

from routers import civic_info, news_api, open_secrets_ids, open_secrets_summary, open_secrets_contributions
from dependencies import setup_dependencies



app = FastAPI()

setup_dependencies(app)

app.include_router(civic_info.civic_info)
app.include_router(news_api.news_api)
app.include_router(open_secrets_ids.open_secrets_ids)
app.include_router(open_secrets_summary.open_secrets_summary)
app.include_router(open_secrets_contributions.open_secrets_contributions)
