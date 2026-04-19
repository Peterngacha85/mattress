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

  const [selectedThickness, setSelectedThickness] = useState(uniqueThicknesses[0] || '');
  const [selectedSize, setSelectedSize] = useState(allSizes[0] || '');

  // Find the actual variant object based on selected thickness
  const currentVariant = variants.find(v => v.thickness === selectedThickness) || variants[0] || {};
  
  // Find the size options for the currently selected variant
  const currentVariantSizes = currentVariant.sizes || [];
  
  // Find the price for the specifically selected size within this variant
  // Fallback to the first available size in this variant if the selected size isn't defined here
  const sizeOption = currentVariantSizes.find(s => s.size === selectedSize) || currentVariantSizes[0] || {};
  
  const displayImage = currentVariant.image || '/images/products/mattress_1.png';
  const hasMultipleThicknesses = uniqueThicknesses.length > 1;

  const handleWhatsApp = () => {
    const thicknessText = selectedThickness !== 'Standard' ? `\nThickness: ${selectedThickness}` : '';
    const message = `Hello Kisau Mattresses, I'm interested in: ${product.name}${thicknessText}\nSize: ${selectedSize}\nPrice: KES ${sizeOption.price?.toLocaleString()}`;
    const whatsappNumber = settings?.whatsappNumber || '254792581067';
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleAddToCart = () => {
    addToCart(
      product,
      selectedSize,
      sizeOption.price,
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
           <span className="currency">KES</span> {sizeOption.price?.toLocaleString()}
        </div>

        {/* Thickness Selector — Deduplicated */}
        {hasMultipleThicknesses && (
          <div className="thickness-selection">
            <label>Thickness:</label>
            <div className="thickness-grid">
              {uniqueThicknesses.map((th) => (
                <button 
                  key={th}
                  className={`thickness-btn ${selectedThickness === th ? 'active' : ''}`}
                  onClick={() => setSelectedThickness(th)}
                >
                  {th}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Size Selector — All available sizes for this product */}
        <div className="size-selection">
          <label>Select Size:</label>
          <div className="sizes-grid">
            {allSizes.map((size) => {
              // Check if this specific size exists in the currently selected thickness
              const existsInThisThickness = currentVariantSizes.some(s => s.size === size);
              return (
                <button 
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'active' : ''} ${!existsInThisThickness ? 'unavailable' : ''}`}
                  onClick={() => setSelectedSize(size)}
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
