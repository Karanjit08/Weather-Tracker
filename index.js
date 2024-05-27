

// function renderWeatherData(data){
//     let temperature = data.main.temp;
//     let weatherUi = document.createElement("p");
//     weatherUi.innerHTML = `
//         <p>Temperature: ${temperature} K</p>`;

//     document.body.appendChild(weatherUi)
// }

// async function getWeatherData(){
//     try{
//         let city = "Gurgaon";
//         let API_KEY = '93f4acc13bb28f05fcdda14f76fc9470'

        
//         let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
//         let data = await response.json();
//         console.log(data);

//         // let temperature = data.main.temp;
//         // let weatherUi = document.createElement("p");
//         // weatherUi.innerHTML = `
//         // <p>Temperature: ${temperature} K</p>
//         // `;
//         // document.getElementById('weatherInfo').appendChild(weatherUi);
//         renderWeatherData(data);
//     }
//     catch(error){
//         console.log(error);
//     }
// }

let API_KEY = '93f4acc13bb28f05fcdda14f76fc9470'

/** 1) USER'S CURRENT LOCATION WEATHER JAVASCRIPT LOGIC **/

var myWeatherHomePageText = document.querySelector(".your-weather");
var searchWeatherHomePageText = document.querySelector(".search-weather");
var myWeatherContent = document.querySelector(".myWeatherContent");
var searchWeatherContent = document.querySelector(".searchWeatherContent");
var loader = document.querySelector("#my-weather-loading");
let divisionElement = document.querySelector(".divison");


/** CURRENT CITY WEATHER PARAMETERS **/
let currentCityElement;
let currentWeatherTypeElement;
let currentTemparatureElement;
let currentWindSpeedElement;
let currentHumidityElement;
let currentWeatherPercentageElement;
let weatherImageElement;
let iconCode;
let weatherUrl;

/** SEARCH CITY WEATHER PARAMETERS **/
let cityNameElement;
let cityWeatherTypeElement;
let cityTemparatureElement;
let cityWindSpeedElement;
let cityHumidityElement;
let cityCloudPercentageElement;
let cityWeatherImgElement;
let cityIconCode;
let cityWeatherUrl;

function changeSearchWeatherPanel(){

    myWeatherHomePageText.style.backgroundColor = "#263f66";
    myWeatherContent.style.display = "none";
    searchWeatherHomePageText.style.backgroundColor = "#768caf";
    searchWeatherContent.style.display = "block";
}

function changeMyWeatherPanel(){
    myWeatherHomePageText.style.backgroundColor = "#768caf";
    myWeatherContent.style.display = "block";
    searchWeatherHomePageText.style.backgroundColor = "#263f66";
    searchWeatherContent.style.display = "none";
}

myWeatherHomePageText.addEventListener('click', function(){
    getCurrentLocation();
    console.log(myWeatherHomePageText);
    console.log(myWeatherContent);
    changeMyWeatherPanel();
    /** CLEARING CURRENT CITY WEAHTER UI **/
    currentCityElement.innerHTML = '';
    currentWeatherTypeElement.innerHTML = '';
    weatherImageElement.innerHTML = '';
    currentTemparatureElement .innerHTML = '';
    currentWindSpeedElement.innerHTML = '';
    currentHumidityElement.innerHTML = '';
    currentWeatherPercentageElement.innerHTML = '';
    divisionElement.style.visibility = 'hidden';

    /** CLEARING SEARCH CITY WEAHTER UI WHEN COMING TO "your weather" TAB **/
    cityNameElement.innerHTML = '';
    cityWeatherTypeElement.innerHTML = '';
    cityTemparatureElement.innerHTML = '';
    cityWindSpeedElement.innerHTML = '';
    cityHumidityElement.innerHTML = '';
    cityCloudPercentageElement.innerHTML = '';
    cityWeatherImgElement.innerHTML = '';
    
})

