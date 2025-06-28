import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedUserTypes = [] }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If specific user types are required, check if user has permission
  if (allowedUserTypes.length > 0 && !allowedUserTypes.includes(user.userType)) {
    // Redirect to appropriate dashboard based on user type
    switch (user.userType) {
      case 'employer':
        return <Navigate to="/employer/dashboard" replace />;
      case 'jobseeker':
        return <Navigate to="/jobseeker/dashboard" replace />;
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute; 