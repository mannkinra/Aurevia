import React from 'react';

export const SpotModal = ({ spot, onClose, isFavorite, onToggleFavorite }) => {
  if (!spot) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="modal-img-container">
          <img src={spot.image} alt={spot.name} className="modal-img" />
          <div className="modal-img-overlay">
            <span className="modal-category">{spot.category}</span>
            <h2 className="modal-title">{spot.name}</h2>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-meta-grid">
            <div className="meta-box">
              <i className="fa-solid fa-clock"></i>
              <div>
                <strong>Timings</strong>
                <p>{spot.timings}</p>
              </div>
            </div>

            <div className="meta-box">
              <i className="fa-solid fa-ticket"></i>
              <div>
                <strong>Entry Ticket</strong>
                <p>{spot.entryFee}</p>
              </div>
            </div>

            <div className="meta-box">
              <i className="fa-solid fa-calendar-check"></i>
              <div>
                <strong>Best Time</strong>
                <p>{spot.bestTime}</p>
              </div>
            </div>

            <div className="meta-box">
              <i className="fa-solid fa-location-dot"></i>
              <div>
                <strong>Location</strong>
                <p>{spot.location}</p>
              </div>
            </div>
          </div>

          <div className="modal-desc-section">
            <h3>About this Place</h3>
            <p>{spot.description}</p>
          </div>

          <div className="modal-footer">
            <button 
              className={`btn-fav-toggle ${isFavorite ? 'active' : ''}`}
              onClick={() => onToggleFavorite(spot.id)}
            >
              <i className={`fa-${isFavorite ? 'solid' : 'regular'} fa-heart`}></i>
              {isFavorite ? ' Saved in Bucket List' : ' Add to Bucket List'}
            </button>
            <button className="btn-close" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
