const weatherAPI = "596fd2b39a8f6c88b0462b3b20ca7ef3"; //BC-weather-dashboard
//const getCoordsAPI = `http://api.openweathermap.org/geo/1.0/direct?q=$${city}&appid=${API}`
// const baseURL = "https://api.openweathermap.org/data/2.5/weather?q="; //this may be wrong
// const baseURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API}`; 
// const queryURL = baseURL.concat(`${city}&appid=${weatherAPI}`); //THIS MAY BE WRONG

// ---------- CITY SEARCH ------------

function handleCitySearch(event) {
    event.preventDefault();

    if (!city) {
        alert('Must enter city name');
    } else {
        renderLocationHistory();
        renderCurrWeather();
        renderForecastCards();
    }
}

function getLocationHistory() {
    // const cities = [];
    // if (localStorage.length !== 0) {
    //     cities = localStorage.parse("cities");
    // }
    // const city = $('#city').val().trim();
    // // alerts user until a city is entered

    //     //store city input to local storage aka the history
        
    //     localStorage.setItem("cities", city);
}

// TODO:
function renderLocationHistory() {
    console.log(`enter render location history`);
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

// --------------- ON LOAD ---------------

$(document).ready(function () {
        console.log(`enter document ready function`);

        // render location history
        renderLocationHistory();

        // add event listener to button
        $("[type='submit']").on('click', handleCitySearch);
    
        // load current city weather
        renderCurrWeather();

        // load 5-day forecast
        renderForecastCards();
    });

