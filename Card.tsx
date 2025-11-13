import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gradient' | 'elevated';
}

export function Card({ children, className = '', variant = 'default' }: CardProps) {
  const variantStyles = {
    default: 'bg-white border border-gray-200',
    gradient: 'bg-brand-gradient-soft border border-brand-purple border-opacity-20',
    elevated: 'bg-white shadow-xl border border-gray-100',
  };

  return (
    <div className={`rounded-xl p-6 ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
}
