import React, { useState } from 'react';
import './Button.css';

interface ButtonProps {
  className?: string;
  id?: string;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  initialLoading?: boolean;
  disabled?: boolean;
}

const Button = ({ className, id, children, onClick, initialLoading = false, disabled = false }: ButtonProps) => {
  const [loading, setLoading] = useState(initialLoading);

  const handleClick = () => {
    if (!onClick || disabled) return;
    setLoading(true);
    try {
      onClick({ preventDefault: () => { } } as React.MouseEvent);
    } finally {
      setLoading(false);
    }
  };

  // Add conditional class if the button is disabled or loading
  const disabledOrLoading = loading || disabled;
  const buttonClass = `btn ${className} ${disabledOrLoading ? 'disabled' : ''}`;

  return (
    <button className={buttonClass} onClick={handleClick} id={id} disabled={disabledOrLoading}>
      {loading ? <div className="spinner"></div> : children}
    </button>
  );
};

export default Button;
