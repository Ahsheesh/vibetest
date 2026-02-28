interface AirQualityProps {
  aqi: {
    us_epa_index: number;
    pm2_5: number;
    pm10: number;
    no2: number;
    o3: number;
  };
}

const aqiLevels = [
  { level: 'Good', color: '#10b981', range: '0-50' },
  { level: 'Moderate', color: '#f59e0b', range: '51-100' },
  { level: 'Unhealthy for Sensitive Groups', color: '#ef4444', range: '101-150' },
  { level: 'Unhealthy', color: '#9333ea', range: '151-200' },
  { level: 'Very Unhealthy', color: '#7c2d12', range: '200+' },
];

export function AirQuality({ aqi }: AirQualityProps) {
  const aqiLevel = aqiLevels[Math.min(aqi.us_epa_index - 1, 4)];

  return (
    <div className="air-quality-container">
      <h3 className="air-quality-title">Air Quality</h3>
      <div className="aqi-display" style={{ borderColor: aqiLevel.color }}>
        <div className="aqi-level" style={{ backgroundColor: aqiLevel.color }}>
          {aqiLevel.level}
        </div>
        <div className="aqi-details">
          <div className="aqi-detail">
            <span>PM2.5</span>
            <span>{Math.round(aqi.pm2_5)} µg/m³</span>
          </div>
          <div className="aqi-detail">
            <span>PM10</span>
            <span>{Math.round(aqi.pm10)} µg/m³</span>
          </div>
          <div className="aqi-detail">
            <span>NO₂</span>
            <span>{Math.round(aqi.no2)} ppb</span>
          </div>
          <div className="aqi-detail">
            <span>O₃</span>
            <span>{Math.round(aqi.o3)} ppb</span>
          </div>
        </div>
      </div>
    </div>
  );
}
