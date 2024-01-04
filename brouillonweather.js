const rootRefToday = document.getElementById("rootToday");
const todayDateRootRef = document.getElementById("todayDateRoot");
const weatherIconRootRef = document.getElementById("weatherIconRoot");
//const todayTempRootRef = document.getElementById("todayTempRoot");
const todayTempMaxRootRef = document.getElementById("todayTempMaxRoot");
const todayTempMinRootRef = document.getElementById("todayTempMinRoot");
const todayDescriptionRootRef = document.getElementById("todayDescriptionRoot");
const todayCityRootRef = document.getElementById("todayCityRoot");

const citySearchInputRef = document.getElementById("citySearchInput");

const spinner = `<div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;

todayDateRootRef.innerHTML = `TODAY`;
//todayTempRootRef.innerHTML = `here goes temp`;
todayTempMaxRootRef.innerHTML = `here goes the max temp`;
todayTempMinRootRef.innerHTML = `here goes the min temp`;
todayDescriptionRootRef.innerHTML = `here goes the description`;
todayCityRootRef.innerHTML = `here goes city Name`;

async function getAPIData(cityname) {
  rootRefToday.innerHTML = spinner;

  try {
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=e135612bb4f8e46add41bdebe1c186ab`
    );
    console.log(result.data);

    const { name, max_temp, min_temp, description, dt } = result.data[0];

    todayDateRootRef.innerHTML = `${dt}`;
    //todayTempRootRef.innerHTML = `${temp}`;
    todayTempMaxRootRef.innerHTML = `${max_temp}`;
    todayTempMinRootRef.innerHTML = `${min_temp}`;
    todayDescriptionRootRef.innerHTML = `${description}`;
    todayCityRootRef.innerHTML = `${name}`;
  } catch (err) {
    rootRefToday.innerHTML = `API down, try again later`;
    todayDateRootRef.innerHTML = `API down, try again later`;
    //todayTempRootRef.innerHTML = `API down, try again later`;
    todayTempMaxRootRef.innerHTML = `API down, try again later`;
    todayTempMinRootRef.innerHTML = `API down, try again later`;
    todayDescriptionRootRef.innerHTML = `API down, try again later`;
    todayCityRootRef.innerHTML = `API down, try again later`;
  }
}

citySearchInputRef.addEventListener("input", (e) => {
  getAPIData(e.target.cityname);
});
