import React from 'react';

export const Navbar = ({ activeTab, setActiveTab, favoritesCount }) => {
  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="nav-brand" onClick={() => setActiveTab('home')}>
          <i className="fa-solid fa-compass brand-icon"></i>
          <span className="brand-title">Aurevia</span>
          <span className="brand-badge">Bathinda</span>
        </div>

        <nav className="nav-links">
          <button 
            className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            <i className="fa-solid fa-house"></i> Home
          </button>
          
          <button 
            className={`nav-btn ${activeTab === 'places' ? 'active' : ''}`}
            onClick={() => setActiveTab('places')}
          >
            <i className="fa-solid fa-location-dot"></i> Places
          </button>
          
          <button 
            className={`nav-btn ${activeTab === 'planner' ? 'active' : ''}`}
            onClick={() => setActiveTab('planner')}
          >
            <i className="fa-solid fa-calculator"></i> Planner
          </button>
          
          <button 
            className={`nav-btn ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            <i className="fa-solid fa-heart"></i> Saved
            {favoritesCount > 0 && <span className="fav-badge">{favoritesCount}</span>}
          </button>
          
          <button 
            className={`nav-btn ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            <i className="fa-solid fa-circle-info"></i> About
          </button>
        </nav>
      </div>
    </header>
  );
};
