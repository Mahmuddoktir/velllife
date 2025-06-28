import { useState } from 'react';
import { Link } from 'react-router-dom';

const JobSeekerDashboard = () => {
  const [stats] = useState({
    applicationsSubmitted: 15,
    interviewsScheduled: 3,
    jobsSaved: 8,
    profileViews: 12
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Job Seeker Dashboard</h1>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900">Applications</h3>
          <p className="text-3xl font-bold text-primary-600">{stats.applicationsSubmitted}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900">Interviews</h3>
          <p className="text-3xl font-bold text-green-600">{stats.interviewsScheduled}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900">Saved Jobs</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.jobsSaved}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900">Profile Views</h3>
          <p className="text-3xl font-bold text-orange-600">{stats.profileViews}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link to="/jobs" className="btn-primary">
            Browse Jobs
          </Link>
          <Link to="/profile" className="btn-secondary">
            Update Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDashboard; 