const url1 = 'https://covidtracking.com/api/v1/us/daily.json';
const url2 = 'https://covidtracking.com/api/v1/states/info.json';
const url3 = 'https://covidtracking.com/api/v1/states/ca/current.json';

fetch(url3)
  .then(response => response.json())
  .then(data => {
    const list = document.getElementById('numbers');
    console.log(data); // eslint-disable-line
    Object.keys(data).forEach(key => {
      let tmp = document.createElement('ul');
      tmp.innerText = key + " " + data[key];
      list.appendChild(tmp);
    })
  });


