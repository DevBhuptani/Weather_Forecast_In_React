import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './weatherCard';
import './style.css';
import { Button } from 'react-bootstrap';

const WeatherApp = () => {
  const [searchValue, setSearchValue] = useState('Ahmedabad');
  const [weatherData, setWeatherData] = useState({});

  const fetchWeatherData = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=4f3fe8415e7beeade9da42411b338612`;

      const response = await axios.get(url);
      const data = response.data;

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const newWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setWeatherData(newWeatherInfo);
    } catch (error) {
      console.log('Error fetching weather data: ', error);
      setWeatherData({}); 
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleSearch = () => {
    fetchWeatherData();
  };

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="Search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button className="searchButton" type="button" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>

      <WeatherCard {...weatherData} />
    </>
  );
};

export default WeatherApp;
