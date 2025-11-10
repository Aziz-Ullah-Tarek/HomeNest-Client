import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaHome, FaDollarSign, FaMapMarkerAlt, FaImage, FaAlignLeft, FaTags } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../providers/AuthProvider';

const EditProperty = () => {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/properties/${id}`);
        const property = response.data;
        
        if (property.userEmail !== user?.email) {
          toast.error('You can only edit your own properties!');
          navigate('/my-properties');
          return;
        }
        
        setFormData({
          title: property.title,
          description: property.description,
          category: property.category,
          price: property.price,
          location: property.location,
          image: property.image
        });
      } catch (error) {
        toast.error('Failed to load property');
        navigate('/my-properties');
      }
    };
    fetchProperty();
  }, [id, user, navigate]);

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
      await axios.put(`http://localhost:3000/api/properties/${id}`, {
        ...formData,
        price: Number(formData.price)
      });
      
      toast.success('Property updated successfully! ✨');
      setTimeout(() => navigate('/my-properties'), 1500);
    } catch (error) {
      toast.error('Failed to update property!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-purple-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Edit Property</h1>
          <p className="text-gray-600">Update your property details</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                <FaHome className="text-purple-600 mr-2" /> Property Name *
              </label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                  <FaTags className="text-purple-600 mr-2" /> Category *
                </label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none" required>
                  <option value="">Select Category</option>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div>
                <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                  <FaDollarSign className="text-purple-600 mr-2" /> Price (USD) *
                </label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} min="1" className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none" required />
              </div>
            </div>

            <div>
              <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                <FaMapMarkerAlt className="text-purple-600 mr-2" /> Location *
              </label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none" required />
            </div>

            <div>
              <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                <FaImage className="text-purple-600 mr-2" /> Image Link *
              </label>
              <input type="url" name="image" value={formData.image} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none" required />
              {formData.image && (
                <img src={formData.image} alt="Preview" className="mt-3 w-full h-40 object-cover rounded-xl" onError={(e) => e.target.src = 'https://via.placeholder.com/400x200?text=Invalid+Image'} />
              )}
            </div>

            <div>
              <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                <FaAlignLeft className="text-purple-600 mr-2" /> Description *
              </label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none resize-none" required />
            </div>

            <div className="flex gap-4 pt-2">
              <button type="submit" disabled={loading} className="flex-1 bg-linear-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50">
                {loading ? 'Updating...' : '✨ Update Property'}
              </button>
              <button type="button" onClick={() => navigate('/my-properties')} className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProperty;
