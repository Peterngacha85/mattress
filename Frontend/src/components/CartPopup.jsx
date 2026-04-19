import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ShoppingBag, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './CartPopup.css';

const CartPopup = () => {
  const { isCartPopupOpen, lastAddedItem, closeCartPopup, cart } = useAppContext();

  if (!isCartPopupOpen || !lastAddedItem) return null;

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const displayImage = lastAddedItem.variantImage || lastAddedItem.image || (lastAddedItem.variants?.[0]?.image);

  return (
    <div className="cart-modal-overlay" onClick={closeCartPopup}>
      <div className="cart-modal-content" onClick={e => e.stopPropagation()}>
        <div className="cart-modal-header">
          <div className="success-icon">
            <Check size={32} />
          </div>
          <h2>Added to Cart!</h2>
          <p>You have {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart.</p>
        </div>

        <div className="added-product-preview">
          <img src={displayImage} alt={lastAddedItem.name} />
          <div className="added-product-info">
            <h3>{lastAddedItem.name}</h3>
            {lastAddedItem.thickness && lastAddedItem.thickness !== 'Standard' && (
              <p>Thickness: {lastAddedItem.thickness}</p>
            )}
            <p>Size: {lastAddedItem.size}</p>
            <p><strong>KES {lastAddedItem.price?.toLocaleString()}</strong></p>
          </div>
        </div>

        <div className="cart-modal-actions">
          <Link to="/cart" className="btn-checkout-modal" onClick={closeCartPopup}>
            <ShoppingBag size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Checkout Now
          </Link>
          <button className="btn-continue-modal" onClick={closeCartPopup}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPopup;
