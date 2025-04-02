import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuthStore } from '../store/authStore';
import { User, Building2, Mail, Phone, Crown } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    _id:user?._id || '',
    name: user?.ownerName || '',
    shopName: user?.shopName || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
  });
  const userPlan = user?.subscription?.plan

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({
        _id:formData?._id,
        name: formData.name,
        shopName: formData.shopName,
      });
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-primary-light rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="btn-secondary"
              >
                Edit Profile
              </button>
            )}
          </div>

          <div className="space-y-6">
            {/* Subscription Status */}
            <div className="bg-primary rounded-lg p-4">
              <div className="flex items-center">
                <Crown className="h-6 w-6 text-secondary mr-3" />
                <div>
                  <p className="text-white font-medium">
                    {userPlan} Plan
                  </p>
                  {user?.subscription?.validUntil && (
                    <p className="text-sm text-gray-400">
                      Valid until: {new Date(user?.subscription?.validUntil).toLocaleDateString()}
                    </p>
                  )}

                </div>
              </div>
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-primary text-white rounded-md px-4 py-2 border border-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="shopName"
                    value={formData.shopName}
                    onChange={handleChange}
                    className="w-full bg-primary text-white rounded-md px-4 py-2 border border-gray-700"
                  />
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-400">Full Name</p>
                    <p className="text-white">{user?.ownerName || ""}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Building2 className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-400">Company Name</p>
                    <p className="text-white">{user?.shopName}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-white">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-400">Mobile</p>
                    <p className="text-white">{user?.mobile}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
