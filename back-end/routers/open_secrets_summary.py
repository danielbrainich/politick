from fastapi import APIRouter, HTTPException
import requests
import os

OPEN_SECRETS_API_KEY = os.getenv("OPEN_SECRETS_API_KEY")

open_secrets_summary = APIRouter()

@open_secrets_summary.get('/api/open_secrets/summary/{id}')
async def get_rep(id:str):
    api_url = 'http://www.opensecrets.org/api/'
    params = {
        'method': 'candSummary',
        'apikey': OPEN_SECRETS_API_KEY,
        'cid': id,
        'cycle': '2024',
        'output': 'json'
    }
    headers = {
        'Content-Type': 'application/json',
        'User-Agent': 'MyApp/1.0',
    }

    try:
        response = requests.get(api_url, params=params, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        raise HTTPException(status_code=400, detail=str(e))
