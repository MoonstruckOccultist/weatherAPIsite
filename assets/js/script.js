var searchFormEl = document.querySelector('#searchForm');

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector('#cityInp').value;

    if (!searchInputVal) {
        console.error('You need a search input value!');
        return;
    }

    fetchCoordinates(searchInputVal);
}

function fetchCoordinates(city) {
    const apiKey = 'a67f5e233ee04a1fabcebbf6661093a4';
    const geocodeUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(geocodeUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const { coord } = data;
            const { lat, lon } = coord;

            fetchWeatherForecast(lat, lon);
        })
        .catch(error => {
            console.error('There was a problem with fetching coordinates:', error);
        });
}

function fetchWeatherForecast(lat, lon) {
    const apiKey = 'a67f5e233ee04a1fabcebbf6661093a4';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            displayWeatherForecast(data);
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
}

function displayWeatherForecast(data) {
    const forecastList = data.list;
    const forecastContainer = document.querySelector('.list');

    forecastContainer.innerHTML = '';

    forecastList.forEach(forecast => {
        const forecastItem = document.createElement('li');
        forecastItem.classList.add('forecast-item');

        const date = new Date(forecast.dt * 1000);
        const dateString = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' });

        const weatherDescription = forecast.weather[0].description;
        const temperature = forecast.main.temp;

        forecastItem.innerHTML = `
            <div>${dateString}</div>
            <div>${weatherDescription}</div>
            <div>${temperature}°C</div>
        `;

        forecastContainer.appendChild(forecastItem);
    });
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);