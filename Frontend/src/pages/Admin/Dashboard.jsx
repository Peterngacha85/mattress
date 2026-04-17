import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Package, Settings, LogOut, LayoutDashboard } from 'lucide-react';
import ProductManagement from './ProductManagement';
import SettingsManagement from './SettingsManagement';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          KISAU<span>ADMIN</span>
        </div>
        <nav className="sidebar-nav">
          <Link to="/admin/dashboard" className={`nav-item ${isActive('dashboard') && !isActive('products') && !isActive('settings') ? 'active' : ''}`}>
            <LayoutDashboard size={20} />
            <span>Overview</span>
          </Link>
          <Link to="/admin/products" className={`nav-item ${isActive('products') ? 'active' : ''}`}>
            <Package size={20} />
            <span>Products</span>
          </Link>
          <Link to="/admin/settings" className={`nav-item ${isActive('settings') ? 'active' : ''}`}>
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
          <Route path="dashboard" element={<div className="overview-page"><h1>Welcome, Admin</h1><p>Select a section to manage your site content.</p></div>} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="settings" element={<SettingsManagement />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
