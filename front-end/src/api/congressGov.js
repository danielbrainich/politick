import { CONGRESS_GOV_API_KEY } from '../apiKeys';


const getCongressGovPhoto = async (bioGuideId) => {

    const params = {
        bioGuideId: bioGuideId,
        api_key: CONGRESS_GOV_API_KEY,
    }

    const apiUrl = `https://api.congress.gov/v3/member/${params.bioGuideId}?api_key=${params.api_key}`

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('congressGovData:', data)
        return data.member.depiction.imageUrl;
    }

    catch (error) {
        console.error('Error fetching data:', error);
        return {
            district: '',
            geoid: '',
            crp_id: '',
        }
    }
}

const getSponsoredBillInfo = async (bioGuideId) => {
    const params = {
        bioGuideId: bioGuideId,
        api_key: CONGRESS_GOV_API_KEY,
    }

    const apiUrl = `https://api.congress.gov/v3/member/${params.bioGuideId}/sponsored-legislation?api_key=${params.api_key}`

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('CongressGovSponsoredBills:', data.sponsoredLegislation);

        return {
            sponsoredLegislation: data.sponsoredLegislation,
            count: data.pagination.count
        };
    }

    catch (error) {
        console.error('Error fetching data:', error);
        return []
    }
}

export { getCongressGovPhoto, getSponsoredBillInfo };
