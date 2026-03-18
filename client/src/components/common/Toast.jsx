import { useState, useEffect, createContext, useContext } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success', duration = 3000) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast toast={toast} />}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

function Toast({ toast }) {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const bgColor = toast.type === 'success' ? 'bg-teal-600' : toast.type === 'error' ? 'bg-red-600' : 'bg-gray-800';

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
      <div className={`${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2`}>
        {toast.type === 'success' && <span>✓</span>}
        <span className="text-sm">{toast.message}</span>
      </div>
    </div>
  );
}
