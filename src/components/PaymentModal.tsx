import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Building, Wallet, Shield, Info, CheckCircle } from 'lucide-react';
import { Car, User, PaymentBreakdown } from '../types';

interface PaymentModalProps {
  car: Car;
  user: User;
  totalHours: number;
  baseAmount: number;
  onClose: () => void;
  onPaymentSuccess: (paymentData: any) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ 
  car, 
  user, 
  totalHours, 
  baseAmount, 
  onClose, 
  onPaymentSuccess 
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'upi' | 'netbanking' | 'wallet'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [upiId, setUpiId] = useState('');

  // Calculate payment breakdown
  const calculateBreakdown = (): PaymentBreakdown => {
    const gst = Math.round(baseAmount * 0.18); // 18% GST
    const insurance = Math.round(baseAmount * 0.05); // 5% insurance
    const convenience = 25; // Fixed convenience fee
    const discount = 0; // No discount for now
    const total = baseAmount + gst + insurance + convenience - discount;

    return {
      baseAmount,
      gst,
      insurance,
      convenience,
      discount,
      total
    };
  };

  const breakdown = calculateBreakdown();

  const paymentMethods = [
    {
      id: 'card' as const,
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, RuPay'
    },
    {
      id: 'upi' as const,
      name: 'UPI',
      icon: Smartphone,
      description: 'PhonePe, GPay, Paytm'
    },
    {
      id: 'netbanking' as const,
      name: 'Net Banking',
      icon: Building,
      description: 'All major banks'
    },
    {
      id: 'wallet' as const,
      name: 'Digital Wallet',
      icon: Wallet,
      description: 'Paytm, Amazon Pay'
    }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const paymentData = {
      id: `PAY${Date.now()}`,
      method: selectedMethod,
      status: 'completed' as const,
      transactionId: `TXN${Date.now()}`,
      breakdown
    };

    setIsProcessing(false);
    onPaymentSuccess(paymentData);
  };

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case 'card':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength={5}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength={3}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cardholder Name
              </label>
              <input
                type="text"
                placeholder="Name on card"
                value={cardDetails.name}
                onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        );

      case 'upi':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                UPI ID
              </label>
              <input
                type="text"
                placeholder="yourname@paytm"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Info className="h-4 w-4 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-900">Quick Pay Options</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button className="bg-white border border-gray-200 rounded-lg p-2 text-xs hover:bg-gray-50">
                  PhonePe
                </button>
                <button className="bg-white border border-gray-200 rounded-lg p-2 text-xs hover:bg-gray-50">
                  Google Pay
                </button>
                <button className="bg-white border border-gray-200 rounded-lg p-2 text-xs hover:bg-gray-50">
                  Paytm
                </button>
              </div>
            </div>
          </div>
        );

      case 'netbanking':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Your Bank
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Choose your bank</option>
                <option value="sbi">State Bank of India</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="icici">ICICI Bank</option>
                <option value="axis">Axis Bank</option>
                <option value="kotak">Kotak Mahindra Bank</option>
                <option value="pnb">Punjab National Bank</option>
              </select>
            </div>
          </div>
        );

      case 'wallet':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-600 rounded mx-auto mb-2"></div>
                  <span className="text-sm font-medium">Paytm</span>
                </div>
              </button>
              <button className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <div className="text-center">
                  <div className="w-8 h-8 bg-orange-500 rounded mx-auto mb-2"></div>
                  <span className="text-sm font-medium">Amazon Pay</span>
                </div>
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Complete Payment</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Methods */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
              
              <div className="space-y-3 mb-6">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`w-full p-4 border rounded-lg text-left transition-colors ${
                        selectedMethod === method.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <Icon className="h-5 w-5 text-gray-600 mr-3" />
                        <div>
                          <div className="font-medium text-gray-900">{method.name}</div>
                          <div className="text-sm text-gray-500">{method.description}</div>
                        </div>
                        {selectedMethod === method.id && (
                          <CheckCircle className="h-5 w-5 text-blue-600 ml-auto" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Payment Form */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-4">Payment Details</h4>
                {renderPaymentForm()}
              </div>
            </div>

            {/* Booking Summary */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
              
              {/* Car Details */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={car.image}
                    alt={`${car.brand} ${car.name}`}
                    className="w-16 h-12 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {car.brand} {car.name}
                    </h4>
                    <p className="text-sm text-gray-600">{car.category}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Duration: {totalHours} hours
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4">Price Breakdown</h4>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Amount ({totalHours} hours)</span>
                    <span className="font-medium">₹{breakdown.baseAmount.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">GST (18%)</span>
                    <span className="font-medium">₹{breakdown.gst.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Insurance (5%)</span>
                    <span className="font-medium">₹{breakdown.insurance.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Convenience Fee</span>
                    <span className="font-medium">₹{breakdown.convenience}</span>
                  </div>
                  
                  {breakdown.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span className="font-medium">-₹{breakdown.discount.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-gray-900">Total Amount</span>
                      <span className="text-gray-900">₹{breakdown.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Info */}
              <div className="bg-green-50 rounded-lg p-4 mt-4">
                <div className="flex items-center mb-2">
                  <Shield className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm font-medium text-green-900">Secure Payment</span>
                </div>
                <p className="text-xs text-green-700">
                  Your payment information is encrypted and secure. We use industry-standard security measures.
                </p>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors mt-6"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing Payment...
                  </div>
                ) : (
                  `Pay ₹${breakdown.total.toLocaleString()}`
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;