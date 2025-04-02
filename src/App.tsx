import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Pages
import HomePage from './pages/HomePage';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Dashboard from './pages/Dashboard';
import Requirements from './pages/Requirements';
import PostRequirement from './pages/PostRequirement';
import MyPosts from './pages/MyPosts';
import ConnectShops from './pages/ConnectShops';
import Requests from './pages/Requests';
import Subscription from './pages/Subscription';
import Quotes from './pages/Quotes';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/requirements" element={<Requirements />} />
          <Route path="/dashboard/post-requirement" element={<PostRequirement />} />
          <Route path="/dashboard/my-posts" element={<MyPosts />} />
          <Route path="/dashboard/connect-shops" element={<ConnectShops />} />
          <Route path="/dashboard/requests" element={<Requests />} />
          <Route path="/dashboard/subscription" element={<Subscription />} />
          <Route path="/dashboard/quotes" element={<Quotes />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/notifications" element={<Notifications />} />
        </Route>
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;