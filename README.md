# 🏠 HomeNest - Find Your Dream Home

**Live Site URL:** [Coming Soon]

HomeNest is a modern, full-stack real estate property listing platform that connects property seekers with their dream homes. Built with the MERN stack, it offers a seamless experience for browsing, searching, and managing property listings.

---

## ✨ Key Features

- **🔐 Secure Authentication** - Firebase-powered email/password and Google authentication with protected routes and persistent login sessions

- **🌓 Dark/Light Theme Toggle** - Smooth theme switching with localStorage persistence across all pages for comfortable browsing in any lighting condition

- **📱 Fully Responsive Design** - Mobile-first approach with adaptive navigation (hamburger menu for mobile, pill-style nav for desktop) ensuring perfect experience on all devices

- **🔍 Advanced Property Search & Filtering** - Real-time search by property name, category-based filtering (House, Apartment, Studio, Villa), and multi-parameter sorting (by price, date, or title in ascending/descending order)

- **⭐ Rating & Review System** - Authenticated users can rate properties (1-5 stars), write detailed reviews, and view average ratings with total review counts for informed decision-making

- **🏡 Property Management Dashboard** - Complete CRUD operations for property owners including add, edit, delete properties with instant UI updates and image URL integration

- **📊 User Dashboard** - Personalized sections to view "My Properties" with rating insights and "My Ratings" to manage all submitted reviews in one place

- **🎨 Modern UI/UX** - Beautiful gradient designs, smooth animations, interactive hover effects, and Swiper.js-powered image carousels for an engaging user experience

- **⚡ Performance Optimized** - Backend sorting with MongoDB aggregation, frontend caching, lazy loading, and efficient state management for lightning-fast responses

- **🔒 Data Security** - Protected API endpoints, user-specific data access, email-based ownership validation, and secure MongoDB database with proper authentication

---

## 🛠️ Technologies Used

### Frontend
- **React 19.1.1** - Modern UI with hooks and context API
- **Vite 7.1.7** - Lightning-fast build tool
- **Tailwind CSS 4.1.17** - Utility-first styling with custom dark mode
- **Firebase** - Authentication and user management
- **Axios** - HTTP client for API requests
- **React Router DOM** - Client-side routing
- **Swiper.js** - Touch-enabled image sliders
- **React Icons** - Comprehensive icon library
- **SweetAlert2** - Beautiful alert modals

### Backend
- **Node.js & Express.js** - RESTful API server
- **MongoDB** - NoSQL database for scalable data storage
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Firebase project with authentication enabled

### Backend Setup
```bash
cd backend
npm install
# Create .env file with:
# MONGODB_URI=your_mongodb_connection_string
# PORT=3000
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
# Create .env file with Firebase config
npm run dev
```

---

## 📄 API Endpoints

### Properties
- `GET /properties` - Get all properties (with sorting)
- `GET /properties/featured` - Get featured properties
- `GET /properties/:id` - Get single property
- `POST /properties` - Create new property
- `PUT /properties/:id` - Update property
- `DELETE /properties/:id` - Delete property

### Reviews
- `GET /reviews` - Get all reviews
- `GET /reviews/property/:propertyId` - Get reviews for a property
- `GET /reviews/user/:userEmail` - Get user's reviews
- `POST /reviews` - Create new review
- `DELETE /reviews/:id` - Delete review

### Sliders
- `GET /sliders` - Get homepage slider images

---

## 👨‍💻 Author

**Aziz Ullah Tarek**  
GitHub: [@Aziz-Ullah-Tarek](https://github.com/Aziz-Ullah-Tarek)

---

## 📝 License

This project is open source and available under the MIT License.

---

**HomeNest** - Where every house becomes a home 🏡✨
