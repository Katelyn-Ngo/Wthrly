'use strict';
const $weatherAppDiv = document.querySelector('[data-view="weather-app"]');
const $weatherDisplay = document.querySelector('[data-view="weather-display"]');
const $form = document.querySelector('form');
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
if (!$background) throw new Error('background query failed');
if (!$backButton) throw new Error('back button query failed');
if (!$locationInput2) throw new Error('Weather input 2 query failed');
if (!$weatherForm2) throw new Error('Weather form 2 query failed');
if (!$weatherDisplay) throw new Error('weather display query failed');
if (!$weatherDataDiv) throw new Error('weather data div query failed');
if (!$form) throw new Error('form query failed');
if (!$locationInput) throw new Error('location input query failed');
if (!$cityName) throw new Error('city name query failed');
if (!$weatherDescription) throw new Error('weather description query failed');
if (!$weatherImg) throw new Error('weather image query failed');
if (!$temperature) throw new Error('temperature query failed');
if (!$humidity) throw new Error('humidity query failed');
if (!$windSpeed) throw new Error('wind speed query failed');
const apiKey = 'b03d66ceebc0a945c3eb2bb9cc3551d1';
$form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const location = $locationInput.value;
  await fetchData(location);
});
$weatherForm2.addEventListener('submit', async (event) => {
  event.preventDefault();
  const location = $locationInput2.value;
  await fetchData(location);
});
$backButton.addEventListener('click', (event) => {
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
    displayWeatherData(data);
    swapView('weather-display');
    $locationInput.value = '';
  } catch (error) {
    console.log('Error:', error);
  }
}
function displayWeatherData(data) {
  console.log(data);
  let weatherImage = '';
  $weatherDescription.textContent = data.weather[0].description;
  const weatherCondition = data.weather[0].main.toLowerCase();
  $cityName.textContent = data.name;
  $weatherImg.alt = data.weather[0].description;
  const roundedTemperature = Math.round(data.main.temp);
  $temperature.textContent = `${roundedTemperature} °F`;
  $humidity.textContent = `Humidity: ${data.main.humidity}%`;
  $windSpeed.textContent = `Wind Speed: ${data.wind.speed} mph`;
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
      $background.className = '';
      weatherImage = 'images/windy.png';
      break;
    default:
      weatherImage = 'images/default.png';
  }
  $weatherImg.src = weatherImage;
}
function swapView(view) {
  if (view === 'weather-display') {
    $weatherAppDiv.classList.add('hidden');
    $weatherDisplay.classList.remove('hidden');
  } else if (view === 'weather-app') {
    $weatherDisplay.classList.add('hidden');
    $weatherAppDiv.classList.remove('hidden');
  }
}
