import React, { Component, useState } from "react";
import Keys from "./Keys";
import Cards from "./Cards";

const api = {
  key: Keys.API_KEY,
  base: Keys.BASE_URL,
};
const dateBuild = (date) => {
  let time = String(new window.Date());
   time = Date.slice(3, 15);
  return time;
};

function MyInfo() {
  const [query, setQuerry] = useState("");
  const [weather, setWeather] = useState({});

  const search = (event) => {
    event.preventDefault();

    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((response) => response.json())
      .then((result) => {
        setQuerry("");
        setWeather(result);
        console.log(result);
      });
  };
if (weather.cod===404) {
  alert("WRONG STATE")
}
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
            onChange={(event) => setQuerry(event.target.value)}
            value={query}
          
          />
          <input type="submit" className="search" />

        </form>

        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-container">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
            </div>
            <div className="weather-container">
              <div className="temperature">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
            <div className="date">{dateBuild}</div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}
export default MyInfo;
