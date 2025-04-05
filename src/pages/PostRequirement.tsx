import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Plus, Trash2, Calendar } from 'lucide-react';
import axios from '../lib/axios';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';

interface Item {
  name: string;
  quantity: number;
  unit: string;
}

const PostRequirement = () => {
  const navigate = useNavigate();
  const [deadline, setDeadline] = useState('');
  const [items, setItems] = useState<Item[]>([{ name: '', quantity: 0, unit: 'units' }]);

  const handleAddItem = () => {
    setItems([...items, { name: '', quantity: 0, unit: 'units' }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: keyof Item, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      await axios.post('/post-requirement', {
        deadline,
        items
      }, { headers: { Authorization: `Bearer ${useAuthStore.getState().token}` }});

      toast.success('Requirement posted successfully!');
      navigate('/dashboard/my-posts');
    } catch (error) {
      toast.error('Failed to post requirement');
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Post New Requirement</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Deadline
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="datetime-local"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full bg-primary-light text-white rounded-md pl-10 pr-4 py-2 border border-gray-700"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-300">
                  Items
                </label>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="flex items-center text-secondary hover:text-secondary-light"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Item
                </button>
              </div>

              {items.map((item, index) => (
                <div key={index} className="flex space-x-4">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                    className="flex-1 bg-primary-light text-white rounded-md px-4 py-2 border border-gray-700"
                    placeholder="Item name"
                    required
                  />
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                    className="w-32 bg-primary-light text-white rounded-md px-4 py-2 border border-gray-700"
                    placeholder="Quantity"
                    min="1"
                    required
                  />
                  <select
                    value={item.unit}
                    onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                    className="w-32 bg-primary-light text-white rounded-md px-4 py-2 border border-gray-700"
                  >
                    <option value="units">Units</option>
                    <option value="strips">Strips</option>
                    <option value="boxes">Boxes</option>
                    <option value="tablets">Tablets</option>
                    <option value="kg">Kilograms</option>
                    <option value="liters">Liters</option>
                  </select>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard/my-posts')}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Post Requirement
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default PostRequirement;