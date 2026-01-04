import { useState, useEffect } from 'react';
import { FaChartBar, FaBuilding, FaUsers, FaStar } from 'react-icons/fa';
import { useAuth } from '../../providers/AuthProvider';
import axios from 'axios';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'react-toastify';

const Statistics = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

    const COLORS = ['#9333ea', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];

    useEffect(() => {
        fetchStatistics();
    }, []);

    const fetchStatistics = async () => {
        try {
            const token = await user.getIdToken();
            const response = await axios.get(`${backendURL}/dashboard/stats`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching statistics:', error);
            toast.error('Failed to load statistics');
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

    const categoryData = stats?.propertiesByCategory?.map(item => ({
        name: item._id || 'Unknown',
        count: item.count,
        percentage: ((item.count / stats.totalProperties) * 100).toFixed(1)
    })) || [];

    // Mock data for growth trend
    const monthlyGrowth = [
        { month: 'Jan', properties: 12, users: 8, reviews: 15 },
        { month: 'Feb', properties: 19, users: 12, reviews: 22 },
        { month: 'Mar', properties: 25, users: 18, reviews: 30 },
        { month: 'Apr', properties: 32, users: 25, reviews: 42 },
        { month: 'May', properties: 45, users: 35, reviews: 58 },
        { month: 'Jun', properties: stats?.totalProperties || 60, users: stats?.totalUsers || 45, reviews: stats?.totalReviews || 75 }
    ];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
                    Advanced Statistics
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Comprehensive analytics and insights
                </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-purple-100 text-sm font-medium">Total Properties</p>
                            <p className="text-4xl font-black mt-2">{stats?.totalProperties || 0}</p>
                            <p className="text-purple-200 text-xs mt-2">+12% from last month</p>
                        </div>
                        <FaBuilding className="text-6xl text-purple-200 opacity-40" />
                    </div>
                </div>

                <div className="bg-gradient-to-br from-pink-500 to-pink-700 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-pink-100 text-sm font-medium">Total Users</p>
                            <p className="text-4xl font-black mt-2">{stats?.totalUsers || 0}</p>
                            <p className="text-pink-200 text-xs mt-2">+8% from last month</p>
                        </div>
                        <FaUsers className="text-6xl text-pink-200 opacity-40" />
                    </div>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-orange-100 text-sm font-medium">Total Reviews</p>
                            <p className="text-4xl font-black mt-2">{stats?.totalReviews || 0}</p>
                            <p className="text-orange-200 text-xs mt-2">+15% from last month</p>
                        </div>
                        <FaStar className="text-6xl text-orange-200 opacity-40" />
                    </div>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Growth Trend - Area Chart */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Monthly Growth Trend
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={monthlyGrowth}>
                            <defs>
                                <linearGradient id="colorProperties" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#9333ea" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#9333ea" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="month" stroke="#9ca3af" />
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
                            <Area type="monotone" dataKey="properties" stroke="#9333ea" fillOpacity={1} fill="url(#colorProperties)" />
                            <Area type="monotone" dataKey="users" stroke="#ec4899" fillOpacity={1} fill="url(#colorUsers)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Category Distribution - Pie Chart */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Property Categories
                    </h3>
                    {categoryData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percentage }) => `${name}: ${percentage}%`}
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

                {/* Comparison Bar Chart */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        6-Month Comparison
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlyGrowth}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="month" stroke="#9ca3af" />
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
                            <Bar dataKey="properties" fill="#9333ea" radius={[8, 8, 0, 0]} />
                            <Bar dataKey="users" fill="#ec4899" radius={[8, 8, 0, 0]} />
                            <Bar dataKey="reviews" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Line Chart - Trends */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Performance Trends
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyGrowth}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="month" stroke="#9ca3af" />
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
                            <Line type="monotone" dataKey="properties" stroke="#9333ea" strokeWidth={3} />
                            <Line type="monotone" dataKey="users" stroke="#ec4899" strokeWidth={3} />
                            <Line type="monotone" dataKey="reviews" stroke="#10b981" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Category Details Table */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Category Details
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-slate-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Count
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Percentage
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Visual
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                            {categoryData.map((cat, index) => (
                                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                        {cat.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {cat.count}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {cat.percentage}%
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-2">
                                            <div
                                                className="h-2 rounded-full"
                                                style={{
                                                    width: `${cat.percentage}%`,
                                                    backgroundColor: COLORS[index % COLORS.length]
                                                }}
                                            ></div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
