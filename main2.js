const getLatestNews = async () => {
    let url = new URL(
        `https://newstimes-ost.netlify.app/top-headlines?country=us&apiKey=${API_KEY}`
    );