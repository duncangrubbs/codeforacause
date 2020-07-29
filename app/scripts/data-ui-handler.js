// DATA API for numbers from the Atlantic
const COVID_TRACKING_1 = 'https://covidtracking.com/api/v1/us/daily.json';
const COVID_TRACKING_2 = 'https://covidtracking.com/api/v1/us/current.json';
const COVID_TRACKING_3 = 'https://covidtracking.com/api/v1/states/ca/current.json';

// News API
const NEWS_API_KEY = 'apiKey=3302ef91900d49c6a4a560f1b5d5c561';
const NEWSAPI_BASE_URL = 'http://newsapi.org/v2/everything?q=';
const NEWSAPI_BASE_TOP = 'https://newsapi.org/v2/top-headlines?country=us&';
const SAMPLE_QUERY = 'covid&from=2020-07-24&sortBy=publishedAt&';

// Corona API
const CORONA_API  = 'https://corona-api.com/countries/US'

function getDataFromURL(url) {
  return fetch(url)
    .then((res) => {
      return res.json().then(blob => Promise.resolve(blob));
    });
}

function clearData() {
  const localNumbers = document.getElementById('local-numbers');
  const USNumbers = document.getElementById('us-numbers');
  const news = document.getElementById('news');

  localNumbers.textContent = '';
  USNumbers.textContent = '';
  news.textContent = '';
}

function getLocalNumbers() {
  getDataFromURL(COVID_TRACKING_3).then(data => {
    const list = document.getElementById('local-numbers');
    console.log(data); // eslint-disable-line
  
    let subElement = document.createElement('div');
    subElement.classList.add('number');
    subElement.innerText = data['positive'] + ' Cases';
    list.appendChild(subElement);
  
    subElement = document.createElement('div');
    subElement.classList.add('number');
    subElement.innerText = '+' + data['positiveIncrease'] + ' Cases';
    list.appendChild(subElement);
  
    subElement = document.createElement('div');
    subElement.classList.add('number');
    subElement.innerText = data['negative'] + ' Negative';
    list.appendChild(subElement);
  
    subElement = document.createElement('div');
    subElement.classList.add('number');
    subElement.innerText = data['hospitalizedCurrently'] + ' Hospitalized';
    list.appendChild(subElement);
  
    subElement = document.createElement('div');
    subElement.classList.add('number');
    subElement.innerText = data['death'] + ' Deaths';
    list.appendChild(subElement);
  
    subElement = document.createElement('div');
    subElement.classList.add('number');
    subElement.innerText = '+' + data['deathIncrease'] + ' deaths';
    list.appendChild(subElement);
  });
}

function getUSNumbers() {
  getDataFromURL(COVID_TRACKING_2).then(response => {
    const list = document.getElementById('us-numbers');
    const data = response[0];
    console.log(data); // eslint-disable-line
    let subElement = document.createElement('div');
    subElement.classList.add('number');
    subElement.innerText = data['positive'] + ' Cases';
    list.appendChild(subElement);
  
    subElement = document.createElement('div');
    subElement.classList.add('number');
    subElement.innerText = '+' + data['positiveIncrease'] + ' Cases';
    list.appendChild(subElement);
  
    subElement = document.createElement('div');
    subElement.classList.add('number');
    subElement.innerText = data['negative'] + ' Negative';
    list.appendChild(subElement);
  
    subElement = document.createElement('div');
    subElement.classList.add('number');
    subElement.innerText = data['hospitalizedCurrently'] + ' Hospitalized';
    list.appendChild(subElement);
  
    subElement = document.createElement('div');
    subElement.classList.add('number');
    subElement.innerText = data['death'] + ' Deaths';
    list.appendChild(subElement);
  
    subElement = document.createElement('div');
    subElement.classList.add('number');
    subElement.innerText = '+' + data['deathIncrease'] + ' deaths';
    list.appendChild(subElement);
  });
}

function getNewsData() {
  getDataFromURL(NEWSAPI_BASE_TOP + NEWS_API_KEY).then(data => {
    const newList = document.getElementById('news');
    console.log(data); // eslint-disable-line
    data.articles.forEach(article => {
      let newsWrapper = document.createElement('div');
      newsWrapper.classList.add('news-article');
  
      let subElement = document.createElement('img');
      subElement.classList.add('news-img');
      subElement.src = article.urlToImage;
      newsWrapper.appendChild(subElement);
  
      subElement = document.createElement('a');
      subElement.classList.add('news-link');
      subElement.innerText = article.title;
      subElement.href = article.url;
      newsWrapper.appendChild(subElement);
  
      newList.appendChild(newsWrapper);
    })
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
      break;
    default:
      getLocalNumbers();
      getUSNumbers();
  }
}