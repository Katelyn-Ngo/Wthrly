'use strict';
const $weatherAppDiv = document.querySelector('[data-view="weather-app]');
if (!$weatherAppDiv) throw new Error('weather app div query failed');
const $form = $weatherAppDiv.querySelector('form');
