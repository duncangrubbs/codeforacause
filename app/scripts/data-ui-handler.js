/**
 * @author Duncan Grubbs
 * @description Pulls data from APIs and updates the UI with the new data, depending
 * on the user's setting.
 */

import { getData } from './data-storage.js';

// Utility functions
function getFormattedDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const year = today.getFullYear();
  return `${month}-${day}-${year}`;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
  const locationDefaultedHeader = document.getElementById('location-defaulted');
  if (locationDefaultedHeader != null) { locationDefaultedHeader.remove(); }

  localNumbers.textContent = '';
  USNumbers.textContent = '';
  news.textContent = '';
  science.textContent = '';
}

// DATA API for numbers from the Atlantic
const COVID_TRACKING_2 = 'https://covidtracking.com/api/v1/us/current.json';

// News API
const NEWS_API_KEY = 'apiKey=3302ef91900d49c6a4a560f1b5d5c561';
const NEWSAPI_BASE_URL = 'https://newsapi.org/v2/top-headlines?country=us&q=';
const NEWS_QUERY = `covid&from=${getFormattedDate()}&sortBy=publishedAt&category=general&pageSize=10&`;
const SCIENCE_QUERY = `covid&from=${getFormattedDate()}&sortBy=publishedAt&category=health&pageSize=10&`;

const NEWS_URL = NEWSAPI_BASE_URL + NEWS_QUERY + NEWS_API_KEY;
const SCIENCE_URL = NEWSAPI_BASE_URL + SCIENCE_QUERY + NEWS_API_KEY;

function getLocalNumbers(url) {
  getDataFromURL(url).then((data) => {
    const list = document.getElementById('local-numbers');

    let subElement = document.createElement('div');
    subElement.classList.add('number');
    subElement.innerHTML = `<b>${numberWithCommas(data.positive)}</b>&nbsp;cases | + <b>${numberWithCommas(data.positiveIncrease)}</b>`;
    list.appendChild(subElement);

    subElement = document.createElement('div');
    subElement.classList.add('number');
    subElement.innerHTML = `<b>${numberWithCommas(data.death)}</b>&nbsp;deaths | +<b>${numberWithCommas(data.deathIncrease)}</b>`;
    list.appendChild(subElement);

    subElement = document.createElement('div');
    subElement.classList.add('number');
    subElement.innerHTML = `<b>${numberWithCommas(data.hospitalizedCurrently)}</b>&nbsp;hospitalized | +<b>${numberWithCommas(data.hospitalizedIncrease)}</b>`;
    list.appendChild(subElement);
  });
}

function getUSNumbers() {
  getDataFromURL(COVID_TRACKING_2).then((response) => {
    const list = document.getElementById('us-numbers');
    const data = response[0];

    let subElement = document.createElement('div');
    subElement.classList.add('number');
    subElement.innerHTML = `<b>${numberWithCommas(data.positive)}</b>&nbsp;cases | + <b>${numberWithCommas(data.positiveIncrease)}</b>`;
    list.appendChild(subElement);

    subElement = document.createElement('div');
    subElement.classList.add('number');
    subElement.innerHTML = `<b>${numberWithCommas(data.death)}</b>&nbsp;deaths | +<b>${numberWithCommas(data.deathIncrease)}</b>`;
    list.appendChild(subElement);

    subElement = document.createElement('div');
    subElement.classList.add('number');
    subElement.innerHTML = `<b>${numberWithCommas(data.hospitalizedCurrently)}</b>&nbsp;hospitalized | +<b>${numberWithCommas(data.hospitalizedIncrease)}</b>`;
    list.appendChild(subElement);

    subElement = document.createElement('div');
    subElement.classList.add('number');
    subElement.innerHTML = `<b>${numberWithCommas(data.negative)}</b>&nbsp;negative |&nbsp;<b>${numberWithCommas(data.recovered)}</b>&nbsp;recovered`;
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

function displayLocationDefaulted() {
  const wrapper = document.getElementById('local-numbers-wrapper');

  const header = document.createElement('h2');
  header.innerText = 'No Location Data, defaulting to CA';
  header.id = 'location-defaulted';

  wrapper.prepend(header);
}

export function updateDataUI(setting, state) {
  clearData();
  const LOCAL_DATA_URL = `https://covidtracking.com/api/v1/states/${state.toLowerCase()}/current.json`;
  if (getData('locationDefaulted') === 'true') {
    displayLocationDefaulted();
  }
  switch (setting) {
    case 'BASIC':
      getLocalNumbers(LOCAL_DATA_URL);
      break;
    case 'GENERAL':
      getLocalNumbers(LOCAL_DATA_URL);
      getUSNumbers();
      break;
    case 'EXTENSIVE':
      getLocalNumbers(LOCAL_DATA_URL);
      getUSNumbers();
      getNewsData();
      getScienceData();
      break;
    default:
      getLocalNumbers(LOCAL_DATA_URL);
      getUSNumbers();
  }
}
