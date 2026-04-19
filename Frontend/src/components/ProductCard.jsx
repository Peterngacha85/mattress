import React, { useState, useEffect } from 'react';
import { ShoppingCart, Send, Star } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart, settings } = useAppContext();
  
  const variants = product.variants || [];
  
  // 1. Get unique thicknesses (Labels only)
  const uniqueThicknesses = [...new Set(variants.map(v => v.thickness))];
  
  // 2. State for selections
  const [selectedThickness, setSelectedThickness] = useState(uniqueThicknesses[0] || '');
  const [activeImage, setActiveImage] = useState('');
  
  // 3. Get all available images for the current thickness (Gallery)
  const thicknessVariants = variants.filter(v => v.thickness === selectedThickness);
  const galleryImages = thicknessVariants.map(v => v.image).filter(img => img);
  
  // 4. Update active image if thickness changes or if not set
  useEffect(() => {
    if (galleryImages.length > 0 && !galleryImages.includes(activeImage)) {
      setActiveImage(galleryImages[0]);
    }
  }, [selectedThickness, galleryImages, activeImage]);

  // 5. Get unique sizes across ALL variants for the product (Universal list)
  const allSizes = [...new Set(variants.flatMap(v => (v.sizes || []).map(s => s.size)))];
  const [selectedSize, setSelectedSize] = useState(allSizes[0] || '');

  // 6. Find the best current variant (to get price for the selected size)
  const currentVariant = thicknessVariants[0] || variants[0] || {};
  const currentVariantSizes = currentVariant.sizes || [];
  
  // Smart size change handler: finding the right thickness if needed
  const handleSizeClick = (size) => {
    setSelectedSize(size);
    const hasSize = currentVariantSizes.some(s => s.size === size);
    if (!hasSize) {
      const betterVariantIdx = variants.findIndex(v => (v.sizes || []).some(s => s.size === size));
      if (betterVariantIdx !== -1) {
        setSelectedThickness(variants[betterVariantIdx].thickness);
      }
    }
  };

  const sizeOption = currentVariantSizes.find(s => s.size === selectedSize) || currentVariantSizes[0] || {};
  const mainImage = activeImage || galleryImages[0] || '/images/products/mattress_1.png';
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
      mainImage
    );
  };

  if (variants.length === 0) return null;

  return (
    <div className="product-card">
      <div className="product-image-container">
        <div className="product-image">
          <img 
            src={mainImage} 
            alt={`${product.name} - ${selectedThickness}`}
            key={mainImage}
            className="main-display-img"
          />
          {product.isFeatured && <div className="featured-tag">Best Seller</div>}
          <div className="rating-tag">
             <Star size={12} fill="#ffc107" stroke="none" /> 4.8
          </div>
        </div>
        
        {/* Gallery Thumbnails (only if more than 1 image for this thickness) */}
        {galleryImages.length > 1 && (
          <div className="product-gallery">
            {galleryImages.map((img, idx) => (
              <div 
                key={idx} 
                className={`thumb-container ${activeImage === img ? 'active' : ''}`}
                onClick={() => setActiveImage(img)}
              >
                <img src={img} alt={`View ${idx + 1}`} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title">{product.name}</h3>
        
        <div className="price-tag">
           <span className="currency">KES</span> {sizeOption.price?.toLocaleString()}
        </div>

        {/* Thickness Selector — Clean/Unique labels */}
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

        {/* Size Selector — Safe and Stable list */}
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
