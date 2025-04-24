'use client';
import { useState } from 'react';
import { City } from '../../../enums/city.enum';

interface CityFilterProps {
  selectedCities: string[];
  onCityChange: (city: string) => void;
}

export const CityFilter: React.FC<CityFilterProps> = ({
  selectedCities,
  onCityChange
}) => {
  const [visibleCount, setVisibleCount] = useState(3);
  const [showAll, setShowAll] = useState(false);

  const cities: string[] = Object.values(City);

  const toggleShowMore = () => {
    setVisibleCount(showAll ? 3 : cities.length);
    setShowAll(!showAll);
  };

  const handleCityToggle = (city: string) => {
    onCityChange(city);
  };

  return (
    <div className="space-y-2">
      {cities.slice(0, visibleCount).map((city) => {
        const inputId = `city-${city.replace(/\s+/g, '-').toLowerCase()}`;
        return (
          <div key={city} className="flex items-center">
            <input
              type="checkbox"
              id={inputId}
              checked={selectedCities.includes(city)}
              onChange={() => handleCityToggle(city)}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor={inputId} className="ml-3 text-gray-700">
              {city}
            </label>
          </div>
        );
      })}
      {cities.length > 3 && (
        <button
          onClick={toggleShowMore}
          className="mt-2 text-sm text-blue-600 hover:text-blue-800"
        >
          {showAll ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
};
