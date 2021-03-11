
const API_KEY = "a1dc7392cf7f291da7064ee1d0c90693";
const COORDS = "coords";

function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}


function handleGeoSuccess(position){
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
      latitude,
      longitude
    };
    saveCoords(coordsObj);
}

function handleGeoError(){
  console.log("Can't access geo location");
}

function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}



function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null){
    askForCoords();
  } else{
    //getWeather
  }
}



function init(){
  loadCoords();
}

init();