const API_KEY = '099d71dcaa30404d9ad3afb751957330';
let newsList = [];

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

    getNews('top-headlines?country=us');
});

async function getNews(endpoint) {
    try {
        const url = `https://newstimes-ost.netlify.app/${endpoint}&apiKey=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        if (response.status === 200) {
            if (data.articles.length === 0) {
                throw new Error("No matches for your search")
            }
            newsList = data.articles;
            render();
        } else {
            throw new Error(data.message)
        }
    } catch (error) {
        errorRender(error.message)
    }
}

function getNewsByCategory(event) {
    const category = event.target.textContent.toLowerCase();
    getNews(`top-headlines?country=us&category=${category}`);
}

function getNewsByKeyword() {
    const keyword = document.getElementById("search-input").value.trim();
    if (keyword) {
        getNews(`top-headlines?country=us&q=${keyword}`);
    } else {
        getNews(`top-headlines?country=us`);
    }
}

function render() {
    const newsHTML = newsList.map(news => `
        <div class="row news">
            <div class="col-lg-2">
                <div class="moment">${moment(news.publishedAt).fromNow()}</div>
            </div>
            <div class="col-lg-6">
                <h4 class="news-title">${news.title}</h4>
                <p>${news.description ? news.description.substring(0, 200) : 'No description available'}...</p>
                <div>${news.source.name ? news.source.name : 'No source'}</div>
            </div>
            <div class="col-lg-4">
                <img class="news-img-size" src="${news.urlToImage ? news.urlToImage : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'}" alt="news image">
            </div>
        </div>
    `).join('');
    document.getElementById("news-board").innerHTML = newsHTML;
}

const errorRender = (errorMessage) => {
    const errorHTML = `<div class="alert alert-danger" role="alert">
    ${errorMessage}
  </div>`;
    document.getElementById("news-board").innerHTML = errorHTML
}

