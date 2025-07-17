# VellLife Job Portal

A comprehensive job portal for IT professionals, connecting job seekers with employers.

## 🚀 Features

- **User Authentication**: Secure login and registration for job seekers, employers, and admins
- **Job Listings**: Browse and search for available positions
- **Job Posting**: Employers can post new job opportunities
- **Job Applications**: Job seekers can apply for positions
- **User Dashboards**: Separate dashboards for different user types
- **Protected Routes**: Role-based access control
- **API Integration**: Full integration with the backend API

## 🔧 Recent Fixes

### Authentication Issues Fixed
- ✅ Fixed AuthContext to use consistent API utility functions
- ✅ Added proper loading states and error handling
- ✅ Fixed function signature mismatches between components and context
- ✅ Updated login/register to use correct API endpoints

### API Communication Issues Fixed
- ✅ Replaced mock data with actual API calls
- ✅ Added comprehensive error handling for all API requests
- ✅ Created proper API utility functions for jobs, users, and authentication
- ✅ Fixed field name mismatches between frontend and API

### Component Issues Fixed
- ✅ Updated JobListings to fetch real data from API
- ✅ Fixed PostJob component to properly create jobs
- ✅ Enhanced JobDetails with proper API integration
- ✅ Added ProtectedRoute component for secure navigation
- ✅ Fixed styling inconsistencies

## 🛠️ Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 📱 Usage

### For Job Seekers
1. Register/Login as a job seeker
2. Browse available jobs on the `/jobs` page
3. Click on job details to view full information
4. Apply for positions you're interested in
5. View your applications in your dashboard

### For Employers
1. Register/Login as an employer
2. Post new job opportunities using the "Post Job" feature
3. Manage your posted jobs in your dashboard
4. View applications from job seekers

### For Admins
1. Login with admin credentials
2. Access admin dashboard for system management
3. Monitor all jobs and applications

## 🔗 API Endpoints

The application communicates with the following API endpoints:

- **Authentication**: `/api/v1/users/log-in`, `/api/v1/users/sign-up`
- **Jobs**: `/api/v1/jobs` (GET, POST, PUT, DELETE)
- **Applications**: `/api/v1/jobs/:id/apply`
- **User Profile**: `/api/v1/users/profile`

## 🎨 Styling

The application uses:
- **Tailwind CSS** for styling
- **Heroicons** for icons
- **Responsive design** for mobile and desktop

## 🔒 Security Features

- JWT token-based authentication
- Protected routes based on user roles
- Secure API communication with proper headers
- Input validation and sanitization

## 🐛 Debugging

Use the DebugInfo component to monitor:
- Authentication state
- User information
- Local storage data
- API connection status

## 📝 Environment Variables

Make sure your API base URL is correctly set in `src/utils/api.js`:
```javascript
const API_BASE_URL = 'https://job-portal-production-c0a1.up.railway.app/api/v1';
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details
