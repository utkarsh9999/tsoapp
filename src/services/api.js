import axios from 'axios';

const API_URL = 'http://localhost:4000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    //console.log('Token : ', token);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: (email, password) => api.post('/api/auth/login', { email, password }),
  register: (name, email, password) => api.post('/api/auth/register', { name, email, password }),
  forgotPassword: (email) => api.post('/api/auth/forgot-password', { email }),
};

export const tasks = {
  getAll: () => api.get('/api/tasks'),
  create: (task) => api.post('/api/tasks', task),
  update: (id, task) => api.put(`/api/tasks/${id}/status`, task),
  delete: (id) => api.delete(`/api/tasks/${id}`),
};

export const posts = {
  getAll: () => api.get('/api/feed'),
  create: (post) => api.post('/api/feed', post),
};

export default api; 