import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from '../lib/axios';
import { format } from 'date-fns';
import { FileText, Clock, Send } from 'lucide-react';
import toast from 'react-hot-toast';

interface RequirementItem {
  name: string;
  quantity: number;
  unit: string;
}

interface Requirement {
  _id: string;
  title: string;
  description: string;
  shopName: string;
  deadline: string;
  status: string;
  items: RequirementItem[];
  createdAt: string;
}

const ConnectShops = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState<Requirement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, error } =
    useInfiniteQuery({
      queryKey: ['connect-shops-requirements'],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await axios.get(`/api/requirements?page=${pageParam}`);
        return response.data;
      },
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    });

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const bottom = target.scrollHeight - target.scrollTop === target.clientHeight;
    if (bottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleSendQuote = async (requirementId: string, quoteData: any) => {
    try {
      await axios.post(`/api/quotes`, {
        requirementId,
        ...quoteData,
      });
      toast.success('Quote sent successfully!');
      setIsQuoteModalOpen(false);
    } catch (error) {
      toast.error('Failed to send quote');
    }
  };

  if (status === 'loading') {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-secondary"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (status === 'error') {
    return (
      <DashboardLayout>
        <div className="text-center text-red-500">
          Error loading requirements: {(error as Error)?.message}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-4" onScroll={handleScroll}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Connect with Shops</h1>
          <div className="flex space-x-4">
            <select className="bg-primary-light text-white rounded-md px-4 py-2 border border-gray-700">
              <option value="">All Categories</option>
              <option value="medical">Medical Supplies</option>
              <option value="equipment">Equipment</option>
              <option value="pharmaceuticals">Pharmaceuticals</option>
            </select>
            <input
              type="text"
              placeholder="Search shops..."
              className="bg-primary-light text-white rounded-md px-4 py-2 border border-gray-700"
            />
          </div>
        </div>

        <div className="grid gap-6">
          {data?.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page.requirements.map((requirement: Requirement) => (
                <div
                  key={requirement._id}
                  className="bg-primary-light rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {requirement.shopName}
                      </h3>
                      <div className="flex items-center text-gray-400 mb-4">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>
                          Deadline: {format(new Date(requirement.deadline), 'PPP')}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedRequirement(requirement);
                        setIsQuoteModalOpen(true);
                      }}
                      className="btn-primary flex items-center"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Quote
                    </button>
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
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>

        {hasNextPage && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="btn-secondary"
            >
              {isFetchingNextPage ? 'Loading more...' : 'Load more'}
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ConnectShops;