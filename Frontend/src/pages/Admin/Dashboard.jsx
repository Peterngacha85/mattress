import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Package, Settings, LogOut, LayoutDashboard, ClipboardList, ListTree } from 'lucide-react';
import ProductManagement from './ProductManagement';
import SettingsManagement from './SettingsManagement';
import api from '../../services/api';
import './Dashboard.css';

const AdminOverview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/products/stats');
        setStats(data);
      } catch (err) {
        console.error("Stats error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="admin-loading">Loading Dashboard Stats...</div>;

  return (
    <div className="overview-page">
      <h1>Admin <span>Overview</span></h1>
      <p>Welcome back! Here is a summary of your site's current status.</p>
      
      <div className="stats-grid">
        <div className="stat-card clickable" onClick={() => navigate('/kisauadminmattress/products')}>
          <Package className="stat-icon" />
          <div className="stat-info">
            <h3>{stats?.totalProducts || 0}</h3>
            <span>Total Products</span>
          </div>
        </div>
        <div className="stat-card clickable" onClick={() => navigate('/kisauadminmattress/categories')}>
          <ListTree className="stat-icon" />
          <div className="stat-info">
            <h3>{stats?.totalCategories || 0}</h3>
            <span>Categories</span>
          </div>
        </div>
        <div className="stat-card highlight clickable" onClick={() => navigate('/kisauadminmattress/settings')}>
          <Settings className="stat-icon" />
          <div className="stat-info">
            <h3>Live</h3>
            <span>System Status</span>
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Category Distribution</h2>
        <div className="category-counts">
          {stats?.categoryDistribution?.map(cat => (
            <div key={cat._id} className="cat-chip">
              <span className="cat-name">{cat._id}</span>
              <span className="cat-count">{cat.count} Items</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/kisauadminmattress/login');
  };

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          KISAU<span>ADMIN</span>
        </div>
        <nav className="sidebar-nav">
          <Link to="/kisauadminmattress/dashboard" className={`nav-item ${isActive('dashboard') && !isActive('products') && !isActive('settings') ? 'active' : ''}`}>
            <LayoutDashboard size={20} />
            <span>Overview</span>
          </Link>
          <Link to="/kisauadminmattress/products" className={`nav-item ${isActive('products') ? 'active' : ''}`}>
            <Package size={20} />
            <span>Products</span>
          </Link>
          <Link to="/kisauadminmattress/inventory" className={`nav-item ${isActive('inventory') ? 'active' : ''}`}>
            <ClipboardList size={20} />
            <span>Inventory</span>
          </Link>
          <Link to="/kisauadminmattress/categories" className={`nav-item ${isActive('categories') ? 'active' : ''}`}>
            <ListTree size={20} />
            <span>Categories</span>
          </Link>
          <Link to="/kisauadminmattress/settings" className={`nav-item ${isActive('settings') ? 'active' : ''}`}>
            <Settings size={20} />
            <span>Settings</span>
          </Link>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>

      <main className="dashboard-content">
        <Routes>
          <Route path="dashboard" element={<AdminOverview />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="inventory" element={<div className="overview-page"><h1>Inventory <span>Management</span></h1><ProductManagement view="inventory" /></div>} />
          <Route path="categories" element={<div className="overview-page"><h1>Product <span>Categories</span></h1><ProductManagement view="categories" /></div>} />
          <Route path="settings" element={<SettingsManagement />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
