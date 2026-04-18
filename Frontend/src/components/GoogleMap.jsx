import React from 'react';

const GoogleMap = ({ address }) => {
  let mapUrl = '';
  const defaultUrl = `https://maps.google.com/maps?q=-1.1506324,36.9397432&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  if (!address) {
    mapUrl = defaultUrl;
  } else if (address.includes('<iframe') && address.includes('src=')) {
    const match = address.match(/src="([^"]+)"/);
    mapUrl = match && match[1] ? match[1] : defaultUrl;
  } else if (address.includes('google.com/maps/embed')) {
    mapUrl = address;
  } else {
    mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  }

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
