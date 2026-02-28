import { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { getWeatherByCity } from './services/weatherService';
import type { WeatherData } from './types/weather';
import './App.css';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getWeatherByCity(city);
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1 className="app-title">Weather App</h1>
          <p className="app-subtitle">Get current weather for any city</p>
        </header>

        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {weather && <WeatherCard weather={weather} />}

        {!weather && !error && !isLoading && (
          <div className="empty-state">
            <p>Search for a city to see its weather</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
