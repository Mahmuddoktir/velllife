import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      // Mock data - replace with actual API call
      const mockJobs = [
        {
          id: 1,
          title: 'Senior React Developer',
          company: 'TechCorp',
          location: 'New York, NY',
          type: 'Full-time',
          salary: '$120,000 - $150,000',
          description: 'We are looking for an experienced React developer...',
          postedDate: '2024-01-15'
        },
        {
          id: 2,
          title: 'Python Backend Engineer',
          company: 'StartupXYZ',
          location: 'San Francisco, CA',
          type: 'Full-time',
          salary: '$100,000 - $130,000',
          description: 'Join our growing team as a Python backend engineer...',
          postedDate: '2024-01-14'
        },
        {
          id: 3,
          title: 'DevOps Engineer',
          company: 'CloudTech',
          location: 'Remote',
          type: 'Contract',
          salary: '$90,000 - $120,000',
          description: 'Help us build and maintain our cloud infrastructure...',
          postedDate: '2024-01-13'
        }
      ];
      
      setJobs(mockJobs);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !location || job.location.toLowerCase().includes(location.toLowerCase());
    const matchesType = !jobType || job.type === jobType;
    
    return matchesSearch && matchesLocation && matchesType;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Find Your Next Job</h1>
        <p className="text-gray-600">{filteredJobs.length} jobs found</p>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs or companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input-field"
          />
          
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="input-field"
          >
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
          
          <button className="btn-primary flex items-center justify-center">
            <FunnelIcon className="h-5 w-5 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div key={job.id} className="card hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      <Link to={`/jobs/${job.id}`} className="hover:text-primary-600">
                        {job.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-2">{job.company}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.type}</span>
                      <span>•</span>
                      <span>{job.salary}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mt-3 line-clamp-2">{job.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-500">
                    Posted {new Date(job.postedDate).toLocaleDateString()}
                  </span>
                  <Link
                    to={`/jobs/${job.id}`}
                    className="btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
          <p className="text-gray-400">Try adjusting your search terms or filters.</p>
        </div>
      )}
    </div>
  );
};

export default JobListings; 