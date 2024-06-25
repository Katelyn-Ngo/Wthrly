'use strict';
const $weatherAppDiv = document.querySelector('[data-view="weather-app"]');
const $weatherDisplay = document.querySelector('[data-view="weather-display"]');
const $weatherForm = document.querySelector('#weather-form');
const $locationInput = document.querySelector('input[type="text"]');
const $cityName = document.querySelector('.city-name');
const $weatherDescription = document.querySelector('.weather-description');
const $weatherImg = document.querySelector('.weather-img');
const $temperature = document.querySelector('.temperature');
const $humidity = document.querySelector('.humidity');
const $windSpeed = document.querySelector('.wind-speed');
const $weatherDataDiv = document.getElementById('weather-data');
const $weatherForm2 = document.querySelector('#weather-form2');
const $locationInput2 = document.querySelector('#location-input2');
const $backButton = document.querySelector('#back-button');
const $background = document.querySelector('body');
const $locationList = document.querySelector('#location-list');
const $favoritesButton = document.querySelector('#favorites-button');
const $favoritesButton2 = document.querySelector('#favorites-button2');
const $backToWeatherButton = document.querySelector('#back-to-weather-button');
const $favoriteHeart = document.querySelector('#favorite-heart');
if (!$favoriteHeart) throw new Error('favorite heart query failed');
if (!$backToWeatherButton)
  throw new Error('back to weather button query failed');
if (!$favoritesButton2) throw new Error('favorites button2 query failed');
if (!$favoritesButton) throw new Error('favorites button query failed');
if (!$locationList) throw new Error('location list query failed');
if (!$background) throw new Error('background query failed');
if (!$backButton) throw new Error('back button query failed');
if (!$locationInput2) throw new Error('Weather input 2 query failed');
if (!$weatherForm2) throw new Error('Weather form 2 query failed');
if (!$weatherDisplay) throw new Error('weather display query failed');
if (!$weatherDataDiv) throw new Error('weather data div query failed');
if (!$weatherForm) throw new Error('form query failed');
if (!$locationInput) throw new Error('location input query failed');
if (!$cityName) throw new Error('city name query failed');
if (!$weatherDescription) throw new Error('weather description query failed');
if (!$weatherImg) throw new Error('weather image query failed');
if (!$temperature) throw new Error('temperature query failed');
if (!$humidity) throw new Error('humidity query failed');
if (!$windSpeed) throw new Error('wind speed query failed');
const apiKey = 'b03d66ceebc0a945c3eb2bb9cc3551d1';
let currentWeather = {
  weather: [{ description: '', main: '' }],
  main: { temp: 0, humidity: 0 },
  wind: { speed: 0 },
  name: '',
};
$weatherForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const location = $locationInput.value;
  await fetchData(location);
});
$weatherForm2.addEventListener('submit', async (event) => {
  event.preventDefault();
  const location = $locationInput2.value;
  await fetchData(location);
});
$backButton.addEventListener('click', () => {
  swapView('weather-app');
});
$favoritesButton.addEventListener('click', () => {
  swapView('favorite-locations');
});
$backToWeatherButton.addEventListener('click', (event) => {
  event.preventDefault();
  swapView('weather-app');
});
async function fetchData(location) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`,
    );
    if (!response.ok) {
      throw new Error('HTTP Error');
    }
    const data = await response.json();
    currentWeather = data;
    displayWeatherData(currentWeather);
    swapView('weather-display');
    $locationInput.value = '';
  } catch (error) {
    console.error('Error:', error);
  }
}
function displayWeatherData(weatherData) {
  let weatherImage = '';
  $weatherDescription.textContent = weatherData.weather[0].description;
  const weatherCondition = weatherData.weather[0].main.toLowerCase();
  $cityName.textContent = weatherData.name;
  $weatherImg.alt = weatherData.weather[0].description;
  const roundedTemperature = Math.round(weatherData.main.temp);
  $temperature.textContent = `${roundedTemperature} °F`;
  $humidity.textContent = `Humidity: ${weatherData.main.humidity}%`;
  $windSpeed.textContent = `Wind Speed: ${weatherData.wind.speed} mph`;
  switch (weatherCondition) {
    case 'clear':
      $background.className = 'bg-clear';
      weatherImage = 'images/sunny.png';
      break;
    case 'clouds':
    case 'haze':
      $background.className = 'bg-clouds';
      weatherImage = 'images/cloudy.png';
      break;
    case 'rain':
    case 'drizzle':
      $background.className = 'bg-rain';
      weatherImage = 'images/rainy.png';
      break;
    case 'windy':
    case 'smoke':
      $background.className = '';
      weatherImage = 'images/windy.png';
      break;
    default:
      weatherImage = 'images/default.png';
  }
  $weatherImg.src = weatherImage;
  $weatherImg.alt = `Icon of weather for ${weatherCondition} weather`;
  for (let i = 0; i < data.favorites.length; i++) {
    if (data.favorites[i].name === weatherData.name)
      $favoriteHeart.classList.add('favorite-heart');
  }
}
function swapView(view) {
  if (view === 'weather-display') {
    $weatherAppDiv.classList.add('hidden');
    $weatherDisplay.classList.remove('hidden');
  } else if (view === 'weather-app') {
    $weatherDisplay.classList.add('hidden');
    $weatherAppDiv.classList.remove('hidden');
  }
  //   else if (view === 'favorite-locations') {
  //     $weatherAppDiv.classList.add('hidden');
  //     $weatherDisplay.classList.add('hidden');
  //     document
  //       .querySelector('[data-view="favorite-locations"]')
  //       ?.classList.remove('hidden');
  //     renderFavoriteLocations();
  //   }
  // for later feature to hide weather display and weather app when swap view to favorite location
}
// function addLocationToList(location: string): void {
//   const locationDiv = document.createElement('div');
//   locationDiv.classList.add('location-item');
//   locationDiv.textContent = location;
//   const favoriteIcon = document.createElement('i');
//   favoriteIcon.classList.add('fa-solid', 'fa-heart', 'favorite-icon');
//   if (data.favorites.includes(location)) {
//     favoriteIcon.classList.add('favorite-heart');
//   }
//   locationDiv.appendChild(favoriteIcon);
//   $locationList.appendChild(locationDiv);
// }
// for later feature to add location to favorite list.
$favoriteHeart.addEventListener('click', () => {
  toggleFavorite(currentWeather);
});
function toggleFavorite(current) {
  if (!data.favorites.length) {
    data.favorites.push(current);
    $favoriteHeart.classList.add('favorite-heart');
    $favoriteHeart.classList.add('fa-solid');
    $favoriteHeart.classList.remove('fa-regular');
  } else if (data.favorites.includes(current)) {
    $favoriteHeart.classList.add('fa-regular');
    $favoriteHeart.classList.remove('fa-solid');
    //remove object from array
  } else {
    data.favorites.push(current);
    $favoriteHeart.classList.add('favorite-heart');
    $favoriteHeart.classList.add('fa-solid');
    $favoriteHeart.classList.remove('fa-regular');
  }
}
// if(data.favorites.includes(current)) /// use this for remove feature later.
// function renderFavoriteLocations(): void {
//   const $favoriteLocationsList = document.getElementById(
//     'favorite-locations-list',
//   ) as HTMLDivElement;
//   $favoriteLocationsList.innerHTML = '';
//   data.favorites.forEach((location) => {
//     const locationDiv = document.createElement('div');
//     locationDiv.classList.add('favorite-location-item');
//     locationDiv.textContent = location;
//     $favoriteLocationsList.appendChild(locationDiv);
//   });
// }
//future feature for rendering favorite locations.
