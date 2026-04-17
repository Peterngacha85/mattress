import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, X, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import './ProductManagement.css';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Updated initial form state for sizeOptions
  const initialForm = {
    name: '', category: 'Heavy Duty', type: 'Moko', thickness: '8-inch', description: '', image: '',
    sizeOptions: [{ size: '4*6', price: '' }]
  };
  const [formData, setFormData] = useState(initialForm);

  const fetchProducts = async () => {
    const { data } = await api.get('/products');
    setProducts(data);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formDataFile = new FormData();
    formDataFile.append('file', file);
    setLoading(true);
    try {
      const { data } = await api.post('/upload', formDataFile);
      setFormData({ ...formData, image: data.url });
      toast.success("Image uploaded successfully");
    } catch (err) {
      // Handled by interceptor
    } finally {
      setLoading(false);
    }
  };

  // Logic to handle multiple sizes
  const addSizeOption = () => {
    setFormData({ ...formData, sizeOptions: [...formData.sizeOptions, { size: '', price: '' }] });
  };

  const removeSizeOption = (index) => {
    const updated = formData.sizeOptions.filter((_, i) => i !== index);
    setFormData({ ...formData, sizeOptions: updated });
  };

  const updateSizeOption = (index, field, value) => {
    const updated = [...formData.sizeOptions];
    updated[index][field] = value;
    setFormData({ ...formData, sizeOptions: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  const deleteProduct = async (id) => {
    if (window.confirm("Delete this product?")) {
      await api.delete(`/products/${id}`);
      toast.success("Product deleted");
      fetchProducts();
    }
  };

  return (
    <div className="product-mgmt">
      <div className="mgmt-header">
        <h2>Manage <span>Products</span></h2>
        <button className="add-btn" onClick={() => { setEditingProduct(null); setFormData(initialForm); setShowForm(true); }}>
          <Plus size={20} /> Add Product
        </button>
      </div>

      <div className="product-table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Sizes/Prices</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id}>
                <td><img src={p.image} className="table-img" alt={p.name} /></td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td className="sizes-col">
                  {p.sizeOptions?.map((s, idx) => (
                    <span key={idx} className="size-chip">{s.size}: {s.price?.toLocaleString()}</span>
                  ))}
                </td>
                <td className="actions">
                  <button onClick={() => { setEditingProduct(p); setFormData(p); setShowForm(true); }}><Edit size={18} /></button>
                  <button onClick={() => deleteProduct(p._id)} className="delete"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingProduct ? 'Edit' : 'Add'} Product</h3>
              <button onClick={() => setShowForm(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="product-form">
              <input type="text" placeholder="Product Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
              <div className="form-row">
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  <option>Heavy Duty</option>
                  <option>Standard</option>
                  <option>Moko</option>
                  <option>Superfoam</option>
                  <option>Johari Fibre</option>
                  <option>Bed Base</option>
                  <option>Pillow</option>
                </select>
                <input type="text" placeholder="Thickness (e.g. 8-inch)" value={formData.thickness} onChange={e => setFormData({...formData, thickness: e.target.value})} />
              </div>

              <div className="size-options-section">
                <div className="section-title-row">
                  <label>Size Options & Pricing</label>
                  <button type="button" onClick={addSizeOption} className="add-size-btn"><Plus size={14} /> Add Size</button>
                </div>
                {formData.sizeOptions.map((opt, idx) => (
                  <div key={idx} className="size-option-row">
                    <input type="text" placeholder="Size (e.g. 4*6)" value={opt.size} onChange={e => updateSizeOption(idx, 'size', e.target.value)} required />
                    <input type="number" placeholder="Price" value={opt.price} onChange={e => updateSizeOption(idx, 'price', e.target.value)} required />
                    {formData.sizeOptions.length > 1 && (
                      <button type="button" onClick={() => removeSizeOption(idx)} className="remove-size"><X size={16} /></button>
                    )}
                  </div>
                ))}
              </div>

              <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
              
              <div className="file-upload">
                <label>
                  <Upload size={20} /> {loading ? 'Uploading...' : 'Upload Image'}
                  <input type="file" hidden onChange={handleFileUpload} />
                </label>
                {formData.image && <img src={formData.image} alt="preview" className="preview-img" />}
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
