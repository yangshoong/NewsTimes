
//New York Times API
const getLatestNews = async () => {
    let url = new URL(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    );


const response = await fetch(url);
const data = await response.json();
newsList = data.articles;
render();

console.log("rrrr", response);
console.log("dddd", newsList);
}

//Netlify_noonaAPI
const getLatestNews = async () => {
    let url = new URL(
        `https://newstimes-ost.netlify.app/top-headlines?country=us&apiKey=${API_KEY}`
    );


const response = await fetch(url);
const data = await response.json();
newsList = data.articles;
render();

console.log("rrrr", response);
console.log("dddd", newsList);
}