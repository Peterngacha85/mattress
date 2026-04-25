import React, { useState } from 'react';
import { ShoppingCart, Send, Star } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart, settings } = useAppContext();
  
  const variants = product.variants || [];
  
  // 1. Get unique thicknesses (This fixes the "duplicate buttons" issue)
  const uniqueThicknesses = [...new Set(variants.map(v => v.thickness))];
  
  // 2. State for selections
  const [selectedThickness, setSelectedThickness] = useState(uniqueThicknesses[0] || '');
  
  // 3. Current Variant (the one matching the selected thickness)
  const currentVariant = variants.find(v => v.thickness === selectedThickness) || variants[0] || {};
  
  // 4. Sizes available for THIS specific thickness
  const currentSizes = currentVariant.sizes || [];
  
  // 5. State for selected size (Reset to first available when thickness changes)
  const [selectedSizeIdx, setSelectedSizeIdx] = useState(0);
  const currentSizeOption = currentSizes[selectedSizeIdx] || currentSizes[0] || {};

  const handleThicknessChange = (th) => {
    setSelectedThickness(th);
    setSelectedSizeIdx(0); // Always start with the first size of that thickness
  };

  const displayImage = currentSizeOption.image || '/images/products/mattress_1.png';
  const hasMultipleThicknesses = uniqueThicknesses.length > 1;

  const handleWhatsApp = () => {
    const thicknessText = selectedThickness !== 'Standard' ? `\nThickness: ${selectedThickness}` : '';
    const message = `Hello Kisau Mattresses, I'm interested in: ${product.name}${thicknessText}\nSize: ${currentSizeOption.size}\nPrice: KES ${currentSizeOption.price?.toLocaleString()}`;
    const whatsappNumber = settings?.whatsappNumber || '254792581067';
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleAddToCart = () => {
    addToCart(
      product,
      currentSizeOption.size,
      currentSizeOption.price,
      selectedThickness,
      displayImage
    );
  };

  if (variants.length === 0) return null;

  return (
    <div className="product-card">
      <div className="product-image">
        <img 
          src={displayImage} 
          alt={`${product.name} - ${selectedThickness}`}
          key={displayImage}
        />
        {product.isFeatured && <div className="featured-tag">Best Seller</div>}
        <div className="rating-tag">
           <Star size={12} fill="#ffc107" stroke="none" /> 4.8
        </div>
      </div>

      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title">{product.name}</h3>
        
        <div className="price-tag">
           <span className="currency">KES</span> {currentSizeOption.price?.toLocaleString()}
        </div>

        {/* Thickness Selector — Clean and Unique labels like "Johari" */}
        {hasMultipleThicknesses && (
          <div className="thickness-selection">
            <label>Thickness:</label>
            <div className="thickness-grid">
              {uniqueThicknesses.map((th) => (
                <button 
                  key={th}
                  className={`thickness-btn ${selectedThickness === th ? 'active' : ''}`}
                  onClick={() => handleThicknessChange(th)}
                >
                  {th}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Size Selector — Shows sizes for the selected thickness */}
        <div className="size-selection">
          <label>Select Size:</label>
          <div className="sizes-grid">
            {currentSizes.map((option, idx) => (
              <button 
                key={idx}
                className={`size-btn ${selectedSizeIdx === idx ? 'active' : ''}`}
                onClick={() => setSelectedSizeIdx(idx)}
              >
                {option.size}
              </button>
            ))}
          </div>
        </div>

        <div className="card-actions">
          <button className="btn-cart" onClick={handleAddToCart}>
            <ShoppingCart size={18} /> Add to Cart
          </button>
          <button className="btn-whatsapp" onClick={handleWhatsApp}>
             <Send size={18} /> Order Now
          </button>
        </div>
        <p className="color-hint">Colors available via WhatsApp</p>
      </div>
    </div>
  );
};

export default ProductCard;
