import React, { useState } from 'react';
import { Search, ChevronDown, SlidersHorizontal, Star } from 'lucide-react';
import ProductCard from './ProductCard';
import { useAppContext } from '../context/AppContext';
import './ProductGrid.css';

const ProductGrid = () => {
  const { products, loading } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [activeType, setActiveType] = useState('All');
  const [activeThickness, setActiveThickness] = useState('All');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const categories = ['ALL', 'HEAVY DUTY', 'STANDARD', 'PILLOW', 'BED BASE', 'MOKO', 'SPRING'];
  const types = ['All', 'High-Density', 'Memory Foam', 'Orthopedic', 'Medium Duty', 'Spring'];
  const thicknesses = ['All', '6 Inches', '8 Inches', '10 Inches', '12 Inches'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'ALL' || product.category.toUpperCase().includes(activeCategory);
    const matchesType = activeType === 'All' || product.type === activeType;
    const matchesThickness = activeThickness === 'All' || product.thickness === activeThickness;
    return matchesSearch && matchesCategory && matchesType && matchesThickness;
  });

  if (loading) return <div className="loading-state">Loading Selection...</div>;

  return (
    <div className="collection-wrapper">
      {/* Advanced Filter Layout (1:1 Match) */}
      <div className="advanced-filter-container">
        <div className="filter-header">
           <div className="search-pill">
              <Search size={18} className="icon" />
              <input 
                type="text" 
                placeholder="Search by name or features..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <button className="advanced-toggle" onClick={() => setShowAdvanced(!showAdvanced)}>
              <SlidersHorizontal size={18} />
              <span>Advanced Filters</span>
           </button>
        </div>

        {showAdvanced && (
          <div className="expanded-filters animate-fade-in">
            <div className="filter-grid">
              <div className="filter-col">
                <h4>Category</h4>
                <div className="filter-list">
                  {categories.map(c => (
                    <button key={c} className={activeCategory === c ? 'active' : ''} onClick={() => setActiveCategory(c)}>{c}</button>
                  ))}
                </div>
              </div>
              <div className="filter-col">
                <h4>Type</h4>
                <div className="filter-list">
                  {types.map(t => (
                    <button key={t} className={activeType === t ? 'active' : ''} onClick={() => setActiveType(t)}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="filter-col">
                <h4>Thickness</h4>
                <div className="filter-list">
                  {thicknesses.map(th => (
                    <button key={th} className={activeThickness === th ? 'active' : ''} onClick={() => setActiveThickness(th)}>{th}</button>
                  ))}
                </div>
              </div>
              <div className="filter-col">
                 <h4>Quick Actions</h4>
                 <button className="reset-btn" onClick={() => {
                   setActiveCategory('ALL'); setActiveType('All'); setActiveThickness('All'); setSearchTerm('');
                 }}>Reset All Filters</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Category Tabs (Shortcut) */}
      <div className="category-scroll hide-scrollbar">
        {categories.slice(0, 6).map(cat => (
          <button 
            key={cat} 
            className={`tab-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-results">
          <p>No mattresses found matching your criteria. Try resetting filters.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
