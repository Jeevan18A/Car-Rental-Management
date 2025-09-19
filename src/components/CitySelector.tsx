import React, { useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import { cities } from '../data/cities';

interface CitySelectorProps {
  onCitySelect: (city: string) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({ onCitySelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Self-Drive Car Rentals in India
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Choose your city to start your journey
          </p>
          
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for your city..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCities.map((city) => (
            <div
              key={city.id}
              onClick={() => onCitySelect(city.name)}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {city.name}
                  </h3>
                  <p className="text-sm text-gray-500">{city.state}</p>
                </div>
                <MapPin className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {city.carsCount} cars available
                </span>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
            </div>
          ))}
        </div>

        {filteredCities.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No cities found</h3>
            <p className="text-gray-500">Try searching for a different city or state</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CitySelector;