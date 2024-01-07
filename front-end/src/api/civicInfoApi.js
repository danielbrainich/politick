const getCivicInfoRepByAddress = async (address) => {
    const backendUrl = `http://localhost:8000/api/representatives/${address}`;

    try {
        const response = await fetch(backendUrl);
        if (!response.ok) {
            throw new Error(`HTTP error. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('civicInfoData:', data);

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
