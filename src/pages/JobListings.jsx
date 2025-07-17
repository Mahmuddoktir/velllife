import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { jobAPI } from '../utils/api';

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await jobAPI.getAllJobs();
      setJobs(response.data || response || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError(error.message || 'Failed to fetch jobs. Please try again later.');
      // Fallback to empty array
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !location || job.location?.toLowerCase().includes(location.toLowerCase());
    const matchesType = !jobType || job.type === jobType;
    
    return matchesSearch && matchesLocation && matchesType;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Find Your Next Job</h1>
        <p className="text-gray-600">{filteredJobs.length} jobs found</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
          <button 
            onClick={fetchJobs}
            className="ml-2 underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs or companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
            />
          </div>
          
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
          
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center justify-center">
            <FunnelIcon className="h-5 w-5 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div key={job.id || job._id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      <Link to={`/jobs/${job.id || job._id}`} className="hover:text-blue-600">
                        {job.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-2">{job.company}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.type}</span>
                      {job.salary && (
                        <>
                          <span>•</span>
                          <span>{job.salary}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mt-3 line-clamp-2">{job.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-500">
                    Posted {new Date(job.createdAt || job.postedDate).toLocaleDateString()}
                  </span>
                  <Link
                    to={`/jobs/${job.id || job._id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
          <p className="text-gray-400">Try adjusting your search terms or filters.</p>
        </div>
      )}
    </div>
  );
};

export default JobListings; 