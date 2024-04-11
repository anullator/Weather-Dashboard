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
    console.log(city);

    if (!city) {
        alert('Must enter city name');
    } else {
        setLocationHistory(city);
        renderLocationHistory();
        renderWeather(city);
    }
}

function getLocationHistory() {
    console.log(`enter get location history`);
    let cities = [];

    if (localStorage.length !== 0) {
        console.log(`local storage has length`);
        cities = JSON.parse(localStorage.getItem("cityHistory"));
    }
    return cities;
}

function setLocationHistory(city) {
    console.log(`enter set location history`);
    let currCities = getLocationHistory(); // is an array
    if (localStorage.length !== 0) {
        console.log(`local storage exists`);
        currCities = JSON.parse(localStorage.getItem('cityHistory'));
    } else {
        console.log(`localstorage does not exist`);
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
    console.log(`enter render location history`);
    
    $('#history').empty();

    const history = getLocationHistory();
    history.forEach(city => {
        const btnEl = document.createElement('button');
        btnEl.textContent = city;
        
        $('#history').append(btnEl);

    })

    $('#history > button').on('click', renderWeather);
}

// ------------ CURRENT WEATHER -------------

async function renderCurrWeather(city) {
    console.log(`enter render curr weather`);
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

    // TODO: add curr weather api call 
    const currWeatherUrl = `${baseCurrWeather}lat=${lat}&lon=${lon}&appid=${weatherAPIKey}`;

    try {
        const response = await fetch(currWeatherUrl);
        // console.log(response);
        result = await response.json();
        console.log(result);
        
        // result = JSON.parse(result);
        // console.log(typeof result);
    } catch (error) {
        console.error(error); 
    }

    //TODO: get data for the current weather using the "weather" key and values

}

// ------------ 5 DAY FORECAST -------------

// creates card for each day of 5 day forecast
function createForecastCard() {
    console.log(`enter create forecast card`);
    // create elements

    // add child elements to container element

    // add container to the DOM

}

// renders 5 day forecast
function renderForecastCards() {
    console.log(`enter render forecast cards`);
    // delete existing forecast cards

    // create loop

        // add content to child elements

        // add '.card' class to container
}

// -------- RENDER ALL WEATHER -----------

function renderWeather(city) {
    console.log(`enter render weather`);

    renderCurrWeather(city);
    renderForecastCards(city);

}

// --------------- ON LOAD ---------------

$(document).ready(function () {
    console.log(`enter document ready function`);

    // render location history
    renderLocationHistory();

    // load weather
    const cities = getLocationHistory();
    if (cities > 0) {
        renderWeather(cities[0]);
        console.log(`enter if`);
    }

    // add event listener to button
    $("[type='submit']").on('click', handleCitySearch);
});

