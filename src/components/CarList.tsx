import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Car } from '../types';
import CarCard from './CarCard';

interface CarListProps {
  cars: Car[];
  selectedCity: string;
  onBook: (car: Car) => void;
}

const CarList: React.FC<CarListProps> = ({ cars, selectedCity, onBook }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('price_low');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Hatchback', 'Sedan', 'SUV', 'Luxury'];

  const filteredAndSortedCars = useMemo(() => {
    let filtered = cars.filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           car.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || car.category === selectedCategory;
      const matchesCity = car.city === selectedCity;
      return matchesSearch && matchesCategory && matchesCity && car.available;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price_low':
          return a.pricePerHour - b.pricePerHour;
        case 'price_high':
          return b.pricePerHour - a.pricePerHour;
        case 'rating':
          return b.rating - a.rating;
        case 'trips':
          return b.trips - a.trips;
        default:
          return 0;
      }
    });

    return filtered;
  }, [cars, searchTerm, selectedCategory, sortBy, selectedCity]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Available Cars in {selectedCity}
        </h2>
        <p className="text-gray-600">
          {filteredAndSortedCars.length} cars available for your trip
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by car name or brand..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort and Filter Toggle */}
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="trips">Most Popular</option>
            </select>
          </div>
        </div>
      </div>

      {/* Car Grid */}
      {filteredAndSortedCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedCars.map((car) => (
            <CarCard key={car.id} car={car} onBook={onBook} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No cars found</h3>
          <p className="text-gray-500">
            Try adjusting your search criteria or check back later
          </p>
        </div>
      )}
    </div>
  );
};

export default CarList;