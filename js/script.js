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
const feelslike = document.getElementById('feelslike');

const image = document.querySelector('#image');


locationInput.value = 'ottawa'
getData();


searchButton.addEventListener('click',getData);


/**
 * 
 */
function getData(){
    let locationVar = locationInput.value;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    
    fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${locationVar}`, options)
	.then(response => response.json())
	.then(response =>setData(response),
       locationInput.value="",
       
       )
       .catch(err => console.error(err));
    }
    
    
    
    
    
    
    function setData(response){
        console.log('https:'+response.current.condition.icon)
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