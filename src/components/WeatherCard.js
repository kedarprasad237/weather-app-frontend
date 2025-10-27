import React from 'react';

const WeatherCard = ({ weatherData, isCelsius, onToggleTemperature, convertTemperature, getTemperatureUnit }) => {
  return (
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
          onClick={onToggleTemperature}
          data-tooltip={`Switch to ${isCelsius ? 'Fahrenheit' : 'Celsius'}`}
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
  );
};

export default WeatherCard;
