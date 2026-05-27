import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 shadow-2xl shadow-slate-950/50 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
