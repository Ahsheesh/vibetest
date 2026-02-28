interface AdditionalDetailsProps {
  uvIndex: number;
  visibility: number;
  pressure: number;
}

const getUVLevel = (uv: number): string => {
  if (uv < 3) return 'Low';
  if (uv < 6) return 'Moderate';
  if (uv < 8) return 'High';
  if (uv < 11) return 'Very High';
  return 'Extreme';
};

export function AdditionalDetails({ uvIndex, visibility, pressure }: AdditionalDetailsProps) {
  return (
    <div className="additional-details">
      <h3 className="additional-details-title">Additional Details</h3>
      <div className="details-grid">
        <div className="detail-box">
          <span className="detail-label">UV Index</span>
          <span className="detail-value">{uvIndex.toFixed(1)}</span>
          <span className="detail-level">{getUVLevel(uvIndex)}</span>
        </div>
        <div className="detail-box">
          <span className="detail-label">Visibility</span>
          <span className="detail-value">{visibility.toFixed(1)} km</span>
        </div>
        <div className="detail-box">
          <span className="detail-label">Pressure</span>
          <span className="detail-value">{pressure.toFixed(0)} mb</span>
        </div>
      </div>
    </div>
  );
}
