const weatherAPI = "596fd2b39a8f6c88b0462b3b20ca7ef3"; //BC-weather-dashboard
//const getCoordsAPI = `http://api.openweathermap.org/geo/1.0/direct?q=$${city}&appid=${API}`
// const baseURL = "https://api.openweathermap.org/data/2.5/weather?q="; //this may be wrong
// const baseURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API}`; 
// const queryURL = baseURL.concat(`${city}&appid=${weatherAPI}`); //THIS MAY BE WRONG

// ---------- CITY SEARCH ------------

function handleCitySearch(event) {
    const city = $('#city').val().trim();
    $('#city').val('');
    console.log(city);
    event.preventDefault();


    if (!city) {
        alert('Must enter city name');
    } else {
        setLocationHistory();
        renderLocationHistory();
        renderWeather();
    }
}

function getLocationHistory() {
    let cities = [];

    if (localStorage.length !== 0) {
        cities = JSON.parse(localStorage.getItem('cities'));
    }
    return cities;
}

function setLocationHistory() {
    let currCities = getLocationHistory();
    const city = $('#city').val().trim();
    if (localStorage.length !== 0) {
        currCities = JSON.parse(localStorage.getItem('cities'));
    } 
    if (city && city !== currCities[0]) {
        currCities.unshift(city); // add new city to history

        //store city input to local storage aka the history
        localStorage.setItem('cities', JSON.stringify(currCities));
    }
    return currCities;
}

// TODO:
function renderLocationHistory() {
    console.log(`enter render location history`);
    console.log(localStorage.length);
    
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

function renderCurrWeather() {
    console.log(`enter render curr weather`);
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

function renderWeather() {
    console.log(`enter render weather`);
    renderCurrWeather();
    renderForecastCards();
}

// --------------- ON LOAD ---------------

$(document).ready(function () {
    console.log(`enter document ready function`);

    // render location history
    renderLocationHistory();

    // load weather
    renderWeather();

    // add event listener to button
    $("[type='submit']").on('click', handleCitySearch);
});

