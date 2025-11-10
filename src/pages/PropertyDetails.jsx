import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaHeart, FaShare, FaPhone, FaEnvelope, FaCalendar, FaTags } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../providers/AuthProvider';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/properties/${id}`);
        console.log('Fetched property details:', response.data);
        setProperty(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching property details:', error);
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Property Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-purple-600 text-white px-6 py-3 rounded-full font-bold hover:bg-purple-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <button onClick={() => navigate('/')} className="hover:text-purple-600">Home</button>
            <span>/</span>
            <button onClick={() => navigate('/properties')} className="hover:text-purple-600">Properties</button>
            <span>/</span>
            <span className="text-gray-900 font-semibold">{property.title}</span>
          </nav>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Image */}
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 left-6">
                <span className="bg-purple-600 text-white px-6 py-3 rounded-full text-sm font-bold">
                  {property.category}
                </span>
              </div>
              <div className="absolute top-6 right-6 flex space-x-3">
                <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-pink-500 hover:text-white transition-all duration-300">
                  <FaHeart size={20} />
                </button>
                <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300">
                  <FaShare size={20} />
                </button>
              </div>
            </div>

            {/* Property Info Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="inline-block bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-bold mb-3">
                    {property.category}
                  </span>
                  <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-gray-600 text-lg">
                    <FaMapMarkerAlt className="text-purple-600 mr-2" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">Price</p>
                  <p className="text-4xl font-black text-purple-600">
                    ${property.price?.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Property</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {property.description}
                </p>
              </div>

              {/* Additional Details */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Property Type</p>
                  <p className="text-lg font-bold text-gray-900">{property.category}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl flex items-center">
                  <FaCalendar className="text-purple-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Listed Date</p>
                    <p className="text-sm font-bold text-gray-900">
                      {new Date(property.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 shadow-lg sticky top-24">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Agent</h3>
              
              {/* Agent Info */}
              <div className="flex items-center mb-6 pb-6 border-b border-gray-200">
                <div className="w-16 h-16 rounded-full bg-linear-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white text-2xl font-bold mr-4">
                  {user?.displayName?.charAt(0) || 'A'}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{user?.displayName || 'Real Estate Agent'}</p>
                  <p className="text-sm text-gray-600">Property Specialist</p>
                </div>
              </div>

              {/* Contact Form */}
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    defaultValue={user?.displayName || ''}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={user?.email || ''}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none resize-none"
                    placeholder="I'm interested in this property..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-linear-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>
              </form>

              {/* Quick Contact */}
              <div className="mt-6 space-y-3">
                <a
                  href="tel:+15550000000"
                  className="flex items-center justify-center w-full border-2 border-purple-600 text-purple-600 py-3 rounded-xl font-bold hover:bg-purple-50 transition-all duration-300"
                >
                  <FaPhone className="mr-2" />
                  Call Now
                </a>
                <a
                  href="mailto:agent@homenest.com"
                  className="flex items-center justify-center w-full border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all duration-300"
                >
                  <FaEnvelope className="mr-2" />
                  Email Agent
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
