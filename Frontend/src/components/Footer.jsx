import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './Footer.css';

const Footer = () => {
  const { settings } = useAppContext();

  return (
    <footer className="main-footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-info">
              <h2 className="footer-logo">KISAU<span>MATTRESSES</span></h2>
              <p>Providing premium sleep solutions with nationwide delivery in Kenya. Quality you can trust.</p>
              <div className="social-links">
                <a href="#"><Facebook size={20} /></a>
                <a href="#"><Instagram size={20} /></a>
                <a href="#"><Twitter size={20} /></a>
              </div>
            </div>

            <div className="footer-links">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#hero">Home</a></li>
                <li><a href="#products">Collection</a></li>
                <li><a href="#about">About us</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer-contact">
              <h3>Contact Us</h3>
              <ul>
                <li><Phone size={18} /> {settings.whatsappNumber}</li>
                <li><Mail size={18} /> info@kisaumattress.co.ke</li>
                <li><MapPin size={18} /> {settings.mapLocation}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Kisau Mattresses. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
