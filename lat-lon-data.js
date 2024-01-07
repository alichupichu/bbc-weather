import { getLocation } from "./location.js";

const geolocationButtonRef = document.getElementById("geolocationButton");
const rootRefToday = document.getElementById("rootToday");
const spinner = `<div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;

const todayDateRootRef = document.getElementById("todayDateRoot");
const weatherIconRootRef = document.getElementById("weatherIconRoot");
//const todayTempRootRef = document.getElementById("todayTempRoot");
const todayTempMaxRootRef = document.getElementById("todayTempMaxRoot");
const todayTempMinRootRef = document.getElementById("todayTempMinRoot");
const todayDescriptionRootRef = document.getElementById("todayDescriptionRoot");
const todayCityRootRef = document.getElementById("todayCityRoot");

export async function getLatLongWeatherAPIData() {
  console.log(rootRefToday);
  rootRefToday.innerHTML = spinner;

  try {
    const data = await getLocation();
    console.log(data);

    const { latitude, longitude } = data.coords;

    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=e135612bb4f8e46add41bdebe1c186ab`
    );
    console.log(result.data);

    const { name, dt } = result.data;
    const { temp_max, temp_min } = result.data.main;
    const { description, icon } = result.data.weather[0];

    const humanDt = new Date(dt * 1000);

    todayDateRootRef.innerHTML = `${humanDt.toDateString()}`;
    //todayTempRootRef.innerHTML = `${temp}`;
    todayTempMaxRootRef.innerHTML = `${temp_max}`;
    todayTempMinRootRef.innerHTML = `${temp_min}`;
    todayDescriptionRootRef.innerHTML = `${description}`;
    todayCityRootRef.innerHTML = `${name}`;
    weatherIconRootRef.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${icon}@2x.png`
    );
    weatherIconRootRef.style.display = "initial";
  } catch (err) {
    console.log(err);
    //rootRefToday.innerHTML = `API down, try again later`;
    todayDateRootRef.innerHTML = `API down, try again later`;
    //todayTempRootRef.innerHTML = `API down, try again later`;
    todayTempMaxRootRef.innerHTML = `API down, try again later`;
    todayTempMinRootRef.innerHTML = `API down, try again later`;
    todayDescriptionRootRef.innerHTML = `API down, try again later`;
    todayCityRootRef.innerHTML = `API down, try again later`;
  }
}

geolocationButtonRef.addEventListener("click", (e) => {
  getLatLongWeatherAPIData();
});
