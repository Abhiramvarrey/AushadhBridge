import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useQuery } from '@tanstack/react-query';
import axios from '../lib/axios';
import { format } from 'date-fns';
import { MessageSquare, Check, X, Clock, Lock, Unlock } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';

const Quotes = () => {
  const { user } = useAuthStore();
  const [filter, setFilter] = useState('all');
  
  const { data: quotes, isLoading } = useQuery({
    queryKey: ['quotes'],
    queryFn: async () => {
      const response = await axios.get('/api/quotes');
      return response.data;
    },
  });

  const filteredQuotes = React.useMemo(() => {
    if (!quotes) return [];
    
    let filtered = quotes;
    
    // Filter by status
    if (filter !== 'all') {
      filtered = filtered.filter((quote) => quote.status === filter);
    }

    return filtered;
  }, [quotes, filter]);

  const sentQuotes = React.useMemo(() => {
    return filteredQuotes.filter(quote => quote.fromUser === user?.id);
  }, [filteredQuotes, user]);

  const receivedQuotes = React.useMemo(() => {
    return filteredQuotes.filter(quote => quote.toUser === user?.id);
  }, [filteredQuotes, user]);

  const handleAcceptQuote = async (id: string) => {
    try {
      await axios.patch(`/api/quotes/${id}/status`, { status: 'accepted' });
      toast.success('Quote accepted successfully');
    } catch (error) {
      toast.error('Failed to accept quote');
    }
  };

  const handleRejectQuote = async (id: string) => {
    try {
      await axios.patch(`/api/quotes/${id}/status`, { status: 'rejected' });
      toast.success('Quote rejected successfully');
    } catch (error) {
      toast.error('Failed to reject quote');
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

  const QuoteCard = ({ quote, type }: { quote: any, type: 'sent' | 'received' }) => (
    <div className="bg-primary-light rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-secondary" />
            <h3 className="text-xl font-semibold text-white">
              {type === 'sent' ? `Quote to ${quote.toShopName}` : `Quote from ${quote.fromShopName}`}
            </h3>
            {quote.isPrivate && (
              <Lock className="h-4 w-4 text-secondary" title="Private Quote" />
            )}
          </div>
          <p className="text-sm text-gray-400 mt-1">
            For: {quote.requirementTitle}
          </p>
          <div className="flex items-center text-gray-400 mt-2">
            <Clock className="h-4 w-4 mr-2" />
            <span>{format(new Date(quote.createdAt), 'PPP')}</span>
          </div>
        </div>
        {type === 'received' && quote.status === 'pending' && (
          <div className="flex space-x-2">
            <button
              onClick={() => handleAcceptQuote(quote._id)}
              className="p-2 bg-green-500 bg-opacity-20 text-green-400 rounded-lg hover:bg-opacity-30 transition-colors"
            >
              <Check className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleRejectQuote(quote._id)}
              className="p-2 bg-red-500 bg-opacity-20 text-red-400 rounded-lg hover:bg-opacity-30 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 space-y-3">
        {quote.items.map((item: any, index: number) => (
          <div
            key={index}
            className="flex items-center justify-between bg-primary rounded-lg p-4"
          >
            <div>
              <p className="text-white font-medium">{item.name}</p>
              <p className="text-sm text-gray-400">
                {item.quantity} {item.unit}
              </p>
            </div>
            <p className="text-secondary font-semibold">
              ${item.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className={`px-3 py-1 rounded-full text-sm ${
          quote.status === 'pending'
            ? 'bg-yellow-500 bg-opacity-20 text-yellow-400'
            : quote.status === 'accepted'
            ? 'bg-green-500 bg-opacity-20 text-green-400'
            : 'bg-red-500 bg-opacity-20 text-red-400'
        }`}>
          {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
        </span>
        <div className="text-right">
          <p className="text-sm text-gray-400">Delivery: {quote.deliveryTime}</p>
          <p className="text-xl font-bold text-white mt-1">
            Total: ${quote.totalPrice.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Quotes</h1>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-primary-light text-white rounded-md px-4 py-2 border border-gray-700"
          >
            <option value="all">All Quotes</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="space-y-8">
          {/* Received Quotes */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Received Quotes</h2>
            <div className="grid gap-6">
              {receivedQuotes.map((quote) => (
                <QuoteCard key={quote._id} quote={quote} type="received" />
              ))}
              {receivedQuotes.length === 0 && (
                <p className="text-gray-400">No received quotes found</p>
              )}
            </div>
          </div>

          {/* Sent Quotes */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Sent Quotes</h2>
            <div className="grid gap-6">
              {sentQuotes.map((quote) => (
                <QuoteCard key={quote._id} quote={quote} type="sent" />
              ))}
              {sentQuotes.length === 0 && (
                <p className="text-gray-400">No sent quotes found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Quotes;