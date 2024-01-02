const rootRefToday = document.getElementById("rootToday");
const todayDateRootRef = document.getElementById("todayDateRoot");
const weatherIconRootRef = document.getElementById("weatherIconRoot");
const todayTempRootRef = document.getElementById("todayTempRoot");
const todayTempMaxRootRef = document.getElementById("todayTempMaxRoot");
const todayTempMinRootRef = document.getElementById("todayTempMinRoot");
const todayDescriptionRootRef = document.getElementById("todayDescriptionRoot");
const todayCityRootRef = document.getElementById("todayCityRoot");

const citySearchInputRef = document.getElementById("citySearchInput");

import { getLocation } from "./location.js";

const spinner = `<div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;

todayDateRootRef.innerHTML = `TODAY`;
todayTempRootRef.innerHTML = `here goes temp`;
todayTempMaxRootRef.innerHTML = `here goes the max temp`;
todayTempMinRootRef.innerHTML = `here goes the min temp`;
todayDescriptionRootRef.innerHTML = `here goes the description`;
todayCityRootRef.innerHTML = `here goes city Name`;

async function getAPIData(value) {
  const result = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather?q=${name}&&units=metric&appid=e135612bb4f8e46add41bdebe1c186ab"
  );

  let { name, temp_min, temp_max, dt } = result.data[0];
}

citySearchInputRef.addEventListener("input", (e) => {
  getAPIData(e.target.value);
});

async function getWeatherData(lat, lon) {
  //begin spinner
  todayDateRootRef.innerHTML = spinner;

  try {
    const data = await getLocation();

    const { name } = result.data.sys;

    const coordsFromAPI = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=e135612bb4f8e46add41bdebe1c186ab"
    );

    console.log(coordsFromAPI);

    const { lat, lon } = coordsFromAPI.data[0];

    const result = await axios.get(
      "https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=e135612bb4f8e46add41bdebe1c186ab"
    );

    const { dt } = result.data.sys;
    const humanFormatDate = new Date(date * 1000);

    todayDateRootRef.innerHTML = `Today is ${humanFormatDate.toTimeString}`;
  } catch (error) {
    todayDateRootRef.innerHTML = `Sorry! API down, try again later`;
  }
}

getWeatherData();

// 1. connect html markers with javascript DONE
// 2. check connectors DONE
// 3. fetch the weather data with try and await.
//    check spinner : IT DOESNT WORK
// 4. chech data is connecting =  connection 200
// 5. connect search bar
// 6. create seacrh bar event listeners THIS IS NOT WORKING. APPEARS AS 200 BUT ALSO AS VIOLATION
// 7. display results
// repeat for tommorrow and the day after.
