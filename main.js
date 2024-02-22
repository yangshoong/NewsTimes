const API_KEY = '099d71dcaa30404d9ad3afb751957330';
let newsList = [];
const newsFrom = 'top-headlines?country=us'
let currentCategory = ''

document.addEventListener('DOMContentLoaded', function () {
    const searchIcon = document.getElementById("search-icon");
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const menus = document.querySelectorAll('.menus button');

    searchIcon.addEventListener("click", function () {
        searchInput.classList.toggle("collapse");
        searchButton.classList.toggle("collapse");
    });

    navLinks.forEach(link => link.addEventListener('click', getNewsByCategory));
    menus.forEach(menu => menu.addEventListener('click', getNewsByCategory));

    searchButton.addEventListener('click', getNewsByKeyword);
    searchInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            getNewsByKeyword();
        }
    });

    getNews(newsFrom);
});

async function getNews(endpoint) {
    const url = `https://newsapi.org/v2/${endpoint}&apiKey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    render();
}

function getNewsByCategory(event) {
    currentCategory = `&category=${event.target.textContent.toLowerCase()}`;
    getNews(`${newsFrom}${currentCategory}`);
    render();
}

function getNewsByKeyword() {
    const keyword = `&q=${document.getElementById("search-input").value.trim()}`;
    if (keyword) {
        getNews(`${newsFrom}${currentCategory}${keyword}`);
    } else {
        getNews(`${newsFrom}${currentCategory}`);
    }
    render();
}


function render() {
    const newsHTML = newsList.map(news => `
        <div class="row news">
            <div class="col-lg-4">
                <img class="news-img-size" src="${news.urlToImage ? news.urlToImage : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'}" alt="news image">
            </div>
            <div class="col-lg-8">
                <h2>${news.title}</h2>
                <p>${news.description ? news.description.substring(0, 100) : 'No description available'}...</p>
                <div>${news.source.name ? news.source.name : 'No source'} - ${moment(news.publishedAt).fromNow()}</div>
            </div>
        </div>
    `).join('');
    document.getElementById("news-board").innerHTML = newsHTML;
}
