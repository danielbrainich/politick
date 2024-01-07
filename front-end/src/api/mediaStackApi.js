import { CIVIC_INFO_API_KEY } from '../apiKeys';

const getCivicInfoRepByAddress = async (zipCode) => {

    const apiUrl = 'https://www.googleapis.com/civicinfo/v2/representatives';
    const params = {
        address: zipCode,
        includeOffices: true,
        levels: 'country',
        roles: 'legislatorLowerBody',
        key: CIVIC_INFO_API_KEY,
    };

    const queryString = new URLSearchParams(params).toString();
    const urlWithParams = `${apiUrl}?${queryString}`;

    try {
        const response = await fetch(urlWithParams);
        if (!response.ok) {
            throw new Error(`HTTP error. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('civicInfoData:', data)

        function extractDistrictNumber(inputString) {
            const parts = inputString.split("cd:");
            return parts.length === 2 ? parseInt(parts[1], 10) : null;
        }

        const civicInfoRep = {
            representative: {
                name: data.officials[0].name,
                party: data.officials[0].party,
                urls: data.officials[0].urls,
                channels: data.officials[0].channels,
            },
            office: {
                name: data.offices[0].name,
                district: `${data.normalizedInput.state}-${extractDistrictNumber(data.offices[0].divisionId)}`,
            },
            state: data.normalizedInput.state,
        };
        return civicInfoRep;

    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            representative: {},
            office: {},
            state: '',
        }
    }
};

export default getCivicInfoRepByAddress;
