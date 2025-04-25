'use client';
import React from 'react';

interface FilterWrapperProps {
  title: string;
  children: React.ReactNode;
}

export const FilterWrapper: React.FC<FilterWrapperProps> = ({
  title,
  children,
}) => {
  return (
    <section className="rounded-2xl bg-white shadow-md p-5 space-y-4">
      <header>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </header>
      <div className="space-y-2">{children}</div>
    </section>
  );
};
