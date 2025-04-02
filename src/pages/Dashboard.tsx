import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { BarChart3, Package, ShoppingCart, Users, Settings, LogOut } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-primary-light rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-500 bg-opacity-10 text-blue-500">
              <ShoppingCart className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Active Requirements</p>
              <p className="text-2xl font-semibold text-white">12</p>
            </div>
          </div>
        </div>
        
        <div className="bg-primary-light rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-500 bg-opacity-10 text-green-500">
              <Package className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Pending Quotes</p>
              <p className="text-2xl font-semibold text-white">8</p>
            </div>
          </div>
        </div>
        
        <div className="bg-primary-light rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-500 bg-opacity-10 text-purple-500">
              <Users className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Connected Shops</p>
              <p className="text-2xl font-semibold text-white">36</p>
            </div>
          </div>
        </div>
        
        <div className="bg-primary-light rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-500 bg-opacity-10 text-yellow-500">
              <BarChart3 className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Total Transactions</p>
              <p className="text-2xl font-semibold text-white">$24,500</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-primary-light rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Requirements</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 bg-primary rounded-lg">
                <div>
                  <p className="text-white font-medium">Medical Supplies Ltd.</p>
                  <p className="text-sm text-gray-400">5 items • Due in 3 days</p>
                </div>
                <button className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark transition-colors duration-300">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary-light rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Latest Quotes</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 bg-primary rounded-lg">
                <div>
                  <p className="text-white font-medium">Healthcare Distributors</p>
                  <p className="text-sm text-gray-400">Quote: $12,500 • 3 items</p>
                </div>
                <span className="px-3 py-1 bg-green-500 bg-opacity-20 text-green-400 rounded-full text-sm">
                  New Quote
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;