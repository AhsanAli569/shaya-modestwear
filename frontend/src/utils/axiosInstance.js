import axios from "axios";

const axiosInstance = axios.create({
  // Change this to your Render backend URL after deployment
  baseURL: "https://YOUR-BACKEND-URL.onrender.com/api",
});

// Add token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle authentication errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || '';
    
    if (message.includes('Token') || 
        message.includes('expired') || 
        message.includes('authorization') ||
        message.includes('authentication')) {
      
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      
      alert('Session expired. Please login again.');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
