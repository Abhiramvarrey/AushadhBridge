import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useQuery } from '@tanstack/react-query';
import axios from '../lib/axios';
import { format } from 'date-fns';
import { FileText, Clock, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface ConnectionRequest {
  _id: string;
  fromShop: {
    name: string;
    role: string;
  };
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  message: string;
}

const Requests = () => {
  const { data: requests, isLoading, error } = useQuery({
    queryKey: ['connection-requests'],
    queryFn: async () => {
      const response = await axios.get('/api/connection-requests');
      return response.data;
    },
  });

  const handleAccept = async (id: string) => {
    try {
      await axios.post(`/api/connection-requests/${id}/accept`);
      toast.success('Connection request accepted');
    } catch (error) {
      toast.error('Failed to accept request');
    }
  };

  const handleReject = async (id: string) => {
    try {
      await axios.post(`/api/connection-requests/${id}/reject`);
      toast.success('Connection request rejected');
    } catch (error) {
      toast.error('Failed to reject request');
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-secondary"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-center text-red-500">
          Error loading requests: {(error as Error).message}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Connection Requests</h1>
          <select className="bg-primary-light text-white rounded-md px-4 py-2 border border-gray-700">
            <option value="all">All Requests</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="grid gap-6">
          {requests?.map((request: ConnectionRequest) => (
            <div
              key={request._id}
              className="bg-primary-light rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {request.fromShop.name}
                  </h3>
                  <p className="text-gray-400 mb-2">Role: {request.fromShop.role}</p>
                  <div className="flex items-center text-gray-400">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>
                      Sent: {format(new Date(request.createdAt), 'PPP')}
                    </span>
                  </div>
                </div>
                {request.status === 'pending' && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAccept(request._id)}
                      className="p-2 bg-green-500 bg-opacity-20 text-green-400 rounded-lg hover:bg-opacity-30 transition-colors"
                    >
                      <Check className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleReject(request._id)}
                      className="p-2 bg-red-500 bg-opacity-20 text-red-400 rounded-lg hover:bg-opacity-30 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>

              <p className="mt-4 text-gray-300">{request.message}</p>

              <div className="mt-4">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  request.status === 'pending'
                    ? 'bg-yellow-500 bg-opacity-20 text-yellow-400'
                    : request.status === 'accepted'
                    ? 'bg-green-500 bg-opacity-20 text-green-400'
                    : 'bg-red-500 bg-opacity-20 text-red-400'
                }`}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Requests;