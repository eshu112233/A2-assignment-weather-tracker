const apiKey = "e8b58013388a538db9eff78d04e0ad41";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const weatherInfo = document.getElementById("weatherInfo");
const historyDiv = document.getElementById("history");
const consoleLog = document.getElementById("consoleLog");

let history = [];

function log(msg){
consoleLog.innerHTML += msg + "\n";
}

async function getWeather(city){

log("Sync Start");
log("[ASYNC] Start fetching");

try{

const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
);

if(!response.ok){
throw new Error("City not found");
}

const data = await response.json();

log("[ASYNC] Data received");

displayWeather(data);

addHistory(city);

}
catch(error){

weatherInfo.innerHTML="City not found";

}

log("Sync End");

}

function displayWeather(data){

weatherInfo.innerHTML=`
<p><b>City:</b> ${data.name}</p>
<p><b>Temp:</b> ${data.main.temp} °C</p>
<p><b>Weather:</b> ${data.weather[0].description}</p>
<p><b>Humidity:</b> ${data.main.humidity}%</p>
<p><b>Wind:</b> ${data.wind.speed} m/s</p>
`;

}

function addHistory(city){

if(!history.includes(city)){
history.push(city);
}

historyDiv.innerHTML="";

history.forEach(c=>{

let span=document.createElement("span");

span.textContent=c;

historyDiv.appendChild(span);

});

}

searchBtn.addEventListener("click",()=>{

const city = cityInput.value;

if(city){
getWeather(city);
}

});