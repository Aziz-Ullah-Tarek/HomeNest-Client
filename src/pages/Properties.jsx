import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaDollarSign, FaUser, FaArrowRight, FaTags, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [propertyReviews, setPropertyReviews] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

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

  useEffect(() => {
    const fetchAllProperties = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/properties');
        setProperties(response.data);
        
        // Fetch reviews for each property
        const reviewsData = {};
        for (const property of response.data) {
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
    
    fetchAllProperties();
  }, []);

  // Filter properties by category
  const filteredProperties = selectedCategory === 'All' 
    ? properties 
    : properties.filter(property => property.category === selectedCategory);

  // Get unique categories
  const categories = ['All', ...new Set(properties.map(p => p.category))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
            All Properties
          </h1>
          <p className="text-gray-600 text-lg">
            Explore our complete collection of properties
          </p>
          <div className="mt-2 flex items-center justify-center gap-2">
            <div className="h-1 w-20 bg-linear-to-r from-purple-600 to-pink-600 rounded-full"></div>
            <div className="h-1 w-10 bg-linear-to-r from-pink-600 to-purple-600 rounded-full"></div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md hover:shadow-lg'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Properties Count */}
        <div className="mb-6 text-center">
          <p className="text-gray-600 font-semibold">
            Showing <span className="text-purple-600 font-black">{filteredProperties.length}</span> {filteredProperties.length === 1 ? 'property' : 'properties'}
          </p>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Properties Found</h3>
            <p className="text-gray-600">
              {selectedCategory === 'All' 
                ? 'There are no properties available at the moment.' 
                : `No properties found in the "${selectedCategory}" category.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <div 
                key={property._id} 
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-purple-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                      <FaTags className="text-xs" />
                      {property.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Property Name */}
                  <h3 className="text-xl font-black text-gray-900 mb-2 line-clamp-1 group-hover:text-purple-600 transition-colors">
                    {property.title}
                  </h3>
                  
                  {/* Star Rating */}
                  <div className="mb-3">
                    <StarRating 
                      rating={propertyReviews[property._id]?.averageRating || 0} 
                      reviewCount={propertyReviews[property._id]?.count || 0}
                    />
                  </div>
                  
                  {/* Property Details */}
                  <div className="space-y-2.5 mb-5">
                    {/* Location */}
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center mr-3 shrink-0">
                        <FaMapMarkerAlt className="text-purple-600 text-xs" />
                      </div>
                      <span className="line-clamp-1 font-medium">{property.location}</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center text-sm">
                      <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center mr-3 shrink-0">
                        <FaDollarSign className="text-green-600 text-xs" />
                      </div>
                      <span className="font-black text-lg text-purple-600">
                        ${property.price?.toLocaleString()}
                      </span>
                    </div>

                    {/* Posted By */}
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center mr-3 shrink-0">
                        <FaUser className="text-pink-600 text-xs" />
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 font-semibold">Posted by</span>
                        <p className="font-bold text-gray-800 line-clamp-1">{property.userName || 'Unknown User'}</p>
                      </div>
                    </div>
                  </div>

                  {/* See Details Button */}
                  <Link 
                    to={`/properties/${property._id}`}
                    className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-purple-600 to-pink-600 text-white py-3 rounded-full font-bold hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg group/button"
                  >
                    <span>See Details</span>
                    <FaArrowRight className="group-hover/button:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Statistics */}
        {properties.length > 0 && (
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-center text-xl font-black text-gray-900 mb-6">Property Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4 bg-linear-to-br from-purple-50 to-purple-100 rounded-xl">
                <p className="text-3xl font-black text-purple-600 mb-1">{properties.length}</p>
                <p className="text-sm text-gray-600 font-semibold">Total Properties</p>
              </div>
              <div className="p-4 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl">
                <p className="text-3xl font-black text-blue-600 mb-1">
                  {properties.filter(p => p.category === 'Sale').length}
                </p>
                <p className="text-sm text-gray-600 font-semibold">For Sale</p>
              </div>
              <div className="p-4 bg-linear-to-br from-green-50 to-green-100 rounded-xl">
                <p className="text-3xl font-black text-green-600 mb-1">
                  {properties.filter(p => p.category === 'Rent').length}
                </p>
                <p className="text-sm text-gray-600 font-semibold">For Rent</p>
              </div>
              <div className="p-4 bg-linear-to-br from-pink-50 to-pink-100 rounded-xl">
                <p className="text-3xl font-black text-pink-600 mb-1">
                  {properties.filter(p => p.category === 'Commercial' || p.category === 'Land' || p.category === 'Residential').length}
                </p>
                <p className="text-sm text-gray-600 font-semibold">Other Types</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;