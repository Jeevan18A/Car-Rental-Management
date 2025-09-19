import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CitySelector from './components/CitySelector';
import CarList from './components/CarList';
import BookingModal from './components/BookingModal';
import PaymentModal from './components/PaymentModal';
import BookingSuccess from './components/BookingSuccess';
import LoginModal from './components/LoginModal';
import { useAuth } from './hooks/useAuth';
import { cars } from './data/cars';
import { Car, Booking } from './types';

function App() {
  const { user, login, logout, isLoading } = useAuth();
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [bookingData, setBookingData] = useState<any>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<Booking | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const savedCity = localStorage.getItem('selectedCity');
    if (savedCity) {
      setSelectedCity(savedCity);
    }

    const savedBookings = localStorage.getItem('bookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, []);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    localStorage.setItem('selectedCity', city);
  };

  const handleCarBook = (car: Car) => {
    if (!user) {
      setSelectedCar(car);
      setShowLoginModal(true);
      return;
    }
    setSelectedCar(car);
    setShowBookingModal(true);
  };

  const handleProceedToPayment = (data: any) => {
    setBookingData(data);
    setShowBookingModal(false);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (paymentData: any) => {
    const newBooking: Booking = {
      ...bookingData,
      id: `BK${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'confirmed' as const,
      payment: paymentData
    };

    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    
    setShowPaymentModal(false);
    setSelectedCar(null);
    setBookingData(null);
    setBookingSuccess(newBooking);
  };

  const handleLoginSuccess = (userData: any) => {
    login(userData);
    if (selectedCar) {
      setShowBookingModal(true);
    }
  };

  const handleBackToHome = () => {
    setSelectedCity('');
    localStorage.removeItem('selectedCity');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        user={user}
        onLogin={() => setShowLoginModal(true)}
        onLogout={logout}
        selectedCity={selectedCity}
      />

      <main>
        {!selectedCity ? (
          <CitySelector onCitySelect={handleCitySelect} />
        ) : (
          <div>
            <div className="bg-white border-b border-gray-200">
              <div className="max-w-7xl mx-auto px-4 py-4">
                <button
                  onClick={handleBackToHome}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  ← Change City
                </button>
              </div>
            </div>
            <CarList
              cars={cars}
              selectedCity={selectedCity}
              onBook={handleCarBook}
            />
          </div>
        )}
      </main>

      {/* Modals */}
      {showLoginModal && (
        <LoginModal
          onClose={() => {
            setShowLoginModal(false);
            setSelectedCar(null);
          }}
          onLogin={handleLoginSuccess}
        />
      )}

      {showBookingModal && selectedCar && (
        <BookingModal
          car={selectedCar}
          user={user}
          onClose={() => {
            setShowBookingModal(false);
            setSelectedCar(null);
          }}
          onProceedToPayment={handleProceedToPayment}
        />
      )}

      {showPaymentModal && selectedCar && bookingData && (
        <PaymentModal
          car={selectedCar}
          user={user!}
          totalHours={bookingData.totalHours}
          baseAmount={bookingData.totalAmount}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedCar(null);
            setBookingData(null);
          }}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {bookingSuccess && (
        <BookingSuccess
          booking={bookingSuccess}
          onClose={() => setBookingSuccess(null)}
        />
      )}
    </div>
  );
}

export default App;