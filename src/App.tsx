import { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { Forecast } from './components/Forecast';
import { AirQuality } from './components/AirQuality';
import { AdditionalDetails } from './components/AdditionalDetails';
import { Alerts } from './components/Alerts';
import { QuickAccess } from './components/QuickAccess';
import { getWeatherByCity, getWeatherForecast } from './services/weatherService';
import { addFavorite, removeFavorite, getFavorites, addSearchHistory, getSearchHistory } from './services/supabaseService';
import { useGeolocation } from './hooks/useGeolocation';
import type { WeatherData, ForecastData } from './types/weather';
import './App.css';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('weather_app_theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const { location, getLocation, loading: geoLoading } = useGeolocation();

  useEffect(() => {
    loadFavorites();
    loadHistory();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('weather_app_theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const loadFavorites = async () => {
    try {
      const fav = await getFavorites();
      setFavorites(fav);
    } catch (err) {
      console.error('Failed to load favorites:', err);
    }
  };

  const loadHistory = async () => {
    try {
      const hist = await getSearchHistory();
      setHistory(hist);
    } catch (err) {
      console.error('Failed to load history:', err);
    }
  };

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const weatherData = await getWeatherByCity(city);
      setWeather(weatherData);

      const forecastData = await getWeatherForecast(city);
      setForecast(forecastData);

      await addSearchHistory(city);
      const updatedHistory = await getSearchHistory();
      setHistory(updatedHistory);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setWeather(null);
      setForecast(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = async () => {
    if (!weather) return;

    try {
      if (favorites.includes(weather.location.name)) {
        await removeFavorite(weather.location.name);
        setFavorites(favorites.filter(f => f !== weather.location.name));
      } else {
        await addFavorite(weather.location.name);
        setFavorites([...favorites, weather.location.name]);
      }
    } catch (err) {
      console.error('Failed to update favorite:', err);
    }
  };

  useEffect(() => {
    if (location) {
      const reverse_geocode = async () => {
        try {
          const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=f3e9f8b0e0a947a9a2d175757242802&q=${location.latitude},${location.longitude}&aqi=yes`
          );
          const data = await response.json();
          await handleSearch(data.location.name);
        } catch (err) {
          console.error('Failed to get weather for current location:', err);
        }
      };
      reverse_geocode();
    }
  }, [location]);

  return (
    <div className="app" data-theme={isDark ? 'dark' : 'light'}>
      <div className="container">
        <header className="app-header">
          <div className="header-top">
            <div>
              <h1 className="app-title">Weather App</h1>
              <p className="app-subtitle">Real-time weather, forecasts & air quality</p>
            </div>
            <button
              onClick={() => setIsDark(!isDark)}
              className="theme-toggle"
              title={isDark ? 'Light mode' : 'Dark mode'}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </header>

        <div className="search-section">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          <button
            onClick={getLocation}
            disabled={geoLoading || isLoading}
            className="geolocation-button"
            title="Use my location"
          >
            {geoLoading ? 'Finding location...' : '📍 My Location'}
          </button>
        </div>

        <QuickAccess
          favorites={favorites}
          history={history}
          onSelect={handleSearch}
          onAddFavorite={addFavorite}
          onRemoveFavorite={removeFavorite}
          currentCity={weather?.location.name}
        />

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {weather && (
          <>
            <WeatherCard
              weather={weather}
              isFavorite={favorites.includes(weather.location.name)}
              onToggleFavorite={handleToggleFavorite}
            />

            {weather.current.air_quality && (
              <AirQuality aqi={weather.current.air_quality} />
            )}

            <AdditionalDetails
              uvIndex={weather.current.uv_index}
              visibility={weather.current.vis_km}
              pressure={weather.current.pressure_mb}
            />

            {forecast?.alerts?.alert && (
              <Alerts alerts={forecast.alerts.alert} />
            )}

            {forecast && (
              <Forecast
                forecast={forecast.forecast.forecastday}
                useCelsius={true}
              />
            )}
          </>
        )}

        {!weather && !error && !isLoading && (
          <div className="empty-state">
            <p>Search for a city or use your current location to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
