//Codigo para primer bloque de la web, donde localiza donde estas y te da info
const API_KEY = 'c6a3ef53032deeff578a40bb5f1192d2';

const fetchData = position => {
    const { latitude, longitude } = position.coords;
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=c6a3ef53032deeff578a40bb5f1192d2`)
        .then(response => response.json())
        .then(data => setWeatherData(data))
}

// cogemos la informacion de la api y las guardamos en variables
const setWeatherData = data => {
    //console.log(data);
    const weatherData = {
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: Math.floor(data.main.temp),
        date: getDate(),
    }

    Object.keys(weatherData).forEach(key => {
        setTextContent(key, weatherData[key]);
    });

    cleanUp();
}

const cleanUp = () => {
    let container = document.getElementById('container');
    let loader = document.getElementById('loader');

    loader.style.display = 'none';
    container.style.display = 'flex';
}

// conseguimos la fecha
const getDate = () => {
    let date = new Date();
    return `${('0' + (date.getDate())).slice(-2)}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
}


const setTextContent = (element, text) => {
    document.getElementById(element).textContent = text;
}
const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}

//Segundo bloque, donde se consigue info de la ciudad introducida

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "b1d863bf5b901fe997f4fa1e0e93cb13";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();
    let city = cityInput.value;

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);

        }
        catch (error) {
            console.error(error);
            displayError(error);
        }

    } else {
        displayError("Por favor, Introduzca una Ciudad");
    };
});

async function getWeatherData(city) {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("No se pudo conseguir la informacion");

    }
    return await response.json()
}

function displayWeatherInfo(data) {

    //console.log(data);

    const { name: city,
        main: { temp, humidity, feels_like, },
        weather: [{ description, id }] } = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const feels_likeDisplay = document.createElement("p");
    //const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = `Ciudad:  ${city}`;
    tempDisplay.textContent = `Temperatura: ${(temp - 273.15).toFixed(1)} ºC`;
    humidityDisplay.textContent = `Humedad: ${humidity} %`;
    feels_likeDisplay.textContent = `Sensación de: ${(feels_like - 273.15).toFixed(0)} ºC`;
    //descDisplay.textContent = `Condición: ${description}`;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    feels_likeDisplay.classList.add("feels_likeDisplay")
    //descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(feels_likeDisplay);
    //card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);


}

function getWeatherEmoji(weatherId) {

    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈";

        case (weatherId >= 300 && weatherId < 400):
            return "💦";

        case (weatherId >= 500 && weatherId < 600):
            return "🌧";

        case (weatherId >= 600 && weatherId < 700):
            return "❄️";

        case (weatherId >= 700 && weatherId < 800):
            return "🌫";

        case (weatherId === 800):
            return "☀️";

        case (weatherId >= 801 && weatherId < 810):
            return "☁️";

        default:
            return "❓";
    }

}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}