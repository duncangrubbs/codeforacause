/**
 * @author Duncan Grubbs
 * @description Handles data persistence for the app in local storage.
 */

function removeData(key) {
  localStorage.removeItem(key);
}

export function putData(key, value) {
  if (localStorage.getItem(key) != null) {
    removeData(key);
    localStorage.setItem(key, JSON.stringify(value));
  }
  localStorage.setItem(key, JSON.stringify(value));
}

export function getData(key) {
  if (localStorage.getItem(key) != null) {
    return localStorage.getItem(key).replace(/"/g, '');
  }
  return null;
}
