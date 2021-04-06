//Declaring elements

const btnSearchEl = document.getElementById('btn-search');
const cityNameEl = document.getElementById('city-name');
const historyEl = document.getElementById('history');
const locationEl = document.getElementById('city-location');
const dateEl = document.getElementById('date');
const pEl = document.querySelector('.history');
const currentTemp = document.getElementById('temp');
const windSpeed = document.getElementById('wind');
const humidityEl = document.getElementById('humidity');
const icon = document.getElementById('weather-icon');
const uvIndexEl = document.getElementById('uv-index');


const currentWeather = document.getElementById('current-weather');
const fiveDayWeather = document.querySelector('.five-day-weather')

const hiddenEl = document.querySelectorAll('.hide');
const uvColorEl = document.querySelector('.uv-color');
const introEl = document.getElementById('intro')

const dateOne = document.getElementById('date-one');
const tempOne = document.getElementById('temp-one');
const humidityOne = document.getElementById('humidity-one');

const dateTwo = document.getElementById('date-two');
const tempTwo = document.getElementById('temp-two');
const humidityTwo = document.getElementById('humidity-two');

const dateThree = document.getElementById('date-three');
const tempThree = document.getElementById('temp-three');
const humidityThree = document.getElementById('humidity-three');

const dateFour = document.getElementById('date-four');
const tempFour= document.getElementById('temp-four');
const humidityFour = document.getElementById('humidity-four');

const dateFive = document.getElementById('date-five');
const tempFive = document.getElementById('temp-five');
const humidityFive = document.getElementById('humidity-five');

//Function to convert unix date
function getDate(unixTime){
var date = new Date(unixTime * 1000);
var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();

return `${day}/${month}/${year}`;
}


// function to convert wind speed from meter/sec to Miles Per hour
function windSpeedConvertor(ms){
    return ms * 2.237;
}



// Get the current weather
function getWeather(){

    const apiKey = 'b353740f1229bf52f7b41e34ebefa1c3';


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityNameEl.value}&units=metric&appid=${apiKey}`)
    .then(function (res){
        if (res.status !== 200){
            locationEl.textContent = `${res.status} Error! Please enter a valid city name!!!`;
            for(let x = 0; x < hiddenEl.length; x++){
                        hiddenEl[x].style.display = 'none';
                    } 
                    uvIndexEl.style.display = 'none';
            // console.log(locationEl.textContent);
          }
        return res.json();
    })
    .then(function (data){

       // console.log(data);

        if(data.cod === '404'){
            locationEl.textContent = `Please enter a valid city name!!!`;
            for(let z = 0; z < hiddenEl.length; z++){
                hiddenEl[z].style.display = 'none';
            } 
            uvIndexEl.style.display = 'none';
        }

            locationEl.textContent = data.name + ', ' + data.sys.country + ' ' + getDate(data.dt);


            currentTemp.textContent = `Temperature: ${Math.round(data.main.temp * 10) / 10}`
            humidityEl.textContent = `Humidity: ${data.main.humidity} %`;

            windSpeed.textContent = `Wind Speed: ${Math.round(windSpeedConvertor(data.wind.speed) * 10) / 10} MPH`;

            var iconCode = data.weather[0].icon;

            var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

            const icon = document.getElementById('weather-icon').innerHTML = "<img src= '" + iconUrl + "'>";
    

        
    })
}

// Get UV index
function getUVIndex(){

    const apiKey = 'b353740f1229bf52f7b41e34ebefa1c3';


    fetch(`http://api.weatherstack.com/current?access_key=9594be539e8683b5b06a2ffa39d390ef&query=${cityNameEl.value}`)
    .then(function (response){
        // console.log(res);
        if (response.status !== 200){
            locationEl.textContent = `${response.status} Error! Please enter a valid city name!!!`;
            for(let x = 0; x < hiddenEl.length; x++){
                        hiddenEl[x].style.display = 'none';
                    } 
                    hideEl.style.display = 'none';
            // console.log(locationEl.textContent);
          }
        return response.json();
    })
    .then(function (data){

       // console.log(data);

        
        const uvIndexClassEl = document.querySelector('.uv-index');
        uvIndexClassEl.textContent = 'UV Index: '
        uvIndexEl.textContent = `${data.current.uv_index}`;

        for(let j = 0; j < hiddenEl.length; j++){

            hiddenEl[j].style.display = 'flex';
        }
       
        if(data.current.uv_index >= 0 && data.current.uv_index <= 2){

            uvColorEl.setAttribute('style','background-color:lightgreen; padding: 3px; width:5%; text-align: center;');
        }
        else if (uvIndexEl.textContent >= 3 && uvIndexEl.textContent <= 5){
        
            uvColorEl.setAttribute('style','background-color:yellow; padding: 3px; width:5%; text-align: center;');
        }
        else if (uvIndexEl.textContent >= 6 && uvIndexEl.textContent <= 7){
           
            uvColorEl.setAttribute('style','background-color:orange; padding: 3px; width:5%; text-align: center;');
        }
        else if (uvIndexEl.textContent >= 8 && uvIndexEl.textContent <= 10){
           
            uvColorEl.setAttribute('style','background-color:red; padding: 3px; width:5%; text-align: center;');
        }        
    })
}

