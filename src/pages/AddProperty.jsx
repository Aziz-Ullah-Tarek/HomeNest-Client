import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaDollarSign, FaMapMarkerAlt, FaImage, FaAlignLeft, FaTags } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../providers/AuthProvider';

const AddProperty = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    location: '',
    image: ''
  });

  const categories = ['Rent', 'Sale', 'Commercial', 'Land', 'Residential'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.price <= 0) {
      toast.error('Price must be greater than 0!');
      return;
    }

    setLoading(true);
    try {
      const propertyData = {
        ...formData,
        price: Number(formData.price),
        userEmail: user.email,
        userName: user.displayName || 'Anonymous',
        createdAt: new Date().toISOString()
      };

      const response = await axios.post('https://homenest-server.vercel.app/properties', propertyData);
      
      if (response.data.insertedId) {
        toast.success('Property added successfully! ');
        setFormData({ title: '', description: '', category: '', price: '', location: '', image: '' });
        setTimeout(() => navigate('/my-properties'), 1500);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add property!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">Add New Property</h1>
          <p className="text-gray-500 dark:text-gray-400">List your property and reach potential buyers</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-slate-700">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Property Name */}
            <div>
              <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                <FaHome className="text-purple-600 mr-2" /> Property Name *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Like Rose garden"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                required
              />
            </div>

            {/* Category and Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                  <FaTags className="text-purple-600 mr-2" /> Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 outline-none"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div>
                <label className="flex items-center text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  <FaDollarSign className="text-purple-600 dark:text-purple-400 mr-2" /> Price (USD) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="250000"
                  min="1"
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-purple-600 outline-none"
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="flex items-center text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                <FaMapMarkerAlt className="text-purple-600 dark:text-purple-400 mr-2" /> Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Like Dhaka, Bangladesh"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-purple-600 outline-none"
                required
              />
            </div>

            {/* Image Link */}
            <div>
              <label className="flex items-center text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                <FaImage className="text-purple-600 dark:text-purple-400 mr-2" /> Image Link *
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="img url"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-purple-600 outline-none"
                required
              />
              {formData.image && (
                <img src={formData.image} alt="Preview" className="mt-3 w-full h-40 object-cover rounded-xl" 
                  onError={(e) => e.target.src = 'https://via.placeholder.com/400x200?text=Invalid+Image'} />
              )}
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                <FaAlignLeft className="text-purple-600 dark:text-purple-400 mr-2" /> Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your property..."
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-purple-600 outline-none resize-none"
                required
              />
            </div>

            {/* User Info (Read-only) */}
            <div className="bg-gray-100 dark:bg-slate-700 rounded-xl p-5 border-2 border-purple-200 dark:border-purple-700">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Contact Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">User Name</label>
                  <input type="text" value={user?.displayName || 'Anonymous'} readOnly 
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-slate-600 border border-gray-300 dark:border-slate-500 rounded-lg text-sm text-gray-700 dark:text-gray-200 cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">User Email</label>
                  <input type="email" value={user?.email || ''} readOnly 
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-slate-600 border border-gray-300 dark:border-slate-500 rounded-lg text-sm text-gray-700 dark:text-gray-200 cursor-not-allowed" />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Adding...' : 'Add Property'}
              </button>
              <button type="button" onClick={() => navigate('/')}
                className="px-8 py-3 border-2 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-200 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-slate-700">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;