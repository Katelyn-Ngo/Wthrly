/* exported data */
interface WeatherData {
  weather: { description: string; main: string }[];
  main: { temp: number; humidity: number };
  wind: { speed: number };
  name: string;
}

// interface FavoriteLocation {
//   name: string;
//   description: string;
//   temp: number;
//   humidity: number;
//   windSpeed: number;
// }
let data: { favorites: WeatherData[] } = {
  favorites: [],
};

const savedData = localStorage.getItem('weatherAppData');
if (savedData) {
  data = JSON.parse(savedData);
}

window.addEventListener('beforeunload', () => {
  localStorage.setItem('weatherAppData', JSON.stringify(data));
});
