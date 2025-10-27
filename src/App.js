import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

// Get API URL from environment variables
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>🌤️ Weather App</h1>
          <p>Get current weather information for any city</p>
        </header>

        <form onSubmit={handleSearch} className="search-form">
          <div className="input-group">
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
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {weatherData && (
          <div className="weather-card">
            <div className="weather-header">
              <h2>{weatherData.city.charAt(0).toUpperCase() + weatherData.city.slice(1)}</h2>
              {weatherData.cached && (
                <span className="cache-indicator">📦 Cached</span>
              )}
            </div>
            
            <div className="weather-main">
              <div className="weather-icon">
                <img 
                  src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                  alt={weatherData.condition}
                />
              </div>
              
              <div className="weather-info">
                <div className="temperature">
                  {weatherData.temperature}°C
                </div>
                <div className="condition">
                  {weatherData.condition.charAt(0).toUpperCase() + weatherData.condition.slice(1)}
                </div>
              </div>
            </div>

            <div className="weather-footer">
              <small>
                Last updated: {new Date(weatherData.timestamp).toLocaleString()}
              </small>
            </div>
          </div>
        )}

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Fetching weather data...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
