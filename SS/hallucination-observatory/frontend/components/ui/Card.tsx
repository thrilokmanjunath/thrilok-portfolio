import React from 'react';

export function Card({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`glass-panel rounded-xl p-6 hover:border-accent/30 transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
}
