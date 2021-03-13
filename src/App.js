import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'f33a484cf794d08d0148764789aaba32';

const App = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    useEffect(() => {
        if (query) {
            axios.get(URL, {
                params: {
                    q: query,
                    units: 'metric',
                    APPID: API_KEY,
                }
            })
                .then((resp) => {
                    console.log("HERE", resp.data)
                    setWeather(resp.data);
                    return resp.data;
                });
        }
    }, [query]);



    return (
        <div className="main-container">
            <input type="text" className="search" placeholder="Search Weather..." value={query} onChange={(e) => setQuery(e.target.value)} />
            {weather.main && (
                <div className="city">
                    <h2 className="city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <div className="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className="info">
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        <p>{weather.weather[0].description}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;