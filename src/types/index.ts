export interface Car {
  id: string;
  name: string;
  brand: string;
  category: 'Hatchback' | 'Sedan' | 'SUV' | 'Luxury';
  pricePerHour: number;
  pricePerDay: number;
  image: string;
  features: string[];
  fuelType: 'Petrol' | 'Diesel' | 'CNG' | 'Electric';
  transmission: 'Manual' | 'Automatic';
  seats: number;
  available: boolean;
  city: string;
  rating: number;
  trips: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
}

export interface Booking {
  id: string;
  carId: string;
  car: Car;
  userId: string;
  startDate: string;
  endDate: string;
  totalHours: number;
  totalAmount: number;
  status: 'confirmed' | 'ongoing' | 'completed' | 'cancelled';
  pickupLocation: string;
  createdAt: string;
  payment: Payment;
}

export interface Payment {
  id: string;
  method: 'card' | 'upi' | 'netbanking' | 'wallet';
  status: 'pending' | 'completed' | 'failed';
  transactionId: string;
  breakdown: PaymentBreakdown;
}

export interface PaymentBreakdown {
  baseAmount: number;
  gst: number;
  insurance: number;
  convenience: number;
  discount: number;
  total: number;
}

export interface City {
  id: string;
  name: string;
  state: string;
  available: boolean;
  carsCount: number;
}