import React from 'react';
import { useAppContext } from '../context/AppContext';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const PremiumSection = () => {
  const { products } = useAppContext();
  
  // Get the products marked as featured
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 2);

  if (featuredProducts.length === 0) return null;

  return (
    <section className="premium-section">
      <div className="container">
        <div className="premium-header">
          <h2 className="premium-title">Featured Premium Collection</h2>
          <p className="premium-subtitle">
            Experience the ultimate in sleep comfort with our selected premium 
            mattress range. These high-quality mattresses combine innovative design with 
            superior materials for unmatched comfort, support, and long-lasting durability.
          </p>
        </div>

        <div className="premium-grid">
          {featuredProducts.map(product => (
            <div key={product._id} className="premium-card">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumSection;
