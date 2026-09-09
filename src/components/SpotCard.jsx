import React from 'react';

export const SpotCard = ({ spot, isFavorite, onToggleFavorite, onViewDetails }) => {
  return (
    <div className="spot-card">
      <div className="card-image-wrap">
        <img src={spot.image} alt={spot.name} className="card-img" />
        <span className="card-category">{spot.category}</span>
        
        <button 
          className={`card-fav-btn ${isFavorite ? 'saved' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(spot.id);
          }}
          title={isFavorite ? "Remove favorite" : "Add to favorites"}
        >
          <i className={`fa-${isFavorite ? 'solid' : 'regular'} fa-heart`}></i>
        </button>
      </div>

      <div className="card-body">
        <div className="card-header">
          <h3 className="card-title">{spot.name}</h3>
          <span className="card-rating">
            <i className="fa-solid fa-star"></i> {spot.rating}
          </span>
        </div>

        <p className="card-tagline">{spot.tagline}</p>

        <div className="card-meta">
          <span><i className="fa-solid fa-ticket"></i> {spot.entryFee}</span>
          <span><i className="fa-solid fa-clock"></i> {spot.timings.split('(')[0]}</span>
        </div>

        <button 
          className="btn-details"
          onClick={() => onViewDetails(spot)}
        >
          View Details <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};
