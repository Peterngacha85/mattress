import React, { useState } from 'react';
import { ShoppingCart, Send, Star } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart, settings } = useAppContext();
  
  // Initialize with first variant and first size
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedSizeIdx, setSelectedSizeIdx] = useState(0);

  const variants = product.variants || [];
  const currentVariant = variants[selectedVariantIdx] || {};
  const currentSizes = currentVariant.sizes || [];
  const currentSize = currentSizes[selectedSizeIdx] || {};
  const displayImage = currentVariant.image || '/images/products/mattress_1.png';
  const hasMultipleThicknesses = variants.length > 1;

  const handleVariantChange = (idx) => {
    setSelectedVariantIdx(idx);
    setSelectedSizeIdx(0); // Reset size when thickness changes
  };

  const handleWhatsApp = () => {
    const thicknessText = currentVariant.thickness !== 'Standard' ? `\nThickness: ${currentVariant.thickness}` : '';
    const message = `Hello Kisau Mattresses, I'm interested in: ${product.name}${thicknessText}\nSize: ${currentSize.size}\nPrice: KES ${currentSize.price?.toLocaleString()}`;
    const whatsappNumber = settings?.whatsappNumber || '254792581067';
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleAddToCart = () => {
    addToCart(
      product,
      currentSize.size,
      currentSize.price,
      currentVariant.thickness,
      displayImage
    );
  };

  if (variants.length === 0) return null;

  return (
    <div className="product-card">
      <div className="product-image">
        <img 
          src={displayImage} 
          alt={`${product.name} - ${currentVariant.thickness}`}
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
           <span className="currency">KES</span> {currentSize.price?.toLocaleString()}
        </div>

        {/* Thickness Selector — only shown if multiple variants */}
        {hasMultipleThicknesses && (
          <div className="thickness-selection">
            <label>Thickness:</label>
            <div className="thickness-grid">
              {variants.map((variant, idx) => (
                <button 
                  key={idx}
                  className={`thickness-btn ${selectedVariantIdx === idx ? 'active' : ''}`}
                  onClick={() => handleVariantChange(idx)}
                >
                  {variant.thickness}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Size Selector */}
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
