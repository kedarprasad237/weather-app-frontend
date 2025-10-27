import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

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
              {/* Main Weather Card */}
              <div className="weather-card main-weather">
                <div className="weather-header">
                  <div className="location-info">
                    <h2 className="city-name">
                      {weatherData.city.charAt(0).toUpperCase() + weatherData.city.slice(1)}
                    </h2>
                    <div className="weather-meta">
                      <span className="condition-text">
                        {weatherData.condition.charAt(0).toUpperCase() + weatherData.condition.slice(1)}
                      </span>
                      {weatherData.cached && (
                        <span className="cache-badge">📦 Cached</span>
                      )}
                    </div>
                  </div>
                  <button 
                    className="temp-toggle"
                    onClick={toggleTemperature}
                    title={`Switch to ${isCelsius ? 'Fahrenheit' : 'Celsius'}`}
                  >
                    {isCelsius ? '°C' : '°F'}
                  </button>
                </div>
                
                <div className="weather-main">
                  <div className="temperature-section">
                    <div className="weather-icon">
                      <img 
                        src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                        alt={weatherData.condition}
                      />
                    </div>
                    <div className="temperature">
                      {convertTemperature(weatherData.temperature)}
                      <span className="temp-unit">{getTemperatureUnit()}</span>
                    </div>
                  </div>
                </div>

                {/* Additional Weather Details */}
                <div className="weather-details">
                  <div className="detail-item">
                    <div className="detail-icon">💧</div>
                    <div className="detail-content">
                      <span className="detail-value">{weatherData.humidity}%</span>
                      <span className="detail-label">Humidity</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-icon">💨</div>
                    <div className="detail-content">
                      <span className="detail-value">{weatherData.windSpeed} m/s</span>
                      <span className="detail-label">Wind Speed</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-icon">🔽</div>
                    <div className="detail-content">
                      <span className="detail-value">{weatherData.pressure} hPa</span>
                      <span className="detail-label">Pressure</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-icon">👁️</div>
                    <div className="detail-content">
                      <span className="detail-value">{Math.round(weatherData.visibility / 1000)} km</span>
                      <span className="detail-label">Visibility</span>
                    </div>
                  </div>
                </div>

                <div className="weather-footer">
                  <small className="last-updated">
                    Last updated: {new Date(weatherData.timestamp).toLocaleString()}
                  </small>
                </div>
              </div>

              {/* 5-Day Forecast */}
              {weatherData.forecast && (
                <div className="forecast-section">
                  <h3 className="forecast-title">5-Day Forecast</h3>
                  <div className="forecast-container">
                    {weatherData.forecast.map((day, index) => (
                      <div key={index} className="forecast-card">
                        <div className="forecast-day">{day.dayName}</div>
                        <div className="forecast-icon">
                          <img 
                            src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                            alt={day.condition}
                          />
                        </div>
                        <div className="forecast-temps">
                          <span className="forecast-max">
                            {convertTemperature(day.maxTemp)}°
                          </span>
                          <span className="forecast-min">
                            {convertTemperature(day.minTemp)}°
                          </span>
                        </div>
                        <div className="forecast-condition">
                          {day.condition.charAt(0).toUpperCase() + day.condition.slice(1)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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