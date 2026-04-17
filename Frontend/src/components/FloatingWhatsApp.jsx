import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './FloatingWhatsApp.css';

const FloatingWhatsApp = () => {
  const { settings } = useAppContext();
  
  const handleWhatsAppClick = () => {
    const message = "Hello, I'm interested in Kisau Mattresses. Could you help me with a purchase?";
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="floating-whatsapp" onClick={handleWhatsAppClick}>
      <div className="whatsapp-label">Order on WhatsApp</div>
      <div className="whatsapp-icon">
        <MessageCircle size={24} fill="white" />
      </div>
    </div>
  );
};

export default FloatingWhatsApp;