searchWeatherHomePageText.addEventListener('click',function(){
    console.log(searchWeatherHomePageText);
    console.log(searchWeatherContent);
    changeSearchWeatherPanel();

    /** CLEARING CURRENT CITY WEAHTER UI WHEN COMING TO "search weather" TAB **/
    currentCityElement.innerHTML = '';
    currentWeatherTypeElement.innerHTML = '';
    currentTemparatureElement .innerHTML = '';
    currentWindSpeedElement.innerHTML = '';
    currentHumidityElement.innerHTML = '';
    currentWeatherPercentageElement.innerHTML = '';

    divisionSearchCityElement.style.visibility = 'hidden';

})



/** GETTING USER'S CURRENT LATITUDE & LONGITUDE **/

let currentLatitude = '';
let currentLongitude = '';
function getCurrentLocation(){
    if (navigator.geolocation) {
        loader.classList.add("display");
        navigator.geolocation.getCurrentPosition(function(position) {
          currentLatitude = position.coords.latitude;
          currentLongitude = position.coords.longitude;
          console.log(`Latitude: ${currentLatitude}`);
          console.log(`Longitude: ${currentLongitude}`);
          getCurrentLocationWeather();
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
}

getCurrentLocation();


/** GET WEATHER DATA FROM CURRENT API USING CURRENT LATITUDE & LONGITUDE **/
async function getCurrentLocationWeather(){
    try{
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${currentLatitude}&lon=${currentLongitude}&appid=${API_KEY}`);
        let data = await response.json();
        iconCode =  data.weather[0].icon;
        weatherUrl = setWeatherIconCurrentCity(iconCode);
        console.log(data);
        renderCurrentWeatherData(data);
    }
    catch(error){
        console.log(erorr);
    }
}

// Function to set the weather image based on weather icon
function setWeatherIconCurrentCity(iconCode) {
    const imageUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
    return imageUrl;
}

/** RENDERING CURRENT LOCATION WEATHER DATA INTO THE UI **/
function renderCurrentWeatherData(data){
    let currentCityName = data.name;
    let currentWeatherType = data.weather[0]['main'];
    let currentTemparature = data.main.temp;
    let currentWindSpeed = data.wind.speed;
    let currentHumidity = data.main.humidity;
    let currentWeatherPercentage = data.clouds.all;
    
    divisionElement.style.visibility = 'visible';
    currentTemparature = currentTemparature - 273.15;
    currentTemparature = currentTemparature.toFixed(2);
    let windImgUrl = "assets/wind.png";
    let humidityImgUrl = "assets/humidity.png";
    let cloudsImgUrl = "assets/cloud.png";

    console.log(`Current City: ${currentCityName}`);
    console.log(`Current Weather Type: ${currentWeatherType}`);
    console.log(`Current Temparature: ${currentTemparature}`);
    console.log(`Current Wind Speed: ${currentWindSpeed}`);
    console.log(`Current Humidity: ${currentHumidity}`);
    console.log(`Current Weather Percentage: ${currentWeatherPercentage}`);

    /** MY WEATHER WHOLE CONTAINER WHERE ALL THE CURRENT WEATHER DATA WILL BE COMING **/
    let myWeatherContainerElement = document.querySelector(".myWeatherContent");
    const indiaFlagUrl = "assets/india-flag.png";
    myWeatherContainerElement.style.display = 'flex';
    myWeatherContainerElement.style.flexDirection = 'column';
    myWeatherContainerElement.style.alignItems = 'center';
    

    
    /** MANIPULATING HTML, CSS & RENDERING CURRENT CITY (NAME) WITH DECORATION  **/
    currentCityElement = document.querySelector(".current-city-name");
    const currentCityUiContainer = document.createElement("div");
    currentCityUiContainer.className = "currentCityNameText";
    let currentCityNameUi = document.createElement("p");
    currentCityNameUi.innerHTML = currentCityName
    currentCityUiContainer.appendChild(currentCityNameUi);
    currentCityElement.appendChild(currentCityUiContainer);
    currentCityUiContainer.style.display = 'flex';
    currentCityUiContainer.style.justifyContent = 'space-between';
    let indiaFlagElement = document.createElement("img");
    indiaFlagElement.src = indiaFlagUrl;
    indiaFlagElement.alt = "City Image";
    indiaFlagElement.style.width = "55px";
    currentCityUiContainer.appendChild(indiaFlagElement);

    
    /** MANIPULATING HTML, CSS & RENDERING CURRENT CITY (WEATHER TYPE) WITH DECORATION  **/
    currentWeatherTypeElement = document.querySelector(".current-weather-type");
    let currentCityWeathertextUi = document.createElement("p");
    currentCityWeathertextUi.style.color = "white"
    currentCityWeathertextUi.style.fontSize = '1.5rem';
    currentCityWeathertextUi.innerHTML = currentWeatherType;
    currentWeatherTypeElement.appendChild(currentCityWeathertextUi);
    currentWeatherTypeElement.style.marginTop = '25px';

    /** MANIPULATING HTML, CSS & RENDERING CURRENT CITY (WEATHER TYPE IMAGE) WITH DECORATION  **/
    weatherImageElement = document.querySelector(".current-weather-type-img");
    let currentWeatherImg = document.createElement("img");
    currentWeatherImg.src = weatherUrl;
    currentWeatherImg.alt = "Weather Image";
    currentWeatherImg.style.width = "80px";
    weatherImageElement.style.marginTop = '25px';
    weatherImageElement.appendChild(currentWeatherImg);






    /** MANIPULATING HTML, CSS & RENDERING CURRENT CITY (TEMPARATURE) WITH DECORATION  **/
    currentTemparatureElement = document.querySelector(".current-temp");
    let currentCityTempTextUi = document.createElement("p");
    currentCityTempTextUi.innerHTML = `${currentTemparature} °C`;
    currentCityTempTextUi.style.color = "white";
    currentCityTempTextUi.style.fontSize = '3.2rem';
    currentCityTempTextUi.style.fontFamily = 'bold';
    currentTemparatureElement.appendChild(currentCityTempTextUi);
    currentTemparatureElement.style.marginTop = '20px';


   
    /** HERE DIVISION IS FOR (WINDSPEED, HUMIDITY, CLOUDS) and here I am managing the responsiveness for mobile**/
    divisionElement.style.marginTop = '25px';
    function myFunction(x) {
        if (x.matches) { // If media query matches
            divisionElement.style.width = '200px';
            divisionElement.style.height  = '500px'
            divisionElement.style.flexDirection = "column";
            divisionElement.style.alignItems = "center";
            divisionElement.style.justifyContent = "space-around";
            divisionElement.style.marginBottom = '20px';
        } else {
            divisionElement.style.flexDirection = "row";
            divisionElement.style.width = '600px';
            divisionElement.style.height  = '150px'
            divisionElement.style.marginBottom = '0px';
        }
      }
      
      // Create a MediaQueryList object
      var x = window.matchMedia("(max-width: 767px)")
      
      // Call listener function at run time
      myFunction(x);
      
      // Attach listener function on state changes
      x.addEventListener("change", function() {
        myFunction(x);
      });


    /** MANIPULATING HTML, CSS & RENDERING CURRENT CITY (DIVISION 1 -> WINDSPEED) WITH DECORATION  **/
    currentWindSpeedElement = document.querySelector(".current-wind-speed");
    currentWindSpeedElement.style.width = '180px';
    currentWindSpeedElement.style.height = '150px';
    currentWindSpeedElement.style.backgroundColor = '#768caf';
    currentWindSpeedElement.style.borderRadius = '8px';
    currentWindSpeedElement.style.display = 'flex';
    currentWindSpeedElement.style.flexDirection = "column";
    currentWindSpeedElement.style.justifyContent = 'center';
    currentWindSpeedElement.style.alignItems = 'center';
    let currentWindSpeedImg = document.createElement("img");
    currentWindSpeedImg.src = windImgUrl;
    currentWindSpeedImg.alt = "Wind Image";
    currentWindSpeedImg.style.width = "55px";
    let currentWindSpeedTitle = document.createElement("p");
    currentWindSpeedTitle.innerHTML = 'WINDSPEED';
    currentWindSpeedTitle.style.color = 'white';
    currentWindSpeedTitle.style.fontSize = '1.6rem';
    let currentWindSpeedUi = document.createElement("p");
    currentWindSpeedUi.innerHTML = `${currentWindSpeed} m/s`
    currentWindSpeedUi.style.color = 'white';
    currentWindSpeedUi.style.fontSize = '1.4rem';
    currentWindSpeedUi.style.marginTop = '5px';
    currentWindSpeedElement.appendChild(currentWindSpeedImg);
    currentWindSpeedElement.appendChild(currentWindSpeedTitle);
    currentWindSpeedElement.appendChild(currentWindSpeedUi);




     /** MANIPULATING HTML, CSS & RENDERING CURRENT CITY (DIVISION 2 -> HUMIDITY) WITH DECORATION  **/
    currentHumidityElement = document.querySelector(".current-humidity");
    currentHumidityElement.style.width = '180px';
    currentHumidityElement.style.height = '150px';
    currentHumidityElement.style.backgroundColor = '#768caf';
    currentHumidityElement.style.borderRadius = '8px';
    currentHumidityElement.style.display = 'flex';
    currentHumidityElement.style.flexDirection = "column";
    currentHumidityElement.style.justifyContent = 'center';
    currentHumidityElement.style.alignItems = 'center';
    let currentHumidityImg = document.createElement("img");
    currentHumidityImg.src = humidityImgUrl;
    currentHumidityImg.alt = "Humidity Image";
    currentHumidityImg.style.width = "55px";
    let currentHumidityTitle = document.createElement("p");
    currentHumidityTitle.innerHTML = 'HUMIDITY';
    currentHumidityTitle.style.color = 'white';
    currentHumidityTitle.style.fontSize = '1.6rem';
    let currentHumidityUi = document.createElement("p");
    currentHumidityUi.innerHTML = `${currentHumidity} %`;
    currentHumidityUi.style.color = 'white';
    currentHumidityUi.style.fontSize = '1.4rem';
    currentHumidityUi.style.marginTop = '5px';
    currentHumidityElement.appendChild(currentHumidityImg);
    currentHumidityElement.appendChild(currentHumidityTitle);
    currentHumidityElement.appendChild(currentHumidityUi);



    /** MANIPULATING HTML, CSS & RENDERING CURRENT CITY (DIVISION 3 -> CLOUDS) WITH DECORATION  **/
    currentWeatherPercentageElement = document.querySelector(".current-weather-percentage");
    currentWeatherPercentageElement.style.width = '180px';
    currentWeatherPercentageElement.style.height = '150px';
    currentWeatherPercentageElement.style.backgroundColor = '#768caf';
    currentWeatherPercentageElement.style.borderRadius = '8px';
    currentWeatherPercentageElement.style.display = 'flex';
    currentWeatherPercentageElement.style.flexDirection = "column";
    currentWeatherPercentageElement.style.justifyContent = 'center';
    currentWeatherPercentageElement.style.alignItems = 'center';
    let currentWeatherPercentageImg = document.createElement("img");
    currentWeatherPercentageImg.src = cloudsImgUrl;
    currentWeatherPercentageImg.alt = "Cloud Image";
    currentWeatherPercentageImg.style.width = "55px";
    let currentWeatherPercentageTitle = document.createElement("p");
    currentWeatherPercentageTitle.innerHTML = 'CLOUDS';
    currentWeatherPercentageTitle.style.color = 'white';
    currentWeatherPercentageTitle.style.fontSize = '1.6rem';
    let currentWeatherPercentageUi = document.createElement("p");
    currentWeatherPercentageUi.innerHTML = `${currentWeatherPercentage} %`;
    currentWeatherPercentageUi.style.color = 'white';
    currentWeatherPercentageUi.style.fontSize = '1.4rem';
    currentWeatherPercentageUi.style.marginTop = '5px';
    currentWeatherPercentageElement.appendChild(currentWeatherPercentageImg);
    currentWeatherPercentageElement.appendChild(currentWeatherPercentageTitle);
    currentWeatherPercentageElement.appendChild(currentWeatherPercentageUi);

    loader.classList.remove("display");
}




/** 2) SEARCH WEATHER JAVASCRIPT LOGIC **/

let inputFieldCityText = document.querySelector(".input-field");
let searchBtnElement = document.querySelector(".search-btn");
let cityName;
let cityLoader = document.querySelector("#city-weather-loading");
let cityNotFoundElement = document.querySelector(".city-weather-not-found");
let divisionSearchCityElement = document.querySelector(".division-search-city");



/** CALLING THE API FUNCTION getCityWeather() BY CLICKING IN THE SEARCH BTN **/
searchBtnElement.addEventListener('click',()=>{
    cityLoader.classList.add("display");
    console.log(`CITY NAME SEARCHED: ${inputFieldCityText.value}`);
    cityName = inputFieldCityText.value;
    inputFieldCityText.value = '';

    getCityWeather();
    
})

/** GET SEARCH WEATHER DATA FROM CITY WEATHER API USING CITY NAME **/
async function getCityWeather(){
    try{
        let responseWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`);
        let dataWeather = await responseWeather.json();
        console.log(dataWeather);
        let statusCode = dataWeather.cod;
        if(statusCode==200){
            console.log(`STATUS CODE: ${statusCode}`);
            cityNotFoundElement.classList.remove("display");
            cityIconCode =  dataWeather.weather[0].icon;
            cityWeatherUrl = setWeatherIconSearchCity(cityIconCode);
            console.log(`CITY ICON CODE: ${cityIconCode}`);
            console.log(`CITY WEATHER URL: ${cityWeatherUrl}`);
            renderCityWeatherData(dataWeather);
        }
        else{
            console.log(`STATUS CODE: ${statusCode}`);
            cityLoader.classList.remove("display");
            cityNotFoundElement.classList.add("display");
            cityNameElement.innerHTML = '';
            cityWeatherTypeElement.innerHTML = '';
            cityTemparatureElement.innerHTML = '';
            cityWindSpeedElement.innerHTML = '';
            cityHumidityElement.innerHTML = '';
            cityCloudPercentageElement.innerHTML = '';
            divisionSearchCityElement.style.visibility = 'hidden';
            cityWeatherImgElement.innerHTML = '';
        }
    }
    catch(error){
        console.log(error);
    }
}

// Function to set the weather image based on weather icon
function setWeatherIconSearchCity(cityIconCode) {
    const imageUrl2 = `http://openweathermap.org/img/w/${cityIconCode}.png`;
    return imageUrl2;
}

/** RENDERING THE CITY WEATHER DATA INTO THE UI **/
function renderCityWeatherData(dataWeather){
    let searchCityName = dataWeather.name;
    let cityWeatherType = dataWeather.weather[0]['main'];
    let cityTemparature = dataWeather.main.temp;
    let cityWindSpeed = dataWeather.wind.speed;
    let cityHumidity = dataWeather.main.humidity;
    let cityCloudPercentage = dataWeather.clouds.all;
    divisionSearchCityElement.style.visibility = 'visible';
    cityTemparature = cityTemparature - 273.15;
    cityTemparature = cityTemparature.toFixed(2);

    let windImgUrl = "assets/wind.png";
    let humidityImgUrl = "assets/humidity.png";
    let cloudsImgUrl = "assets/cloud.png";
    // let searchStatusCode = dataWeather.cod;





    


    console.log(`CITY NAME: ${searchCityName}`);
    console.log(`CITY WEATHER TYPE: ${cityWeatherType}`);
    console.log(`CITY TEMPARATURE: ${cityTemparature}`);
    console.log(`CITY WIND SPEED: ${cityWindSpeed}`);
    console.log(`CITY HUMIDITY: ${cityHumidity}`);
    console.log(`CITY CLOUD PERCENTAGE: ${cityCloudPercentage}`);
    // console.log(`STAUTUS CODE: ${searchStatusCode}`);




     /** MANIPULATING HTML, CSS & RENDERING SEARCH CITY (NAME) WITH DECORATION  **/
    cityNameElement = document.querySelector(".city-name");
    cityNameElement.innerHTML = '';
    let cityNameUi = document.createElement("p");
    cityNameUi.innerHTML = searchCityName;
    cityNameUi.style.color = 'white';
    cityNameUi.style.fontSize = '2.2rem';
    cityNameElement.appendChild(cityNameUi);



     /** MANIPULATING HTML, CSS & RENDERING SEARCH CITY (WEATHER TYPE) WITH DECORATION  **/
    cityWeatherTypeElement = document.querySelector(".city-weather-type");
    cityWeatherTypeElement.innerHTML = '';
    let cityWeatherTypeUi = document.createElement("p");
    cityWeatherTypeUi.innerHTML = cityWeatherType;
    cityWeatherTypeUi.style.color = 'white';
    cityWeatherTypeUi.style.fontSize = '1.5rem';
    cityWeatherTypeElement.appendChild(cityWeatherTypeUi);
    cityWeatherTypeElement.style.marginTop = '20px';


    /** MANIPULATING HTML, CSS & RENDERING SEARCH CITY (WEATHER TYPE IMAGE) WITH DECORATION  **/
    cityWeatherImgElement = document.querySelector(".city-weather-type-img");
    cityWeatherImgElement.innerHTML = '';
    let cityWeatherImg = document.createElement("img");
    cityWeatherImg.src = cityWeatherUrl;
    cityWeatherImg.alt = "Weather Image";
    cityWeatherImg.style.width = "80px";
    cityWeatherImgElement.style.marginTop = '20px';
    cityWeatherImgElement.appendChild(cityWeatherImg);




    /** MANIPULATING HTML, CSS & RENDERING SEARCH CITY (TEMPARATURE) WITH DECORATION  **/
    cityTemparatureElement = document.querySelector(".city-temp");
    cityTemparatureElement.innerHTML = '';
    let cityTemparatureUi = document.createElement("p");
    cityTemparatureUi.innerHTML = `${cityTemparature} °C`;
    cityTemparatureUi.style.color = 'white';
    cityTemparatureUi.style.fontSize = '3.2rem';
    cityTemparatureUi.style.fontFamily = 'bold';
    cityTemparatureElement.appendChild(cityTemparatureUi);
    cityTemparatureElement.style.marginTop = '20px';


    /** HERE DIVISION FOR SEARCH CITY IS FOR (WINDSPEED, HUMIDITY, CLOUDS) and here I am managing the responsiveness for mobile**/
    divisionSearchCityElement.style.marginTop = '25px';
    function myFunction2(x2) {
        if (x2.matches) { // If media query matches
            divisionSearchCityElement.style.width = '200px';
            divisionSearchCityElement.style.height  = '500px'
            divisionSearchCityElement.style.flexDirection = "column";
            divisionSearchCityElement.style.alignItems = "center";
            divisionSearchCityElement.style.justifyContent = "space-around";
            divisionSearchCityElement.style.marginBottom = '20px';
        } else {
            divisionSearchCityElement.style.flexDirection = "row";
            divisionSearchCityElement.style.justifyContent = "space-around";
            divisionSearchCityElement.style.width = '600px';
            divisionSearchCityElement.style.height  = '150px'
            divisionSearchCityElement.style.marginBottom = '0px';
        }
      }
      
      // Create a MediaQueryList object
      var x2 = window.matchMedia("(max-width: 767px)")
      
      // Call listener function at run time
      myFunction2(x2);
      
      // Attach listener function on state changes
      x2.addEventListener("change", function() {
        myFunction2(x2);
      });


    /** MANIPULATING HTML, CSS & RENDERING SEARCH CITY (DIVISION 1 -> WINDSPEED) WITH DECORATION  **/
    cityWindSpeedElement = document.querySelector(".city-wind-speed");
    cityWindSpeedElement.style.width = '180px';
    cityWindSpeedElement.style.height = '150px';
    cityWindSpeedElement.style.backgroundColor = '#768caf';
    cityWindSpeedElement.style.borderRadius = '8px';
    cityWindSpeedElement.style.display = 'flex';
    cityWindSpeedElement.style.flexDirection = "column";
    cityWindSpeedElement.style.justifyContent = 'center';
    cityWindSpeedElement.style.alignItems = 'center';
    cityWindSpeedElement.innerHTML = '';
    let searchCityWindImg = document.createElement("img");
    searchCityWindImg.src = windImgUrl;
    searchCityWindImg.alt = "Wind Image";
    searchCityWindImg.style.width = "55px";
    let searchCityWindTitle = document.createElement("p");
    searchCityWindTitle.innerHTML = 'WINDSPEED';
    searchCityWindTitle.style.color = 'white';
    searchCityWindTitle.style.fontSize = '1.6rem';
    let cityWindSpeedUi = document.createElement("p");
    cityWindSpeedUi.innerHTML = `${cityWindSpeed} m/s`;
    cityWindSpeedUi.style.color = 'white';
    cityWindSpeedUi.style.fontSize = '1.4rem';
    cityWindSpeedUi.style.marginTop = '5px';
    cityWindSpeedElement.appendChild(searchCityWindImg);
    cityWindSpeedElement.appendChild(searchCityWindTitle);
    cityWindSpeedElement.appendChild(cityWindSpeedUi);


    /** MANIPULATING HTML, CSS & RENDERING SEARCH CITY (DIVISION 2 -> HUMIDITY) WITH DECORATION  **/
    cityHumidityElement = document.querySelector(".city-humidity");
    cityHumidityElement.style.width = '180px';
    cityHumidityElement.style.height = '150px';
    cityHumidityElement.style.backgroundColor = '#768caf';
    cityHumidityElement.style.borderRadius = '8px';
    cityHumidityElement.style.display = 'flex';
    cityHumidityElement.style.flexDirection = "column";
    cityHumidityElement.style.justifyContent = 'center';
    cityHumidityElement.style.alignItems = 'center';
    cityHumidityElement.innerHTML = '';
    let cityHumidityImg = document.createElement("img");
    cityHumidityImg.src = humidityImgUrl;
    cityHumidityImg.alt = "Wind Image";
    cityHumidityImg.style.width = "55px";
    let cityHumidityTitle = document.createElement("p");
    cityHumidityTitle.innerHTML = 'HUMIDITY';
    cityHumidityTitle.style.color = 'white';
    cityHumidityTitle.style.fontSize = '1.6rem';
    let cityHumidityUi = document.createElement("p");
    cityHumidityUi.innerHTML = `${cityHumidity} %`;
    cityHumidityUi.style.color = 'white';
    cityHumidityUi.style.fontSize = '1.4rem';
    cityHumidityUi.style.marginTop = '5px';
    cityHumidityElement.appendChild(cityHumidityImg);
    cityHumidityElement.appendChild(cityHumidityTitle);
    cityHumidityElement.appendChild(cityHumidityUi);

    /** MANIPULATING HTML, CSS & RENDERING SEARCH CITY (DIVISION 3 -> CLOUD PERCENTAGE) WITH DECORATION  **/
    cityCloudPercentageElement = document.querySelector(".city-weather-percentage");
    cityCloudPercentageElement.style.width = '180px';
    cityCloudPercentageElement.style.height = '150px';
    cityCloudPercentageElement.style.backgroundColor = '#768caf';
    cityCloudPercentageElement.style.borderRadius = '8px';
    cityCloudPercentageElement.style.display = 'flex';
    cityCloudPercentageElement.style.flexDirection = "column";
    cityCloudPercentageElement.style.justifyContent = 'center';
    cityCloudPercentageElement.style.alignItems = 'center';
    cityCloudPercentageElement.innerHTML = '';
    let cloudCityImg = document.createElement("img");
    cloudCityImg.src = cloudsImgUrl;
    cloudCityImg.alt = "Wind Image";
    cloudCityImg.style.width = "55px";
    let cityCloudTitle = document.createElement("p");
    cityCloudTitle.innerHTML = 'CLOUDS';
    cityCloudTitle.style.color = 'white';
    cityCloudTitle.style.fontSize = '1.6rem';
    let cityCloudPercentageUi = document.createElement("p");
    cityCloudPercentageUi.innerHTML = `${cityCloudPercentage} %`;
    cityCloudPercentageUi.style.color = 'white';
    cityCloudPercentageUi.style.fontSize = '1.4rem';
    cityCloudPercentageUi.style.marginTop = '5px';
    cityCloudPercentageElement.appendChild(cloudCityImg);
    cityCloudPercentageElement.appendChild(cityCloudTitle);
    cityCloudPercentageElement.appendChild(cityCloudPercentageUi);

    cityLoader.classList.remove("display");

}

  


