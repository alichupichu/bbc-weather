import { getLocation } from "./location.js";
import { getLatLongWeatherAPIData } from "./lat-lon-data.js";

const rootRefToday = document.getElementById("rootToday");
const todayDateRootRef = document.getElementById("todayDateRoot");
const weatherIconRootRef = document.getElementById("weatherIconRoot");
//const todayTempRootRef = document.getElementById("todayTempRoot");
const todayTempMaxRootRef = document.getElementById("todayTempMaxRoot");
const todayTempMinRootRef = document.getElementById("todayTempMinRoot");
const todayDescriptionRootRef = document.getElementById("todayDescriptionRoot");
const todayCityRootRef = document.getElementById("todayCityRoot");

const citySearchInputRef = document.getElementById("citySearchInput");

const spinner = `<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;

//todayDateRootRef.innerHTML = `TODAY`;
//todayTempRootRef.innerHTML = `here goes temp`;
//todayTempMaxRootRef.innerHTML = `here goes the max temp`;
//todayTempMinRootRef.innerHTML = `here goes the min temp`;
//todayDescriptionRootRef.innerHTML = `here goes the description`;
//todayCityRootRef.innerHTML = `here goes city Name`;

async function getweatherAPIData(cityname) {
  //rootRefToday.innerHTML = spinner;

  try {
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=e135612bb4f8e46add41bdebe1c186ab`
    );

    const { name, dt } = result.data;
    const { temp_max, temp_min } = result.data.main;
    const { description, icon } = result.data.weather[0];

    const humanDt = new Date(dt * 1000);

    //todayDateRootRef.innerHTML = `${humanDt.toDateString()}`;
    //todayTempRootRef.innerHTML = `${temp}`;
    todayTempMaxRootRef.innerHTML = `${Math.round(temp_max)}`;
    todayTempMinRootRef.innerHTML = `${Math.round(temp_min)}`;
    todayDescriptionRootRef.innerHTML = `${description}`;
    todayCityRootRef.innerHTML = `${name}`;
    weatherIconRootRef.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${icon}@2x.png`
    );
    weatherIconRootRef.style.display = "initial";
  } catch (err) {
    console.log(err);
    rootRefToday.innerHTML = `API down, try again later`;
  }
}

citySearchInputRef.addEventListener("input", (e) => {
  getweatherAPIData(e.target.value);
});

// 1. connect html markers with javascript DONE
// 2. check connectors DONE
// 3. fetch the weather data with try and await.
//    check spinner : IT DOESNT WORK
// 4. chech data is connecting =  connection 200
// 5. connect search bar
// 6. create seacrh bar event listeners THIS IS NOT WORKING. APPEARS AS 200 BUT ALSO AS VIOLATION
// 7. display results
// repeat for tommorrow and the day after.
