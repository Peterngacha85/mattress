import React from 'react';
import Hero from '../components/Hero';
import PremiumSection from '../components/PremiumSection';
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

      <PremiumSection />

      <section id="about" className="about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <span className="subtitle">About Us</span>
              <h2>Kisau Sleep Spot: Your <br/> Source for Quality Sleep</h2>
              <p>At Kisau Sleep Spot, we're dedicated to helping you experience the perfect sleep through premium mattresses and pillows that combine comfort, support, and durability.</p>
              <br/>
              <p>We understand that a good mattress is essential for quality sleep and overall wellbeing. That's why we offer a wide range of options to suit different preferences and needs, from orthopedic support to plush comfort.</p>
              <br/>
              <p>Located in Ruiru on Kiambu Road, our team is committed to providing exceptional customer service, free delivery in Nairobi and Kiambu, and our unique payment-after-delivery policy nationwide.</p>
              
              <button className="btn-whatsapp-about" onClick={() => window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent("Hello, I'm interested in Kisau Mattresses. Could you help me with a purchase?")}`, '_blank')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" style={{ marginRight: '8px' }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Order on WhatsApp
              </button>
            </div>
            <div className="about-image-collage">
              <div className="img-container">
                <img 
                  src={settings.aboutImage1 || "/images/products/about-mattress.png"} 
                  alt="Our team" 
                />
              </div>
              <div className="img-container">
                <img 
                  src={settings.aboutImage2 || "/images/products/mattress_2.png"} 
                  alt="Showroom" 
                />
              </div>
              <div className="img-container">
                <img 
                  src={settings.aboutImage3 || "/images/site/WhatsApp Image 2026-04-17 at 19.54.04.jpeg"} 
                  alt="Mattress setup" 
                />
              </div>
              
              <div className="about-team-card">
                <h3>Our Team</h3>
                <p>Meet our dedicated team of sleep specialists who are passionate about helping you find the perfect mattress for your needs.</p>
              </div>
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
