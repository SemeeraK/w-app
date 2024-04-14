function searchwheather() {
    var city = document.getElementById("i1").value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5b4bee0ba241d092159faf007e166080`)
        .then(response => response.json())
        .then(data => {
            if (data.cod == 404) {
                errorpage();
            } else {
                displayWeather(data);
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            errorpage();
        });
}




function displayWeather(data) {
    const weatherIcon = document.querySelector('.weather__icon img');
    if (weatherIcon) {
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = data.weather[0].description; // Optional: Set alt text for accessibility
    }

    // Set other weather information
    // Example:
    const temperature = document.querySelector('.weather__temperature.temp');
    if (temperature) {
        temperature.textContent = `${Math.round(data.main.temp - 273.15)}°C`;
    }

    // Set feels like temperature
    const feelsLike = document.querySelector('.weather__realfeel');
    if (feelsLike) {
        feelsLike.textContent = `${Math.round(data.main.feels_like - 273.15)}°C`;
    }

    // Set humidity
    const humidity = document.querySelector('.weather__humidity');
    if (humidity) {
        humidity.textContent = `${data.main.humidity}%`;
    }

    // Set wind speed
    const windSpeed = document.querySelector('.weather__wind');
    if (windSpeed) {
        windSpeed.textContent = `${data.wind.speed} m/s`;
    }

    // Set pressure
    const pressure = document.querySelector('.weather__pressure');
    if (pressure) {
        pressure.textContent = `${data.main.pressure} hPa`;
    }

    // Format sunrise and sunset times
    const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    // Set sunrise and sunset
    document.querySelector('.weather__sunrise').textContent = sunriseTime;
    document.querySelector('.weather__sunset').textContent = sunsetTime;

   

   // Set city name and datetime
   document.querySelector('.weather__city').textContent = data.name;
  document.querySelector('.weather__datetime').textContent = new Date().toLocaleString();
     // Set weather description
     const weatherDescription = document.querySelector('.weather__forecast');
     if (weatherDescription) {
         weatherDescription.textContent = data.weather[0].description;
     }
}

//
function errorpage() {
    const placeholders = document.querySelectorAll('.weather__temperature, .weather__realfeel, .weather__humidity, .weather__wind, .weather__pressure, .weather__visibility, .weather__sunrise, .weather__sunset');
    placeholders.forEach(placeholder => {
        placeholder.textContent = '--';
    });

    document.querySelector('.weather__city').textContent = 'City not found!!';
    document.querySelector('.weather__datetime').textContent = '--';
    document.querySelector('.weather__forecast').textContent = '--';
    document.querySelector('.weather__icon img').src = '';
    document.querySelector('.weather__icon img').alt = '';

}



function keyboard(event) {
    if (event.key === "Enter") {
        searchwheather();
    }
}

window.onload = function () {
    // Call searchwhe function to get weather based on user's location
    searchwheather();
};
