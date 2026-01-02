import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaHome, FaBars, FaUser, FaBuilding, FaPlusCircle, FaStar, FaMoon, FaSun, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import { MdRealEstateAgent, MdEmail } from 'react-icons/md';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import { useAuth } from '../providers/AuthProvider';
import { useTheme } from '../contexts/ThemeContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const menuRef = useRef(null);
  const userRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
      if (userRef.current && !userRef.current.contains(e.target)) setUserDropdown(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setUserDropdown(false);
      toast.success('Logged out successfully!');
    } catch {
      toast.error('Logout failed!');
    }
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: <FaHome /> },
    { path: '/properties', label: 'All Properties', icon: <MdRealEstateAgent /> },
    { path: '/about', label: 'About Us', icon: <FaInfoCircle /> },
    { path: '/contact', label: 'Contact', icon: <FaEnvelope /> },
  ];

  const privateLinks = [
    { path: '/add-property', label: 'Add Properties', icon: <FaPlusCircle /> },
    { path: '/my-properties', label: 'My Properties', icon: <FaBuilding /> },
    { path: '/my-ratings', label: 'My Ratings', icon: <FaStar /> },
  ];

  const allLinks = [...navLinks, ...(user ? privateLinks : [])];

  return (
    <nav className="fixed w-full top-0 z-50 bg-white dark:bg-slate-900 shadow-lg border-b border-gray-200 dark:border-slate-700">
      <div className="h-1 bg-gradient-to-r from-purple-600 to-pink-600"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          
          {/* Mobile: Hamburger Menu Button - Left Side */}
          <div className="lg:hidden relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Menu"
            >
              <FaBars className="text-2xl text-purple-600 dark:text-purple-400" />
            </button>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden">
                <div className="p-2">
                  {allLinks.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700'
                        }`
                      }
                    >
                      <span className="text-lg">{link.icon}</span>
                      <span className="text-sm">{link.label}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Logo - Left on Desktop, Center on Mobile */}
          <Link to="/" className="flex items-center space-x-3 lg:space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-md opacity-50 lg:group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 p-2 lg:p-3 rounded-2xl shadow-lg lg:group-hover:scale-110 transition-transform duration-300">
                <MdRealEstateAgent className="text-2xl lg:text-3xl text-white" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight">
                HomeNest
              </h1>
              <p className="text-[10px] lg:text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wider">FIND YOUR DREAM</p>
            </div>
          </Link>

          {/* Desktop: Navigation Links - Center */}
          <div className="hidden lg:flex items-center bg-gray-100 dark:bg-slate-800 rounded-full px-2 py-2 space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-slate-700 hover:text-purple-600 dark:hover:text-purple-400 hover:shadow-md'
                  }`
                }
              >
                <span className="text-base">{link.icon}</span>
                <span>{link.label}</span>
              </NavLink>
            ))}

            {user && privateLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-slate-700 hover:text-purple-600 dark:hover:text-purple-400 hover:shadow-md'
                  }`
                }
              >
                <span className="text-base">{link.icon}</span>
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Right Side - Theme Toggle + User/Login */}
          <div className="flex items-center space-x-2 lg:space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 lg:p-3 rounded-lg lg:rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <FaSun className="text-lg lg:text-xl text-yellow-500" />
              ) : (
                <FaMoon className="text-lg lg:text-xl text-purple-600" />
              )}
            </button>

            {/* User Dropdown or Login */}
            {user ? (
              <div className="relative" ref={userRef}>
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center space-x-2 lg:space-x-3 p-1 lg:p-0 lg:bg-gradient-to-r lg:from-purple-50 lg:to-pink-50 dark:lg:from-slate-800 dark:lg:to-slate-800 lg:border-2 lg:border-purple-200 dark:lg:border-slate-600 lg:px-5 lg:py-2.5 rounded-lg lg:rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 lg:hover:bg-transparent lg:hover:border-purple-400 dark:lg:hover:border-purple-500 transition-all duration-300"
                >
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName || 'User'} 
                      className="w-8 h-8 lg:w-9 lg:h-9 rounded-full object-cover border-2 border-purple-300"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                      <FaUser className="text-white text-xs lg:text-sm" />
                    </div>
                  )}
                </button>

                {/* User Dropdown */}
                {userDropdown && (
                  <div className="absolute right-0 mt-2 lg:mt-3 w-72 bg-white dark:bg-slate-800 rounded-xl lg:rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden z-50">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 lg:px-6 py-3 lg:py-4">
                      <div className="flex items-center space-x-3">
                        {user.photoURL ? (
                          <img 
                            src={user.photoURL} 
                            alt={user.displayName || 'User'} 
                            className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover border-2 lg:border-3 border-white shadow-lg"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white">
                            <FaUser className="text-white text-lg lg:text-xl" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-sm lg:text-lg truncate">
                            {user.displayName || 'User'}
                          </h3>
                          <p className="text-purple-100 text-xs">Account Settings</p>
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-3 lg:p-4 space-y-2 lg:space-y-3">
                      {/* Name */}
                      <div className="flex items-center space-x-3 p-2 lg:px-3 lg:py-2 rounded-lg bg-gray-50 dark:bg-slate-700">
                        <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                          <FaUser className="text-purple-600 dark:text-purple-400 text-xs lg:text-sm" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] lg:text-xs text-gray-500 dark:text-gray-400 font-semibold">Name</p>
                          <p className="text-xs lg:text-sm text-gray-800 dark:text-gray-200 font-bold truncate">
                            {user.displayName || 'Not provided'}
                          </p>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-center space-x-3 p-2 lg:px-3 lg:py-2 rounded-lg bg-gray-50 dark:bg-slate-700">
                        <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center">
                          <MdEmail className="text-pink-600 dark:text-pink-400 text-xs lg:text-sm" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] lg:text-xs text-gray-500 dark:text-gray-400 font-semibold">Email</p>
                          <p className="text-xs lg:text-sm text-gray-800 dark:text-gray-200 font-bold truncate">
                            {user.email || 'Not provided'}
                          </p>
                        </div>
                      </div>

                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2.5 lg:py-3 rounded-lg font-bold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg mt-2 lg:mt-4"
                      >
                        <BiLogOut className="text-sm lg:text-lg" />
                        <span className="text-sm">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2 lg:space-x-3">
                <Link
                  to="/login"
                  className="hidden lg:flex items-center space-x-2 border-2 border-purple-600 text-purple-600 px-6 py-2.5 rounded-full font-bold hover:bg-purple-50 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                >
                  <BiLogIn className="text-lg" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/login"
                  className="lg:hidden flex items-center space-x-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-bold hover:from-purple-700 hover:to-pink-700 transition-all text-sm"
                >
                  <BiLogIn className="text-base" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="hidden lg:flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-full font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <FaUser className="text-sm" />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
