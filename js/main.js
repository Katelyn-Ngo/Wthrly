'use strict';
let data = {
  favorites: [],
};
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
const $backToWeatherFromFavorites = document.querySelector(
  '#back-to-weather-from-favorites',
);
const $favoriteHeart = document.querySelector('#favorite-heart');
const $favoriteLocationsList = document.querySelector(
  '[data-view="favorite-locations"]',
);
const $favoriteLocationsContent = document.querySelector(
  '#favorite-locations-content',
);
if (!$favoriteLocationsContent)
  throw new Error('favorite location content query failed');
if (!$favoriteLocationsList)
  throw new Error('favorite locations list query failed');
if (!$favoriteHeart) throw new Error('favorite heart query failed');
if (!$backToWeatherFromFavorites)
  throw new Error('back to weather from favorites query failed');
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
  weather: [{ description: '', main: '', icon: '' }],
  main: { temp: 0, humidity: 0, temp_min: 0, temp_max: 0 },
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
$backToWeatherFromFavorites.addEventListener('click', (event) => {
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
    $favoriteHeart.classList.add('fa-regular');
    $favoriteHeart.classList.remove('fa-solid');
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
    if (data.favorites[i].name === weatherData.name) {
      $favoriteHeart.classList.add('fa-solid');
      $favoriteHeart.classList.remove('fa-regular');
    }
  }
}
$favoriteHeart.addEventListener('click', () => {
  toggleFavorite(currentWeather);
});
function toggleFavorite(current) {
  let isFavorite = false;
  for (let i = 0; i < data.favorites.length; i++) {
    if (data.favorites[i].name === current.name) {
      isFavorite = true;
      data.favorites.splice(i, 1);
      renderFavoriteLocations();
      break;
    }
  }
  if (isFavorite) {
    $favoriteHeart.classList.add('fa-regular');
    $favoriteHeart.classList.remove('fa-solid');
  } else {
    const newFavorite = {
      name: current.name,
      description: current.weather[0].description,
      temp: current.main.temp,
      tempMin: current.main.temp_min,
      tempMax: current.main.temp_max,
      icon: current.weather[0].main.toLowerCase(),
    };
    data.favorites.push(newFavorite);
    $favoriteHeart.classList.add('favorite-heart');
    $favoriteHeart.classList.remove('favorite-heart');
    $favoriteHeart.classList.add('fa-solid');
    $favoriteHeart.classList.remove('fa-regular');
    renderFavoriteLocations(); // Update the DOM
  }
}
function renderFavoriteLocations() {
  const $favoriteLocationsContent = document.querySelector(
    '#favorite-locations-content',
  );
  if (!$favoriteLocationsContent) {
    console.error('favorite location content query failed');
    return;
  }
  while ($favoriteLocationsContent.firstChild) {
    $favoriteLocationsContent.removeChild($favoriteLocationsContent.firstChild);
  }
  if (data.favorites.length === 0) {
    const noFavoritesMessage = document.createElement('p');
    noFavoritesMessage.textContent = 'No favorite locations yet.';
    $favoriteLocationsContent.appendChild(noFavoritesMessage);
  } else {
    data.favorites.forEach((location, index) => {
      console.log('location data:', location);
      const locationDiv = document.createElement('div');
      locationDiv.classList.add('favorite-location-card');
      const header = document.createElement('div');
      header.className = 'header';
      const locationName = document.createElement('h2');
      locationName.textContent = location.name;
      header.appendChild(locationName);
      const removeButton = document.createElement('i');
      removeButton.className = 'fa-solid fa-xmark remove-button';
      removeButton.onclick = () => {
        data.favorites.splice(index, 1);
        renderFavoriteLocations();
      };
      locationDiv.appendChild(removeButton);
      locationDiv.appendChild(header);
      const weatherInfo = document.createElement('div');
      weatherInfo.className = 'weather-info';
      const weatherIcon = document.createElement('img');
      weatherIcon.src = getWeatherIcon(location.icon);
      weatherInfo.appendChild(weatherIcon);
      const temperature = document.createElement('div');
      temperature.className = 'temperature';
      temperature.textContent = `${Math.round(location.temp)}°F`;
      weatherInfo.appendChild(temperature);
      const tempMinMax = document.createElement('div');
      tempMinMax.className = 'temp-min-max';
      tempMinMax.textContent = `H: ${Math.round(location.tempMax)}° L: ${Math.round(location.tempMin)}°`;
      weatherInfo.appendChild(tempMinMax);
      const description = document.createElement('div');
      description.className = 'description';
      description.textContent = location.description;
      weatherInfo.appendChild(description);
      locationDiv.appendChild(weatherInfo);
      $favoriteLocationsContent.appendChild(locationDiv);
    });
  }
}
function getWeatherIcon(weatherCondition) {
  switch (weatherCondition) {
    case 'clear':
      return 'images/sunny.png';
    case 'clouds':
    case 'haze':
      return 'images/cloudy.png';
    case 'rain':
    case 'drizzle':
      return 'images/rainy.png';
    case 'windy':
    case 'smoke':
      return 'images/windy.png';
    default:
      return 'images/default.png';
  }
}
function swapView(view) {
  if (view === 'weather-display') {
    $weatherAppDiv.classList.add('hidden');
    $weatherDisplay.classList.remove('hidden');
    $favoriteLocationsList.classList.add('hidden');
  } else if (view === 'weather-app') {
    $favoriteHeart.classList.add('fa-regular');
    $favoriteHeart.classList.remove('fa-solid');
    $favoriteLocationsList.classList.add('hidden');
    $weatherDisplay.classList.add('hidden');
    $weatherAppDiv.classList.remove('hidden');
    $background.className = '';
  } else if (view === 'favorite-locations') {
    $favoriteHeart.classList.add('fa-regular');
    $favoriteHeart.classList.remove('fa-solid');
    $weatherAppDiv.classList.add('hidden');
    $weatherDisplay.classList.add('hidden');
    $favoriteLocationsList.classList.remove('hidden');
    $background.className = '';
    renderFavoriteLocations();
  }
}
$favoritesButton2.addEventListener('click', (event) => {
  event.preventDefault();
  swapView('favorite-locations');
});
$backToWeatherFromFavorites.addEventListener('click', (event) => {
  event.preventDefault();
  swapView('weather-app');
  $weatherAppDiv.classList.remove('hidden');
});
renderFavoriteLocations();
