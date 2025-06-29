import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrashIcon, 
  UserGroupIcon, 
  DocumentTextIcon,
  CogIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const [stats] = useState({
    totalUsers: 1250,
    totalJobs: 450,
    pendingApprovals: 23,
    totalApplications: 890
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900">Total Users</h3>
          <p className="text-3xl font-bold text-primary-600">{stats.totalUsers}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900">Total Jobs</h3>
          <p className="text-3xl font-bold text-green-600">{stats.totalJobs}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900">Pending Approvals</h3>
          <p className="text-3xl font-bold text-orange-600">{stats.pendingApprovals}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900">Total Applications</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalApplications}</p>
        </div>
      </div>

      {/* Admin Actions */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Admin Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/admin/panel"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow group"
          >
            <div className="p-3 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
              <TrashIcon className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-gray-900">Job Management</h3>
              <p className="text-sm text-gray-600">View and delete job postings</p>
            </div>
          </Link>
          
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow group">
            <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
              <UserGroupIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-gray-900">Manage Users</h3>
              <p className="text-sm text-gray-600">User management and moderation</p>
            </div>
          </button>
          
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow group">
            <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
              <DocumentTextIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-gray-900">Moderate Jobs</h3>
              <p className="text-sm text-gray-600">Review and approve job postings</p>
            </div>
          </button>
          
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow group">
            <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
              <ChartBarIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-gray-900">View Reports</h3>
              <p className="text-sm text-gray-600">Analytics and insights</p>
            </div>
          </button>
          
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow group">
            <div className="p-3 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
              <CogIcon className="h-6 w-6 text-gray-600" />
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-gray-900">System Settings</h3>
              <p className="text-sm text-gray-600">Platform configuration</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 