import React, { useState, useEffect } from "react";
import WeatherCard from "./weatherCard";
import "./style.css";
import { Button, Input } from "antd";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("surat");
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=4f3fe8415e7beeade9da42411b338612`;

      let res = await fetch(url);
      let data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  });

  return (
    <>
      <div className="wrap">
        <div className="search">
          <Input
            type="search"
            placeholder="Search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <Button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </Button>
        </div>
      </div>

      <WeatherCard {...tempInfo} />
    </>
  );
};

export default Temp;
