import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Properties from '../pages/Properties';
import Login from '../pages/Login';
import SignUp from '../pages/Register';
import AddProperty from '../pages/AddProperty';
import MyProperties from '../pages/MyProperties';
import MyRatings from '../pages/MyRatings';
import NotFound from '../pages/NotFound';
import PrivateRoute from './PrivateRoute';

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
            path: '/add-property',
            element: <AddProperty />,
          },
          {
            path: '/my-properties',
            element: <MyProperties />,
          },
          {
            path: '/my-ratings',
            element: <MyRatings />,
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
