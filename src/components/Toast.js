import React, { useEffect } from 'react';
import '../Styles/Toast.css';

const Toast = ({ show, message, onClose }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000); // 3 segundos para desaparecer
            return () => clearTimeout(timer); // Limpia el timeout si el componente se desmonta
        }
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div className="toast-container">
            <div className="toast-message">
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Toast;
