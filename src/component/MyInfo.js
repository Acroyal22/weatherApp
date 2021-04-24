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
      <main>
        <form className="search-container" onSubmit={search}>
          <input
            type="text"
            placeholder="Search..."
            className="search-bar"
            onChange={(event) => {
              setQuery(event.target.value);

              setParsedQuery(event.target.value.replaceAll(" ", "%20"));
            }}
            value={query}
          />
          <input type="submit" className="search" />
        </form>

        <div className="card">
          {typeof weather.main !== "undefined" ? (
            <div>
              <div className="location-container">
                <div className="location">
                  {weather.name}, {weather?.sys?.country}
                </div>
              </div>
              <img
                src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                alt="weather status icon"
                className="weather-icon"
              />
              <div className="weather-container">
                <div className="temperature">
                  {Math.round(weather.main.temp)}°C
                </div>

                <div className="weather">{weather.weather.main}</div>
              </div>
              <div className="flex">
                <p>Humidity: {weather.main.humidity} %</p>
                <p>Description: {weather.weather[0].main}</p>

                <p>Day: {moment().format("dddd")}</p>
                <p>Date: {moment().format("LL")}</p>
              </div>

              <div className="map">
                <iframe
                  border-radius="10px"
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
      </main>
    </div>
  );
}

export default MyInfo;
