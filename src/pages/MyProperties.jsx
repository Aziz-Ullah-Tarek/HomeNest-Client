import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye, FaMapMarkerAlt, FaCalendar, FaTags, FaDollarSign, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from '../providers/AuthProvider';

const MyProperties = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [propertyReviews, setPropertyReviews] = useState({});
  const [loading, setLoading] = useState(true);

  // Function to render star rating
  const StarRating = ({ rating, reviewCount }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }
    
    // Add half star if needed
    if (hasHalfStar && fullStars < 5) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }
    
    // Add empty stars
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />);
    }
    
    return (
      <div className="flex items-center gap-1 text-sm">
        {stars}
        <span className="ml-1 text-gray-600 font-semibold">
          {rating > 0 ? rating.toFixed(1) : 'No ratings'}
        </span>
        {reviewCount > 0 && (
          <span className="text-gray-500 text-xs">({reviewCount})</span>
        )}
      </div>
    );
  };

  const fetchPropertyReviews = async (propertyId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/reviews/property/${propertyId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching reviews for property:', propertyId, error);
      return [];
    }
  };

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };

  const fetchMyProperties = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/properties');
      const userProperties = response.data.filter(prop => prop.userEmail === user?.email);
      setProperties(userProperties);
      
      // Fetch reviews for each property
      const reviewsData = {};
      for (const property of userProperties) {
        const reviews = await fetchPropertyReviews(property._id);
        reviewsData[property._id] = {
          reviews,
          averageRating: calculateAverageRating(reviews),
          count: reviews.length
        };
      }
      setPropertyReviews(reviewsData);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Failed to load properties');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyProperties();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleDelete = async (id, title) => {
    // Show SweetAlert2 confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure?',
      html: `You are about to delete <strong>"${title}"</strong>.<br/>This action cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      customClass: {
        popup: 'rounded-2xl',
        confirmButton: 'rounded-full px-6 py-2.5 font-bold',
        cancelButton: 'rounded-full px-6 py-2.5 font-bold'
      }
    });

    if (result.isConfirmed) {
      try {
        // Delete from database
        await axios.delete(`http://localhost:3000/api/properties/${id}`);
        
        // Instantly update UI without refresh
        setProperties(prevProperties => 
          prevProperties.filter(property => property._id !== id)
        );

        // Show success message
        Swal.fire({
          title: 'Deleted!',
          text: 'Property has been deleted successfully.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            popup: 'rounded-2xl'
          }
        });

        toast.success('Property deleted successfully! 🗑️');
      } catch (error) {
        console.error('Error deleting property:', error);
        
        // Show error message
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete property. Please try again.',
          icon: 'error',
          confirmButtonColor: '#9333ea',
          customClass: {
            popup: 'rounded-2xl',
            confirmButton: 'rounded-full px-6 py-2.5 font-bold'
          }
        });

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
                  
                  {/* Star Rating */}
                  <div className="mb-3">
                    <StarRating 
                      rating={propertyReviews[property._id]?.averageRating || 0} 
                      reviewCount={propertyReviews[property._id]?.count || 0}
                    />
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <FaMapMarkerAlt className="text-purple-600 mr-2 shrink-0" />
                      <span className="line-clamp-1">{property.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FaDollarSign className="text-purple-600 mr-2 shrink-0" />
                      <span className="font-bold text-purple-600">${property.price?.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FaCalendar className="text-purple-600 mr-2 shrink-0" />
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