const url1 = 'https://covidtracking.com/api/v1/us/daily.json';
const url2 = 'https://covidtracking.com/api/v1/states/info.json';
const url3 = 'https://covidtracking.com/api/v1/states/ca/current.json';

fetch(url3)
  .then(response => response.json())
  .then(data => console.log(data));
