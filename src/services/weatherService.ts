import type { WeatherData } from '../types/weather';

const API_KEY = 'f3e9f8b0e0a947a9a2d175757242802';
const BASE_URL = 'https://api.weatherapi.com/v1';

export async function getWeatherByCity(city: string): Promise<WeatherData> {
  const response = await fetch(
    `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`
  );

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error('City not found. Please check the spelling and try again.');
    }
    throw new Error('Failed to fetch weather data. Please try again.');
  }

  return await response.json();
}
