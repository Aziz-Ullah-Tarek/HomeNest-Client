import { useState, useEffect } from 'react';
import { FaBuilding, FaEdit, FaTrash, FaEye, FaSearch } from 'react-icons/fa';
import { useAuth } from '../../providers/AuthProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ManageProperties = () => {
    const { user } = useAuth();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const response = await axios.get(`${backendURL}/properties`);
            setProperties(response.data);
        } catch (error) {
            console.error('Error fetching properties:', error);
            toast.error('Failed to load properties');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this property?')) {
            return;
        }

        try {
            await axios.delete(`${backendURL}/properties/${id}`);
            toast.success('Property deleted successfully!');
            fetchProperties();
        } catch (error) {
            console.error('Error deleting property:', error);
            toast.error('Failed to delete property');
        }
    };

    const filteredProperties = properties.filter(property =>
        property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.userName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
                        Manage Properties
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        View, edit, and manage all properties
                    </p>
                </div>
                <div className="mt-4 md:mt-0">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg shadow-lg">
                        <div className="flex items-center gap-2">
                            <FaBuilding className="text-2xl" />
                            <div>
                                <p className="text-sm font-medium">Total Properties</p>
                                <p className="text-2xl font-black">{properties.length}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaSearch className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search properties by title, category, or owner..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                    <div key={property._id} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
                        {/* Property Image */}
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={property.image || 'https://via.placeholder.com/400x300?text=No+Image'}
                                alt={property.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-3 right-3">
                                <span className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">
                                    {property.category}
                                </span>
                            </div>
                        </div>

                        {/* Property Details */}
                        <div className="p-5">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 truncate">
                                {property.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                                {property.description}
                            </p>

                            <div className="flex items-center justify-between mb-4">
                                <p className="text-2xl font-black text-purple-600">
                                    ${property.price?.toLocaleString()}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    by {property.userName}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                                <Link
                                    to={`/properties/${property._id}`}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                                >
                                    <FaEye />
                                    View
                                </Link>
                                <button
                                    onClick={() => handleDelete(property._id)}
                                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition duration-200"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProperties.length === 0 && (
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-12 text-center">
                    <FaBuilding className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                        {searchTerm ? 'No properties found matching your search' : 'No properties available'}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ManageProperties;
