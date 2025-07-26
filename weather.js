const searchFields = document.querySelector('.searchInput');
const searchBtn = document.querySelector('.searchBtn');
const container = document.querySelector('.weatherInfo');


const apiKey = "af4a1f794a5449886b32f6e9541ec4fa";
async function getWeather(){
    const city = searchFields.value;
    if(!city){
        return alert('Please enter a city name');
    }
    container.innerHTML = `<p>⏳ Fetching weather info for <strong>${city}</strong>...</p>`;
    try{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        if(!response.ok){
            throw new Error("Couldn't Fetch data. Please try again later");
        };
        const data = await response.json();
        console.log(data);
        const countryCode = data.sys.country;
        const utcTime = data.dt * 1000;
        const offsetInMs = data.timezone * 1000;
        const localTime = new Date(utcTime + offsetInMs);
        const temp = data.main.temp;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const description = data.weather[0].description;
        const iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        const sunrise = new Date((data.sys.sunrise + data.timezone) * 1000);
        const sunset = new Date((data.sys.sunset + data.timezone) * 1000);
        

    
        
        container.innerHTML = `
            <h1>🌍${city.charAt(0).toUpperCase() + city.slice(1)}, ${countryCode}</h1>
            <p>🕒Time: ${localTime.toUTCString().split(' ')[4]}</p>
            <p>🌡️Temperature: ${temp}°C</p>
            <p>💧Humidity: ${humidity}%</p>
            <p>🌬️Wind Speed: ${windSpeed} m/s</p>
            <p>📋Description: ${description} <img src="${iconURL}" alt="${description}" /></p>
            <p>🌅Sunrise: ${sunrise.toLocaleTimeString()}</p>
            <p>🌇Sunset: ${sunset.toLocaleTimeString()}</p>
        `;

        searchFields.value = "";


    }catch(e){
        container.innerHTML = `<p style="color:red;">❌ ${e.message}</p>`;
        console.error(e.message)
    }
}



searchBtn.addEventListener('click', () => {
    getWeather();
})