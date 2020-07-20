export function putData(key, value) {
  if (localStorage.getItem(key) != null) {
    return false;
  }
  localStorage.setItem(key, JSON.stringify(value));
  return true;
}

export function getData(key) {

}

export function removeData(key) {

}