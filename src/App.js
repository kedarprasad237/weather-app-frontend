import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isCelsius, setIsCelsius] = useState(true);
  const [backgroundClass, setBackgroundClass] = useState('default');


  const convertTemperature = (temp) => {
    if (isCelsius) {
      return Math.round(temp);
    } else {
      return Math.round((temp * 9/5) + 32);
    }
  };

  
  const getTemperatureUnit = () => isCelsius ? '°C' : '°F';

  
  const setWeatherBackground = (icon) => {
    if (!icon) return;
    
    const iconCode = icon.substring(0, 2);
    if (iconCode === '01' || iconCode === '02') {
      setBackgroundClass('sunny');
    } else if (iconCode === '03' || iconCode === '04') {
      setBackgroundClass('cloudy');
    } else if (iconCode === '09' || iconCode === '10' || iconCode === '11') {
      setBackgroundClass('rainy');
    } else if (iconCode === '13') {
      setBackgroundClass('snowy');
    } else if (iconCode === '50') {
      setBackgroundClass('foggy');
    } else {
      setBackgroundClass('default');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      const response = await axios.get(`${API_BASE_URL}/api/weather/${city.trim()}`);
      setWeatherData(response.data);
      setWeatherBackground(response.data.icon);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || err.response.data.error || 'An error occurred');
      } else {
        setError('Unable to connect to the weather service. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
    if (error) setError('');
  };

  const toggleTemperature = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <div className={`App ${backgroundClass}`}>
      <div className="app-container">
        <div className="main-content">
          <header className="header">
            <h1 className="app-title">
              <span className="weather-emoji">🌤️</span>
              Weather App
            </h1>
            <p className="app-subtitle">Get current weather and 5-day forecast for any city</p>
          </header>

          <form onSubmit={handleSearch} className="search-form">
            <div className="search-container">
              <div className="input-wrapper">
                <input
                  type="text"
                  value={city}
                  onChange={handleInputChange}
                  placeholder="Enter city name..."
                  className="city-input"
                  disabled={loading}
                />
                <button 
                  type="submit" 
                  className="search-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="btn-spinner"></div>
                  ) : (
                    <span>Search</span>
                  )}
                </button>
              </div>
            </div>
          </form>

          {error && (
            <div className="error-message">
              <div className="error-icon">⚠️</div>
              <span>{error}</span>
            </div>
          )}

          {weatherData && (
            <div className="weather-container">
              <WeatherCard 
                weatherData={weatherData}
                isCelsius={isCelsius}
                onToggleTemperature={toggleTemperature}
                convertTemperature={convertTemperature}
                getTemperatureUnit={getTemperatureUnit}
              />
              
              <ForecastCard 
                forecast={weatherData.forecast}
                convertTemperature={convertTemperature}
              />
            </div>
          )}

          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p className="loading-text">Fetching weather data...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;