import React, { useState, useEffect } from 'react';
import { spotsData, cityStats } from './data';
import { Navbar } from './components/Navbar';
import { SpotCard } from './components/SpotCard';
import { SpotModal } from './components/SpotModal';
import { TripPlanner } from './components/TripPlanner';
import { Footer } from './components/Footer';

export const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('aurevia_favorites');
    return saved ? JSON.parse(saved) : [1, 3];
  });

  useEffect(() => {
    localStorage.setItem('aurevia_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredSpots = spotsData.filter(spot => {
    const matchesCat = selectedCategory === 'All' || spot.category === selectedCategory;
    const matchesSearch = spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          spot.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          spot.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const favoriteSpots = spotsData.filter(spot => favorites.includes(spot.id));
  const categories = ['All', 'Historical', 'Religious', 'Nature & Lakes', 'Parks & Gardens', 'Food & Markets'];

  return (
    <div className="app-layout">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        favoritesCount={favorites.length} 
      />

      <main className="main-content">
        {activeTab === 'home' && (
          <div className="home-view">
            <section className="hero-banner">
              <div className="hero-overlay">
                <span className="hero-badge"><i className="fa-solid fa-sparkles"></i> Welcome to Aurevia</span>
                <h1 className="hero-title">Discover Bathinda — The Royal Heart of Malwa</h1>
                <p className="hero-subtitle">
                  Explore 1,400+ years of history, serene lakes, sacred gurdwaras, and authentic Punjabi sweets.
                </p>

                <div className="hero-search-bar">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <input 
                    type="text" 
                    placeholder="Search fort, lakes, zoo, sweets..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') setActiveTab('places');
                    }}
                  />
                  <button onClick={() => setActiveTab('places')}>
                    Explore Now
                  </button>
                </div>
              </div>
            </section>

            <section className="stats-strip">
              {cityStats.map((stat, idx) => (
                <div key={idx} className="stat-card">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </section>

            <section className="home-section">
              <div className="section-header">
                <div>
                  <h2>Must-Visit Highlights</h2>
                  <p>Top attractions handpicked for your trip</p>
                </div>
                <button className="btn-link" onClick={() => setActiveTab('places')}>
                  View All Places <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>

              <div className="spots-grid">
                {spotsData.slice(0, 3).map(spot => (
                  <SpotCard 
                    key={spot.id}
                    spot={spot}
                    isFavorite={favorites.includes(spot.id)}
                    onToggleFavorite={toggleFavorite}
                    onViewDetails={setSelectedSpot}
                  />
                ))}
              </div>
            </section>

            <section className="home-planner-cta">
              <h2>Planning a Trip to Bathinda?</h2>
              <p>Calculate your travel expenses for stay, food, and transport in seconds.</p>
              <button className="btn-primary" onClick={() => setActiveTab('planner')}>
                <i className="fa-solid fa-calculator"></i> Open Trip Calculator
              </button>
            </section>
          </div>
        )}

        {activeTab === 'places' && (
          <div className="places-view">
            <div className="section-heading">
              <h2><i className="fa-solid fa-location-dot"></i> Tourist Attractions</h2>
              <p>Filter by category or search attractions across Bathinda</p>
            </div>

            <div className="filters-bar">
              <div className="search-input-wrap">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input 
                  type="text" 
                  placeholder="Search spots by name or keyword..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button className="clear-btn" onClick={() => setSearchQuery('')}>
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                )}
              </div>

              <div className="category-pills">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {filteredSpots.length > 0 ? (
              <div className="spots-grid">
                {filteredSpots.map(spot => (
                  <SpotCard 
                    key={spot.id}
                    spot={spot}
                    isFavorite={favorites.includes(spot.id)}
                    onToggleFavorite={toggleFavorite}
                    onViewDetails={setSelectedSpot}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <i className="fa-solid fa-magnifying-glass-location"></i>
                <h3>No matching places found</h3>
                <p>Try searching for a different keyword or select All categories.</p>
                <button className="btn-primary" onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}>
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'planner' && (
          <TripPlanner onExplorePlaces={() => setActiveTab('places')} />
        )}

        {activeTab === 'favorites' && (
          <div className="favorites-view">
            <div className="section-heading">
              <h2><i className="fa-solid fa-heart"></i> Saved Bucket List</h2>
              <p>Keep track of places you want to visit in Bathinda</p>
            </div>

            {favoriteSpots.length > 0 ? (
              <div className="spots-grid">
                {favoriteSpots.map(spot => (
                  <SpotCard 
                    key={spot.id}
                    spot={spot}
                    isFavorite={true}
                    onToggleFavorite={toggleFavorite}
                    onViewDetails={setSelectedSpot}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <i className="fa-regular fa-heart"></i>
                <h3>Your bucket list is empty</h3>
                <p>Click the heart icon on any tourist place to save it here.</p>
                <button className="btn-primary" onClick={() => setActiveTab('places')}>
                  Browse Tourist Places
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'about' && (
          <div className="about-view">
            <div className="section-heading">
              <h2><i className="fa-solid fa-circle-info"></i> About Bathinda</h2>
              <p>Heritage, Culture, and Tourist Information</p>
            </div>

            <div className="about-grid">
              <div className="about-card">
                <h3><i className="fa-solid fa-landmark"></i> Rich History</h3>
                <p>
                  Bathinda is one of the oldest cities in Punjab, dating back to 6th century AD. It is named after the Bhati Rajput kings and is home to the historic Qila Mubarak fort.
                </p>
              </div>

              <div className="about-card">
                <h3><i className="fa-solid fa-hand-holding-heart"></i> Culture & Food</h3>
                <p>
                  Known as the cultural capital of the Malwa region, Bathinda offers warm Punjabi hospitality, traditional Phulkari crafts, and famous Dhodha sweets.
                </p>
              </div>

              <div className="about-card">
                <h3><i className="fa-solid fa-phone-volume"></i> Emergency Helplines</h3>
                <ul className="info-list">
                  <li><strong>Police Helpline:</strong> 112 / 100</li>
                  <li><strong>Ambulance:</strong> 108</li>
                  <li><strong>Tourist Info:</strong> 0164-2212345</li>
                  <li><strong>Railway Inquiry:</strong> 139</li>
                </ul>
              </div>
            </div>

            <div className="contact-section">
              <h3><i className="fa-solid fa-paper-plane"></i> Tourist Feedback</h3>
              <p>Have questions about your trip? Send us a quick note.</p>

              {contactSubmitted ? (
                <div className="success-banner">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>Thank you! Your feedback message has been sent.</span>
                </div>
              ) : (
                <form 
                  className="contact-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setContactSubmitted(true);
                  }}
                >
                  <div className="form-row">
                    <input type="text" placeholder="Your Name" required className="form-control" />
                    <input type="email" placeholder="Your Email" required className="form-control" />
                  </div>
                  <textarea placeholder="Your message or query..." required rows="4" className="form-control"></textarea>
                  <button type="submit" className="btn-primary">
                    Send Message <i className="fa-solid fa-paper-plane"></i>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </main>

      <SpotModal 
        spot={selectedSpot}
        onClose={() => setSelectedSpot(null)}
        isFavorite={selectedSpot ? favorites.includes(selectedSpot.id) : false}
        onToggleFavorite={toggleFavorite}
      />

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
};
