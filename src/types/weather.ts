export interface WeatherData {
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
    feelslike_c: number;
    feelslike_f: number;
    air_quality?: {
      us_epa_index: number;
      gb_defra_index: number;
      pm2_5: number;
      pm10: number;
      no2: number;
      o3: number;
      so2: number;
      co: number;
    };
    uv_index: number;
    vis_km: number;
    pressure_mb: number;
  };
}

export interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    avghumidity: number;
    daily_chance_of_rain: number;
    daily_chance_of_snow: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

export interface AlertData {
  headline: string;
  desc: string;
  effective: string;
  expires: string;
  severity: string;
}

export interface ForecastData {
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: WeatherData['current'];
  forecast: {
    forecastday: ForecastDay[];
  };
  alerts?: {
    alert: AlertData[];
  };
}

export interface WeatherError {
  message: string;
}
