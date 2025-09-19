import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CreditCard } from 'lucide-react';
import { Car, User, Booking } from '../types';

interface BookingModalProps {
  car: Car | null;
  user: User | null;
  onClose: () => void;
  onProceedToPayment: (bookingData: any) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ car, user, onClose, onProceedToPayment }) => {
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');

  if (!car || !user) return null;

  const calculateTotal = () => {
    if (!startDate || !startTime || !endDate || !endTime) return 0;
    
    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);
    const hours = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60));
    
    if (hours < 1) return 0;
    
    return hours * car.pricePerHour;
  };

  const getTotalHours = () => {
    if (!startDate || !startTime || !endDate || !endTime) return 0;
    
    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const totalHours = getTotalHours();
    const totalAmount = calculateTotal();
    
    if (totalHours < 1) {
      alert('Please select valid dates and times');
      return;
    }

    const bookingData = {
      carId: car.id,
      car,
      userId: user.id,
      startDate: `${startDate}T${startTime}`,
      endDate: `${endDate}T${endTime}`,
      totalHours,
      totalAmount,
      pickupLocation
    };

    onProceedToPayment(bookingData);
  };

  const today = new Date().toISOString().split('T')[0];
  const currentTime = new Date().toTimeString().slice(0, 5);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Booking Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Car Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-4">
              <img
                src={car.image}
                alt={`${car.brand} ${car.name}`}
                className="w-20 h-16 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-semibold text-gray-900">
                  {car.brand} {car.name}
                </h3>
                <p className="text-sm text-gray-600">{car.category}</p>
                <p className="text-sm text-blue-600 font-medium">
                  ₹{car.pricePerHour}/hour
                </p>
              </div>
            </div>
          </div>

          {/* Date and Time Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline h-4 w-4 mr-1" />
                Start Date
              </label>
              <input
                type="date"
                required
                min={today}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="inline h-4 w-4 mr-1" />
                Start Time
              </label>
              <input
                type="time"
                required
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline h-4 w-4 mr-1" />
                End Date
              </label>
              <input
                type="date"
                required
                min={startDate || today}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="inline h-4 w-4 mr-1" />
                End Time
              </label>
              <input
                type="time"
                required
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Pickup Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline h-4 w-4 mr-1" />
              Pickup Location
            </label>
            <input
              type="text"
              required
              placeholder="Enter pickup address or landmark"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Booking Summary */}
          {getTotalHours() > 0 && (
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Booking Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-700">Duration:</span>
                  <span className="font-medium">{getTotalHours()} hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Rate:</span>
                  <span className="font-medium">₹{car.pricePerHour}/hour</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t border-blue-200 pt-2">
                  <span className="text-blue-900">Total:</span>
                  <span className="text-blue-900">₹{calculateTotal().toLocaleString()}</span>
                </div>
                <p className="text-xs text-blue-600 mt-2">
                  *Final amount will include taxes and fees
                </p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={getTotalHours() < 1}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Proceed to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;