import React, { useEffect, useState } from "react";
import "./Navbar.css";
import axios from "axios";
import cityImage from "../../../assets/city.jpeg";
import hazeImage from "../../../assets/haze.jpeg";

const Navbar = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const cityInputHandler = (e) => {
    setCity(e.target.value);
  };
  const searchHandler = async () => {
    try {
      const apiKey = "75cacba4f3e58c332d166466184ae561";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
    setCity("");
  };

  console.log(weatherData);

  return (
    <div>
      <div>
        <nav className="navbar">
          <div className="container-fluid">
            <a className="navbar-brand logo-name">Weather</a>
            <form className="d-flex col-4" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Type city name "
                aria-label="Search"
                onChange={cityInputHandler}
                value={city}
              />
              <button
                className="btn btn-outline-success col-4"
                type="button"
                onClick={searchHandler}
              >
                Get Weather
              </button>
            </form>
          </div>
        </nav>
      </div>
      <div>
        {weatherData && (
          <div className="weather-details">
            <h2 className="city-details">
              <img
                src={cityImage}
                alt=""
                style={{ width: "100px", height: "100px" }}
              />
              {weatherData.name}
            </h2>
            <p className="city-details">
              <img
                src={hazeImage}
                alt=""
                style={{ width: "60px", height: "60px" }}
              />

              {weatherData.weather[0].description}
            </p>
            <p className="city-details">
              <img
                src={hazeImage}
                alt=""
                style={{ width: "60px", height: "60px" }}
              />
              Temperature: {weatherData.main.temp}°C
            </p>
            <p className="city-details">
              <img
                src={hazeImage}
                alt=""
                style={{ width: "60px", height: "60px" }}
              />
              Humidity: {weatherData.main.humidity}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
