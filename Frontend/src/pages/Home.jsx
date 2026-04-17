import React from 'react';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import GoogleMap from '../components/GoogleMap';
import { useAppContext } from '../context/AppContext';
import { Truck, ShieldCheck, CreditCard, Clock, Award } from 'lucide-react';
import './Home.css';

const Home = () => {
  const { settings } = useAppContext();

  return (
    <main className="homepage">
      <Hero />
      
      {/* Why Choose Section (1:1 Match) */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose <span>Kisau</span></h2>
            <p>We make mattress shopping hassle-free with premium products, free delivery, and pay-after-delivery options.</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <CreditCard size={40} className="feature-icon" />
              <h3>Pay After Delivery</h3>
              <p>We deliver first, you pay after. Nationwide service available.</p>
            </div>
            <div className="feature-card">
              <Truck size={40} className="feature-icon" />
              <h3>Free Delivery</h3>
              <p>Free delivery within Nairobi and Kiambu counties.</p>
            </div>
            <div className="feature-card">
              <ShieldCheck size={40} className="feature-icon" />
              <h3>Quality Guaranteed</h3>
              <p>All our mattresses come with premium quality assurance.</p>
            </div>
            <div className="feature-card">
              <Clock size={40} className="feature-icon" />
              <h3>Fast Service</h3>
              <p>Same-day delivery available for orders within Nairobi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="products" className="products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Premium <span>Mattresses</span></h2>
            <p>Quality sleep starts with the right foundation. Browse our heavy-duty and standard mattress ranges.</p>
            <div className="award-badge">4.9/5 from over 2,000 customer reviews</div>
          </div>
          <ProductGrid />
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              <img src="/images/products/about-mattress.png" alt="Mattress showroom" />
            </div>
            <div className="about-text">
              <span className="subtitle">About Kisau Mattresses</span>
              <h2>Your Partner in <span>Extreme Comfort</span></h2>
              <p>At Kisau Mattresses, we believe that a good day starts with a great night's sleep. We've spent years perfecting our mattress designs to provide the perfect balance of support, softness, and durability.</p>
              <ul className="about-list">
                <li><Clock size={18} /> Over 10 years of experience</li>
                <li><ShieldCheck size={18} /> High-density foam technology</li>
                <li><Award size={18} /> 5-star customer satisfaction</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Visit <span>Our Shop</span></h2>
            <p>Our showroom is open Monday to Saturday, 8:00 AM - 6:00 PM.</p>
          </div>
          <div className="contact-grid">
            <div className="contact-info-card">
              <GoogleMap address={settings.mapLocation} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Home;
