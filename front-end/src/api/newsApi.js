const fetchNewsApiData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error. Status: ${response.status}`);
    }
    return response.json();
};

const reshapeNewsApiData = (data) => {
    return {
        news: data.articles
    }
};

const getNewsApiData = async (name) => {
    try {
        const data = await fetchNewsApiData(`http://localhost:8000/api/news_api/${name}`);
        return reshapeNewsApiData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            news: {},
            error: true,
            errorMessage: error.message
        };
    };
};

export default getNewsApiData;
