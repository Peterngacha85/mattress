import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import './ConfirmModal.css';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal-content">
        <button className="confirm-close" onClick={onCancel}>
          <X size={20} />
        </button>
        
        <div className="confirm-icon-wrapper">
          <AlertTriangle size={32} className="warning-icon" />
        </div>
        
        <h3>{title}</h3>
        <p>{message}</p>
        
        <div className="confirm-actions">
          <button className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-confirm" onClick={onConfirm}>
            Yes, Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
