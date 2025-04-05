import DashboardLayout from '../components/layout/DashboardLayout';
import { useQuery } from '@tanstack/react-query';
import axios from '../lib/axios';
import { format } from 'date-fns';
import { FileText, Clock, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';
import { useState } from 'react';

type Requirement = {
  _id: string;
  status: 'open' | 'expired' | 'closed';
  userId: {
    _id: string;
    ownerName: string;
    email: string;
  };
  shopName: string;
  items: Array<{
    name: string;
    quantity: number;
    unit: string;
    _id: string;
  }>;
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

const ITEMS_PER_PAGE = 5;

const MyPosts = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { data: { posts: requirements = [] } = {}, isLoading, refetch } = useQuery<{
    posts: Requirement[];
  }>({
    queryKey: ['my-requirements'],
    queryFn: async () => {
      const response = await axios.get<{ posts: Requirement[] }>('/getmyposts', {
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().token}`,
        },
      });
      return response.data;
    },
  });

  const sortedRequirements = requirements.slice().sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/requirements/${id}`);
      toast.success('Requirement deleted successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to delete requirement');
    }
  };

  const handleChangeStatus = async (id: string, newStatus: Requirement['status']) => {
    try {
      await axios.post(`/requirements/${id}/status`, {
        id,
        status: newStatus,
      });
      toast.success('Status updated successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const totalPages = Math.ceil(sortedRequirements.length / ITEMS_PER_PAGE);
  const paginatedRequirements = sortedRequirements.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

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
        {paginatedRequirements.map((requirement) => (
          <div
            key={requirement._id}
            className="bg-primary-light rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center text-gray-400 mb-4">
                <Clock className="h-4 w-4 mr-2" />
                <span>
                  Deadline: {format(new Date(requirement.deadline), 'PPP')}
                </span>
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
              <select
                value={requirement.status}
                onChange={(e) =>
                  handleChangeStatus(requirement._id, e.target.value as Requirement['status'])
                }
                className="px-3 py-1 rounded text-sm bg-primary border border-secondary text-white"
              >
                <option value="open">Open</option>
                <option value="expired">Expired</option>
                <option value="closed">Closed</option>
              </select>
              <span className="text-gray-400 text-sm">
                Posted: {format(new Date(requirement.createdAt), 'PPP')}
              </span>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
            className="px-4 py-2 bg-secondary text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-400">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
            disabled={currentPage === totalPages - 1}
            className="px-4 py-2 bg-secondary text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyPosts;

