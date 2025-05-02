"use client";

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://oneup.onrender.com',
  timeout: 100000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create a wrapper function to handle loading state
export function createAxiosInstance(setIsLoading) {
  // Add request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      setIsLoading(true);
      return config;
    },
    (error) => {
      setIsLoading(false);
      return Promise.reject(error);
    }
  );

  // Add response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      setIsLoading(false);
      return response;
    },
    (error) => {
      setIsLoading(false);
      return Promise.reject(error);
    }
  );

  return axiosInstance;
}

export default axiosInstance; 