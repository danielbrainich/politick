from fastapi import APIRouter, HTTPException
import requests
import os

CIVIC_INFO_API_KEY = os.getenv("CIVIC_INFO_API_KEY")

civic_info = APIRouter()

@civic_info.get("/api/representatives/{address}")
async def get_representative(address: str):
    api_url = 'https://www.googleapis.com/civicinfo/v2/representatives'
    params = {
        'address': address,
        'includeOffices': 'true',
        'levels': 'country',
        'roles': 'legislatorLowerBody',
        'key': CIVIC_INFO_API_KEY,
    }

    try:
        response = requests.get(api_url, params=params)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        raise HTTPException(status_code=400, detail=str(e))
