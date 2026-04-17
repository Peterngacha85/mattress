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
          <h2 className="premium-title">Moko Premium Mattresses</h2>
          <p className="premium-subtitle">
            Experience the ultimate in sleep comfort with our premium Moko mattress 
            collection. These high-quality mattresses combine innovative design with 
            superior materials for unmatched comfort and support.
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
