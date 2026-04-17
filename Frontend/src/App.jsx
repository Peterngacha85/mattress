import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import './styles/theme.css';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Login from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import FloatingAudio from './components/FloatingAudio';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import CartPopup from './components/CartPopup';

// Client Layout: Includes Navbar and Floating UI
const ClientLayout = ({ children }) => (
  <div className="client-layout">
    <Navbar />
    {children}
    {/* Floating buttons only for client view */}
    <FloatingAudio />
    <FloatingWhatsApp />
    <CartPopup />
  </div>
);

// Admin Layout: Clean slate for the dashboard
const AdminLayout = ({ children }) => (
  <div className="admin-layout">
    {children}
  </div>
);

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Public Client Routes */}
          <Route path="/" element={<ClientLayout><Home /></ClientLayout>} />
          <Route path="/cart" element={<ClientLayout><Cart /></ClientLayout>} />

          {/* Admin Routes */}
          <Route path="/kisauadminmattress/login" element={<AdminLayout><Login /></AdminLayout>} />
          <Route 
            path="/kisauadminmattress/*" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          {/* Catch-all 404 Route */}
          <Route path="*" element={<ClientLayout><NotFound /></ClientLayout>} />
        </Routes>
        <Toaster position="top-right" />
      </Router>
    </AppProvider>
  );
}

export default App;
