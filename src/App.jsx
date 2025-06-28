import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import JobListings from './pages/JobListings';
import JobDetails from './pages/JobDetails';
import EmployerDashboard from './pages/EmployerDashboard';
import JobSeekerDashboard from './pages/JobSeekerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import PostJob from './pages/PostJob';
import Profile from './pages/Profile';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<JobListings />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route 
                path="/employer/dashboard" 
                element={
                  <ProtectedRoute allowedUserTypes={['employer']}>
                    <EmployerDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/jobseeker/dashboard" 
                element={
                  <ProtectedRoute allowedUserTypes={['jobseeker']}>
                    <JobSeekerDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute allowedUserTypes={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/post-job" 
                element={
                  <ProtectedRoute allowedUserTypes={['employer']}>
                    <PostJob />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
