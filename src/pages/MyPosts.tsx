import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useQuery } from '@tanstack/react-query';
import axios from '../lib/axios';
import { format } from 'date-fns';
import { FileText, Clock, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const MyPosts = () => {
  const { data: requirements, isLoading } = useQuery({
    queryKey: ['my-requirements'],
    queryFn: async () => {
      const response = await axios.get('/api/requirements/my');
      return response.data;
    },
  });

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/requirements/${id}`);
      toast.success('Requirement deleted successfully');
    } catch (error) {
      toast.error('Failed to delete requirement');
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">My Posts</h1>
        </div>

        <div className="grid gap-6">
          {requirements?.map((requirement) => (
            <div
              key={requirement._id}
              className="bg-primary-light rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {requirement.title}
                  </h3>
                  <div className="flex items-center text-gray-400 mb-4">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>
                      Deadline: {format(new Date(requirement.deadline), 'PPP')}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-4">{requirement.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDelete(requirement._id)}
                    className="p-2 text-red-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-secondary hover:text-secondary-light transition-colors">
                    <Edit className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {requirement.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-primary rounded-lg p-4"
                  >
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-secondary mr-3" />
                      <div>
                        <p className="text-white font-medium">{item.name}</p>
                        <p className="text-sm text-gray-400">
                          Quantity: {item.quantity} {item.unit}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  requirement.status === 'open'
                    ? 'bg-green-500 bg-opacity-20 text-green-400'
                    : requirement.status === 'expired'
                    ? 'bg-red-500 bg-opacity-20 text-red-400'
                    : 'bg-gray-500 bg-opacity-20 text-gray-400'
                }`}>
                  {requirement.status.charAt(0).toUpperCase() + requirement.status.slice(1)}
                </span>
                <span className="text-gray-400 text-sm">
                  Posted: {format(new Date(requirement.createdAt), 'PPP')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyPosts;