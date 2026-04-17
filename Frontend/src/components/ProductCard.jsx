import React, { useState } from 'react';
import { ShoppingCart, Send, Star } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useAppContext();
  const [selectedSize, setSelectedSize] = useState(product.sizeOptions[0]);

  const handleWhatsApp = () => {
    const message = `Hello Kisau Mattresses, I'm interested in: ${product.name}\nSize: ${selectedSize.size}\nPrice: KES ${selectedSize.price}`;
    window.open(`https://wa.me/254792581067?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        {product.isFeatured && <div className="featured-tag">Best Seller</div>}
        <div className="rating-tag">
           <Star size={12} fill="#ffc107" stroke="none" /> 4.8
        </div>
      </div>

      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title">{product.name}</h3>
        
        <div className="price-tag">
           <span className="currency">KES</span> {selectedSize.price.toLocaleString()}
        </div>

        <div className="size-selection">
          <label>Select Size:</label>
          <div className="sizes-grid">
            {product.sizeOptions.map((option, idx) => (
              <button 
                key={idx}
                className={`size-btn ${selectedSize.size === option.size ? 'active' : ''}`}
                onClick={() => setSelectedSize(option)}
              >
                {option.size}
              </button>
            ))}
          </div>
        </div>

        <div className="card-actions">
          <button className="btn-cart" onClick={() => addToCart(product, selectedSize)}>
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
