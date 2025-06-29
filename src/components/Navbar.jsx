import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  BriefcaseIcon, 
  UserIcon, 
  BuildingOfficeIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BriefcaseIcon className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">VellLife Jobs</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors">
              Home
            </Link>
            <Link to="/jobs" className="text-gray-600 hover:text-primary-600 transition-colors">
              Find Jobs
            </Link>
            {user?.userType === 'employer' && (
              <Link to="/post-job" className="text-gray-600 hover:text-primary-600 transition-colors">
                Post Job
              </Link>
            )}
            {user?.userType === 'admin' && (
              <Link to="/admin/dashboard" className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition-colors">
                <ShieldCheckIcon className="h-5 w-5" />
                <span>Admin Panel</span>
              </Link>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
                    <UserIcon className="h-5 w-5" />
                    <span>{user.name}</span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <UserIcon className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                      
                      {user.userType === 'employer' && (
                        <Link
                          to="/employer/dashboard"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <BuildingOfficeIcon className="h-4 w-4 mr-2" />
                          Employer Dashboard
                        </Link>
                      )}
                      
                      {user.userType === 'jobseeker' && (
                        <Link
                          to="/jobseeker/dashboard"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <BriefcaseIcon className="h-4 w-4 mr-2" />
                          Job Seeker Dashboard
                        </Link>
                      )}
                      
                      {user.userType === 'admin' && (
                        <>
                          <Link
                            to="/admin/dashboard"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <CogIcon className="h-4 w-4 mr-2" />
                            Admin Dashboard
                          </Link>
                          <Link
                            to="/admin/panel"
                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <ShieldCheckIcon className="h-4 w-4 mr-2" />
                            Job Management
                          </Link>
                        </>
                      )}
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Register
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