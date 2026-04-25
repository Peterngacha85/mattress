import React from 'react';
import './TeamCarousel.css';

const teamImages = [
  '/OUR TEAM IMAGE/74ac676e-0f2c-4d82-8756-6ba4ac76abb1.png',
  '/OUR TEAM IMAGE/ozcpuxmahz7qht3j2mcv.png',
  '/OUR TEAM IMAGE/shctvrqhgz5dctc67hg7.png',
  '/OUR TEAM IMAGE/zxhr0j7nc8bmumzfa3dw.png'
];

const TeamCarousel = () => {
  // Duplicate the images to create a seamless loop
  const displayImages = [...teamImages, ...teamImages];

  return (
    <div className="team-carousel-container">
      <div className="team-carousel-track">
        {displayImages.map((src, index) => (
          <div className="team-carousel-slide" key={index}>
            <img src={src} alt={`Team member ${index + 1}`} />
          </div>
        ))}
      </div>
      
      <div className="team-overlay-card">
        <h3>Our Team</h3>
        <p>Meet our dedicated team of sleep specialists who are passionate about helping you find the perfect mattress for your needs.</p>
      </div>
    </div>
  );
};

export default TeamCarousel;
