import { OPEN_SECRETS_API_KEY } from '../apiKeys';

const getOpenSecretsRepId = async (repState, repName) => {

    const apiUrl = 'http://www.opensecrets.org/api/'
    const params = {
        method: 'getLegislators',
        id: repState,
        apikey: OPEN_SECRETS_API_KEY,
        output: 'json',
    }

    const queryString = new URLSearchParams(params).toString();
    const urlWithParams = `${apiUrl}?${queryString}`;

    try {
        const response = await fetch(urlWithParams);
        if (!response.ok) {
            throw new Error(`HTTP error. Status: ${response.status}`);
        }
        const data = await response.json();

        function cleanName(repName) {
            const names = repName.split(' ');
            if (names.length > 2) {
              names.splice(1, 1);
            }
            return names.join(' ');
          }

        function getOpenSecretsRepIdFromName(stateRepList, repName) {
            const cleanedName = cleanName(repName);
            for (let rep of stateRepList) {
                if (rep['@attributes'].firstlast === cleanedName) {
                    return rep['@attributes'].cid
                }
            }
            return null;
        }

        const repId = getOpenSecretsRepIdFromName(data.response.legislator, repName);

        return {'repId': repId};

    } catch (error) {
        console.error('Error fetching data:', error);
        return {'repId': ''};;
    }
};

const getOpenSecretsCandidateContributions = async (officialId) => {

    const apiUrl = 'http://www.opensecrets.org/api/'
    const params = {
        method: 'candContrib',
        apikey: OPEN_SECRETS_API_KEY,
        cid: officialId,
        cycle: '2024',
        output: 'json',
    }

    const queryString = new URLSearchParams(params).toString();
    const urlWithParams = `${apiUrl}?${queryString}`;

    try {
        const response = await fetch(urlWithParams);
        if (!response.ok) {
            throw new Error(`HTTP error. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('openSecretsContributions:', data)
        const contribData = {
            contributors: data.response.contributors.contributor,
            cycle: data.response.contributors['@attributes'].cycle,
            notice: data.response.contributors['@attributes'].notice,
            origin: data.response.contributors['@attributes'].origin,
        };

        return contribData;

    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            contributors: [],
            contributors: '',
            contributors: '',
            contributors: '',

        };
    }
};

const getOpenSecretsCandidateSummary = async (officialId) => {

    const apiUrl = 'http://www.opensecrets.org/api/'
    const params = {
        method: 'candSummary',
        apikey: OPEN_SECRETS_API_KEY,
        cid: officialId,
        cycle: '2024',
        output: 'json',
    }

    const queryString = new URLSearchParams(params).toString();
    const urlWithParams = `${apiUrl}?${queryString}`;

    try {
        const response = await fetch(urlWithParams);
        if (!response.ok) {
            throw new Error(`HTTP error. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('openSecretsSummary:', data)



        function formatDollars(amount) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(amount);
        }

        const contribSummary = {
            cashOnHand: formatDollars(data.response.summary['@attributes'].cash_on_hand),
            cycle: data.response.summary['@attributes'].cycle, // This is not a dollar amount
            debt: formatDollars(data.response.summary['@attributes'].debt),
            lastUpdated: data.response.summary['@attributes'].last_updated, // This is a date
            nextElection: data.response.summary['@attributes'].next_election, // This is a date or election cycle
            origin: data.response.summary['@attributes'].origin, // This is likely a string
            spent: formatDollars(data.response.summary['@attributes'].spent),
            total: formatDollars(data.response.summary['@attributes'].total),
        };

        return contribSummary;

    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            cashOnHand: '',
            cycle: '',
            debt: '',
            lastUpdated: '',
            nextElection: '',
            origin: '',
            spent: '',
            total: '',
        };
    }
};

const getOpenSecretsCandidatePersonalFinances = async (officialId) => {

    const apiUrl = 'http://www.opensecrets.org/api/'
    const params = {
        method: 'memPFDprofile',
        apikey: OPEN_SECRETS_API_KEY,
        cid: officialId,
        cycle: '2024',
        output: 'json',
    }

    const queryString = new URLSearchParams(params).toString();
    const urlWithParams = `${apiUrl}?${queryString}`;

    try {
        const response = await fetch(urlWithParams);
        if (!response.ok) {
            throw new Error(`HTTP error. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;

    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            representativeContribInfo: '',
        }
    }
}

export { getOpenSecretsRepId, getOpenSecretsCandidateContributions, getOpenSecretsCandidatePersonalFinances, getOpenSecretsCandidateSummary };
