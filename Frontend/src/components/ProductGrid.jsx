import React, { useState } from 'react';
import { Search, ChevronDown, SlidersHorizontal, Star } from 'lucide-react';
import ProductCard from './ProductCard';
import { useAppContext } from '../context/AppContext';
import './ProductGrid.css';

const ProductGrid = () => {
  const { products, loading, searchTerm, setSearchTerm } = useAppContext();
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [activeType, setActiveType] = useState('All');
  const [activeThickness, setActiveThickness] = useState('All');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 50000]);

  const categories = ['Heavy Duty Quilted', 'Superfoam Morning Glory', 'Moko', 'Johari Fibre', 'Orthopedic', 'Bed Base', 'Pillows'];
  const types = ['High-Density', 'Memory Foam', 'Medium Duty', 'Orthopedic', 'Heavy Duty', 'Furniture'];
  const thicknesses = ['6 Inches', '8 Inches', '10 Inches', '12 Inches', '14 Inches', 'Other'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'ALL' || product.category === activeCategory;
    const matchesType = activeType === 'All' || product.type === activeType;
    const matchesThickness = activeThickness === 'All' || product.thickness === activeThickness;
    
    // Price range logic (checks all size options)
    const minPrice = Math.min(...product.sizeOptions.map(o => o.price));
    const maxPrice = Math.max(...product.sizeOptions.map(o => o.price));
    const matchesPrice = minPrice >= priceRange[0] && minPrice <= priceRange[1];

    return matchesSearch && matchesCategory && matchesType && matchesThickness && matchesPrice;
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
            <div className="filter-options-title">
              <div className="left">
                <SlidersHorizontal size={18} className="icon-red" />
                <span>Filter Options</span>
              </div>
              <button 
                className="reset-text-btn" 
                onClick={() => {
                  setActiveCategory('ALL'); setActiveType('All'); setActiveThickness('All'); 
                  setSearchTerm(''); setPriceRange([0, 50000]);
                }}
              >
                Reset
              </button>
            </div>
            
            <div className="filter-grid">
              <div className="filter-col">
                <h4>Category</h4>
                <div className="scroll-list">
                  <button className={activeCategory === 'ALL' ? 'active' : ''} onClick={() => setActiveCategory('ALL')}>All Categories</button>
                  {categories.map(c => (
                    <button key={c} className={activeCategory === c ? 'active' : ''} onClick={() => setActiveCategory(c)}>{c}</button>
                  ))}
                </div>
              </div>
              <div className="filter-col">
                <h4>Type</h4>
                <div className="scroll-list">
                  <button className={activeType === 'All' ? 'active' : ''} onClick={() => setActiveType('All')}>All Types</button>
                  {types.map(t => (
                    <button key={t} className={activeType === t ? 'active' : ''} onClick={() => setActiveType(t)}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="filter-col">
                <h4>Thickness</h4>
                <div className="scroll-list">
                  <button className={activeThickness === 'All' ? 'active' : ''} onClick={() => setActiveThickness('All')}>All Thicknesses</button>
                  {thicknesses.map(th => (
                    <button key={th} className={activeThickness === th ? 'active' : ''} onClick={() => setActiveThickness(th)}>{th}</button>
                  ))}
                </div>
              </div>
              <div className="filter-col">
                 <h4>Price Range (KES)</h4>
                 <div className="price-filter-control">
                    <div className="price-inputs">
                      <div className="price-input-box">{priceRange[0]}</div>
                      <span>-</span>
                      <div className="price-input-box">{priceRange[1]}</div>
                    </div>
                    <div className="range-slider-wrapper">
                      <input 
                        type="range" 
                        min="0" 
                        max="50000" 
                        step="500"
                        value={priceRange[1]} 
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="custom-range-slider"
                      />
                      <div className="range-labels">
                        <span>KES 0</span>
                        <span>KES 50,000</span>
                      </div>
                    </div>
                 </div>
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
