import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { jobAPI } from '../utils/api';
import { 
  MapPinIcon, 
  CurrencyDollarIcon, 
  ClockIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

const JobDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await jobAPI.getJobById(id);
      setJob(response.data || response);
    } catch (error) {
      console.error('Error fetching job details:', error);
      setError(error.message || 'Failed to load job details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!user) {
      navigate('/login', { state: { from: `/jobs/${id}` } });
      return;
    }

    if (user.role !== 'jobseeker') {
      setError('Only job seekers can apply for jobs.');
      return;
    }
    
    try {
      setApplying(true);
      setError('');
      
      await jobAPI.applyForJob(id, {
        coverLetter: 'I am interested in this position and would like to apply.',
        resume: 'Resume attached'
      });
      
      setApplied(true);
    } catch (error) {
      console.error('Error applying for job:', error);
      setError(error.message || 'Failed to apply for job. Please try again.');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error && !job) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
          <button 
            onClick={fetchJobDetails}
            className="ml-2 underline hover:no-underline"
          >
            Try again
          </button>
        </div>
        <div className="mt-6">
          <Link to="/jobs" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
        <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
        <Link to="/jobs" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="bg-white p-8 rounded-lg shadow">
        {/* Job Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
          <div className="flex items-center text-xl text-gray-600 mb-4">
            <BuildingOfficeIcon className="h-6 w-6 mr-2" />
            {job.company}
          </div>
          
          {/* Job Meta Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <MapPinIcon className="h-5 w-5 mr-2" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <ClockIcon className="h-5 w-5 mr-2" />
              <span>{job.type}</span>
            </div>
            {job.salary && (
              <div className="flex items-center text-gray-600">
                <CurrencyDollarIcon className="h-5 w-5 mr-2" />
                <span>{job.salary}</span>
              </div>
            )}
          </div>

          {/* Posted Date */}
          <div className="flex items-center text-sm text-gray-500">
            <CalendarIcon className="h-4 w-4 mr-2" />
            <span>Posted {new Date(job.createdAt || job.postedDate).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Job Description */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
          </div>
        </div>

        {/* Requirements */}
        {job.requirements && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{job.requirements}</p>
            </div>
          </div>
        )}

        {/* Benefits */}
        {job.benefits && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Benefits</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{job.benefits}</p>
            </div>
          </div>
        )}

        {/* Apply Button */}
        <div className="border-t pt-6">
          {user?.role === 'jobseeker' ? (
            <button
              onClick={handleApply}
              disabled={applying || applied}
              className={`w-full lg:w-auto px-8 py-3 rounded-lg font-medium transition-colors ${
                applied
                  ? 'bg-green-600 text-white cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50'
              }`}
            >
              {applying ? 'Applying...' : applied ? 'Applied ✓' : 'Apply Now'}
            </button>
          ) : !user ? (
            <Link 
              to="/login" 
              state={{ from: `/jobs/${id}` }}
              className="inline-block w-full lg:w-auto px-8 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 text-center"
            >
              Login to Apply
            </Link>
          ) : (
            <p className="text-gray-600 italic">
              Only job seekers can apply for positions.
            </p>
          )}
        </div>
      </div>
      
      {/* Back Button */}
      <div className="mt-6">
        <Link 
          to="/jobs" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Jobs
        </Link>
      </div>
    </div>
  );
};

export default JobDetails; 