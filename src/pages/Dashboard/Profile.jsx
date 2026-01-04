import { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaSave, FaTimes, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../providers/AuthProvider';
import { toast } from 'react-toastify';
import axios from 'axios';

const Profile = () => {
    const { user, updateUserProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        displayName: '',
        email: '',
        photoURL: '',
        phone: '',
        address: ''
    });

    const backendURL = import.meta.env.VITE_BACKEND_URL || 'https://homenest-server.vercel.app';

    useEffect(() => {
        if (user) {
            setFormData({
                displayName: user.displayName || '',
                email: user.email || '',
                photoURL: user.photoURL || '',
                phone: '',
                address: ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Update Firebase profile
            await updateUserProfile(formData.displayName, formData.photoURL);

            // Update backend profile
            const token = await user.getIdToken();
            await axios.put(
                `${backendURL}/users/profile`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            toast.success('Profile updated successfully!');
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            displayName: user.displayName || '',
            email: user.email || '',
            photoURL: user.photoURL || '',
            phone: '',
            address: ''
        });
        setIsEditing(false);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-12">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        {/* Profile Picture */}
                        <div className="relative">
                            {formData.photoURL ? (
                                <img
                                    src={formData.photoURL}
                                    alt={formData.displayName}
                                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                                />
                            ) : (
                                <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center border-4 border-white shadow-lg">
                                    <FaUserCircle className="text-8xl text-gray-400" />
                                </div>
                            )}
                        </div>

                        {/* User Info */}
                        <div className="text-center md:text-left text-white">
                            <h1 className="text-3xl font-black mb-2">{formData.displayName || 'User'}</h1>
                            <p className="text-purple-100 text-lg">{formData.email}</p>
                        </div>

                        {/* Edit Button */}
                        <div className="md:ml-auto">
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition duration-200"
                                >
                                    <FaEdit />
                                    Edit Profile
                                </button>
                            ) : (
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleCancel}
                                        className="flex items-center gap-2 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition duration-200"
                                    >
                                        <FaTimes />
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Profile Form */}
                <form onSubmit={handleSubmit} className="p-8">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            Personal Information
                        </h2>

                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FaUser className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="displayName"
                                    value={formData.displayName}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="block w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-slate-600 disabled:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                                    placeholder="Enter your full name"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FaEnvelope className="text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    disabled
                                    className="block w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-600 text-gray-500 cursor-not-allowed"
                                    placeholder="Email address"
                                />
                            </div>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Email cannot be changed
                            </p>
                        </div>

                        {/* Photo URL */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Photo URL
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FaUserCircle className="text-gray-400" />
                                </div>
                                <input
                                    type="url"
                                    name="photoURL"
                                    value={formData.photoURL}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="block w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-slate-600 disabled:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                                    placeholder="Enter photo URL"
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Phone Number
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FaPhone className="text-gray-400" />
                                </div>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="block w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-slate-600 disabled:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                                    placeholder="Enter phone number"
                                />
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Address
                            </label>
                            <div className="relative">
                                <div className="absolute top-3 left-0 pl-4 pointer-events-none">
                                    <FaMapMarkerAlt className="text-gray-400" />
                                </div>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    rows="3"
                                    className="block w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-slate-600 disabled:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                                    placeholder="Enter your address"
                                ></textarea>
                            </div>
                        </div>

                        {/* Save Button */}
                        {isEditing && (
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-bold hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                                >
                                    {loading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <FaSave />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
