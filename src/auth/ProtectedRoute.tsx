import { Outlet, Navigate } from 'react-router-dom'; // Import Navigate
import { useUser } from './useUser';

const ProtectedRoute = () => {
  const { isAuth } = useUser();

  if (!isAuth) {
    // Redirect to the sign-in page if the user is not authenticated
    return <Navigate to="/auth/sign-in" />;
  }

  // Render child route elements
  return <Outlet />;
};

export default ProtectedRoute;
