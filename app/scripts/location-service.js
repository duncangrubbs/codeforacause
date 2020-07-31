/**
 * @author Duncan Grubbs
 * @description Gets user's location, lat and long + state, and persists it.
 */

import { putData } from './data-storage.js';

function verifyGeolocationSupport() {
  if (navigator.geolocation) {
    return true;
  }
  return false;
}

function getLocation() {
  const geoSuccess = function (position) {
    putData('location', {
      lat: position.coords.latitude,
      long: position.coords.longitude,
    });
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
}

window.onload = function () {
  if (verifyGeolocationSupport()) {
    getLocation();
  }
};
