const weatherAPIKey = "596fd2b39a8f6c88b0462b3b20ca7ef3"; //BC-weather-dashboard

// open weather API call
const baseCurrWeather = `https://api.openweathermap.org/data/2.5/weather?`;

// Geocoder API call
const baseCoords = `http://api.openweathermap.org/geo/1.0/direct?q=`;

// ---------- CITY SEARCH ------------

function handleCitySearch(event) {
    event.preventDefault();

    const city = $('#city').val().trim();
    $('#city').val('');

    if (!city) {
        alert('Must enter city name');
    } else {
        setLocationHistory(city);
        renderLocationHistory();
        renderWeather(city);
    }
}

function getLocationHistory() {

    let cities = [];

    if (localStorage.length !== 0) {
        cities = JSON.parse(localStorage.getItem("cityHistory"));
    }
    return cities;
}

function setLocationHistory(city) {

    let currCities = getLocationHistory();

    if (localStorage.length !== 0) {
        currCities = JSON.parse(localStorage.getItem('cityHistory'));
    } else {

        currCities.push(city);
        
        localStorage.setItem("cityHistory", JSON.stringify(currCities));
    }
    if (city && city !== currCities[0]) {
        currCities.unshift(city); // add new city to history
        
        //store city input to local storage aka the history
        localStorage.setItem('cityHistory', JSON.stringify(currCities));
    }
}

function renderLocationHistory() {
    
    $('#history').empty(); // clears history container

    const history = getLocationHistory();
    history.forEach(city => {
        const btnEl = document.createElement('button');
        btnEl.textContent = city;
        
        $('#history').append(btnEl);

    })

    $('#history > button').on('click', handleHistorySearch);
}

function handleHistorySearch(event) {
    event.preventDefault();

    // get name of city from button
    const city = jQuery(this).text().trim();

    setLocationHistory(city);
    renderLocationHistory();
    renderWeather(city);
}

// ------------ CURRENT WEATHER -------------

async function renderCurrWeather(lat, lon) {

    //curr weather api call 
    const currWeatherUrl = `${baseCurrWeather}lat=${lat}&lon=${lon}&appid=${weatherAPIKey}&units=imperial`;

    try {
        const response = await fetch(currWeatherUrl);
        result = await response.json();
    } catch (error) {
        console.error(error); 
    }

    //get current weather data from api response
    const city = result.name;
    const date = dayjs().format('ddd, MMM DD');
    const icon = result.weather[0].icon;
    const iconAlt = result.weather[0].description;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    const temp = result.main.temp;
    const wind = result.wind;
    const humidity = result.main.humidity;

    // renders the current weather on the client
    $('#city-day').text(`${city} | ${date}`);
    $('#currIcon').attr('src', iconUrl);
    $('#currIcon').attr('alt', iconAlt);
    $('#temp').text(`Temp: ${temp}\u00B0F`);
    $('#wind').text(`Wind: ${wind.speed} MPH`);
    $('#humidity').text(`Humidity: ${humidity}%`);
}

// ------------ 5 DAY FORECAST -------------

// creates card for each day of 5 day forecast
function createForecastCard(day) {

    // create elements
    const dayEl = document.createElement('section');
    const dateEl = document.createElement('h3');
    const iconEl = document.createElement('img');
    const tempEl = document.createElement('p');
    const windEl = document.createElement('p');
    const humidityEl = document.createElement('p');

    // set icon content
    const iconCode = day.weather[0].icon;
    const iconAlt = day.weather[0].description;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    iconEl.setAttribute('src', iconUrl);
    iconEl.setAttribute('alt', iconAlt);

    // set text of elements
    dateEl.textContent = day.dt_txt.split(' ')[0];
    tempEl.textContent = `Temp: ${day.main.temp}\u00B0F`;
    windEl.textContent = `Wind: ${day.wind.speed} MPH`;
    humidityEl.textContent = `Humidity: ${day.main.humidity}%`;

    // add child elements to container element
    dayEl.append(dateEl);
    dayEl.append(iconEl);
    dayEl.append(tempEl);
    dayEl.append(windEl);
    dayEl.append(humidityEl);
    
    return dayEl;
}

// renders 5 day forecast
async function renderForecastCards(lat, lon) {

    $('#five-day').empty(); // clears forecast container

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherAPIKey}`;

    // // get 5 day forecast from api
    try {
        const response = await fetch(forecastUrl);
        result = await response.json();
    } catch (error) {
        console.error(error); 
    }

    const forecastHourly = result.list;
    const forecastDaily = [];

    // pushes only weather at 12pm to array
    forecastHourly.forEach(timeObj => {
        const timeArr = timeObj.dt_txt.split(' ');
        const time = timeArr[1];
        if (time === "12:00:00") {
            forecastDaily.push(timeObj);
        }
    });

    // create elements for each day
    forecastDaily.forEach(day => {

        const dayEl = createForecastCard(day);
        
        // add container to the DOM
        $('#five-day').append(dayEl);
        
    });
    $('#five-day > section').addClass('card'); // adds same cass to all forecast cards
}

// -------- RENDER ALL WEATHER -----------

async function renderWeather(city) {

    const url = `${baseCoords}${city}&appid=${weatherAPIKey}`;
    let result;

    try {
        const response = await fetch(url);
        result = await response.json();
    } catch (error) {
        console.error(error); 
    }

    // store lat and lon from results in variables
    const lat = result[0].lat;
    const lon = result[0].lon;

    renderCurrWeather(lat, lon);
    renderForecastCards(lat, lon);

}

// --------------- ON LOAD ---------------

$(document).ready(function () {

    // render location history
    renderLocationHistory();

    // load weather
    const cities = getLocationHistory();

    if (cities.length > 0) {
        renderWeather(cities[0]);
    }

    // add event listener to button
    $("[type='submit']").on('click', handleCitySearch);
});

