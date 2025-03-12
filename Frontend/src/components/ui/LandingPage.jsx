import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import '../styles/LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <nav className="landing-nav">
        <div className="logo">
          <Logo />
          <span>Jtd-E-Commerce</span>
        </div>
        <div className="nav-buttons">
          <button onClick={() => navigate('/login')} className="nav-button">Login</button>
          <button onClick={() => navigate('/register')} className="nav-button register">Register</button>
        </div>
      </nav>
      
      <main className="landing-main">
        <div className="hero-section">
          <h1>Welcome to Jtd-E-Commerce</h1>
          <p>"Shop Smart, Shop Fast, Shop Easy!" 🚀🛒</p>
          <p>"Your One-Stop Shop for Everything!" 🛍️✨</p>
          <div className="cta-buttons">
            <button onClick={() => navigate('/register')} className="cta-button">Get Started</button>
            <button onClick={() => navigate('/login')} className="cta-button secondary">Sign In</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LandingPage