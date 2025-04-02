import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Stethoscope, Loader } from 'lucide-react';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    mobile: '',
    shopName: '',
    GSTIN:'',
    street:'',
    city: '',
    state: '',
    country: '',
    pincode: '',
    building:'',
    shopLocation:''
  });
  
  const { register, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    if(formData.password.length<6){
      alert("Password must be at least 6 characters long");
      return
    }
    
    const RegisterData = { 
      ownerName:formData.name ,
      email:formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      mobile: formData.mobile,
      role: formData.role,
      shopName: formData.shopName,
      GSTIN:formData.GSTIN,
      shopLocation: formData.building+','+formData.street+','+formData.city+','+formData.state+','+formData.country+','+formData.pincode
    }
    
    await register(RegisterData);
    
    // If registration is successful, the authStore will update isAuthenticated
    if (useAuthStore.getState().isAuthenticated) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-primary-light p-8 rounded-lg shadow-lg">
        <div>
          <div className="flex justify-center">
            <Stethoscope className="h-12 w-12 text-secondary" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Or{' '}
            <Link to="/login" className="font-medium text-secondary hover:text-secondary-light">
              sign in to your existing account
            </Link>
          </p>
        </div>
        
        {error && (
          <div className="bg-red-900 bg-opacity-20 border border-red-500 text-red-300 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white bg-primary-dark rounded-t-md focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white bg-primary-dark focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="shop-name" className="sr-only">Shop Name</label>
              <input
                id="shop-name"
                name="shopName"
                type="text"
                required
                value={formData.shopName}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white bg-primary-dark focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
                placeholder="shop name or enterprise name"
              />
            </div>
            <div className="relative">
              <label htmlFor="role" className="sr-only">Role</label>
              <select
                id="role"
                name="role"
                required
                value={formData.role}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-600 bg-primary-dark text-white rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
              >
                <option value="" disabled>Select a role</option>
                <option value="hospital">Hospital</option>
                <option value="clinic">Clinic</option>
                <option value="supplier">Supplier</option>
                <option value="distributor">Distributor</option>
                <option value="pharmacy">Pharmacy</option>
                <option value="other">Other</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                </svg>
              </div>
            </div>
            <div>
              <label htmlFor="mobile" className="sr-only">Mobile</label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                required
                value={formData.mobile}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white bg-primary-dark focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
                placeholder="Mobile"
              />
            </div>
            <div>
              <label htmlFor="GSTIN" className="sr-only">Business GSTIN number</label>
              <input
                id="GSTIN"
                name="GSTIN"
                type="text"
                required
                value={formData.GSTIN}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white bg-primary-dark focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
                placeholder="Business GSTIN number"
              />
            </div>
            <div>
              <label htmlFor="shop-location" className="sr-only">Shop Location</label>
              <input
                id="shop-location"
                name="shopLocation"
                type="text"
                required
                value={formData.shopLocation}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white bg-primary-dark focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
                placeholder="Shop Location"
              />
            </div>
            <div>
              <label htmlFor = "Building" className = "sr-only">Building Number/ Name /</label>
              <input
                id = "Building"
                name = "building"
                type = "text"
                required
                value = {formData.building}
                onChange = {handleChange}
                className = "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white bg-primary-dark focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
                placeholder = "Building"
              />
            </div>
            <div>
              <label htmlFor = "Street" className = "sr-only">Street</label>
              <input
                id = "Street"
                name = "street"
                type = "text"
                required
                value = {formData.street}
                onChange = {handleChange}
                className = "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white bg-primary-dark focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
                placeholder = "Street"
              />
            </div>
            <div>
              <label htmlFor = "City" className = "sr-only">City</label>
              <input
                id = "City"
                name = "city"
                type = "text"
                required
                value = {formData.city}
                onChange = {handleChange}
                className = "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white bg-primary-dark focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
                placeholder = "City"
              />
            </div>
            <div>
              <label htmlFor = "State" className = "sr-only">State</label>
              <input
                id = "State"
                name = "state"
                type = "text"
                required
                value = {formData.state}
                onChange = {handleChange}
                className = "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white bg-primary-dark focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
                placeholder = "State"
              />
            </div>
            <div>
              <label htmlFor = "Pincode" className = "sr-only">Pincode</label>
              <input
                id = "Pincode"
                name = "pincode"
                type = "text"
                required
                value = {formData.pincode}
                onChange = {handleChange}
                className = "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white bg-primary-dark focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
                placeholder = "Pincode"
              />
            </div>
            <div>
              <label htmlFor = "Country" className = "sr-only">Country</label>
              <input
                id = "Country"
                name = "country"
                type = "text"
                required
                value = {formData.country}
                onChange = {handleChange}
                className = "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white bg-primary-dark focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
                placeholder = "Country"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white bg-primary-dark focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white bg-primary-dark rounded-b-md focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-light transition-colors duration-300"
            >
              {isLoading ? (
                <Loader className="animate-spin h-5 w-5 mr-2" />
              ) : (
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-secondary-dark group-hover:text-secondary-light" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;