import { useState, useEffect } from 'react';
import { FaBuilding, FaStar, FaUsers, FaChartLine } from 'react-icons/fa';
import { useAuth } from '../../providers/AuthProvider';
import axios from 'axios';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'react-toastify';

const DashboardOverview = () => {
    const { user, isAdmin } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

    const COLORS = ['#9333ea', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];

    useEffect(() => {
        fetchDashboardStats();
    }, [user]);

    const fetchDashboardStats = async () => {
        if (!user) return;

        try {
            const token = await user.getIdToken();
            const response = await axios.get(`${backendURL}/dashboard/stats`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            toast.error('Failed to load dashboard statistics');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    if (isAdmin) {
        const categoryData = stats?.propertiesByCategory?.map(item => ({
            name: item._id || 'Unknown',
            count: item.count
        })) || [];

        return (
            <div className="space-y-6">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Welcome back, {user?.displayName || 'Admin'}! Here's what's happening today.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100 text-sm font-medium">Total Properties</p>
                                <p className="text-3xl font-black mt-2">{stats?.totalProperties || 0}</p>
                            </div>
                            <FaBuilding className="text-5xl text-purple-200 opacity-50" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-pink-500 to-pink-700 rounded-xl p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-pink-100 text-sm font-medium">Total Users</p>
                                <p className="text-3xl font-black mt-2">{stats?.totalUsers || 0}</p>
                            </div>
                            <FaUsers className="text-5xl text-pink-200 opacity-50" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-orange-100 text-sm font-medium">Total Reviews</p>
                                <p className="text-3xl font-black mt-2">{stats?.totalReviews || 0}</p>
                            </div>
                            <FaStar className="text-5xl text-orange-200 opacity-50" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm font-medium">Growth Rate</p>
                                <p className="text-3xl font-black mt-2">+12%</p>
                            </div>
                            <FaChartLine className="text-5xl text-blue-200 opacity-50" />
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Properties by Category - Pie Chart */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            Properties by Category
                        </h3>
                        {categoryData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="count"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400 text-center py-20">No data available</p>
                        )}
                    </div>

                    {/* Properties by Category - Bar Chart */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            Category Distribution
                        </h3>
                        {categoryData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={categoryData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                    <XAxis dataKey="name" stroke="#9ca3af" />
                                    <YAxis stroke="#9ca3af" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1f2937',
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: '#fff'
                                        }}
                                    />
                                    <Legend />
                                    <Bar dataKey="count" fill="#9333ea" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400 text-center py-20">No data available</p>
                        )}
                    </div>
                </div>

                {/* Recent Properties Table */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Recent Properties
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-slate-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Owner
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                                {stats?.recentProperties?.map((property) => (
                                    <tr key={property._id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                            {property.title}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {property.category}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            ${property.price?.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {property.userName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(property.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {(!stats?.recentProperties || stats.recentProperties.length === 0) && (
                            <p className="text-gray-500 dark:text-gray-400 text-center py-8">No properties found</p>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // User Dashboard
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
                    My Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Welcome back, {user?.displayName || 'User'}! Manage your properties and reviews.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-purple-100 text-sm font-medium">My Properties</p>
                            <p className="text-3xl font-black mt-2">{stats?.userProperties || 0}</p>
                        </div>
                        <FaBuilding className="text-5xl text-purple-200 opacity-50" />
                    </div>
                </div>

                <div className="bg-gradient-to-br from-pink-500 to-pink-700 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-pink-100 text-sm font-medium">My Reviews</p>
                            <p className="text-3xl font-black mt-2">{stats?.userReviews || 0}</p>
                        </div>
                        <FaStar className="text-5xl text-pink-200 opacity-50" />
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-100 text-sm font-medium">Active Listings</p>
                            <p className="text-3xl font-black mt-2">{stats?.userProperties || 0}</p>
                        </div>
                        <FaChartLine className="text-5xl text-blue-200 opacity-50" />
                    </div>
                </div>
            </div>

            {/* Recent Properties Table */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    My Recent Properties
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-slate-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Price
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                            {stats?.userPropertiesList?.map((property) => (
                                <tr key={property._id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                        {property.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {property.category}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        ${property.price?.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(property.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {(!stats?.userPropertiesList || stats.userPropertiesList.length === 0) && (
                        <p className="text-gray-500 dark:text-gray-400 text-center py-8">No properties found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
