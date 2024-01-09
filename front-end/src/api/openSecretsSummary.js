const fetchOpenSecretsData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error. Status: ${response.status}`);
    }
    return response.json();
};

const reshapeOpenSecretsSummary = (data) => {
    function formatDollars(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    }

    return {
        summary: {
            cashOnHand: formatDollars(data.response.summary['@attributes'].cash_on_hand),
            cycle: data.response.summary['@attributes'].cycle,
            debt: formatDollars(data.response.summary['@attributes'].debt),
            lastUpdated: data.response.summary['@attributes'].last_updated,
            nextElection: data.response.summary['@attributes'].next_election,
            origin: data.response.summary['@attributes'].origin,
            spent: formatDollars(data.response.summary['@attributes'].spent),
            total: formatDollars(data.response.summary['@attributes'].total),
        }
    };
};

const getOpenSecretsSummary = async (id) => {
    try {
        const data = await fetchOpenSecretsData(`http://localhost:8000/api/open_secrets/summary/${id}`);
        return reshapeOpenSecretsSummary(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            summary: {},
            error: true,
            errorMessage: error.message
        };
    }
};

export default getOpenSecretsSummary;
