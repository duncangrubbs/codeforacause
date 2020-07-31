/**
 * @author Duncan Grubbs
 * @description Client entry point.
 */

import { putData, getData } from './data-storage.js';
import { updateDataUI } from './data-ui-handler.js';

// Not in use for now
const lastUpdated = getData('last_updated');
if (Date.now() - lastUpdated > 10 * 60 * 1000) {
  putData('last_updated', Date.now());
}

function run() {
  const setting = getData('setting');
  const state = getData('state');

  updateDataUI(setting, state);
}

while (true) {
  if (getData('state') != null) {
    run();
    break;
  }
}
