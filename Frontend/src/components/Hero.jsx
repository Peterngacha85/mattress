import React, { useState, useEffect } from 'react';
import { Search, Send, ChevronDown } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './Hero.css';

const Hero = () => {
  const { settings } = useAppContext();
  const [text, setText] = useState('');
  const [fullText, setFullText] = useState('Payment After Delivery | Nationwide Shipping | Premium Quality');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText(prev => prev + fullText[index]);
        setIndex(prev => prev + 1);
      }, 40);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setText('');
        setIndex(0);
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);

  // Use the local products folder path for maximum speed and stability
  const bgImage = (settings?.heroBgImage && settings.heroBgImage.startsWith('http')) 
    ? settings.heroBgImage 
    : '/images/products/hero-bg.jpg';

  const heroStyle = {
    backgroundImage: `url("${bgImage}")`
  };

  const handleWhatsAppClick = () => {
    const message = "Hello, I'm interested in Kisau Mattresses. Could you help me with a purchase?";
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleExploreClick = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section">
      {/* Bulletproof Background Image */}
      <img src={bgImage} alt="Hero Background" className="hero-bg-img" />
      
      {/* Dynamic Gradient Overlay */}
      <div className="hero-gradient-overlay"></div>

      <div className="container hero-container">
        {/* Search Bar in Hero */}
        <div className="hero-search-wrapper">
          <div className="hero-search-box">
             <input type="text" placeholder="Search for mattresses, pillows..." />
             <Search className="search-icon" size={20} />
          </div>
        </div>

        {/* High-Fidelity Badge */}
        <div className="offer-badge">
          Free Delivery within Nairobi & Kiambu | Payment after delivery
        </div>

        {/* Heading */}
        <h1 className="hero-title">
          Experience the Perfect Sleep with <br />
          <span>KisauMattresses</span>
        </h1>

        {/* Typing Animation */}
        <div className="typing-box">
          <p className="typing-text">{text}<span className="cursor">|</span></p>
        </div>

        {/* Subtext */}
        <p className="hero-subtext">
          Discover our range of high-quality mattresses designed for <br />
          ultimate comfort and support. From orthopedic to memory foam, <br />
          we have the perfect mattress for your best sleep.
        </p>

        {/* Buttons */}
        <div className="hero-actions">
          <button className="btn-whatsapp-hero" onClick={handleWhatsAppClick}>
            <Send size={18} /> Order on WhatsApp
          </button>
          <button className="btn-outline-hero" onClick={handleExploreClick}>
            Explore Products
          </button>
        </div>

        <div className="scroll-arrow" onClick={handleExploreClick} style={{ cursor: 'pointer' }}>
          <ChevronDown size={32} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
