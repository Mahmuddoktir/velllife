import { Link } from 'react-router-dom';
import { 
  BriefcaseIcon, 
  BuildingOfficeIcon, 
  UserGroupIcon,
  MagnifyingGlassIcon,
  ChartBarIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import ApiTest from '../components/ApiTest';

const Home = () => {
  return (
    <div className="space-y-16">
      {/* API Test Section - Temporary */}
      <section className="py-8">
        <ApiTest />
      </section>

      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-br from-primary-50 to-blue-50 rounded-3xl">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Find Your Dream Job in
            <span className="text-primary-600"> IT</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with top employers and discover opportunities that match your skills and career goals. 
            Whether you're a job seeker or an employer, VellLife Jobs is your gateway to success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/jobs"
              className="btn-primary text-lg px-8 py-3 flex items-center justify-center"
            >
              <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
              Find Jobs
            </Link>
            <Link
              to="/register"
              className="btn-secondary text-lg px-8 py-3"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose VellLife Jobs?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide a comprehensive platform for both job seekers and employers in the IT industry.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="card text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BriefcaseIcon className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              For Job Seekers
            </h3>
            <p className="text-gray-600">
              Upload your resume, browse thousands of IT job opportunities, and apply with just one click.
            </p>
          </div>

          <div className="card text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BuildingOfficeIcon className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              For Employers
            </h3>
            <p className="text-gray-600">
              Post job listings, manage applications, and find the perfect candidates for your team.
            </p>
          </div>

          <div className="card text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheckIcon className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Secure & Reliable
            </h3>
            <p className="text-gray-600">
              Your data is protected with industry-standard security measures and privacy controls.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
            <div className="text-gray-600">Active Jobs</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">1000+</div>
            <div className="text-gray-600">Job Seekers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">200+</div>
            <div className="text-gray-600">Companies</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">95%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16 bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl text-white">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Take the Next Step?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of professionals who have found their dream jobs through VellLife Jobs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Create Account
          </Link>
          <Link
            to="/jobs"
            className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-primary-600 transition-colors"
          >
            Browse Jobs
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 