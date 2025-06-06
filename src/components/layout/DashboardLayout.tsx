import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, X, LayoutDashboard, FileText, PlusCircle, History, Users, UserPlus, 
  Crown, MessageSquareQuote, UserCog, Bell, LogOut, Search
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface SidebarItem {
  name: string;
  icon: React.ElementType;
  path: string;
  badge?: number;
}

const sidebarItems: SidebarItem[] = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Requirements', icon: FileText, path: '/dashboard/requirements', badge: 12 },
  { name: 'Post Requirement', icon: PlusCircle, path: '/dashboard/post-requirement' },
  { name: 'My Posts', icon: History, path: '/dashboard/my-posts', badge: 5 },
  { name: 'Connect to Shops', icon: Users, path: '/dashboard/connect-shops', badge: 8 },
  { name: 'Requests', icon: UserPlus, path: '/dashboard/requests', badge: 3 },
  { name: 'Subscription', icon: Crown, path: '/dashboard/subscription' },
  { name: 'Quotes', icon: MessageSquareQuote, path: '/dashboard/quotes', badge: 7 },
  { name: 'Update Profile', icon: UserCog, path: '/dashboard/profile' },
  { name: 'Notifications', icon: Bell, path: '/dashboard/notifications', badge: 4 },
];

const Sidebar: React.FC<{ isSidebarOpen: boolean; toggleSidebar: () => void }> = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <aside
      className={`fixed inset-y-0 left-0 w-64 bg-primary-light transform transition-transform duration-300 ease-in-out z-30
      ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:block`}
    >
      <div className="h-full flex flex-col">
        {/* Logo & Close Button */}
        <div className="flex items-center justify-between h-16 px-4 bg-primary-dark">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-white">MedSupply</span>
          </Link>
          <button onClick={toggleSidebar} className="lg:hidden text-gray-400 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg mb-1 transition-colors duration-200 ${
                isActivePath(item.path) ? 'bg-secondary text-white' : 'text-gray-400 hover:text-white hover:bg-primary'
              }`}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span className="flex-1">{item.name}</span>
              {item.badge && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">{item.badge}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-secondary bg-opacity-20 flex items-center justify-center text-secondary font-bold">
              {user?.ownerName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.ownerName}</p>
              <p className="text-xs text-gray-400 truncate">{user?.shopName}</p>
            </div>
            <button onClick={handleLogout} className="text-gray-400 hover:text-white flex-shrink-0" title="Logout">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen flex bg-primary">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content - Adjusted for Sidebar */}
      <div className={`flex-1 flex flex-col transition-all duration-300 lg:ml-64`}>
        {/* Top Navigation */}
        <header className="sticky top-0 bg-primary-dark shadow-lg z-10">
          <div className="flex items-center justify-between h-16 px-4">
            <button onClick={toggleSidebar} className="text-gray-400 hover:text-white lg:hidden">
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex-1 max-w-xl mx-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-primary border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-secondary"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Notifications */}
            <div className="flex items-center space-x-4">
              <Link to="/dashboard/notifications" className="text-gray-400 hover:text-white relative">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  4
                </span>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content - Now properly positioned */}
        <main className="flex-1 overflow-y-auto bg-primary p-6">{children}</main>
      </div>

      {/* Overlay (Backdrop) for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;
