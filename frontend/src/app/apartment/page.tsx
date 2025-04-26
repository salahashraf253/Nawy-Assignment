'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { fetchApartments } from '../apartment/apartmentService';
import { Apartment } from '../apartment/apartment';
import ApartmentCard from '../components/ApartmentCard';
import { CityFilter } from '../components/filters/CityFilter';
import { BedroomFilter } from '../components/filters/BedroomFilter';
import { BathroomFilter } from '../components/filters/BathroomFilter';
import { FilterWrapper } from '../components/ui/FilterWrapper';

const PAGE_SIZE = 50;

const ApartmentsInEgypt = () => {
  const [allProperties, setAllProperties] = useState<Apartment[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedBathrooms, setSelectedBathrooms] = useState<(1 | 2 | 3 | 4 | '5+')[]>([]);
  const [selectedBedrooms, setSelectedBedrooms] = useState<(1 | 2 | 3 | 4 | '5+')[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      try {
        const data = await fetchApartments(1, PAGE_SIZE);
        setAllProperties(data);
      } catch (error) {
        console.error('Error loading properties:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  const handleCityChange = useCallback((city: string) => {
    setSelectedCities(prev =>
      prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
    );
    setPage(1);
  }, []);

  const handleBathroomChange = useCallback((value: 1 | 2 | 3 | 4 | '5+') => {
    setSelectedBathrooms(prev =>
      prev.includes(value) ? prev.filter(b => b !== value) : [...prev, value]
    );
    setPage(1);
  }, []);

  const handleBedroomChange = useCallback((value: 1 | 2 | 3 | 4 | '5+') => {
    setSelectedBedrooms(prev =>
      prev.includes(value) ? prev.filter(b => b !== value) : [...prev, value]
    );
    setPage(1);
  }, []);

  const filteredProperties = allProperties.filter(({ city, noOfBathrooms, noOfBedrooms }) => {
    const areaMatch = selectedCities.length === 0 || selectedCities.includes(city);
    const bathroomMatch =
      selectedBathrooms.length === 0 ||
      selectedBathrooms.some(b => (b === '5+' ? noOfBathrooms >= 5 : noOfBathrooms === b));
    const bedroomMatch =
      selectedBedrooms.length === 0 ||
      selectedBedrooms.some(b => (b === '5+' ? noOfBedrooms >= 5 : noOfBedrooms === b));

    return areaMatch && bathroomMatch && bedroomMatch;
  });

  const paginatedProperties = filteredProperties.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(filteredProperties.length / PAGE_SIZE);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Apartments in Egypt</h1>
      <p className="text-gray-600 mb-6">Find your future home among top developers.</p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="lg:col-span-1 space-y-6">
          <FilterWrapper title="Cities">
            <CityFilter selectedCities={selectedCities} onCityChange={handleCityChange} />
          </FilterWrapper>

          <FilterWrapper title="Bedrooms">
            <BedroomFilter selectedBedrooms={selectedBedrooms} onBedroomSelect={handleBedroomChange} />
          </FilterWrapper>

          <FilterWrapper title="Bathrooms">
            <BathroomFilter selectedBathrooms={selectedBathrooms} onBathroomSelect={handleBathroomChange} />
          </FilterWrapper>
        </div>

        {/* Properties */}
        <div className="lg:col-span-3 space-y-6">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : paginatedProperties.length > 0 ? (
            <>
              {paginatedProperties.map(apartment => (
                <ApartmentCard key={apartment.id} apartment={apartment} />
              ))}
              <div className="flex justify-center mt-6 space-x-4">
                <button
                  className="bg-gray-200 px-4 py-2 rounded"
                  onClick={() => setPage(p => Math.max(p - 1, 1))}
                  disabled={page === 1}
                >
                  Previous
                </button>
                <span className="px-4 py-2">{page} / {totalPages}</span>
                <button
                  className="bg-gray-200 px-4 py-2 rounded"
                  onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No apartments match your filters. Try adjusting your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApartmentsInEgypt;
