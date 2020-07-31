/**
 * @author Duncan Grubbs
 * @description Handles changes to the user's setting, and also handles default
 * setting creation and persistence.
 */

import { updateDataUI } from './data-ui-handler.js';
import { putData, getData } from './data-storage.js';

const settings = [
  'LIMITED',
  'STANDARD',
  'EXTENSIVE',
];

let CURRENT_SETTING = 'STANDARD';
const buttons = [];

function updateSetting(setting) {
  if (settings.includes(setting)) {
    putData('setting', setting);
    CURRENT_SETTING = setting;
  }
}

function updateButtonClasses(selectedButton) {
  buttons.forEach((button) => {
    button.classList.remove('selected');
  });
  selectedButton.classList.add('selected');
}

function eventHandler(event) {
  if (!event.target.classList.contains('selected')) {
    updateSetting(event.target.id);
    updateButtonClasses(event.target);
    updateDataUI(CURRENT_SETTING, getData('state'));
  }
}

settings.forEach((setting) => {
  const elem = document.getElementById(setting);
  elem.addEventListener('click', eventHandler);
  buttons.push(elem);
});

if (settings.includes(getData('setting'))) {
  CURRENT_SETTING = getData('setting');
  updateButtonClasses(document.getElementById(CURRENT_SETTING));
} else {
  updateSetting(CURRENT_SETTING);
}
