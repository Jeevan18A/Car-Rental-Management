import React from 'react';
import { Car, User, Menu, X } from 'lucide-react';
import { User as UserType } from '../types';

interface HeaderProps {
  user: UserType | null;
  onLogin: () => void;
  onLogout: () => void;
  selectedCity: string;
}

const Header: React.FC<HeaderProps> = ({ user, onLogin, onLogout, selectedCity }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Car className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">DriveEasy</span>
            {selectedCity && (
              <span className="ml-4 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                {selectedCity}
              </span>
            )}
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                How it works
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Cities
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Support
              </a>
            </div>
          </div>

          <div className="hidden md:block">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">{user.name}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-blue-600 p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            <a href="#" className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium">
              How it works
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium">
              Cities
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium">
              Support
            </a>
            {user ? (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-3">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="ml-2 text-base font-medium text-gray-900">{user.name}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="mt-3 w-full text-left text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="w-full text-left bg-blue-600 text-white px-3 py-2 text-base font-medium hover:bg-blue-700 transition-colors rounded-md mx-3 mt-2"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;