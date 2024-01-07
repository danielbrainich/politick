from fastapi import APIRouter, HTTPException
import requests
import os

NEWS_API_API_KEY = os.getenv('NEWS_API_API_KEY')

news_api = APIRouter()

@news_api.get('/api/news_api/{name}')
async def get_news(name: str):
    api_url = 'https://newsapi.org/v2/everything'
    params = {
        'q': name,
        'apiKey': NEWS_API_API_KEY,
    }

    try:
        response = requests.get(api_url, params=params)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        raise HTTPException(status_code=400, detail=str(e))
