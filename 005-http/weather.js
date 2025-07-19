const https = require('https');
const config = require('./config');

function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.API_KEY}&units=metric`;

  https.get(url, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      try {
        const result = JSON.parse(data);
        if (result.cod === 200) {
          console.log(`Погода в ${result.name}:`);
          console.log(`Температура: ${result.main.temp}°C`);
          console.log(`Ощущается как: ${result.main.feels_like}°C`);
          console.log(`Погодные условия: ${result.weather[0].description}`);
        } else {
          console.log('Ошибка:', result.message);
        }
      } catch (e) {
        console.log('Ошибка при обработке данных');
      }
    });
  }).on('error', (err) => {
    console.log('Ошибка запроса:', err.message);
  });
}

const city = process.argv[2] || config.DEFAULT_CITY;
if (!city) {
  console.log('Укажите город');
  process.exit(1);
}

getWeather(city);