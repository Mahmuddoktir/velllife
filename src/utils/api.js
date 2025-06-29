const API_BASE_URL = 'https://job-portal-production-c0a1.up.railway.app/api/v1';

// Helper function to get auth token from localStorage
export const getAuthToken = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user).token : null;
};

// Helper function to get common headers
export const getHeaders = (includeAuth = true) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
};

// Generic API call function
export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: getHeaders(options.includeAuth !== false),
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    // Try to parse the response as JSON
    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      // If response is not JSON, create a simple error object
      data = { message: `HTTP ${response.status}: ${response.statusText}` };
    }
    
    if (!response.ok) {
      // Handle different types of error responses
      const errorMessage = data.message || data.error || data.detail || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }
    
    return data;
  } catch (error) {
    console.error('API call error:', error);
    
    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to the server. Please check your internet connection.');
    }
    
    throw error;
  }
};

// Auth API functions
export const authAPI = {
  login: (credentials) => apiCall('/users/log-in', {
    method: 'POST',
    body: JSON.stringify(credentials),
    includeAuth: false,
  }),
  
  register: (userData) => apiCall('/users/sign-up', {
    method: 'POST',
    body: JSON.stringify(userData),
    includeAuth: false,
  }),
};

export default apiCall; 