'use client'; 
import React from 'react';

interface PriceSectionProps {
  title: string;
  label: string;
  price: string;
}

export const PriceSection: React.FC<PriceSectionProps> = ({ 
  title, 
  label, 
  price 
}) => {
  return (
    <div className="border-t pt-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <div className="space-y-2">
        <p className="text-gray-600">{label}</p>
        <p className="text-xl font-bold text-gray-800">{price}</p>
      </div>
    </div>
  );
};