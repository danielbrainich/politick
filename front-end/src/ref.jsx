// this is how i parsed through info before i narrowed to just representative

const getCivicInfoOfficialsByAddress = async (zipCode) => {

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

      function getOfficialIndicesByRole(offices, roleName) {
          let OfficialIndices = null;
          for (let office of offices) {
              if (office.name === roleName) {
                  OfficialIndices = office.officialIndices;
                  break;
              }
          }
          return OfficialIndices;
      }

      const indexRepresentative = getOfficialIndicesByRole(data.offices, 'U.S. Representative');

      return {
          representative: data.officials[indexRepresentative],
          state: data.normalizedInput.state,
      };

  } catch (error) {
      console.error('Error fetching data:', error);
      return {
          representative: {},
          state: '',
      }
  }
};
