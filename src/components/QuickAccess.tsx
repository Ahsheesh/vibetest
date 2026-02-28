interface QuickAccessProps {
  favorites: string[];
  history: string[];
  onSelect: (city: string) => void;
  onAddFavorite: (city: string) => void;
  onRemoveFavorite: (city: string) => void;
  currentCity?: string;
}

export function QuickAccess({
  favorites,
  history,
  onSelect,
  onRemoveFavorite,
  currentCity,
}: QuickAccessProps) {
  const otherHistory = history.filter(city => city !== currentCity && !favorites.includes(city));

  return (
    <div className="quick-access">
      {favorites.length > 0 && (
        <div className="quick-access-section">
          <h4 className="quick-access-label">Favorites</h4>
          <div className="quick-access-list">
            {favorites.map(city => (
              <div key={city} className="quick-access-item">
                <button onClick={() => onSelect(city)} className="quick-access-button">
                  {city}
                </button>
                <button
                  onClick={() => onRemoveFavorite(city)}
                  className="quick-access-remove"
                  title="Remove from favorites"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {otherHistory.length > 0 && (
        <div className="quick-access-section">
          <h4 className="quick-access-label">Recent</h4>
          <div className="quick-access-list">
            {otherHistory.slice(0, 5).map(city => (
              <button
                key={city}
                onClick={() => onSelect(city)}
                className="quick-access-history-item"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
