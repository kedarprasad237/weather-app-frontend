import React from 'react';

const ForecastCard = ({ forecast, convertTemperature }) => {
  if (!forecast || forecast.length === 0) {
    return null;
  }

  return (
    <div className="forecast-section">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-container">
        {forecast.map((day, index) => (
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
  );
};

export default ForecastCard;
