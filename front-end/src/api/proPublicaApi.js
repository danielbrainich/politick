import { PRO_PUBLICA_API_KEY } from '../apiKeys';


const getRepresentativeProPublicaInfo = async (repName) => {

    const params = {
        congress: 118,
        chamber: 'house',
    }
    const apiUrl = `https://api.propublica.org/congress/v1/${params.congress}/${params.chamber}/members.json`

    const headers = new Headers({
        'X-API-Key': PRO_PUBLICA_API_KEY,
    });

    try {
        const response = await fetch(apiUrl, { headers: headers });
        if (!response.ok) {
            throw new Error(`HTTP error. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('proPublicaData:', data);

        const [firstName, lastName] = repName.split(' ');

        let filteredMembers = [];
        for (let member of data.results[0].members) {
            if (member.last_name.toLowerCase() === lastName.toLowerCase()) {
                filteredMembers.push(member);
            }
        }

        let matchingMember = null;

        if (filteredMembers.length === 1) {
            matchingMember = filteredMembers[0];
        } else if (filteredMembers.length > 1) {
            for (let member of filteredMembers) {
                if (member.first_name.toLowerCase() === firstName.toLowerCase()) {
                    matchingMember = member;
                    break;
                }
            }
        }

        if (matchingMember) {

            return matchingMember;

        } else {
            console.log(`No match found for ${firstName} ${lastName}`);
            return null;
        }
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

const getRepresentativeProPublicaStatements = async (repId) => {

    const params = {
        memberId: repId,
        congress: 118,
    }
    const apiUrl = `https://api.propublica.org/congress/v1/members/${params.memberId}/statements/${params.congress}.json`

    const headers = new Headers({
        'X-API-Key': PRO_PUBLICA_API_KEY,
    });

    try {
        const response = await fetch(apiUrl, { headers: headers });
        if (!response.ok) {
            throw new Error(`HTTP error. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('proPublicaStatements:', data);

        return data;
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

export { getRepresentativeProPublicaInfo, getRepresentativeProPublicaStatements };
