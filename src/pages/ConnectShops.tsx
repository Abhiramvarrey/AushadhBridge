import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import axios from '../lib/axios';
import toast from 'react-hot-toast';

interface Shop {
  _id: string;
  name: string;
  category: string;
}

const ConnectShops = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [shops, setShops] = useState<Shop[]>([]);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get('/shops', {
          params: {
            search: searchTerm,
          },
        });
        setShops(response.data);
      } catch (error) {
        toast.error('Failed to fetch shops');
      }
    };

    fetchShops();
  }, [searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSendQuote = async (shopId: string, quoteData: any) => {
    try {
      await axios.post(`/api/quotes`, {
        shopId,
        ...quoteData,
      });
      toast.success('Quote sent successfully!');
      setIsQuoteModalOpen(false);
    } catch (error) {
      toast.error('Failed to send quote');
    }
  };

  const handleSendRequest = async (shopId: string) => {
    try {
      await axios.post(`/api/requests`, {
        shopId,
      });
      toast.success('Request sent successfully!');
    } catch (error) {
      toast.error('Failed to send request');
    }
  };

  const handleWithdrawRequest = async (shopId: string) => {
    try {
      await axios.delete(`/api/requests/${shopId}`);
      toast.success('Request withdrawn successfully!');
    } catch (error) {
      toast.error('Failed to withdraw request');
    }
  };

  const handleShowShopDetails = (shop: Shop) => {
    setSelectedShop(shop);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Connect with Shops</h1>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search shops..."
              value={searchTerm}
              onChange={handleSearch}
              className="bg-primary-light text-white rounded-md px-4 py-2 border border-gray-700"
            />
          </div>
        </div>

        <div className="grid gap-6">
          {shops.map((shop) => (
            <div
              key={shop._id}
              className="bg-primary-light rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {shop.name}
                  </h3>
                  {/* <p className="text-gray-400 mb-4">{shop.description}</p> */}
                  <p className="text-gray-400 mb-4">
                    Category: {shop.category}
                  </p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleSendRequest(shop._id)}
                    className="btn-primary flex items-center"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Request
                  </button>
                  <button
                    onClick={() => handleWithdrawRequest(shop._id)}
                    className="btn-primary flex items-center"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Withdraw Request
                  </button>
                  <button
                    onClick={() => handleShowShopDetails(shop)}
                    className="btn-primary flex items-center"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Show Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedShop && (
          <div className="bg-primary-light rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4">
              {selectedShop.name}
            </h2>
            <p className="text-gray-400 mb-4">{selectedShop.description}</p>
            <p className="text-gray-400 mb-4">
              Category: {selectedShop.category}
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ConnectShops;

