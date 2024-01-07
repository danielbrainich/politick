const fetchCivicInfoData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error. Status: ${response.status}`);
    }
    return response.json();
};

const reshapeCivicInfoData = (data) => {

    function extractDistrictNumber(inputString) {
        const parts = inputString.split("cd:");
        return parts.length === 2 ? parseInt(parts[1], 10) : null;
    }

    return {
        representative: {
            name: data.officials[0].name,
            party: data.officials[0].party,
            urls: data.officials[0].urls,
            channels: data.officials[0].channels,
            office: data.offices[0].name,
            district: extractDistrictNumber(data.offices[0].divisionId),
            state: data.normalizedInput.state,
        },
    };
};

const GetCivicInfoData = async (address) => {
    try {
        const data = await fetchCivicInfoData(`http://localhost:8000/api/civic_info/${address}`);
        return reshapeCivicInfoData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            representative: {},
            error: true,
            errorMessage: error.message
        };
    };
};

export default GetCivicInfoData;
