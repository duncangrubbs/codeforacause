/**
 * @author Duncan Grubbs
 * @description Pulls data from APIs and updates the UI with the new data, depending
 * on the user's setting.
 */

// Utility functions
function getFormattedDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const year = today.getFullYear();
  return `${month}-${day}-${year}`;
}

function getDataFromURL(url) {
  return fetch(url)
    .then((res) => res.json().then((blob) => Promise.resolve(blob)));
}

function clearData() {
  const localNumbers = document.getElementById('local-numbers');
  const USNumbers = document.getElementById('us-numbers');
  const news = document.getElementById('news');
  const science = document.getElementById('science');

  localNumbers.textContent = '';
  USNumbers.textContent = '';
  news.textContent = '';
  science.textContent = '';
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// DATA API for numbers from the Atlantic
const COVID_TRACKING_2 = 'https://covidtracking.com/api/v1/us/current.json';
const COVID_TRACKING_3 = 'https://covidtracking.com/api/v1/states/ca/current.json';

// News API
const NEWS_API_KEY = 'apiKey=3302ef91900d49c6a4a560f1b5d5c561';
const NEWSAPI_BASE_URL = 'http://newsapi.org/v2/top-headlines?country=us&q=';
const NEWS_QUERY = `covid&from=${getFormattedDate()}&sortBy=publishedAt&category=general&pageSize=10&`;
const SCIENCE_QUERY = `covid&from=${getFormattedDate()}&sortBy=publishedAt&category=health&pageSize=10&`;

const NEWS_URL = NEWSAPI_BASE_URL + NEWS_QUERY + NEWS_API_KEY;
const SCIENCE_URL = NEWSAPI_BASE_URL + SCIENCE_QUERY + NEWS_API_KEY;

// Corona API
// const CORONA_API = 'https://corona-api.com/countries/US';

function getLocalNumbers() {
  getDataFromURL(COVID_TRACKING_3).then((data) => {
    const list = document.getElementById('local-numbers');
    console.log(data); // eslint-disable-line

    let subElement = document.createElement('div');
    subElement.classList.add('number');
    subElement.innerText = `${numberWithCommas(data.positive)} Cases`;
    list.appendChild(subElement);

    subElement = document.createElement('div');
    subElement.classList.add('number');
    subElement.innerText = `+${numberWithCommas(data.positiveIncrease)} Cases`;
    list.appendChild(subElement);

    subElement = document.createElement('div');
    subElement.classList.add('number');
    subElement.innerText = `${numberWithCommas(data.negative)} Negative`;
    list.appendChild(subElement);

    subElement = document.createElement('div');
    subElement.classList.add('number');
    subElement.innerText = `${numberWithCommas(data.hospitalizedCurrently)} Hospitalized`;
    list.appendChild(subElement);

    subElement = document.createElement('div');
    subElement.classList.add('number');
    subElement.innerText = `${numberWithCommas(data.death)} Deaths`;
    list.appendChild(subElement);

    subElement = document.createElement('div');
    subElement.classList.add('number');
    subElement.innerText = `+${numberWithCommas(data.deathIncrease)} deaths`;
    list.appendChild(subElement);
  });
}

function getUSNumbers() {
  getDataFromURL(COVID_TRACKING_2).then((response) => {
    const list = document.getElementById('us-numbers');
    const data = response[0];
    console.log(data); // eslint-disable-line
    let subElement = document.createElement('div');
    subElement.classList.add('number');
    subElement.innerText = `${numberWithCommas(data.positive)} Cases`;
    list.appendChild(subElement);

    subElement = document.createElement('div');
    subElement.classList.add('number');
    subElement.innerText = `+${numberWithCommas(data.positiveIncrease)} Cases`;
    list.appendChild(subElement);

    subElement = document.createElement('div');
    subElement.classList.add('number');
    subElement.innerText = `${numberWithCommas(data.negative)} Negative`;
    list.appendChild(subElement);

    subElement = document.createElement('div');
    subElement.classList.add('number');
    subElement.innerText = `${numberWithCommas(data.hospitalizedCurrently)} Hospitalized`;
    list.appendChild(subElement);

    subElement = document.createElement('div');
    subElement.classList.add('number');
    subElement.innerText = `${numberWithCommas(data.death)} Deaths`;
    list.appendChild(subElement);

    subElement = document.createElement('div');
    subElement.classList.add('number');
    subElement.innerText = `+${numberWithCommas(data.deathIncrease)} deaths`;
    list.appendChild(subElement);
  });
}

function getNewsData() {
  getDataFromURL(NEWS_URL).then((data) => {
    const newList = document.getElementById('news');
    data.articles.forEach((article) => {
      const newsWrapper = document.createElement('div');
      newsWrapper.classList.add('article');

      let subElement = document.createElement('img');
      subElement.classList.add('article-img');
      subElement.src = article.urlToImage;
      subElement.alt = 'IMG';
      newsWrapper.appendChild(subElement);

      subElement = document.createElement('a');
      subElement.classList.add('article-link');
      subElement.innerText = article.title;
      subElement.href = article.url;
      newsWrapper.appendChild(subElement);

      newList.appendChild(newsWrapper);
    });
  });
}

function getScienceData() {
  getDataFromURL(SCIENCE_URL).then((data) => {
    const newList = document.getElementById('science');
    data.articles.forEach((article) => {
      const newsWrapper = document.createElement('div');
      newsWrapper.classList.add('article');

      let subElement = document.createElement('img');
      subElement.classList.add('article-img');
      subElement.src = article.urlToImage;
      subElement.alt = 'IMG';
      newsWrapper.appendChild(subElement);

      subElement = document.createElement('a');
      subElement.classList.add('article-link');
      subElement.innerText = article.title;
      subElement.href = article.url;
      newsWrapper.appendChild(subElement);

      newList.appendChild(newsWrapper);
    });
  });
}

export function updateDataUI(setting) {
  clearData();
  switch (setting) {
    case 'LIMITED':
      getLocalNumbers();
      break;
    case 'STANDARD':
      getLocalNumbers();
      getUSNumbers();
      break;
    case 'EXTENSIVE':
      getLocalNumbers();
      getUSNumbers();
      getNewsData();
      getScienceData();
      break;
    default:
      getLocalNumbers();
      getUSNumbers();
  }
}
