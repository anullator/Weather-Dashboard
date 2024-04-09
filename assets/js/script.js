const weatherAPI = "596fd2b39a8f6c88b0462b3b20ca7ef3"; //BC-weather-dashboard
const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";

// ---------- CITY SEARCH ---------------

TODO: 
function handleCitySearch() {
    //store city input to local storage aka the history
    // const city;
    // const state;
    // const country;

    // const queryURL = baseURL.concat(`${city}, ${state}, ${country}&appid=${weatherAPI}`);

}

TODO:
function renderLocationHistory() {
    
}

// ------------ CURRENT WEATHER -------------

function renderCurrWeather() {

}

// ------------ 5 DAY FORECAST -------------

// creates card for each day of 5 day forecast
function createForecastCard() {
    // create elements

    // add child elements to container element

    // add container to the DOM

}

// renders 5 day forecast
function renderForecastCards() {
    // delete existing forecast cards

    // create loop

        // add content to child elements

        // add '.card' class to container

}

// --------------- ON LOAD ---------------

$(document).ready(function () {

        // render location history
        renderLocationHistory();

        // add event listener to button
        $("[type='submit']").on('click', handleCitySearch);
    
        // load current city weather
        renderCurrWeather();

        // load 5-day forecast
        renderForecastCards();
    });

