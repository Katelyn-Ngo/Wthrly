'use strict';
// interface FavoriteLocation {
//   name: string;
//   description: string;
//   temp: number;
//   humidity: number;
//   windSpeed: number;
// }
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
