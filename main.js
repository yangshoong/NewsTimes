const API_KEY = '099d71dcaa30404d9ad3afb751957330'
let news = [];

const getLatestNews = async () => {
    let url = new URL(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    );

    const response = await fetch(url);
    const data = await response.json();
    news = data.articles;

    console.log("rrrr", response);
    console.log("dddd", news);
}

getLatestNews();
for (let i = 0; i < 20; i++) {
    console.log("after", i)
}