import type { WeatherData, ForecastData } from '../types/weather';

const API_KEY = 'f3e9f8b0e0a947a9a2d175757242802';
const BASE_URL = 'https://api.weatherapi.com/v1';

export async function getWeatherByCity(city: string): Promise<WeatherData> {
  const response = await fetch(
    `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=yes`
  );

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error('City not found. Please check the spelling and try again.');
    }
    throw new Error('Failed to fetch weather data. Please try again.');
  }

  return await response.json();
}

export async function getWeatherForecast(city: string): Promise<ForecastData> {
  const response = await fetch(
    `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=7&aqi=yes&alerts=yes`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch forecast data.');
  }

  return await response.json();
}
