import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import Home from '../pages/Home';
import Properties from '../pages/Properties';
import PropertyDetails from '../pages/PropertyDetails';
import Login from '../pages/Login';
import SignUp from '../pages/Register';
import AddProperty from '../pages/AddProperty';
import EditProperty from '../pages/EditProperty';
import MyProperties from '../pages/MyProperties';
import MyRatings from '../pages/MyRatings';
import About from '../pages/About';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

// Dashboard Pages
import DashboardOverview from '../pages/Dashboard/DashboardOverview';
import Profile from '../pages/Dashboard/Profile';
import ManageUsers from '../pages/Dashboard/ManageUsers';
import ManageProperties from '../pages/Dashboard/ManageProperties';
import Statistics from '../pages/Dashboard/Statistics';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/properties',
        element: <Properties />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: '/properties/:id',
            element: <PropertyDetails />,
          },
        ],
      },
    ],
  },
  // Dashboard Routes
  {
    path: '/dashboard',
    element: <PrivateRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <DashboardOverview />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'my-properties',
            element: <MyProperties />,
          },
          {
            path: 'add-property',
            element: <AddProperty />,
          },
          {
            path: 'edit-property/:id',
            element: <EditProperty />,
          },
          {
            path: 'my-ratings',
            element: <MyRatings />,
          },
          // Admin Routes
          {
            element: <AdminRoute />,
            children: [
              {
                path: 'manage-users',
                element: <ManageUsers />,
              },
              {
                path: 'manage-properties',
                element: <ManageProperties />,
              },
              {
                path: 'statistics',
                element: <Statistics />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
