// API base URL logic for Vite proxy (development) and production
const API_BASE_URL = import.meta.env.DEV
  ? '/api/users' // Vite proxy will rewrite /api to /api/v1
  : 'https://job-portal-production-c0a1.up.railway.app/api/v1/users';

// Job API base URL
const JOB_API_BASE_URL = import.meta.env.DEV
  ? '/api/jobs'
  : 'https://job-portal-production-c0a1.up.railway.app/api/v1/jobs';

export const authAPI = {
  register: async (data) => {
    const res = await fetch(`${API_BASE_URL}/sign-up`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Registration failed');
    return json;
  },

  login: async ({ email, password }) => {
    const res = await fetch(`${API_BASE_URL}/log-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Login failed');
    return json;
  },
};

export const jobAPI = {
  getAllJobs: async () => {
    const res = await fetch(`${JOB_API_BASE_URL}`);
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to fetch jobs');
    return json;
  },
  getJobById: async (id) => {
    const res = await fetch(`${JOB_API_BASE_URL}/${id}`);
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to fetch job');
    return json;
  },
  createJob: async (data) => {
    const res = await fetch(`${JOB_API_BASE_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to create job');
    return json;
  },
  applyForJob: async (id, data) => {
    const res = await fetch(`${JOB_API_BASE_URL}/${id}/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to apply for job');
    return json;
  },
};
