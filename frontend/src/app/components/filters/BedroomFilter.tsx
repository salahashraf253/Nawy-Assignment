'use client';
import React from 'react';
import { FilterButtonGroup } from './FilterButtonGroup';

type BedroomOption = 1 | 2 | 3 | 4 | '5+';
const bedroomOptions: BedroomOption[] = [1, 2, 3, 4, '5+']; // mutable array

interface BedroomFilterProps {
  selectedBedrooms?: BedroomOption[];
  onBedroomSelect?: (value: BedroomOption) => void;
}

export const BedroomFilter: React.FC<BedroomFilterProps> = ({
  selectedBedrooms = [],
  onBedroomSelect,
}) => {
  return (
    <FilterButtonGroup<BedroomOption>
      options={bedroomOptions}
      selectedOptions={selectedBedrooms}
      onSelect={(value) => onBedroomSelect?.(value)}
      label="Select number of bedrooms"
    />
  );
};
