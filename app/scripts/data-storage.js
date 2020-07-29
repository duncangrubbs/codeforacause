export function putData(key, value) {
  if (localStorage.getItem(key) != null) {
    removeData(key);
    localStorage.setItem(key, JSON.stringify(value));
  }
  localStorage.setItem(key, JSON.stringify(value));
}

export function getData(key) {
  return localStorage.getItem(key).replace(/"/g, '');
}

function removeData(key) {
  localStorage.removeItem(key);
}