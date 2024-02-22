const API_KEY = '099d71dcaa30404d9ad3afb751957330'
let newsList = [];

let searchIcon = document.getElementById("search-icon");
let searchInput = document.getElementById("search-input");
let searchButton = document.getElementById("search-button");
const menus = document.querySelectorAll(".menus button");
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)))
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
navLinks.forEach(link => link.addEventListener('click', (event) => getNewsByCategory(event)));


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

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    console.log("category");
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`)
    const response = await fetch(url)
    const data = await response.json();
    console.log("DDD", data);
    newsList = data.articles;
    render();
}

const getNewsByKeyword = async(event) => {
    const keyword = document.getElementById("search-input").value;
    console.log("keyword", keyword);
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`)
    const response = await fetch(url)
    const data = await response.json();
    console.log("DDD", data);
    newsList = data.articles;
    render();
}

const render = () => {
    const newsHTML = newsList.map(
        (news) => ` <div class="row news">
    <div class="col-lg-4">
        <img class="news-img-size" src=${news.urlToImage ? news.urlToImage : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'} alt="Image Not Available">
    </div>
    <div class="col-lg-8">
        <h2>${news.title}</h2>
        <p>${news.description ? news.description.substring(0, 100) : '내용없음'}...</p>
        <div>${news.source.name ? news.source.name : 'no source'} * ${moment(news.publishedAt).fromNow()}</div>
    </div>
</div>`).join('');
    document.getElementById("news-board").innerHTML = newsHTML;
}


getLatestNews();


document.addEventListener('DOMContentLoaded', function () {
    let searchIcon = document.getElementById("search-icon");
    let searchInput = document.getElementById("search-input");
    let searchButton = document.getElementById("search-button");

    searchIcon.addEventListener("click", function (event) {
        searchInput.classList.toggle("collapse");
        searchButton.classList.toggle("collapse");
    });
});

