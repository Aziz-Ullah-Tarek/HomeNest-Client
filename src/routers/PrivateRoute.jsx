import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // TODO: Replace with actual authentication logic
  const user = null; // Get from AuthContext later
  
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
