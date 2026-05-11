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
    // Full Google Maps URL — extract place name or coordinates
    
    // 1. Try to extract place name from /place/NAME/ pattern (usually the best for showing a pin with a label)
    const placeMatch = address.match(/\/place\/([^\/?]+)/);
    // 2. Try to extract specific coordinates from !3d!4d pattern in data segment (more accurate than @ camera coords)
    const dataCoordMatch = address.match(/!3d(-?\d+\.?\d*)!4d(-?\d+\.?\d*)/);
    // 3. Try to extract camera coordinates from @lat,lng pattern
    const cameraCoordMatch = address.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/);

    if (placeMatch) {
      const placeName = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '));
      mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(placeName)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    } else if (dataCoordMatch) {
      mapUrl = `https://maps.google.com/maps?q=${dataCoordMatch[1]},${dataCoordMatch[2]}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    } else if (cameraCoordMatch) {
      mapUrl = `https://maps.google.com/maps?q=${cameraCoordMatch[1]},${cameraCoordMatch[2]}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    } else {
      // Try q= parameter
      const qMatch = address.match(/[?&]q=([^&]+)/);
      if (qMatch) {
        mapUrl = `https://maps.google.com/maps?q=${qMatch[1]}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
      } else {
        mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
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
        style={{ border: 0 }}
        src={mapUrl}
        title="Google Map"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
