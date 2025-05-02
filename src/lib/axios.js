"use client";

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.1uppower.club',
  timeout: 100000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function createAxiosInstance(setIsLoading) {
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