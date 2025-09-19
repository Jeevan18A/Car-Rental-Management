import React from 'react';
import { CheckCircle, Calendar, Clock, MapPin, Car, CreditCard } from 'lucide-react';
import { Booking } from '../types';

interface BookingSuccessProps {
  booking: Booking;
  onClose: () => void;
}

const BookingSuccess: React.FC<BookingSuccessProps> = ({ booking, onClose }) => {
  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return {
      date: date.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    };
  };

  const startDateTime = formatDateTime(booking.startDate);
  const endDateTime = formatDateTime(booking.endDate);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h2>
          
          <p className="text-gray-600 mb-6">
            Your car has been successfully booked. Have a safe trip!
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-3">Booking Details</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <Car className="h-4 w-4 text-gray-400 mr-3" />
                <span className="text-gray-600">Car:</span>
                <span className="ml-auto font-medium">
                  {booking.car.brand} {booking.car.name}
                </span>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-gray-400 mr-3" />
                <span className="text-gray-600">Start:</span>
                <div className="ml-auto text-right">
                  <div className="font-medium">{startDateTime.date}</div>
                  <div className="text-gray-500">{startDateTime.time}</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-gray-400 mr-3" />
                <span className="text-gray-600">End:</span>
                <div className="ml-auto text-right">
                  <div className="font-medium">{endDateTime.date}</div>
                  <div className="text-gray-500">{endDateTime.time}</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-gray-400 mr-3" />
                <span className="text-gray-600">Duration:</span>
                <span className="ml-auto font-medium">{booking.totalHours} hours</span>
              </div>
              
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-gray-400 mr-3" />
                <span className="text-gray-600">Pickup:</span>
                <span className="ml-auto font-medium">{booking.pickupLocation}</span>
              </div>
              
              <div className="flex items-center pt-2 border-t border-gray-200">
                <CreditCard className="h-4 w-4 text-gray-400 mr-3" />
                <span className="text-gray-600">Total Amount:</span>
                <span className="ml-auto font-bold text-lg text-green-600">
                  ₹{booking.payment.breakdown.total.toLocaleString()}
                </span>
              </div>
              
              <div className="flex items-center">
                <CreditCard className="h-4 w-4 text-gray-400 mr-3" />
                <span className="text-gray-600">Payment Method:</span>
                <span className="ml-auto font-medium capitalize">{booking.payment.method}</span>
              </div>
              
              <div className="flex items-center">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="ml-auto font-medium text-xs">{booking.payment.transactionId}</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-500 mb-6">
            Booking ID: {booking.id}
          </div>

          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;