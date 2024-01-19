const APIKEY = '76aa2136b759e2208b139f0bfa6d762b';
const URLBASE = "https://api.openweathermap.org/data/2.5/weather?";

async function request(url) {
    return fetch(url).then(data => data.json());
}

async function getWeather(lat, lon) {
    const url = `${URLBASE}lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`; // Tuve que agregar "&units=metric" para obtener la temperatura en Celsius
    const weather = await request(url);
    console.log(weather);
    updateDOM(weather.name, weather.main.temp);
}

async function getWeatherByCity(city) {
    const url = `${URLBASE}q=${city}&appid=${APIKEY}&units=metric`; // Agrege "&units=metric" para obtener la temperatura en Celsius
    const weather = await request(url);
    console.log(weather);
    updateDOM(weather.name, weather.main.temp);
}

function updateDOM(city, temp) {
    const cityElement = document.querySelector(".city");
    const tempElement = document.querySelector(".temp");

    cityElement.innerText = city;
    tempElement.innerText = `${temp}ºC`;

    updateBackground(temp);
}

function updateBackground(temperature) {
    const body = document.querySelector("body");


    const coldThreshold = 10;
    const moderateThreshold = 20;

    // Escala la temperatura para ajustarse al degradado
    const scaledTemperature = (temperature - coldThreshold) / (moderateThreshold - coldThreshold);

    const gradientColor = `linear-gradient(to bottom, #ffaf5e, #ffffff ${scaledTemperature * 105}%, #12e5fd)`;
    body.style.background = gradientColor;
}


navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeather(lat, lon);
});

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("change", async function () {
    const city = this.value;
    await getWeatherByCity(city);
});
