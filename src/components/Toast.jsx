import { useEffect, useState } from "react";
import "../style/toast.css";

export default function Toast({ 
  type = "info", 
  message, 
  duration = 3000, 
  onClose,
  position = "top-right" 
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setIsVisible(true);

    // Auto-dismiss after duration
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for exit animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: "fa-check-circle",
    error: "fa-exclamation-circle",
    warning: "fa-exclamation-triangle",
    info: "fa-info-circle",
  };

  return (
    <div className={`toast toast-${type} toast-${position} ${isVisible ? "toast-show" : ""}`}>
      <div className="toast-content">
        <i className={`fa-solid ${icons[type]} toast-icon`}></i>
        <span className="toast-message">{message}</span>
        <button className="toast-close" onClick={onClose}>
          <i className="fa-solid fa-times"></i>
        </button>
      </div>
    </div>
  );
}

// Toast Container Component
export function ToastContainer({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id || index}
          type={toast.type}
          message={toast.message}
          duration={toast.duration}
          onClose={toast.onClose}
          position={toast.position}
        />
      ))}
    </div>
  );
}

// Toast Hook for easy usage
export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info", duration = 3000) => {
    const id = Date.now();
    const toast = {
      id,
      message,
      type,
      duration,
      onClose: () => removeToast(id),
    };

    setToasts(prev => [...prev, toast]);
    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const success = (message, duration) => addToast(message, "success", duration);
  const error = (message, duration) => addToast(message, "error", duration);
  const warning = (message, duration) => addToast(message, "warning", duration);
  const info = (message, duration) => addToast(message, "info", duration);

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  };
}
