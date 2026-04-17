import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, Sun, Moon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart } = useAppContext();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="logo">
          Kisau<span>Mattresses</span>
        </Link>

        <div className="nav-links desktop-only">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <a href="#products">Mattresses</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="nav-actions">
           <button className="icon-btn search-btn"><Search size={20} /></button>
           <button className="icon-btn theme-btn"><Sun size={20} /></button>
           <Link to="/cart" className="cart-btn">
             <ShoppingCart size={20} />
             {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
           </Link>
           <button className="menu-btn mobile-only" onClick={() => setIsOpen(!isOpen)}>
             {isOpen ? <X size={24} /> : <Menu size={24} />}
           </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="mobile-links">
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <a href="#products" onClick={() => setIsOpen(false)}>Mattresses</a>
          <a href="#about" onClick={() => setIsOpen(false)}>About</a>
          <a href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
          <Link to="/cart" className="mobile-cart-link" onClick={() => setIsOpen(false)}>
            View Cart ({totalItems})
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
