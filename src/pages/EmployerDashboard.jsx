import { useState } from 'react';
import { Link } from 'react-router-dom';

const EmployerDashboard = () => {
  const [stats] = useState({
    totalJobs: 12,
    activeJobs: 8,
    totalApplications: 45,
    newApplications: 7
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Employer Dashboard</h1>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900">Total Jobs</h3>
          <p className="text-3xl font-bold text-primary-600">{stats.totalJobs}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900">Active Jobs</h3>
          <p className="text-3xl font-bold text-green-600">{stats.activeJobs}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900">Total Applications</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalApplications}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900">New Applications</h3>
          <p className="text-3xl font-bold text-orange-600">{stats.newApplications}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link to="/post-job" className="btn-primary">
            Post New Job
          </Link>
          <Link to="/jobs" className="btn-secondary">
            View All Jobs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard; 