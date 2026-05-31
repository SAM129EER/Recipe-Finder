import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-2xl p-8 shadow-sm ${className}`}>
      {children}
    </div>
  );
};

export default Card;
