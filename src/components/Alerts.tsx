import type { AlertData } from '../types/weather';

interface AlertsProps {
  alerts: AlertData[] | undefined;
}

export function Alerts({ alerts }: AlertsProps) {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="alerts-container">
      {alerts.map((alert, index) => (
        <div key={index} className={`alert alert-${alert.severity.toLowerCase()}`}>
          <div className="alert-header">
            <span className="alert-icon">⚠️</span>
            <h4 className="alert-title">{alert.headline}</h4>
          </div>
          <p className="alert-description">{alert.desc}</p>
          <p className="alert-time">
            Valid until {new Date(alert.expires).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
