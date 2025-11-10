import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye, FaMapMarkerAlt, FaCalendar, FaTags, FaDollarSign } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../providers/AuthProvider';

const MyProperties = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyProperties();
  }, [user]);

  const fetchMyProperties = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/properties');
      const userProperties = response.data.filter(prop => prop.userEmail === user?.email);
      setProperties(userProperties);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Failed to load properties');
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await axios.delete(`http://localhost:3000/api/properties/${id}`);
        toast.success('Property deleted successfully! 🗑️');
        fetchMyProperties();
      } catch (error) {
        toast.error('Failed to delete property');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">My Properties</h1>
            <p className="text-gray-600">Manage your property listings</p>
          </div>
          <Link to="/add-property" className="bg-linear-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-bold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl">
            + Add New Property
          </Link>
        </div>

        {/* Properties Grid */}
        {properties.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Properties Yet</h3>
            <p className="text-gray-600 mb-6">Start by adding your first property listing</p>
            <Link to="/add-property" className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full font-bold hover:bg-purple-700">
              Add Property
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div key={property._id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img src={property.image} alt={property.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">{property.category}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{property.title}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <FaMapMarkerAlt className="text-purple-600 mr-2 flex-shrink-0" />
                      <span className="line-clamp-1">{property.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FaDollarSign className="text-purple-600 mr-2 flex-shrink-0" />
                      <span className="font-bold text-purple-600">${property.price?.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FaCalendar className="text-purple-600 mr-2 flex-shrink-0" />
                      <span>{new Date(property.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    <Link to={`/properties/${property._id}`} className="flex items-center justify-center bg-gray-100 hover:bg-purple-600 hover:text-white text-gray-700 py-2 rounded-lg font-semibold transition-all text-sm">
                      <FaEye className="mr-1" /> View
                    </Link>
                    <Link to={`/edit-property/${property._id}`} className="flex items-center justify-center bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-700 py-2 rounded-lg font-semibold transition-all text-sm">
                      <FaEdit className="mr-1" /> Edit
                    </Link>
                    <button onClick={() => handleDelete(property._id, property.title)} className="flex items-center justify-center bg-gray-100 hover:bg-red-600 hover:text-white text-gray-700 py-2 rounded-lg font-semibold transition-all text-sm">
                      <FaTrash className="mr-1" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {properties.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-black text-purple-600">{properties.length}</p>
                <p className="text-sm text-gray-600">Total Properties</p>
              </div>
              <div>
                <p className="text-3xl font-black text-purple-600">{properties.filter(p => p.category === 'Sale').length}</p>
                <p className="text-sm text-gray-600">For Sale</p>
              </div>
              <div>
                <p className="text-3xl font-black text-purple-600">{properties.filter(p => p.category === 'Rent').length}</p>
                <p className="text-sm text-gray-600">For Rent</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProperties;