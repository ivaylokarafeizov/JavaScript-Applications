function attachEvents() {
  let location = document.getElementById('location');
  let getWeatherBtn = document.getElementById('submit');
  let forecastDiv = document.getElementById('forecast');
  let currentDiv = document.getElementById('current');
  let upcomingDiv = document.getElementById('upcoming');
  let deg = '&#176';
  let code = '';
  let currentDivElement = document.createElement('div');
  let upcomingDivElement = document.createElement('div');

  getWeatherBtn.addEventListener('click', () => {
    currentDivElement.innerHTML = '';
    upcomingDivElement.innerHTML = '';

    currentDivElement.setAttribute('class', 'forecasts');
    upcomingDivElement.setAttribute('class', 'forecast-info');

    forecastDiv.style.display = 'block';

    fetch('http://localhost:3030/jsonstore/forecaster/locations')
      .then((response) => response.json())
      .then((data) => {
        data.forEach((locationInfoObject) => {
          if (locationInfoObject.name == location.value) {
            return (code = locationInfoObject.code);
          }
        });

        fetch(`http://localhost:3030/jsonstore/forecaster/today/${code}`)
          .then((response) => response.json())
          .then((data) => {
            let forecast = data.forecast;
            let symbol = getSymbol(forecast.condition);
            currentDivElement.innerHTML = `<span class="condition symbol">${symbol}</span>
            <span class="condition">
            <span class="forecast-data">${data.name}</span>
            <span class="forecast-data">${forecast.low}${deg}/${forecast.high}${deg}</span>
            <span class="forecast-data">${forecast.condition}</span>
            </span>`;
            currentDiv.appendChild(currentDivElement);
          })
          .catch(() => console.log('Error!'));

        fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`)
          .then((response) => response.json())
          .then((data) => {
            data.forecast.forEach((x) => {
              let temperatureDesc = `${x.low}${deg}/${x.high}${deg}`;
              upcomingDivElement.innerHTML += `
                <span class="upcoming"> 
                  <span class="symbol">${getSymbol(x.condition)}</span>
                  <span class="forecast-data">${temperatureDesc}</span>
                  <span class="forecast-data">${x.condition}</span>
                </span>`;
            });
            upcomingDiv.appendChild(upcomingDivElement);
          })
          .catch(() => console.log('Error!'));
      })
      .catch(() => console.log('Error!'));
  });

  function getSymbol(condition) {
    let symbols = {
      sunny: '&#x2600',
      partlySunny: '&#x26C5',
      overcast: '&#x2601',
      rain: '&#x2614',
    };

    if (condition == 'Sunny') {
      return symbols.sunny;
    } else if (condition == 'Partly sunny') {
      return symbols.partlySunny;
    } else if (condition == 'Overcast') {
      return symbols.overcast;
    } else if (condition == 'Rain') {
      return symbols.rain;
    }
  }
}

attachEvents();
