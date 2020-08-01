/**
 * @author Duncan Grubbs
 * @description Gets user's location, lat and long + state, and persists it.
 */

import { putData, getData } from './data-storage.js';
import { updateDataUI } from './data-ui-handler.js';

const API_KEY = 'AIzaSyBXU9nt2HU2-MPzE_rcDyjW7wK3xau8xJg';

function geoSuccess(position) {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  putData('location', {
    lat,
    long,
  });

  let state = '';
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${API_KEY}`;

  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      const firstResult = data.results[0].address_components;

      for (let i = 0; i < firstResult.length; i += 1) {
        if (firstResult[i].types.includes('administrative_area_level_1')) {
          state = firstResult[i].short_name;
        }
      }

      const setting = getData('setting');
      putData('state', state);
      putData('locationDefaulted', false);
      updateDataUI(setting, state);
    });
}

function geoError() {
  const setting = getData('setting');

  putData('state', 'CA');
  putData('locationDefaulted', true);
  updateDataUI(setting, 'CA');
}

window.onload = function () {
  if (navigator.geolocation && getData('state') == null) {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  }
};
