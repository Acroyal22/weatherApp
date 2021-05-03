import Keys from "./Keys";
import React, { useState } from "react";
import axios from "axios";
import moment from "moment";

const api = {
  key: Keys.API_KEY,
  base: Keys.BASE_URL,
  icon: Keys.REACT_APP_ICON_URL,
};

function MyInfo() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [errMessage, setErrMessage] = useState("");
  const [parsedQuery, setParsedQuery] = useState("");

  const search = (event) => {
    event.preventDefault();
    try {
      axios
        .get(`${api.base}weather?q=${query}&units=metric&APPID=${api.key} `)

        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => {
          setErrMessage(error);
        });
    } catch (err) {
      console.log(err);
      console.log(err.response.data.message);

      setErrMessage(err.response.data.message);
    }

    console.log(weather.main);
  };
  navigator.geolocation.getCurrentPosition(function (position) {
    setLat(position.coords.latitude);
    setLong(position.coords.longitude);
  });
  console.log("Latitude is:", lat);
  console.log("Longitude is:", long);

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 18
            ? "App hot"
            : "App cold"
          : "App"
      }
    >
      {/* <main>
        <div className="container">
          <form className="form" onSubmit={search}>
            <input
              type="text"
              placeholder="Enter city to get weather update...."
              className="form-control"
              onChange={(event) => {
                setQuery(event.target.value);

                setParsedQuery(event.target.value.replaceAll(" ", "%20"));
              }}
              value={query}
            />
            <button type="submit" className="btn btn-success">Search</button>
          </form>

          <div className="card">
            {typeof weather.main !== "undefined" ? (
              <div>
                <div className="location-containe">
                  <div className="locatio">
                    {weather.name}, {weather?.sys?.country}
                  </div>
                </div>
                <img
                  src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                  alt="weather status icon"
                  className="weather-ico"
                />
                <div className="weather-containe">
                  <div className="temperatur">
                    {Math.round(weather.main.temp)}°C
                  </div>

                  <div className="weathe">{weather.weather.main}</div>
                </div>
                <div className="fle">
                  <p>Humidity: {weather.main.humidity} %</p>
                  <p>Description: {weather.weather[0].main}</p>

                  <p>Day: {moment().format("dddd")}</p>
                  <p>Date: {moment().format("LL")}</p>
                </div>
                <div class="container">
                  <div class="row">
                    <div className="col-md-12">
                      <div className="ma">
                        <iframe
                          border-radius="10pxn"
                          height="169px"
                          width="100%"
                          id="gmap_canvas"
                          title="location-map"
                          src={`https://maps.google.com/maps?q=${parsedQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                          frameborder="0"
                          scrolling="no"
                          marginheight="0"
                          marginwidth="0"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              "Wellcome to my weather app"
            )}

            <div className="error">
              {errMessage.length > 0 ? (
                <span style={{ color: "red" }} className="text-danger">
                  {errMessage}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </main> */}



      {/* Section to start my weather app */}
      
    <div class="container">
      <div class="py-5 text-center">
        <img class="d-block mx-auto mb-4" src="https://freepngimg.com/thumb/weather/23648-2-weather-picture.png" alt="" width="150" height="100"/>
        <h2>WEATHER APP</h2>
        <p class="lead">WELCOME TO DARK WEATHER APP.</p>
      </div>


      <div class="row">
        <div class="col-md-4 order-md-2 mb-4">
          <main>
        <div className="container">
          <form className="form" onSubmit={search}>
            <input
              type="text"
              placeholder="Enter city to get weather update...."
              className="form-control"
              onChange={(event) => {
                setQuery(event.target.value);

                setParsedQuery(event.target.value.replaceAll(" ", "%20"));
              }}
              value={query}
            />
            
            <button type="submit" className="btn btn-block btn-success">Search</button>
          </form>

          <div >
            {typeof weather.main !== "undefined" ? (
              <div className="text-center">
                <div className="location-containe">
                  <div className="locatio">
                    {weather.name}, {weather?.sys?.country}
                  </div>
                </div>
                <img
                  src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                  alt="weather status icon"
                  className="weather-ico"
                />
                <div className="weather-containe text-center">
                  <div className="temperatur">
                    {Math.round(weather.main.temp)}°C
                  </div>

                  <div className="weathe">{weather.weather.main}</div>
                </div>
                <div className="fle text-center">
                  <p>Humidity: {weather.main.humidity} %</p>
                  <p>Description: {weather.weather[0].main}</p>

                  <p>Day: {moment().format("dddd")}</p>
                  <p>Date: {moment().format("LL")}</p>
                </div>
                <div class="container">
                  <div class="row">
                    <div className="col-md-12">
                      <div className="ma">
                        <iframe
                          border-radius="10pxn"
                          height="169px"
                          width="100%"
                          id="gmap_canvas"
                          title="location-map"
                          src={`https://maps.google.com/maps?q=${parsedQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                          frameborder="0"
                          scrolling="no"
                          marginheight="0"
                          marginwidth="0"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              "Wellcome to my weather app"
            )}

            <div className="error">
              {errMessage.length > 0 ? (
                <span style={{ color: "red" }} className="text-danger">
                  {errMessage}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </main>
           

          
        </div>
      </div>
    </div>
      {/* Section to end my weather app  */}
    </div>
  );
}

export default MyInfo;
