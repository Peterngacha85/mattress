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
    // Full Google Maps URL — extract place name, coordinates, and zoom
    
    const placeMatch = address.match(/\/place\/([^\/?]+)/);
    const dataCoordMatch = address.match(/!3d(-?\d+\.?\d*)!4d(-?\d+\.?\d*)/);
    const cameraCoordMatch = address.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/);
    const zoomMatch = address.match(/,(\d+)z/);
    
    const zoom = zoomMatch ? zoomMatch[1] : '15';
    let query = '';

    if (placeMatch) {
      // Use place name first (best for pins and labels)
      query = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '));
    } else if (dataCoordMatch) {
      // Fallback to exact coordinates
      query = `${dataCoordMatch[1]},${dataCoordMatch[2]}`;
    } else if (cameraCoordMatch) {
      // Fallback to camera coordinates
      query = `${cameraCoordMatch[1]},${cameraCoordMatch[2]}`;
    }

    if (query) {
      mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=${zoom}&ie=UTF8&iwloc=B&output=embed`;
    } else {
      mapUrl = defaultUrl;
    }
  } else {
    // Plain text address (e.g., "Ruiru, Kenya")
    mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=B&output=embed`;
  }

  console.log('GoogleMap Address:', address);
  console.log('Generated Map URL:', mapUrl);

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
