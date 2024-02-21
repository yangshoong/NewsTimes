const API_KEY = '099d71dcaa30404d9ad3afb751957330'
let newsList = [];

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

const render = () => {
    const newsHTML = newsList.map(
        (news) => ` <div class="row news">
    <div class="col-lg-4">
        <img class="news-img-size" src=${news.urlToImage ? news.urlToImage : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'} alt="Image Not Available">
    </div>
    <div class="col-lg-8">
        <h2>${news.title}</h2>
        <p>${news.description ? news.description.substring(0,100) : '내용없음'}</p>
        <div>${news.source.name ? news.source.name : 'no source'} * ${moment(news.publishedAt).fromNow()}</div>
    </div>
</div>`).join('');
    document.getElementById("news-board").innerHTML = newsHTML;
}


getLatestNews();