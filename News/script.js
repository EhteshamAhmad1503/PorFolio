const API_KEY = "259e8419d7094de8a19b1958b850a60e";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchnews("india"));
function reload(){
  window.location.reload();
}

async function fetchnews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  console.log(data);
  bindData(data.articles);
}

function bindData(articles) {
  const cardontainer = document.getElementById("card-container");
  const cardNewsTepmlets = document.getElementById("news-template-card");

  cardontainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = cardNewsTepmlets.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardontainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name} . ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

let curSelectedNav = null;
function onNavItemClick(id) {
  fetchnews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}

const SearchBtn = document.getElementById("search-button");
const searcTxt = document.getElementById("search-text");

SearchBtn.addEventListener("click", () => {
  const query = searcTxt.value;
  if (!query) return;
  fetchnews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});
