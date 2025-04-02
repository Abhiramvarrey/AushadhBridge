import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Stethoscope, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-primary-dark shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Stethoscope className="h-8 w-8 text-secondary" />
              <span className="ml-2 text-xl font-bold text-white">MedSupply</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link to="/" className="text-gray-300 hover:text-secondary px-3 py-2 font-medium">Home</Link>
              <a href="#solutions" className="text-gray-300 hover:text-secondary px-3 py-2 font-medium">Solutions</a>
              <a href="#features" className="text-gray-300 hover:text-secondary px-3 py-2 font-medium">Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-secondary px-3 py-2 font-medium">Pricing</a>
              <a href="#testimonials" className="text-gray-300 hover:text-secondary px-3 py-2 font-medium">Testimonials</a>
              {isAuthenticated && (
                <Link to="/dashboard" className="text-gray-300 hover:text-secondary px-3 py-2 font-medium">Dashboard</Link>
              )}
            </div>
          </div>
          <div className="hidden md:flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center">
                <div className="mr-4 flex items-center">
                  <div className="h-8 w-8 rounded-full bg-secondary bg-opacity-20 flex items-center justify-center text-secondary font-bold">
                    {user?.ownerName.charAt(0)}
                  </div>
                  <span className="ml-2 text-gray-300">{user?.ownerName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 font-medium transition-colors duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-gray-300 hover:text-secondary font-medium">Log in</Link>
                <Link to="/register" className="ml-4 px-4 py-2 rounded-md text-white bg-secondary hover:bg-secondary-dark font-medium transition-colors duration-300">Get Started</Link>
              </>
            )}
          </div>
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-secondary focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-gray-300 hover:text-secondary font-medium">Home</Link>
            <a href="#solutions" className="block px-3 py-2 text-gray-300 hover:text-secondary font-medium">Solutions</a>
            <a href="#features" className="block px-3 py-2 text-gray-300 hover:text-secondary font-medium">Features</a>
            <a href="#pricing" className="block px-3 py-2 text-gray-300 hover:text-secondary font-medium">Pricing</a>
            <a href="#testimonials" className="block px-3 py-2 text-gray-300 hover:text-secondary font-medium">Testimonials</a>
            {isAuthenticated && (
              <Link to="/dashboard" className="block px-3 py-2 text-gray-300 hover:text-secondary font-medium">Dashboard</Link>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              {isAuthenticated ? (
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-secondary bg-opacity-20 flex items-center justify-center text-secondary font-bold">
                      {user?.ownerName.charAt(0)}
                    </div>
                    <span className="ml-2 text-gray-300">{user?.ownerName}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 font-medium transition-colors duration-300"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/login" className="block px-3 py-2 text-gray-300 hover:text-secondary font-medium">Log in</Link>
                  <Link to="/register" className="block px-3 py-2 rounded-md text-white bg-secondary hover:bg-secondary-dark font-medium transition-colors duration-300">Get Started</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;