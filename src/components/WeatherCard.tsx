import type { WeatherData } from '../types/weather';
import { useState } from 'react';

interface WeatherCardProps {
  weather: WeatherData;
}

export function WeatherCard({ weather }: WeatherCardProps) {
  const [useCelsius, setUseCelsius] = useState(true);

  const temperature = useCelsius ? weather.current.temp_c : weather.current.temp_f;
  const feelsLike = useCelsius ? weather.current.feelslike_c : weather.current.feelslike_f;
  const unit = useCelsius ? '°C' : '°F';

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2 className="location-name">{weather.location.name}</h2>
        <p className="location-country">{weather.location.country}</p>
      </div>

      <div className="weather-main">
        <img
          src={`https:${weather.current.condition.icon}`}
          alt={weather.current.condition.text}
          className="weather-icon"
        />
        <div className="temperature-display">
          <span className="temperature">{Math.round(temperature)}{unit}</span>
          <p className="condition">{weather.current.condition.text}</p>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Feels like</span>
          <span className="detail-value">{Math.round(feelsLike)}{unit}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{weather.current.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind</span>
          <span className="detail-value">{Math.round(weather.current.wind_kph)} km/h</span>
        </div>
      </div>

      <button onClick={() => setUseCelsius(!useCelsius)} className="unit-toggle">
        Switch to {useCelsius ? 'Fahrenheit' : 'Celsius'}
      </button>
    </div>
  );
}
