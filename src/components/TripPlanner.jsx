import React, { useState } from 'react';

export const TripPlanner = ({ onExplorePlaces }) => {
  const [days, setDays] = useState(2);
  const [travelers, setTravelers] = useState(2);
  const [style, setStyle] = useState('standard');

  const costMap = {
    budget: { stay: 500, food: 350, transport: 250 },
    standard: { stay: 1200, food: 700, transport: 500 },
    luxury: { stay: 2800, food: 1400, transport: 1000 }
  };

  const rates = costMap[style];
  const stayCost = rates.stay * days * Math.ceil(travelers / 2);
  const foodCost = rates.food * days * travelers;
  const transportCost = rates.transport * days * travelers;
  const totalBudget = stayCost + foodCost + transportCost;

  return (
    <div className="planner-container">
      <div className="section-heading">
        <h2><i className="fa-solid fa-calculator"></i> Trip Cost Calculator</h2>
        <p>Plan your Bathinda visit with custom budgets and itinerary ideas</p>
      </div>

      <div className="planner-card">
        <div className="planner-inputs-grid">
          <div className="form-group">
            <label><i className="fa-solid fa-calendar-days"></i> Number of Days</label>
            <div className="pill-group">
              {[1, 2, 3].map(d => (
                <button
                  key={d}
                  type="button"
                  className={`pill-btn ${days === d ? 'active' : ''}`}
                  onClick={() => setDays(d)}
                >
                  {d} {d === 1 ? 'Day' : 'Days'}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label><i className="fa-solid fa-users"></i> Number of Travelers</label>
            <input 
              type="number" 
              min="1" 
              max="10" 
              value={travelers} 
              onChange={(e) => setTravelers(Math.max(1, parseInt(e.target.value) || 1))}
              className="planner-input"
            />
          </div>

          <div className="form-group">
            <label><i className="fa-solid fa-gem"></i> Travel Style</label>
            <div className="pill-group">
              <button 
                className={`pill-btn ${style === 'budget' ? 'active' : ''}`}
                onClick={() => setStyle('budget')}
              >
                Budget
              </button>
              <button 
                className={`pill-btn ${style === 'standard' ? 'active' : ''}`}
                onClick={() => setStyle('standard')}
              >
                Standard
              </button>
              <button 
                className={`pill-btn ${style === 'luxury' ? 'active' : ''}`}
                onClick={() => setStyle('luxury')}
              >
                Luxury
              </button>
            </div>
          </div>
        </div>

        <div className="budget-summary-box">
          <div className="budget-row">
            <span><i className="fa-solid fa-hotel"></i> Accommodation</span>
            <strong>₹{stayCost.toLocaleString('en-IN')}</strong>
          </div>
          <div className="budget-row">
            <span><i className="fa-solid fa-utensils"></i> Food & Dining</span>
            <strong>₹{foodCost.toLocaleString('en-IN')}</strong>
          </div>
          <div className="budget-row">
            <span><i className="fa-solid fa-taxi"></i> Local Transport</span>
            <strong>₹{transportCost.toLocaleString('en-IN')}</strong>
          </div>
          <div className="budget-total">
            <span>Estimated Total Budget:</span>
            <span className="total-amount">₹{totalBudget.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="itinerary-box">
          <h3><i className="fa-solid fa-route"></i> Suggested {days}-Day Plan</h3>
          
          <div className="timeline">
            <div className="timeline-item">
              <span className="timeline-day">Day 1</span>
              <div>
                <strong>Heritage & Lakes</strong>
                <p>Morning visit to historical Qila Mubarak, lunch in city center, and evening boating at Bathinda Thermal Lakes.</p>
              </div>
            </div>

            {days >= 2 && (
              <div className="timeline-item">
                <span className="timeline-day">Day 2</span>
                <div>
                  <strong>Spiritual & Nature</strong>
                  <p>Visit holy Takht Sri Damdama Sahib at Talwandi Sabo, followed by an afternoon stroll at Bir Talab Zoo and Rose Garden.</p>
                </div>
              </div>
            )}

            {days >= 3 && (
              <div className="timeline-item">
                <span className="timeline-day">Day 3</span>
                <div>
                  <strong>Shopping & Food</strong>
                  <p>Taste authentic Dhodha sweets at Dhobi Bazar, shop for traditional Phulkari embroidery, and relax at Chetak Park.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="planner-action">
          <button className="btn-primary" onClick={onExplorePlaces}>
            Explore Tourist Spots <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
