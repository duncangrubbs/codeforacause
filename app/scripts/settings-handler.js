const settings = [
  'LIMITED',
  'STANDARD',
  'EXTENSIVE'
];

let CURRENT_SETTING = 'STANDARD';
const buttons = [];

function updateSetting(setting) {
  if (settings.includes(setting)) {
    CURRENT_SETTING = setting;
  }
}

function getSetting(setting) {
  return CURRENT_SETTING;
}

function eventHandler(event) {
  updateSetting(event.target.id);
  buttons.forEach(button => {
    button.classList.remove('selected');
  });
  event.target.classList.add('selected');
}

settings.forEach(setting => {
  let elem = document.getElementById(setting);
  elem.addEventListener('click', eventHandler);
  buttons.push(elem);
});


