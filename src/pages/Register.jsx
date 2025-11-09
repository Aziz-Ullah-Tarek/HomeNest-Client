import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle, FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser, FaImage } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        photoURL: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validatePassword = (password) => {
        const errors = [];
        
        if (password.length < 6) {
            errors.push('Password must be at least 6 characters long');
        }
        if (!/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
        }
        if (!/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
        }
        
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validate password
        const passwordErrors = validatePassword(formData.password);
        if (passwordErrors.length > 0) {
            passwordErrors.forEach(error => toast.error(error));
            setLoading(false);
            return;
        }

        try {
            // TODO: Implement Firebase register logic here
            console.log('Register data:', formData);
            toast.success('Registration successful!');
        } catch (error) {
            toast.error(error.message || 'Registration failed!');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            // TODO: Implement Google login logic here
            console.log('Google login clicked');
            toast.success('Google registration successful!');
        } catch (error) {
            toast.error(error.message || 'Google registration failed!');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-50 via-pink-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                {/* Card Container */}
                <div className="bg-white rounded-2xl shadow-2xl p-6 space-y-6">
                    {/* Header */}
                    <div className="text-center">
                        <div className="mx-auto w-12 h-12 bg-linear-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mb-3">
                            <FaUser className="text-white text-xl" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900">GreenNest SignUp Now</h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Join us and find your dream home
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Name Input */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                                    placeholder="Enter your full name"
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        {/* Photo URL Input */}
                        <div>
                            <label htmlFor="photoURL" className="block text-sm font-semibold text-gray-700 mb-1">
                                Photo URL
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaImage className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="photoURL"
                                    name="photoURL"
                                    type="url"
                                    value={formData.photoURL}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                                    placeholder="Enter photo URL (optional)"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                                    placeholder="Create a strong password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                            <p className="mt-2 text-xs text-gray-500">
                                Must contain uppercase, lowercase, and at least 6 characters
                            </p>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Creating account...
                                </div>
                            ) : (
                                'Create Account'
                            )}
                        </button>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
                            </div>
                        </div>

                        {/* Google Login Button */}
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border-2 border-gray-300 rounded-lg shadow-sm bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-200"
                        >
                            <FaGoogle className="h-5 w-5 text-red-500" />
                            Sign up with Google
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="text-center pt-2">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link 
                                to="/login" 
                                className="font-semibold text-purple-600 hover:text-purple-500 transition duration-200"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Additional Info */}
                <p className="mt-6 text-center text-xs text-gray-500">
                    By creating an account, you agree to our{' '}
                    <a href="#" className="text-purple-600 hover:text-purple-500">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-purple-600 hover:text-purple-500">Privacy Policy</a>
                </p>
            </div>
        </div>
    );
};

export default Register;