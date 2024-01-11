import { getLocation } from "./location.js";
import { getLatLongWeatherAPIData } from "./lat-lon-data.js";

const weatherIconRootRef = document.getElementById("weatherIconRoot");
const todayTempRootRef = document.getElementById("todayTempRoot");
const todayTempMaxRootRef = document.getElementById("todayTempMaxRoot");
const todayTempMinRootRef = document.getElementById("todayTempMinRoot");
const todayDescriptionRootRef = document.getElementById("todayDescriptionRoot");
const todayCityRootRef = document.getElementById("todayCityRoot");
const cardBackgroundRef = document.getElementById("cardBackground");

const citySearchInputRef = document.getElementById("citySearchInput");

const spinner = `<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;

async function getweatherAPIData(cityname) {
  rootRefToday.innerHTML = spinner;
  try {
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=e135612bb4f8e46add41bdebe1c186ab`
    );

    const { name, dt } = result.data;
    const { temp, temp_max, temp_min } = result.data.main;
    const { main, description, icon } = result.data.weather[0];

    const humanDt = new Date(dt * 1000);

    todayTempRootRef.innerHTML = `${Math.round(temp)}`;
    todayTempMaxRootRef.innerHTML = `${Math.round(temp_max)}`;
    todayTempMinRootRef.innerHTML = `${Math.round(temp_min)}`;
    todayDescriptionRootRef.innerHTML = `${description}`;
    todayCityRootRef.innerHTML = `${name}`;
    weatherIconRootRef.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${icon}@2x.png`
    );
    weatherIconRootRef.style.display = "initial";
    cardBackgroundRef.style.backgroundImage =
      "url(`https://source.unsplash.com/1600x900/?${name},${main}`)";
  } catch (err) {
    console.log(err);
    rootRefToday.innerHTML = `API down, try again later`;
  }
}

citySearchInputRef.addEventListener("input", (e) => {
  getweatherAPIData(e.target.value);
});
