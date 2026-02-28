import type { ForecastDay } from '../types/weather';

interface ForecastProps {
  forecast: ForecastDay[];
  useCelsius: boolean;
}

export function Forecast({ forecast, useCelsius }: ForecastProps) {
  return (
    <div className="forecast-container">
      <h3 className="forecast-title">7-Day Forecast</h3>
      <div className="forecast-grid">
        {forecast.map((day, index) => {
          const maxTemp = useCelsius ? day.day.maxtemp_c : day.day.maxtemp_f;
          const minTemp = useCelsius ? day.day.mintemp_c : day.day.mintemp_f;
          const unit = useCelsius ? '°C' : '°F';
          const date = new Date(day.date);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

          return (
            <div key={index} className="forecast-day">
              <p className="forecast-day-name">{dayName}</p>
              <img
                src={`https:${day.day.condition.icon}`}
                alt={day.day.condition.text}
                className="forecast-icon"
              />
              <p className="forecast-condition">{day.day.condition.text}</p>
              <div className="forecast-temps">
                <span className="forecast-max">{Math.round(maxTemp)}{unit}</span>
                <span className="forecast-min">{Math.round(minTemp)}{unit}</span>
              </div>
              {day.day.daily_chance_of_rain > 0 && (
                <p className="forecast-rain">Rain: {day.day.daily_chance_of_rain}%</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
