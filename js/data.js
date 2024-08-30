'use strict';
/* exported data */
let data = {
  favorites: [],
};
const savedData = localStorage.getItem('weatherAppData');
if (savedData) {
  data = JSON.parse(savedData);
}
window.addEventListener('beforeunload', () => {
  localStorage.setItem('weatherAppData', JSON.stringify(data));
});
