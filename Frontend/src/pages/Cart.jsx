import React from 'react';
import { Trash2, Plus, Minus, Send, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import './Cart.css';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, settings } = useAppContext();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KSh',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    let message = "🛒 *Order Inquiry - Kisau Mattresses*\n\n";
    cart.forEach(item => {
      message += `• ${item.name}\n  Size: *${item.size}*\n  Qty: ${item.quantity}\n  Price: ${formatPrice(item.price * item.quantity)}\n\n`;
    });
    message += `💰 *Total: ${formatPrice(total)}*\n\n`;
    message += "Is this order available for delivery?";

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodedMessage}`, '_blank');
    
    // Clear cart after checkout as requested
    clearCart();
    toast.success("Order request sent! Cart cleared.");
  };

  if (cart.length === 0) {
    return (
      <div className="empty-cart-page container">
        <div className="empty-content">
          <ShoppingBag size={64} className="empty-icon" />
          <h1>Your Cart is <span>Empty</span></h1>
          <p>Browse our premium collection to add some mattresses to your cart.</p>
          <Link to="/" className="btn btn-primary">
            <ArrowLeft size={18} /> Back to Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-wrapper">
      <div className="container">
        <h1 className="page-title">Shopping <span>Cart</span></h1>
        
        <div className="cart-grid">
          <div className="cart-list-container">
            <div className="cart-items-header">
              <span>Product Details</span>
              <span>Quantity</span>
              <span>Total Price</span>
            </div>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={`${item._id}-${item.size}`} className="cart-item">
                  <div className="item-main">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="item-info">
                      <h3>{item.name}</h3>
                      <p className="item-variant">Size: <span>{item.size}</span></p>
                      <p className="item-price-unit">{formatPrice(item.price)}</p>
                      <button className="remove-link" onClick={() => removeFromCart(item._id, item.size)}>
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  </div>
                  
                  <div className="item-quantity-wrapper">
                    <div className="item-quantity">
                      <button onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)} disabled={item.quantity <= 1}><Minus size={16} /></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}><Plus size={16} /></button>
                    </div>
                  </div>

                  <div className="item-total">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cart-summary-container">
            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery</span>
                  <span className="free">FREE</span>
                </div>
                <div className="summary-row">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              
              <div className="total-row">
                <span>Grand Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <div className="checkout-note">
                 ✨ Free delivery within Nairobi & Kiambu.
              </div>

              <button className="checkout-btn" onClick={handleCheckout}>
                <Send size={18} /> 
                <span>Complete Order on WhatsApp</span>
              </button>
              
              <Link to="/" className="continue-link">
                <ArrowLeft size={16} /> Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
