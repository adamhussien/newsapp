

'use strict';

const KEY = '9112d2c897dd4f62b332883bcafd7b79';
let apiUrl = `https://newsapi.org/v2/everything?q=tesla&from=2024-02-29&sortBy=publishedAt&apiKey=${KEY}`;
const container = document.querySelector('.card-container');
const searchBtn = document.querySelector(".btn");
const input = document.querySelector(".input");

const updateNews = async function(query) {
  try {
   
    apiUrl = `https://newsapi.org/v2/everything?q=${query}&from=2024-02-29&sortBy=publishedAt&apiKey=${KEY}`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json(); 
    console.log(data);
    const {articles} = data;
    const cards = articles.map(article => {
      const {author, content, title, description, urlToImage, publishedAt, url} = article;
      return `
      <div class="card">
        <img src="${urlToImage}" alt="" class="img">
        <h3 class="title">${title}</h3>
        <p class="des">${description}</p>
        <p class="content">${content}</p>
        <div class="footer">
          <span class="data">${publishedAt}</span>
          <a href="${url}" class="data">read more</a>
        </div>
      </div>
      `;
    });
    const html = cards.join("");
    container.innerHTML = html;

  } catch (err) {
    console.log('Something went wrong:', err);
  }
};


updateNews("tesla");

// Event listener for search button click
searchBtn.addEventListener("click", function() {
  const query = input.value.trim();
  if (query !== "") {
    updateNews(query);
  }
});
