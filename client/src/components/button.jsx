import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', disabled = false }) => {
  const baseStyles = 'px-5 py-2.5 rounded-lg font-medium transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 border border-transparent shadow-sm',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200 focus:ring-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border border-transparent shadow-sm',
    outline: 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
