'use client';
import React from 'react';
import { FilterButtonGroup } from './FilterButtonGroup';

type BathroomOption = 1 | 2 | 3 | 4 | '5+';
const bathroomOptions: BathroomOption[] = [1, 2, 3, 4, '5+'];

interface BathroomFilterProps {
  selectedBathrooms?: BathroomOption[];
  onBathroomSelect?: (value: BathroomOption) => void;
}

export const BathroomFilter: React.FC<BathroomFilterProps> = ({
  selectedBathrooms = [],
  onBathroomSelect,
}) => {
  return (
    <FilterButtonGroup<BathroomOption>
      options={bathroomOptions}
      selectedOptions={selectedBathrooms}
      onSelect={(value) => onBathroomSelect?.(value)}
      label="Select number of bathrooms"
    />
  );
};
