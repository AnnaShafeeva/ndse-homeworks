require('dotenv').config();

module.exports = {
  API_KEY: process.env.WEATHER_API_KEY,
  API_URL: 'https://api.openweathermap.org/data/2.5/weather',
  DEFAULT_CITY: process.env.DEFAULT_CITY || 'Moscow',
  UNITS: process.env.UNITS || 'metric',
  LANGUAGE: process.env.LANGUAGE || 'ru' 
};