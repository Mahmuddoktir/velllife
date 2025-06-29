import { useState, useEffect } from 'react';
import { 
  TrashIcon, 
  EyeIcon, 
  BuildingOfficeIcon, 
  UserIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

const AdminPanel = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockJobs = [
        {
          id: 1,
          title: 'Senior React Developer',
          company: 'TechCorp Inc.',
          location: 'New York, NY',
          type: 'Full-time',
          postedBy: 'employer',
          postedByUser: 'John Smith',
          postedDate: '2024-01-15',
          status: 'active',
          description: 'We are looking for a senior React developer...'
        },
        {
          id: 2,
          title: 'Frontend Developer',
          company: 'StartupXYZ',
          location: 'San Francisco, CA',
          type: 'Contract',
          postedBy: 'employer',
          postedByUser: 'Sarah Johnson',
          postedDate: '2024-01-14',
          status: 'active',
          description: 'Join our growing team as a frontend developer...'
        },
        {
          id: 3,
          title: 'Looking for Remote Work',
          company: 'Freelancer',
          location: 'Remote',
          type: 'Freelance',
          postedBy: 'jobseeker',
          postedByUser: 'Mike Wilson',
          postedDate: '2024-01-13',
          status: 'active',
          description: 'Experienced developer seeking remote opportunities...'
        },
        {
          id: 4,
          title: 'UI/UX Designer Needed',
          company: 'Design Studio',
          location: 'Los Angeles, CA',
          type: 'Part-time',
          postedBy: 'employer',
          postedByUser: 'Emily Davis',
          postedDate: '2024-01-12',
          status: 'active',
          description: 'Creative UI/UX designer wanted for exciting projects...'
        }
      ];
      setJobs(mockJobs);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || job.postedBy === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const handleDeleteJob = (job) => {
    setJobToDelete(job);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (jobToDelete) {
      setJobs(jobs.filter(job => job.id !== jobToDelete.id));
      setShowDeleteModal(false);
      setJobToDelete(null);
    }
  };

  const viewJobDetails = (job) => {
    setSelectedJob(job);
  };

  const closeJobDetails = () => {
    setSelectedJob(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Admin Panel - Job Management</h1>
        <div className="text-sm text-gray-600">
          Total Jobs: {jobs.length} | Filtered: {filteredJobs.length}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs by title, company, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <FunnelIcon className="h-5 w-5 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Jobs</option>
              <option value="employer">Employer Posts</option>
              <option value="jobseeker">Job Seeker Posts</option>
            </select>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Postings</h2>
        
        {filteredJobs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No jobs found matching your criteria.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        job.postedBy === 'employer' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {job.postedBy === 'employer' ? 'Employer' : 'Job Seeker'}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center space-x-1">
                        <BuildingOfficeIcon className="h-4 w-4" />
                        <span>{job.company}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <UserIcon className="h-4 w-4" />
                        <span>Posted by: {job.postedByUser}</span>
                      </div>
                      <span>•</span>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.type}</span>
                      <span>•</span>
                      <span>Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
                    </div>
                    
                    <p className="text-gray-700 text-sm line-clamp-2">
                      {job.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => viewJobDetails(job)}
                      className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteJob(job)}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Job"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h2>
              <button
                onClick={closeJobDetails}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold">Company:</span> {selectedJob.company}
                </div>
                <div>
                  <span className="font-semibold">Location:</span> {selectedJob.location}
                </div>
                <div>
                  <span className="font-semibold">Type:</span> {selectedJob.type}
                </div>
                <div>
                  <span className="font-semibold">Posted by:</span> {selectedJob.postedByUser}
                </div>
                <div>
                  <span className="font-semibold">Posted on:</span> {new Date(selectedJob.postedDate).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-semibold">Status:</span> 
                  <span className={`ml-1 px-2 py-1 text-xs rounded-full ${
                    selectedJob.postedBy === 'employer' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {selectedJob.postedBy === 'employer' ? 'Employer Post' : 'Job Seeker Post'}
                  </span>
                </div>
              </div>
              
              <div>
                <span className="font-semibold">Description:</span>
                <p className="mt-2 text-gray-700">{selectedJob.description}</p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => handleDeleteJob(selectedJob)}
                className="btn-secondary text-red-600 hover:text-red-700"
              >
                Delete Job
              </button>
              <button
                onClick={closeJobDetails}
                className="btn-primary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the job posting "{jobToDelete?.title}"? 
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel; 