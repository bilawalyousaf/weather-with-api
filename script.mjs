document.getElementById("weatherForm").addEventListener("submit", getWeather);

async function getWeather(e) {
    e.preventDefault();

    const cityName = document.getElementById("cityName").value;
    const api_key = "628bf0f111087518055f0ea3c9005dd7";

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}`
        );

        const data = response.data;

        // OpenWeatherMap returns temp in Kelvin, convert to Celsius
        const tempC = (data.main.temp - 273.15).toFixed(1);
        const humidity = data.main.humidity;
        const wind = data.wind.speed;
        const description = data.weather[0].description;
        const city = data.name;
        const country = data.sys.country;

        // Display in container like Google format
        document.querySelector(".city").innerText = `${city}, ${country}`;
        document.querySelector(".temp").innerText = `Temperature: ${tempC} °C`;
        document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
        document.querySelector(".wind").innerText = `Wind: ${wind} m/s`;
        document.querySelector(".description").innerText = `Weather: ${description}`;

    } catch (err) {
        alert("City not found! Please enter a valid city name.");
        console.error(err);
    }
}
