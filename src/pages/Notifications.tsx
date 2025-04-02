import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useQuery } from '@tanstack/react-query';
import axios from '../lib/axios';
import { format } from 'date-fns';
import { Bell, MessageSquare, Users, FileText, Crown } from 'lucide-react';

const getNotificationIcon = (type: string) => {
  // This function takes a string type and returns the corresponding icon component
  switch (type) {
    case 'quote':
      return MessageSquare;
    case 'connection':
      return Users;
    case 'requirement':
      return FileText;
    case 'subscription':
      return Crown;
    default:
      return Bell;
  }
};

const Notifications = () => {
  const { data: notifications, isLoading } = useQuery({
    // This query fetches the user's notifications from the API
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await axios.get('/api/notifications');
      return response.data;
    },
  });

  if (isLoading) {
    // If the query is still loading, show a loading animation
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
          <h1 className="text-2xl font-bold text-white">Notifications</h1>
          <button className="text-secondary hover:text-secondary-light text-sm">
            Mark all as read
          </button>
        </div>

        <div className="space-y-4">
          {notifications?.map((notification) => {
            const Icon = getNotificationIcon(notification.type);
            return (
              <div
                key={notification._id}
                className={`p-4 rounded-lg ${
                  notification.read
                    ? 'bg-primary-light'
                    : 'bg-primary-light border-l-4 border-secondary'
                }`}
              >
                <div className="flex items-start">
                  <div className={`p-2 rounded-full ${
                    notification.read
                      ? 'bg-gray-700 text-gray-400'
                      : 'bg-secondary bg-opacity-20 text-secondary'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className={`text-sm ${
                      notification.read ? 'text-gray-400' : 'text-white'
                    }`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {format(new Date(notification.createdAt), 'PPP p')}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;

