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
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call error:', error);
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