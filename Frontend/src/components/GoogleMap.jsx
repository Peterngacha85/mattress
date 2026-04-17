import React from 'react';

const GoogleMap = ({ address }) => {
  const encodedAddress = encodeURIComponent(address || 'Ruiru, Kenya');
  const mapUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="map-container" style={{ width: '100%', height: '400px', borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border)' }}>
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src={mapUrl}
        title="Google Map"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
