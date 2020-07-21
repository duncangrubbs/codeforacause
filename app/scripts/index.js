import { putData, getData } from './data-storage.js';
// DATA SOURCES

// DATA API for numbers from the Atlantic

const url1 = 'https://covidtracking.com/api/v1/us/daily.json';
const url2 = 'https://covidtracking.com/api/v1/states/info.json';
const url3 = 'https://covidtracking.com/api/v1/states/ca/current.json';

// News API
const NEWS_API_KEY = 'apiKey=3302ef91900d49c6a4a560f1b5d5c561';
const NEWSAPI_BASE_URL = 'http://newsapi.org/v2/everything?q=';
const SAMPLE_QUERY = 'covid&from=2020-06-21&sortBy=publishedAt&';

function getDataFromURL(url) {
  return fetch(url)
    .then((res) => {
      return res.json().then(blob => Promise.resolve(blob));
    });
}

// Not in use for now
const lastUpdated = getData('last_updated');
if (Date.now() - lastUpdated > 10*60*1000) {
  putData('last_updated', Date.now());
}

getDataFromURL(url3).then(data => {
  const list = document.getElementById('numbers');
  console.log(data); // eslint-disable-line
  Object.keys(data).forEach(key => {
    let tmp = document.createElement('li');
    tmp.innerText = key + " " + data[key];
    list.appendChild(tmp);
  })
})

const list2 = document.getElementById('news');
fetch(NEWSAPI_BASE_URL + SAMPLE_QUERY + NEWS_API_KEY)
  .then(response => response.json())
  .then(data => {
    console.log(data); // eslint-disable-line
    data.articles.forEach(article => {
      let tmp = document.createElement('a');
      tmp.innerText = article.title;
      tmp.href = article.url;
      list2.appendChild(tmp);

      tmp = document.createElement('p');
      tmp.innerText = "By: " + article.author;
      list2.appendChild(tmp);

      tmp = document.createElement('img');
      tmp.src = article.urlToImage;
      list2.appendChild(tmp);
    })
  });
