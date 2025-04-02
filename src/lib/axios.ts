import axios from 'axios';
// import { useAuthStore } from '../store/authStore';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// // Mock API responses
// axiosInstance.interceptors.request.use(
//   async (config) => {
//     // Add auth token
//     const token = useAuthStore.getState().token;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (!error.response) {
//       useAuthStore.getState().setError('Unable to connect to server');
//       return Promise.reject(error);
//     }

//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = useAuthStore.getState().refreshToken;
//         if (!refreshToken) {
//           throw new Error('No refresh token available');
//         }

//         const response = await axios.post(`${baseURL}/auth/refresh-token`, {
//           refreshToken,
//         });

//         const { accessToken } = response.data;
//         useAuthStore.getState().setToken(accessToken);

//         originalRequest.headers.Authorization = `Bearer ${accessToken}`;
//         return axiosInstance(originalRequest);
//       } catch (err) {
//         useAuthStore.getState().logout();
//         return Promise.reject(new Error('Session expired. Please login again.'));
//       }
//     }

//     const errorMessage = error.response?.data?.message || 'An error occurred';
//     useAuthStore.getState().setError(errorMessage);
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;