import React from 'react';

const GoogleMap = ({ address }) => {
  let mapUrl = '';
  const defaultUrl = `https://maps.google.com/maps?q=-1.1506324,36.9397432&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  if (!address) {
    mapUrl = defaultUrl;
  } else if (address.includes('<iframe') && address.includes('src=')) {
    // Raw iframe embed code pasted by admin
    const match = address.match(/src="([^"]+)"/);
    mapUrl = match && match[1] ? match[1] : defaultUrl;
  } else if (address.includes('google.com/maps/embed')) {
    // Direct embed URL
    mapUrl = address;
  } else if (address.includes('maps.app.goo.gl') || address.includes('goo.gl/maps')) {
    // Google Maps short link — use it as search query (short links can't be embedded directly)
    mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  } else if (address.includes('google.com/maps/place') || address.includes('google.com/maps?') || address.includes('google.com/maps/@')) {
    // Full Google Maps URL — extract coordinates or place name
    // Try to extract coordinates from @lat,lng pattern
    const coordMatch = address.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/);
    if (coordMatch) {
      mapUrl = `https://maps.google.com/maps?q=${coordMatch[1]},${coordMatch[2]}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    } else {
      // Try to extract place name from /place/NAME/ pattern
      const placeMatch = address.match(/\/place\/([^\/]+)/);
      if (placeMatch) {
        const placeName = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '));
        mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(placeName)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
      } else {
        // Try q= parameter
        const qMatch = address.match(/[?&]q=([^&]+)/);
        if (qMatch) {
          mapUrl = `https://maps.google.com/maps?q=${qMatch[1]}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
        } else {
          mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
        }
      }
    }
  } else {
    // Plain text address (e.g., "Ruiru, Kenya")
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
