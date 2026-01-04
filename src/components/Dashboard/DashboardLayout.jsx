import { useState } from 'react';
import { Link, Outlet, NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaBuilding, FaStar, FaChartBar, FaUsers, FaCog, FaBars, FaTimes, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../providers/AuthProvider';
import { toast } from 'react-toastify';

const DashboardLayout = () => {
    const { user, isAdmin, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            toast.success('Logged out successfully!');
            navigate('/');
        } catch (error) {
            toast.error('Error logging out!');
        }
    };

    // User menu items
    const userMenuItems = [
        { path: '/dashboard', label: 'Dashboard Home', icon: FaChartBar },
        { path: '/dashboard/my-properties', label: 'My Properties', icon: FaBuilding },
        { path: '/dashboard/my-ratings', label: 'My Ratings', icon: FaStar },
    ];

    // Admin menu items
    const adminMenuItems = [
        { path: '/dashboard', label: 'Dashboard Home', icon: FaChartBar },
        { path: '/dashboard/manage-properties', label: 'Manage Properties', icon: FaBuilding },
        { path: '/dashboard/manage-users', label: 'Manage Users', icon: FaUsers },
        { path: '/dashboard/statistics', label: 'Statistics', icon: FaChartBar },
    ];

    const menuItems = isAdmin ? adminMenuItems : userMenuItems;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
            {/* Top Navbar */}
            <nav className="bg-white dark:bg-slate-800 shadow-md fixed w-full top-0 z-50">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Left: Logo & Menu Toggle */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                            >
                                {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                            </button>
                            <Link to="/" className="flex items-center gap-2">
                                <FaHome className="text-2xl text-purple-600" />
                                <span className="text-xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    HomeNest
                                </span>
                            </Link>
                        </div>

                        {/* Center: Dashboard Title */}
                        <div className="hidden md:block">
                            <h1 className="text-lg font-bold text-gray-800 dark:text-white">
                                {isAdmin ? 'Admin Dashboard' : 'User Dashboard'}
                            </h1>
                        </div>

                        {/* Right: Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition duration-200"
                            >
                                {user?.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt={user.displayName}
                                        className="w-10 h-10 rounded-full object-cover border-2 border-purple-600"
                                    />
                                ) : (
                                    <FaUserCircle className="text-3xl text-gray-600 dark:text-gray-300" />
                                )}
                                <div className="hidden md:block text-left">
                                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                                        {user?.displayName || 'User'}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {isAdmin ? 'Administrator' : 'Member'}
                                    </p>
                                </div>
                            </button>

                            {/* Dropdown Menu */}
                            {profileDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-gray-200 dark:border-slate-700 py-2">
                                    <Link
                                        to="/dashboard/profile"
                                        onClick={() => setProfileDropdownOpen(false)}
                                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                                    >
                                        <FaUser />
                                        Profile
                                    </Link>
                                    <Link
                                        to="/dashboard"
                                        onClick={() => setProfileDropdownOpen(false)}
                                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                                    >
                                        <FaChartBar />
                                        Dashboard Home
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setProfileDropdownOpen(false);
                                            handleLogout();
                                        }}
                                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-slate-700"
                                    >
                                        <FaSignOutAlt />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex pt-16">
                {/* Sidebar */}
                <aside
                    className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 transform transition-transform duration-300 ease-in-out mt-16 lg:mt-0 lg:translate-x-0 ${
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <div className="h-full overflow-y-auto py-6 px-4">
                        {/* Navigation Menu */}
                        <nav className="space-y-2">
                            {menuItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.path === '/dashboard'}
                                    onClick={() => setSidebarOpen(false)}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition duration-200 ${
                                            isActive
                                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                                        }`
                                    }
                                >
                                    <item.icon className="text-xl" />
                                    {item.label}
                                </NavLink>
                            ))}

                            {/* Profile Link */}
                            <NavLink
                                to="/dashboard/profile"
                                onClick={() => setSidebarOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition duration-200 ${
                                        isActive
                                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                                    }`
                                }
                            >
                                <FaUser className="text-xl" />
                                Profile
                            </NavLink>

                            {/* Back to Home */}
                            <Link
                                to="/"
                                onClick={() => setSidebarOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition duration-200"
                            >
                                <FaHome className="text-xl" />
                                Back to Home
                            </Link>
                        </nav>
                    </div>
                </aside>

                {/* Overlay for mobile */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                )}

                {/* Main Content */}
                <main className="flex-1 p-4 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
