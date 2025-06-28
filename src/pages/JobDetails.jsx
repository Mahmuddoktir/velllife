import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  MapPinIcon, 
  CurrencyDollarIcon, 
  ClockIcon,
  BuildingOfficeIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const JobDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockJob = {
      id: parseInt(id),
      title: 'Senior React Developer',
      company: 'TechCorp',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$120,000 - $150,000',
      description: 'We are looking for an experienced React developer to join our team.',
      postedDate: '2024-01-15'
    };
    
    setJob(mockJob);
    setLoading(false);
  }, [id]);

  const handleApply = async () => {
    if (!user) {
      // Redirect to login
      return;
    }
    
    try {
      // Mock API call - replace with actual API call
      console.log('Applying for job:', job.id);
      setApplied(true);
    } catch (error) {
      console.error('Error applying for job:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>
        <p className="text-xl text-gray-600 mb-4">{job.company}</p>
        <p className="text-gray-600 mb-4">{job.location} • {job.type} • {job.salary}</p>
        <p className="text-gray-700 mb-6">{job.description}</p>
        
        {user?.userType === 'jobseeker' ? (
          <button
            onClick={handleApply}
            disabled={applied}
            className={`w-full lg:w-auto px-8 py-3 rounded-lg font-medium ${
              applied
                ? 'bg-green-600 text-white cursor-not-allowed'
                : 'btn-primary'
            }`}
          >
            {applied ? 'Applied ✓' : 'Apply Now'}
          </button>
        ) : !user ? (
          <Link to="/login" className="btn-primary w-full lg:w-auto px-8 py-3">
            Login to Apply
          </Link>
        ) : null}
      </div>
      
      <div className="mt-6">
        <Link to="/jobs" className="btn-secondary">← Back to Jobs</Link>
      </div>
    </div>
  );
};

export default JobDetails; 