//Get 5 days weather forecast
function getWeatherForecast(){

    introEl.style.display = 'none';

    const apiKey = 'b353740f1229bf52f7b41e34ebefa1c3';


    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityNameEl.value}&units=metric&appid=${apiKey}`)
    .then(function (res){
        // console.log(res);
        return res.json();
    })
    .then(function (data){

       // console.log(data);

        for(let i = 4; i < data.list.length; i+=8){
            //console.log(data.list[i]);

            //Get date  for every 8 days
            dateOne.textContent = getDate(data.list[4].dt);
            dateTwo.textContent = getDate(data.list[12].dt);
            dateThree.textContent = getDate(data.list[20].dt);
            dateFour.textContent = getDate(data.list[28].dt);
            dateFive.textContent = getDate(data.list[36].dt);

            //get weather icon for every 8 days
            var iconCode = data.list[4].weather[0].icon;
            var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
            const weatherIconOne = document.getElementById('weather-icon1').innerHTML = "<img src= '" + iconUrl + "'>";

            var iconCode1 = data.list[12].weather[0].icon;
            var iconUrl1= "http://openweathermap.org/img/w/" + iconCode1 + ".png";
            const weatherIconTwo = document.getElementById('weather-icon2').innerHTML = "<img src= '" + iconUrl1 + "'>";

            var iconCode2 = data.list[20].weather[0].icon;
            var iconUrl2 = "http://openweathermap.org/img/w/" + iconCode2 + ".png";
            const weatherIconThree = document.getElementById('weather-icon3').innerHTML = "<img src= '" + iconUrl2 + "'>";

            var iconCode3 = data.list[28].weather[0].icon;
            var iconUrl3 = "http://openweathermap.org/img/w/" + iconCode3 + ".png";
            const weatherIconFour = document.getElementById('weather-icon4').innerHTML = "<img src= '" + iconUrl3 + "'>";

            var iconCode4 = data.list[36].weather[0].icon;
            var iconUrl4 = "http://openweathermap.org/img/w/" + iconCode4 + ".png";
            const weatherIconFive = document.getElementById('weather-icon5').innerHTML = "<img src= '" + iconUrl4 + "'>";

            tempOne.textContent = `Temp: ${Math.round(data.list[4].main.temp_max * 10) /10}`;
            tempTwo.textContent = `Temp: ${Math.round(data.list[12].main.temp_max * 10) /10}`;
            tempThree.textContent = `Temp: ${Math.round(data.list[20].main.temp_max * 10) /10}`;
            tempFour.textContent = `Temp: ${Math.round(data.list[28].main.temp_max * 10) /10}`;
            tempFive.textContent = `Temp: ${Math.round(data.list[36].main.temp_max * 10) /10}`;

            humidityOne.textContent = `Humidity: ${data.list[4].main.humidity}%`;
            humidityTwo.textContent = `Humidity: ${data.list[12].main.humidity}%`;
            humidityThree.textContent = `Humidity: ${data.list[20].main.humidity}%`;
            humidityFour.textContent = `Humidity: ${data.list[28].main.humidity}%`;
            humidityFive.textContent = `Humidity: ${data.list[36].main.humidity}%`;
            
        } 
    })
}

// event listener on button search
// An li element is created to store history cities
btnSearchEl.addEventListener('click', function(event){
    event.preventDefault();

    getWeather();
    getUVIndex();
    getWeatherForecast();

    populateHistory();
    historyBtn();
    
    clearText();

})

const ulEl = document.getElementById('history-list');
let liEl = document.createElement('li');
let cities = {};

let myCity;

function populateHistory(){

    const alert = document.getElementById('alert');
    
    if(!cityNameEl.value){
        
        alert.textContent = "Enter a city!!!";
        return;
    }
    alert.textContent = '';

    let liEl = document.createElement('li');

    liEl.setAttribute('style', 'width: 70%; padding: 5px 10px; border: 2px solid lightgrey; text-transform: capitalize; cursor: pointer; list-style: none; margin: 0 auto;');
   
    cities.push(cityNameEl.value);

    myCity = JSON.stringify(cities);

    localStorage.setItem('city', myCity); 

    for(let i = 0; i < cities.length; i++){
        liEl.textContent =  cities[i];
    }
    ulEl.appendChild(liEl);  

    getLocalStorage();

    liEl.addEventListener('click', function(event){

        event.preventDefault();

        cityNameEl.value = liEl.textContent;
        getWeather();
        getUVIndex();
        getWeatherForecast();
    })
}


function historyBtn(){
    cityNameEl.value = liEl.textContent; 
}

// function to get local storage values
function getLocalStorage(){

    let str = localStorage.getItem('city');
    cities = JSON.parse(str);

    if(!cities){
        cities = []
    }
    liEl.textContent = cities;
    console.log(liEl.textContent);
}

getLocalStorage()



// function to clear text value after search
function clearText(){
    cityNameEl.value = '';
}






