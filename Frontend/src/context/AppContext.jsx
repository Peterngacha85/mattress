import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [settings, setSettings] = useState({
    whatsappNumber: '0716462683',
    mapLocation: 'Ruiru, Kenya',
    heroBgImage: '',
    audioTracks: []
  });
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem('kisau_theme') || 'dark');
  const [isCartPopupOpen, setIsCartPopupOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState(null);

  useEffect(() => {
    localStorage.setItem('kisau_theme', theme);
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light-theme');
    } else {
      root.classList.remove('light-theme');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  // Cart State with LocalStorage Persistence
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('kisau_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('kisau_cart', JSON.stringify(cart));
  }, [cart]);

  const fetchData = async () => {
    try {
      const [prodRes, settRes] = await Promise.all([
        api.get('/products'),
        api.get('/settings')
      ]);
      setProducts(prodRes.data);
      setSettings(settRes.data);
    } catch (err) {
      console.error("Data fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const addToCart = (product, selectedSize, selectedPrice) => {
    setCart(prev => {
      // Check if item with same size already exists
      const existing = prev.find(item => item._id === product._id && item.size === selectedSize);
      if (existing) {
        return prev.map(item => 
          (item._id === product._id && item.size === selectedSize) 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, size: selectedSize, price: selectedPrice, quantity: 1 }];
    });
    setLastAddedItem({ ...product, size: selectedSize, price: selectedPrice });
    setIsCartPopupOpen(true);
  };

  const closeCartPopup = () => setIsCartPopupOpen(false);

  const removeFromCart = (productId, size) => {
    setCart(prev => prev.filter(item => !(item._id === productId && item.size === size)));
  };

  const updateQuantity = (productId, size, qty) => {
    if (qty < 1) return removeFromCart(productId, size);
    setCart(prev => prev.map(item => 
      (item._id === productId && item.size === size) ? { ...item, quantity: qty } : item
    ));
  };

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider value={{ 
      products, settings, loading, 
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      fetchData, theme, toggleTheme,
      isCartPopupOpen, lastAddedItem, closeCartPopup
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
