document.addEventListener("DOMContentLoaded", function () {
  // Debugging: Check if the script is running after DOMContentLoaded event
  console.log("Script is running after DOMContentLoaded event");

  const submitButton = document.getElementById("submit");
  const cityInput = document.getElementById("city");
                                           
  submitButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const city = cityInput.value.trim(); // Trim whitespace from the input
    if (city) {
      try {
        const weatherData = await getWeather(city);
        displayWeatherData(weatherData);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    } else {
      console.error("Please enter a city name.");
    }
  });

  // Initial weather data for default city
  getWeather("Delhi")
    .then(weatherData => displayWeatherData(weatherData))
    .catch(error => console.error("Failed to fetch weather data:", error));

  // Display weather for common cities
  displayCommonCitiesWeather();
});

async function displayWeatherData(weatherData) {
  updateElement("cityName", weatherData.city);

  updateElement("temp", weatherData.temp);
  updateElement("temp2", weatherData.temp);
  updateElement("feels_like", weatherData.feels_like);
  updateElement("humidity", weatherData.humidity);
  updateElement("humidity2", weatherData.humidity);
  updateElement("min_temp", weatherData.min_temp);
  updateElement("max_temp", weatherData.max_temp);
  updateElement("wind_speed", weatherData.wind_speed);
  updateElement("wind_speed2", weatherData.wind_speed);
  updateElement("wind_degrees", weatherData.wind_degrees);
  updateElement("sunrise", weatherData.sunrise);
  updateElement("sunset", weatherData.sunset);
  updateElement("cloud_pct", weatherData.cloud_pct);
}



async function displayCommonCitiesWeather() {
  const cities = ["Pune", "Kolkata", "Aligarh","New York"];

  for (let city of cities) {
    try {
      const weatherData = await getWeather(city);
      addRowToTable(city, weatherData);
    } catch (error) {
      console.error(`Failed to get weather data for ${city}:`, error);
    }
  }
}

async function getWeather(city) {
  const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f3674b3b10msh2a460f4e31e1beep14f302jsnc15176ba14ae",
      "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    data.city = city; // Add city name to the response object
    return data;
  } catch (error) {
    throw error;
  }
}


function addRowToTable(city, weatherData) {
  const tableBody = document.getElementById("some-cities-data");

  const row = document.createElement('tr');

  const cityNameCell = document.createElement('td');
  cityNameCell.textContent = city;
  row.appendChild(cityNameCell);

  const cloudPctCell = document.createElement('td');
  cloudPctCell.textContent = weatherData.cloud_pct;
  row.appendChild(cloudPctCell);

  const tempCell = document.createElement('td');
  tempCell.textContent = weatherData.temp;
  row.appendChild(tempCell);

  const feelsLikeCell = document.createElement('td');
  feelsLikeCell.textContent = weatherData.feels_like;
  row.appendChild(feelsLikeCell);

  const humidityCell = document.createElement('td');
  humidityCell.textContent = weatherData.humidity;
  row.appendChild(humidityCell);

  const minTempCell = document.createElement('td');
  minTempCell.textContent = weatherData.min_temp;
  row.appendChild(minTempCell);

  const maxTempCell = document.createElement('td');
  maxTempCell.textContent = weatherData.max_temp;
  row.appendChild(maxTempCell);

  const windSpeedCell = document.createElement('td');
  windSpeedCell.textContent = weatherData.wind_speed;
  row.appendChild(windSpeedCell);

  const windDegreesCell = document.createElement('td');
  windDegreesCell.textContent = weatherData.wind_degrees;
  row.appendChild(windDegreesCell);

  const sunriseCell = document.createElement('td');
  sunriseCell.textContent = weatherData.sunrise;
  row.appendChild(sunriseCell);

  const sunsetCell = document.createElement('td');
  sunsetCell.textContent = weatherData.sunset;
  row.appendChild(sunsetCell);

  tableBody.appendChild(row);
}

function updateElement(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  } else {
    console.error("Element with ID", id, "not found.");
  }
}
