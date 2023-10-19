// la clave para usar la api
const API_KEY = 'c6a3ef53032deeff578a40bb5f1192d2';

const fetchData = position => {
    const { latitude, longitude } = position.coords;
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=c6a3ef53032deeff578a40bb5f1192d2`)
        .then(response => response.json())
        .then(data => setWeatherData(data))
}

// cogemos la informacion de la api y las guardamos en variables
const setWeatherData = data => {
    console.log(data);
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