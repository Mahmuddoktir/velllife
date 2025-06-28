# VellLife Job Portal Frontend

A comprehensive job portal frontend for IT professionals, built with React and integrated with a backend API.

## Features

- **User Authentication**: Login and registration with role-based access (Job Seeker, Employer, Admin)
- **Protected Routes**: Role-based route protection and automatic redirects
- **Modern UI**: Built with Tailwind CSS and Heroicons
- **API Integration**: Fully integrated with backend APIs
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Backend API Integration

The frontend is integrated with the following backend APIs:

### Authentication Endpoints
- **Login**: `POST https://job-portal-production-c0a1.up.railway.app/api/v1/users/log-in`
- **Registration**: `POST https://job-portal-production-c0a1.up.railway.app/api/v1/users/sign-up`

### API Configuration
- Base URL: `https://job-portal-production-c0a1.up.railway.app/api/v1`
- Authentication: Bearer token in Authorization header
- Content-Type: application/json

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd velllife-job-portal
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation component
│   ├── ProtectedRoute.jsx # Route protection component
│   └── ApiTest.jsx     # API testing component (temporary)
├── contexts/           # React contexts
│   └── AuthContext.jsx # Authentication context
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── Login.jsx       # Login page
│   ├── Register.jsx    # Registration page
│   ├── JobListings.jsx # Job listings page
│   ├── JobDetails.jsx  # Job details page
│   ├── EmployerDashboard.jsx # Employer dashboard
│   ├── JobSeekerDashboard.jsx # Job seeker dashboard
│   ├── AdminDashboard.jsx # Admin dashboard
│   ├── PostJob.jsx     # Post job page
│   └── Profile.jsx     # User profile page
├── utils/              # Utility functions
│   └── api.js          # API configuration and helpers
├── App.jsx             # Main app component
└── main.jsx           # App entry point
```

## API Integration Details

### Authentication Flow

1. **Registration**: Users can register as either Job Seekers or Employers
2. **Login**: Users authenticate with email, password, and user type
3. **Token Storage**: JWT tokens are stored in localStorage
4. **Protected Routes**: Routes are protected based on user type and authentication status

### API Utility Functions

The `src/utils/api.js` file provides:

- `apiCall()`: Generic API call function with error handling
- `authAPI.login()`: Login API wrapper
- `authAPI.register()`: Registration API wrapper
- `getAuthToken()`: Get stored authentication token
- `getHeaders()`: Get request headers with authentication

### Error Handling

The frontend includes comprehensive error handling:

- Network errors are caught and displayed to users
- API error messages are extracted and shown
- Loading states are managed for better UX
- Form validation prevents invalid submissions

## User Types and Permissions

### Job Seeker
- Can browse job listings
- Can apply to jobs
- Access to job seeker dashboard
- Profile management

### Employer
- Can post job listings
- Can manage job applications
- Access to employer dashboard
- Company profile management

### Admin
- Full system access
- User management
- System analytics
- Content moderation

## Testing the API Integration

A temporary API test component is included on the home page that allows you to:

1. Test the login API with sample credentials
2. Test the registration API with sample data
3. View API responses and error messages

To remove the test component, simply remove the `<ApiTest />` component from `src/pages/Home.jsx`.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies Used

- **React 19** - UI library
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Heroicons** - Icon library
- **Vite** - Build tool and dev server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions, please contact the VellLife team or create an issue in the repository.
