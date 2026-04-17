import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import './styles/theme.css';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Login from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import FloatingAudio from './components/FloatingAudio';
import FloatingWhatsApp from './components/FloatingWhatsApp';

// Helper component to hide public elements on admin pages
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/kisauadminmattress');

  return (
    <>
      {!isAdmin && <Navbar />}
      {children}
      {!isAdmin && <FloatingAudio />}
      {!isAdmin && <FloatingWhatsApp />}
    </>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <LayoutWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/kisauadminmattress/login" element={<Login />} />
            <Route path="/kisauadminmattress/*" element={<AdminDashboard />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </LayoutWrapper>
        <Toaster position="top-right" />
      </Router>
    </AppProvider>
  );
}

export default App;
