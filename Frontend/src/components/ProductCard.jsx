import React, { useState } from 'react';
import { ShoppingCart, Send, Star } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart, settings } = useAppContext();
  
  const variants = product.variants || [];
  
  // Get unique thickness labels and unique size labels from all variants
  const uniqueThicknesses = [...new Set(variants.map(v => v.thickness))];
  const allSizes = [...new Set(variants.flatMap(v => (v.sizes || []).map(s => s.size)))];

  // Modified logic: Use variant index for selection to handle duplicate labels (like multiple images for same thickness)
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(allSizes[0] || '');

  // Derived state based on index
  const currentVariant = variants[selectedVariantIdx] || variants[0] || {};
  const currentVariantSizes = currentVariant.sizes || [];
  
  // Smart size change handler
  const handleSizeClick = (size) => {
    setSelectedSize(size);
    // If the size doesn't exist in the CURRENT variant, try to find one that HAS it
    const hasSize = currentVariantSizes.some(s => s.size === size);
    if (!hasSize) {
      const betterVariantIdx = variants.findIndex(v => (v.sizes || []).some(s => s.size === size));
      if (betterVariantIdx !== -1) {
        setSelectedVariantIdx(betterVariantIdx);
      }
    }
  };

  const sizeOption = currentVariantSizes.find(s => s.size === selectedSize) || currentVariantSizes[0] || {};
  const displayImage = currentVariant.image || '/images/products/mattress_1.png';
  const hasMultipleVariants = variants.length > 1;

  const handleWhatsApp = () => {
    const thicknessText = currentVariant.thickness !== 'Standard' ? `\nThickness: ${currentVariant.thickness}` : '';
    const message = `Hello Kisau Mattresses, I'm interested in: ${product.name}${thicknessText}\nSize: ${selectedSize}\nPrice: KES ${sizeOption.price?.toLocaleString()}`;
    const whatsappNumber = settings?.whatsappNumber || '254792581067';
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleAddToCart = () => {
    addToCart(
      product,
      selectedSize,
      sizeOption.price,
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
           <span className="currency">KES</span> {sizeOption.price?.toLocaleString()}
        </div>

        {/* Thickness Selector — Restored and improved */}
        {hasMultipleVariants && (
          <div className="thickness-selection">
            <label>Thickness / Option:</label>
            <div className="thickness-grid">
              {variants.map((v, idx) => {
                // If there are multiple variants with SAME label, add index for clarity
                const isDuplicateLabel = variants.filter(other => other.thickness === v.thickness).length > 1;
                const label = isDuplicateLabel ? `${v.thickness} (${idx + 1})` : v.thickness;
                
                return (
                  <button 
                    key={idx}
                    className={`thickness-btn ${selectedVariantIdx === idx ? 'active' : ''}`}
                    onClick={() => setSelectedVariantIdx(idx)}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Size Selector — All available sizes for this product */}
        <div className="size-selection">
          <label>Select Size:</label>
          <div className="sizes-grid">
            {allSizes.map((size) => {
              const existsInThisThickness = currentVariantSizes.some(s => s.size === size);
              return (
                <button 
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'active' : ''} ${!existsInThisThickness ? 'unavailable' : ''}`}
                  onClick={() => handleSizeClick(size)}
                >
                  {size}
                </button>
              );
            })}
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
