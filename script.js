const apiKey = "51967fcb40fa3bd2b726246ad744d28c"; // Replace with your OpenWeather API key

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            alert("City not found. Please enter a valid city.");
            return;
        }

        document.getElementById("weatherResult").innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <h3>${data.main.temp}°C</h3>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>${data.weather[0].description}</p>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather icon">
        `;
        document.getElementById("weatherResult").style.display = "block";

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Error retrieving weather data. Please try again.");
    }
}
