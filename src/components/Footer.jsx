import React from 'react';

export const Footer = ({ setActiveTab }) => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <i className="fa-solid fa-compass"></i>
            <span>Aurevia</span>
          </div>
          <p>The local travel guide for Bathinda, Punjab. Discover rich history, peaceful lakes, and Punjabi food.</p>
        </div>

        <div className="footer-links">
          <h4>Navigation</h4>
          <button onClick={() => setActiveTab('home')}>Home</button>
          <button onClick={() => setActiveTab('places')}>Explore Spots</button>
          <button onClick={() => setActiveTab('planner')}>Trip Planner</button>
          <button onClick={() => setActiveTab('favorites')}>Saved Places</button>
          <button onClick={() => setActiveTab('about')}>About Bathinda</button>
        </div>

        <div className="footer-contact">
          <h4>Helpline & Info</h4>
          <p><i className="fa-solid fa-location-dot"></i> Mall Road, Bathinda, Punjab</p>
          <p><i className="fa-solid fa-phone"></i> Tourist Helpline: 1800-180-0004</p>
          <p><i className="fa-solid fa-envelope"></i> help@aurevia-bathinda.in</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Aurevia Bathinda Guide. Made with React.</p>
      </div>
    </footer>
  );
};
