import axios from 'axios';

const customFetch = axios.create({
  baseURL: '/api/v1',
});

// Attach JWT token to every request
customFetch.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 — log out and redirect
customFetch.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/register';
    }
    return Promise.reject(error);
  }
);

export default customFetch;
