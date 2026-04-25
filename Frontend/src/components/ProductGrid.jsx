import React, { useState } from 'react';
import { Search, ChevronDown, SlidersHorizontal, Star } from 'lucide-react';
import ProductCard from './ProductCard';
import { useAppContext } from '../context/AppContext';
import './ProductGrid.css';

const ProductGrid = () => {
  const { products, loading, searchTerm, setSearchTerm } = useAppContext();
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [activeSubCategory, setActiveSubCategory] = useState('All');
  const [activeDuty, setActiveDuty] = useState('All');
  const [activeThickness, setActiveThickness] = useState('All');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100000]);

  // Dynamically collect unique categories and types from the actual product data
  const categories = ['ALL', ...new Set(products.map(p => p.category))].sort((a, b) => a === 'ALL' ? -1 : b === 'ALL' ? 1 : a.localeCompare(b));
  const subCategories = ['All', ...new Set(products.map(p => p.subCategory))].sort((a, b) => a === 'All' ? -1 : b === 'All' ? 1 : a.localeCompare(b));
  const duties = ['All', ...new Set(products.map(p => p.duty).filter(Boolean))].sort();
  
  // Dynamically collect all thicknesses from product variants
  const allThicknesses = [...new Set(
    products.flatMap(p => (p.variants || []).map(v => v.thickness))
  )].filter(t => t && t !== 'Standard').sort();

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'ALL' || product.category === activeCategory;
    const matchesSubCategory = activeSubCategory === 'All' || product.subCategory === activeSubCategory;
    const matchesDuty = activeDuty === 'All' || product.duty === activeDuty;
    
    // Thickness filter: check if any variant matches the selected thickness
    const matchesThickness = activeThickness === 'All' || 
      (product.variants || []).some(v => v.thickness === activeThickness);
    
    // Price range logic: check all prices across all variants
    const allPrices = (product.variants || []).flatMap(v => (v.sizes || []).map(s => s.price));
    const minPrice = allPrices.length > 0 ? Math.min(...allPrices) : 0;
    const matchesPrice = minPrice >= priceRange[0] && minPrice <= priceRange[1];

    return matchesSearch && matchesCategory && matchesSubCategory && matchesDuty && matchesThickness && matchesPrice;
  });

  if (loading) return <div className="loading-state">Loading Selection...</div>;

  return (
    <div className="collection-wrapper">
      {/* Advanced Filter Layout */}
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
                  setActiveCategory('ALL'); setActiveSubCategory('All'); setActiveDuty('All'); setActiveThickness('All'); 
                  setSearchTerm(''); setPriceRange([0, 100000]);
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
                <h4>Brand / Type</h4>
                <div className="scroll-list">
                  <button className={activeSubCategory === 'All' ? 'active' : ''} onClick={() => setActiveSubCategory('All')}>All Brands</button>
                  {subCategories.map(sc => (
                    <button key={sc} className={activeSubCategory === sc ? 'active' : ''} onClick={() => setActiveSubCategory(sc)}>{sc}</button>
                  ))}
                </div>
              </div>
              <div className="filter-col">
                <h4>Duty / Quality</h4>
                <div className="scroll-list">
                  <button className={activeDuty === 'All' ? 'active' : ''} onClick={() => setActiveDuty('All')}>All Duties</button>
                  {duties.map(d => (
                    <button key={d} className={activeDuty === d ? 'active' : ''} onClick={() => setActiveDuty(d)}>{d}</button>
                  ))}
                </div>
              </div>
              <div className="filter-col">
                <h4>Thickness</h4>
                <div className="scroll-list">
                  <button className={activeThickness === 'All' ? 'active' : ''} onClick={() => setActiveThickness('All')}>All Thicknesses</button>
                  {allThicknesses.map(th => (
                    <button key={th} className={activeThickness === th ? 'active' : ''} onClick={() => setActiveThickness(th)}>{th}</button>
                  ))}
                </div>
              </div>
              <div className="filter-col">
                 <h4>Price Range (KES)</h4>
                 <div className="price-filter-control">
                    <div className="price-inputs">
                      <div className="price-input-box">{priceRange[0].toLocaleString()}</div>
                      <span>-</span>
                      <div className="price-input-box">{priceRange[1].toLocaleString()}</div>
                    </div>
                    <div className="range-slider-wrapper">
                      <input 
                        type="range" 
                        min="0" 
                        max="100000" 
                        step="1000"
                        value={priceRange[1]} 
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="custom-range-slider"
                      />
                      <div className="range-labels">
                        <span>KES 0</span>
                        <span>KES 100,000</span>
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
        {categories.filter(c => c !== 'ALL').slice(0, 8).map(cat => (
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
