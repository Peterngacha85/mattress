import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Moon, Sparkles } from 'lucide-react';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-bg-elements">
        <div className="circle c1"></div>
        <div className="circle c2"></div>
      </div>
      
      <div className="not-found-content">
        <div className="not-found-icon-wrapper">
          <Moon size={64} color="#4a9eff" />
        </div>
        
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Are you dreaming?</h2>
        <p className="not-found-text">
          Oops! It seems like you've drifted off to a page that doesn't exist. 
          Don't worry, even the best sleepers sometimes get lost.
        </p>
        
        <div className="not-found-actions">
          <Link to="/" className="btn-home">
            <Home size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Back to Reality
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
