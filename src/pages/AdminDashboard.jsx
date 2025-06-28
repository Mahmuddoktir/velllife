import { useState } from 'react';

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="btn-primary">Manage Users</button>
          <button className="btn-primary">Moderate Jobs</button>
          <button className="btn-secondary">View Reports</button>
          <button className="btn-secondary">System Settings</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 