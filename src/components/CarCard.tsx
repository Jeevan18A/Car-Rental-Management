import React from 'react';
import { Star, Users, Fuel, Settings, MapPin } from 'lucide-react';
import { Car } from '../types';

interface CarCardProps {
  car: Car;
  onBook: (car: Car) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onBook }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="relative">
        <img
          src={car.image}
          alt={`${car.brand} ${car.name}`}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-700">
            {car.category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <div className="flex items-center bg-white px-2 py-1 rounded-full text-xs">
            <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
            <span className="font-medium">{car.rating}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">
            {car.brand} {car.name}
          </h3>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            {car.city}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-1" />
            {car.seats} seats
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Fuel className="h-4 w-4 mr-1" />
            {car.fuelType}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Settings className="h-4 w-4 mr-1" />
            {car.transmission}
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {car.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
            >
              {feature}
            </span>
          ))}
          {car.features.length > 3 && (
            <span className="text-gray-500 text-xs">+{car.features.length - 3} more</span>
          )}
        </div>

        <div className="text-sm text-gray-500 mb-4">
          {car.trips.toLocaleString()} trips completed
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-gray-900">
              ₹{car.pricePerHour}
              <span className="text-sm font-normal text-gray-500">/hour</span>
            </div>
            <div className="text-sm text-gray-500">
              ₹{car.pricePerDay}/day
            </div>
          </div>
          <button
            onClick={() => onBook(car)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;