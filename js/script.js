import API_KEY from "./apikey.js";

const locationInput = document.getElementById('location-input')
const searchButton = document.getElementById('btn');
const location = document.getElementById('location');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const wind = document.getElementById('wind');
const humidity = document.getElementById('humidity');
const presure = document.getElementById('presure');
const visibility = document.getElementById('visibility');
const uv = document.getElementById('uv');
const feelslike = document.getElementById('feel');
const forecast = document.getElementById("forecast-wrapper")
const image = document.querySelector('#image');
const dayBtns = document.getElementById("day-btns");


locationInput.value = 'ottawa'
getData();


searchButton.addEventListener('click',getData);

 function getData(){
     let locationVar = locationInput.value;
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1a1dd8d20amsh9f57cb9363b78d2p1d9416jsnef806e1b3281',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};

fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${locationVar}&days=7`, options)
	.then(response => response.json())
	.then(
        response => {
            
            console.log(response)
            setData(response)
        }
        
        )
	.catch(err => console.error(err));


}
    
    
    
    
    
    
    function setData(response){

        let hours = response.forecast.forecastday[1].hour
        let day = "";
        
        for(let i = 0;i<hours.length;i++){
            
            const epoch = hours[i].time_epoch;
            const date = new Date(epoch * 1000);
            const hour = date.getHours().toString().padStart(2,0); // returns the time in local time zone
            const minutes = date.getMinutes();
            const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            day = dayNames[date.getDay()]
            
            forecast.innerHTML+=(` <div class="forecast_item d-flex flex-column justify-content-between">
            <div class="t-temp">${hours[i].temp_c} &#176;C</div>
            <img src="https:${hours[i].condition.icon}" alt="" id="t-image">
            <div class="t-wind">${hours[i].wind_kph} km/h</div>
            <div class="t-hour">${hour}:${minutes}0</div>
            </div>`)
        }

        locationInput.value = "";
        if(response.current!=null){
        location.innerText = `${response.location.name},${response.location.region},${response.location.country}`,
        location.classList.add('text-warning')
        location.classList.remove('text-danger')
        image.src = 'https:'+response.current.condition.icon; 
        temperature.innerText = response.current.temp_c +' °C'
        condition.innerText = response.current.condition.text
        wind.innerText = `${response.current.wind_kph} KM/H`
        humidity.innerText = `${response.current.humidity} %`
        presure.innerText = `${response.current.pressure_in} kPa`
        visibility.innerText = `${response.current.vis_km} kph`
        uv.innerText  = `${response.current.uv}`
        feelslike.innerText = `${response.current.feelslike_c} °C`
        }
        
        else{
        location.innerText = response.error.message;
        location.classList.add('text-danger')
        location.value = "Location is missing"
        temperature.innerText = ''
        condition.innerText = ''
        wind.innerText = ''
        humidity.innerText = ''
        presure.innerText = ''
        visibility.innerText = ''
        uv.innerText  = ''
        feelslike.innerText = ''
        }
    }