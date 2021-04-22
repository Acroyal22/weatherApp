import React, { useState } from "react";
import Keys from "./Keys";
import axios from "axios";

const api = {
  key: Keys.API_KEY,
  base: Keys.BASE_URL,
};

const dateString = Date().toString();

function MyInfo() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [errMessage, setErrMessage] = useState("");

  const search = (event) => {
    event.preventDefault();
    try {
      axios
        .get(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
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
  navigator.geolocation.getCurrentPosition(function(position) {
    setLat(position.coords.latitude);
    setLong(position.coords.longitude);
  });
  console.log("Latitude is:", lat)
  console.log("Longitude is:", long)
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
            onChange={(event) => setQuery(event.target.value)}
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
              <div className="weather-container">
                <div className="temperature">
                  {Math.round(weather.main.temp)}°C
                </div>
                <div className="weather">{weather.weather.main}</div>
              </div>
              <div className="date">Current Time :{dateString}</div>
            </div>
          ) : (
            "this is working"
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
