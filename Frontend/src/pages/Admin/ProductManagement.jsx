import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, X, Upload, Image, ChevronDown, ChevronUp } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { useAppContext } from '../../context/AppContext';
import './ProductManagement.css';

const ProductManagement = ({ view = 'all' }) => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState('All');
  
  const initialForm = {
    name: '', 
    category: 'Foam Mattress', 
    subCategory: '', 
    duty: '',
    description: '',
    variants: [
      { 
        thickness: '8 Inches', 
        sizes: [{ size: '3x6', price: '', image: '' }] 
      }
    ]
  };
  const [formData, setFormData] = useState(initialForm);

  const fetchProducts = async () => {
    const { data } = await api.get('/products');
    setProducts(data);
  };

  useEffect(() => { fetchProducts(); }, []);

  const filteredProducts = filterCategory !== 'All' 
    ? products.filter(p => p.category === filterCategory)
    : products;

  // --- Variant Management ---
  const addVariant = () => {
    setFormData({ 
      ...formData, 
      variants: [...formData.variants, { thickness: '', sizes: [{ size: '', price: '', image: '' }] }] 
    });
  };

  const removeVariant = (vIdx) => {
    const updated = formData.variants.filter((_, i) => i !== vIdx);
    setFormData({ ...formData, variants: updated });
  };

  const updateVariantField = (vIdx, field, value) => {
    const updated = [...formData.variants];
    updated[vIdx][field] = value;
    setFormData({ ...formData, variants: updated });
  };

  const addSizeToVariant = (vIdx) => {
    const updated = [...formData.variants];
    updated[vIdx].sizes.push({ size: '', price: '', image: '' });
    setFormData({ ...formData, variants: updated });
  };

  const removeSizeFromVariant = (vIdx, sIdx) => {
    const updated = [...formData.variants];
    updated[vIdx].sizes = updated[vIdx].sizes.filter((_, i) => i !== sIdx);
    setFormData({ ...formData, variants: updated });
  };

  const updateSizeField = (vIdx, sIdx, field, value) => {
    const updated = [...formData.variants];
    updated[vIdx].sizes[sIdx][field] = value;
    setFormData({ ...formData, variants: updated });
  };

  // Upload image for a specific size within a variant
  const handleSizeImageUpload = async (e, vIdx, sIdx) => {
    const file = e.target.files[0];
    if (!file) return;
    const formDataFile = new FormData();
    formDataFile.append('file', file);
    setLoading(true);
    try {
      const { data } = await api.post('/upload', formDataFile);
      const updated = [...formData.variants];
      updated[vIdx].sizes[sIdx].image = data.url;
      setFormData({ ...formData, variants: updated });
      toast.success(`Image uploaded for size ${sIdx + 1}`);
    } catch (err) {
      // Handled by interceptor
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate variants and sizes
    for (let i = 0; i < formData.variants.length; i++) {
      const v = formData.variants[i];
      if (!v.thickness) {
        toast.error(`Variant ${i + 1}: Thickness is required`);
        return;
      }
      if (v.sizes.length === 0 || v.sizes.some(s => !s.size || !s.price)) {
        toast.error(`Variant ${i + 1}: All sizes must have a name and price`);
        return;
      }
    }

    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, formData);
      } else {
        await api.post('/products', formData);
      }
      setShowForm(false);
      setEditingProduct(null);
      setFormData(initialForm);
      toast.success(editingProduct ? "Product updated" : "Product added");
      fetchProducts();
    } catch (err) {
      // Handled by interceptor
    }
  };

  const { triggerConfirm } = useAppContext();

  const deleteProduct = async (id) => {
    triggerConfirm({
      title: "Delete Product?",
      message: "This action cannot be undone. Are you sure you want to remove this mattress from your shop?",
      onConfirm: async () => {
        await api.delete(`/products/${id}`);
        toast.success("Product deleted");
        fetchProducts();
      }
    });
  };

  const startEdit = (p) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      category: p.category,
      subCategory: p.subCategory,
      duty: p.duty || '',
      description: p.description,
      variants: p.variants || [{ thickness: '8 Inches', sizes: [{ size: '', price: '', image: '' }] }],
      isFeatured: p.isFeatured
    });
    setShowForm(true);
  };

  // Derived categories from products to ensure consistency
  const dynamicCategories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];

  // Helper to get display image (first variant's first size image)
  const getDisplayImage = (product) => {
    return product.variants?.[0]?.sizes?.[0]?.image || '/images/products/mattress_1.png';
  };

  // Helper to summarize sizes/prices from all variants
  const getVariantSummary = (product) => {
    return (product.variants || []).map((v, i) => (
      <div key={i} className="variant-summary-row">
        <span className="thickness-label">{v.thickness}</span>
        <div className="size-chips">
          {v.sizes?.map((s, j) => (
            <span key={j} className="size-chip">{s.size}: {s.price?.toLocaleString()}</span>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="product-mgmt">
      <div className="mgmt-header">
        <h2>
          {view === 'all' ? 'Manage ' : view === 'inventory' ? 'Inventory ' : 'Category '}
          <span>{view === 'all' ? 'Products' : view === 'inventory' ? 'Lookup' : 'Filter'}</span>
        </h2>
        
        {view === 'all' && (
          <button className="add-btn" onClick={() => { setEditingProduct(null); setFormData(initialForm); setShowForm(true); }}>
            <Plus size={20} /> Add Product
          </button>
        )}

        {(view === 'all' || view === 'categories') && (
          <div className="category-filter">
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              {dynamicCategories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        )}
      </div>

      <div className="product-table-container">
        <table className="product-table">
          <thead>
            <tr>
               <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Brand / Type</th>
              <th>Variants (Sizes & Prices)</th>
              {view === 'all' && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(p => (
              <tr key={p._id}>
                <td data-label="Image"><img src={getDisplayImage(p)} className="table-img" alt={p.name} /></td>
                <td data-label="Name">{p.name}</td>
                <td data-label="Category">{p.category}</td>
                <td data-label="Brand / Type">
                  {p.subCategory} {p.duty && <span className="duty-badge">{p.duty}</span>}
                </td>
                <td data-label="Variants" className="sizes-col">
                  {getVariantSummary(p)}
                </td>
                {view === 'all' && (
                  <td data-label="Actions" className="actions">
                    <button onClick={() => startEdit(p)}><Edit size={18} /></button>
                    <button onClick={() => deleteProduct(p._id)} className="delete"><Trash2 size={18} /></button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content variant-modal">
            <div className="modal-header">
              <h3>{editingProduct ? 'Edit' : 'Add'} Product</h3>
              <button onClick={() => setShowForm(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="product-form">
              <input type="text" placeholder="Product Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
              
              <div className="form-row">
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value, subCategory: '', duty: ''})}>
                  <option>Foam Mattress</option>
                  <option>Spring Mattress</option>
                  <option>Fibre Mattress</option>
                  <option>Pillow</option>
                  <option>Bed Base</option>
                </select>

                {formData.category === 'Foam Mattress' && (
                  <select value={formData.subCategory} onChange={e => setFormData({...formData, subCategory: e.target.value})}>
                    <option value="">Select Brand</option>
                    <option>Morning Glory</option>
                    <option>Moko</option>
                  </select>
                )}

                {formData.category === 'Spring Mattress' && (
                  <select value={formData.subCategory} onChange={e => setFormData({...formData, subCategory: e.target.value})}>
                    <option value="">Select Brand</option>
                    <option>Maharaja</option>
                    <option>Mimi</option>
                    <option>Dura Poa</option>
                    <option>Orthobliss</option>
                  </select>
                )}

                {formData.category === 'Fibre Mattress' && (
                  <select value={formData.subCategory} onChange={e => setFormData({...formData, subCategory: e.target.value})}>
                    <option value="">Select Brand</option>
                    <option>Johari</option>
                    <option>Sicily</option>
                  </select>
                )}

                {formData.category === 'Pillow' && (
                  <select value={formData.subCategory} onChange={e => setFormData({...formData, subCategory: e.target.value})}>
                    <option value="">Select Brand</option>
                    <option>Morning Glory</option>
                    <option>Johari</option>
                    <option>Mimi</option>
                    <option>Luxury</option>
                  </select>
                )}
              </div>

              {(formData.subCategory === 'Morning Glory' || formData.subCategory === 'Moko') && (
                <div className="form-row">
                  <select value={formData.duty} onChange={e => setFormData({...formData, duty: e.target.value})}>
                    <option value="">Select Duty</option>
                    {formData.subCategory === 'Morning Glory' ? (
                      <>
                        <option>Heavy Duty</option>
                        <option>Medium Duty</option>
                      </>
                    ) : (
                      <>
                        <option>Heavy</option>
                        <option>Medium</option>
                      </>
                    )}
                  </select>
                </div>
              )}

              <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />

              {/* Variant Builder */}
              <div className="variants-builder">
                <div className="section-title-row">
                  <label>Product Variants</label>
                  <button type="button" onClick={addVariant} className="add-variant-btn">
                    <Plus size={14} /> Add Thickness Variant
                  </button>
                </div>

                {formData.variants.map((variant, vIdx) => (
                  <div key={vIdx} className="variant-card">
                    <div className="variant-card-header">
                      <span className="variant-number">Variant {vIdx + 1}</span>
                      {formData.variants.length > 1 && (
                        <button type="button" onClick={() => removeVariant(vIdx)} className="remove-variant-btn">
                          <Trash2 size={14} /> Remove
                        </button>
                      )}
                    </div>
                                        <div className="variant-top-row">
                      <input 
                        type="text" 
                        placeholder="Thickness (e.g. 8 Inches)" 
                        value={variant.thickness} 
                        onChange={e => updateVariantField(vIdx, 'thickness', e.target.value)} 
                        className="thickness-input"
                        required 
                      />
                    </div>

                    <div className="variant-sizes-section">
                      <div className="sizes-header-row">
                        <span>Sizes & Prices</span>
                        <button type="button" onClick={() => addSizeToVariant(vIdx)} className="add-size-btn">
                          <Plus size={12} /> Add Size
                        </button>
                      </div>
                       {variant.sizes.map((sizeOpt, sIdx) => (
                        <div key={sIdx} className="size-option-card">
                          <div className="size-option-row">
                            <input 
                              type="text" 
                              placeholder="Size (e.g. 4x6)" 
                              value={sizeOpt.size} 
                              onChange={e => updateSizeField(vIdx, sIdx, 'size', e.target.value)} 
                              required 
                            />
                            <input 
                              type="number" 
                              placeholder="Price" 
                              value={sizeOpt.price} 
                              onChange={e => updateSizeField(vIdx, sIdx, 'price', e.target.value)} 
                              required 
                            />
                            {variant.sizes.length > 1 && (
                              <button type="button" onClick={() => removeSizeFromVariant(vIdx, sIdx)} className="remove-size">
                                <X size={16} />
                              </button>
                            )}
                          </div>
                          <div className="size-image-upload">
                            <label className={`size-upload-btn ${loading ? 'disabled' : ''}`}>
                              <Upload size={14} />
                              {sizeOpt.image ? 'Change Size Image' : 'Upload Size Image'}
                              <input type="file" hidden onChange={(e) => handleSizeImageUpload(e, vIdx, sIdx)} accept="image/*" />
                            </label>
                            {sizeOpt.image && (
                              <img src={sizeOpt.image} alt={`Size ${sIdx + 1}`} className="size-preview-img" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="form-row featured-row">
                <label className="featured-toggle">
                  <input 
                    type="checkbox" 
                    checked={formData.isFeatured || false} 
                    onChange={e => setFormData({...formData, isFeatured: e.target.checked})} 
                  />
                  <span>Featured Product (Best Seller)</span>
                </label>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Processing...' : editingProduct ? 'Update Product' : 'Add Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
