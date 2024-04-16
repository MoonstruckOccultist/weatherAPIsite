var searchFormEl = document.querySelector('#searchForm');
var cityInputEl = document.querySelector('#cityInp');
var searchHistoryEl = document.querySelector('.hList');
var weatherListEl = document.querySelector('.list');

function fetchWeather(city) {
    const apiKey = 'a67f5e233ee04a1fabcebbf6661093a4';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            updateWeather(data);
            saveToLocalStorage(city);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function convertInfo(sDay) {
    console.log(sDay);
    var tempKel = sDay.main.temp;
    var tempFar = (tempKel - 273.15) * 9/5 + 32;
    
    var humidity = sDay.main.humidity;

    var windMetersPS = sDay.wind.speed;
    var windMPH = windMetersPS * 2.23694;

    var dayText = sDay.dt_txt;

    var icon = sDay.weather[0].icon

    const retDay = {
        date: dayText,
        temp: tempFar,
        humidity: humidity,
        wind: windMPH,
        icon: `https://openweathermap.org/img/wn/${icon}@2x.png`
    }

    return retDay;
}

function updateWeather(data) {
    var list = data.list
    var week = []

    var num = 0

    for (var i = 0; i < 5; i++) {

        console.log(i)
        var newDay = convertInfo(list[num])
        week.push(newDay)
        num = num + 8;
    }
    console.log(week)

    weatherListEl.innerHTML = '';

    week.forEach(day => {
        var listItemEl = document.createElement('li');
        listItemEl.classList.add('dCard');
        listItemEl.classList.add('col-5');

        var dateEl = document.createElement('p');
        dateEl.textContent = `Date: ${day.date}`;

        var tempEl = document.createElement('p');
        tempEl.textContent = `Temperature: ${day.temp} °F`;

        var humidityEl = document.createElement('p');
        humidityEl.textContent = `Humidity: ${day.humidity}%`;

        var windEl = document.createElement('p');
        windEl.textContent = `Wind Speed: ${day.wind} MPH`;

        var iconEl = document.createElement('img');
        iconEl.src = day.icon;
        iconEl.alt = 'Weather Icon';
        iconEl.classList.add('icon')

        listItemEl.appendChild(dateEl);
        listItemEl.appendChild(iconEl);
        listItemEl.appendChild(tempEl);
        listItemEl.appendChild(humidityEl);
        listItemEl.appendChild(windEl);

        weatherListEl.appendChild(listItemEl);
    });
}

function saveToLocalStorage(city) {
    var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    searchHistory.push(city);

    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

    displaySearchHistory();
}

function displaySearchHistory() {
    searchHistoryEl.innerHTML = '';

    var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    searchHistory.forEach(city => {
        var buttonEl = document.createElement('button');
        buttonEl.textContent = city;
        buttonEl.classList.add('hBtn');
        buttonEl.classList.add('col-12');

        buttonEl.addEventListener('click', function() {
            fetchWeather(city);
        });

        searchHistoryEl.appendChild(buttonEl);
    });
}

function handleSearchFormSubmit(event) {
    event.preventDefault();

    const city = cityInputEl.value.trim();

    if (city) {
        fetchWeather(city);

        cityInputEl.value = '';
    } else {
    }
}
displaySearchHistory();

searchFormEl.addEventListener('submit', handleSearchFormSubmit);


