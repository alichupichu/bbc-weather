export async function getLatLongWeatherAPIData(lat, lon) {
  rootRefToday.innerHTML = spinner;

  const geolocationButtonRef = document.getElementById("geolocationButton");

  try {
    const data = await getLocation();

    const { lat, lon } = data.coords;

    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=e135612bb4f8e46add41bdebe1c186ab`
    );
    console.log(result.data);

    const { name, max_temp, min_temp, description, dt } = result.data[0];

    const hunamDt = new Date(dt * 1000);

    todayDateRootRef.innerHTML = `${humant.toDateString()}`;
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
getLatLongWeatherAPIData();

geolocationButtonRef.addEventListener("click", (e) => {
  getLatLongWeatherAPIData(e.target.lat, lon);
});
