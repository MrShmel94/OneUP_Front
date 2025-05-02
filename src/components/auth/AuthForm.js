"use client";

import React, { useState, useMemo } from 'react';
import Select from 'react-select';
import axiosInstance from '../../lib/axios';
import Loader from '../global/Loader';
import Error from '../global/Error';
import * as tzdb from '@vvo/tzdb';
import countryList from 'react-select-country-list';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext';
import { useView } from '../../context/ViewContext';

const initialState = {
  nickname: '',
  password: '',
  timezone: null,
  country: null,
  realName: '',
  about: '',
  verificationCode: '',
};

export default function AuthForm({ mode = 'signup', onSuccess }) {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoginMode, setIsLoginMode] = useState(mode === 'login');
  const [needsVerification, setNeedsVerification] = useState(false);
  const { updateUser } = useAuth();
  const { setCurrentView } = useView();

  const countries = useMemo(() => countryList().getData(), []);
  const timezones = useMemo(() => {
    try {
      return tzdb.getTimeZones().map(tz => {
        const offset = tz.rawOffsetInMinutes / 60;
        const sign = offset >= 0 ? '+' : '';
        return {
          value: `${sign}${offset} UTC`,
          label: `${tz.name} (${sign}${offset} UTC)`,
          rawOffsetInMinutes: tz.rawOffsetInMinutes,
          countryName: tz.countryName,
          continentName: tz.continentName
        };
      });
    } catch (err) {
      console.error('Error loading timezones:', err);
      return [];
    }
  }, []);

  const validate = () => {
    if (!formData.nickname.trim()) return 'Nickname is required';
    if (!formData.password.match(/^(?=.*[A-Z]).{8,}$/)) return 'Password must be at least 8 characters and contain at least one uppercase letter';
    if (!isLoginMode) {
      if (!formData.timezone) return 'Timezone is required';
      if (!formData.country) return 'Country is required';
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (selected, { name }) => {
    setFormData((prev) => ({ ...prev, [name]: selected }));
  };

  const showError = (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      confirmButtonColor: '#3085d6',
    });
  };

  const showSuccess = (message) => {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
      timer: 1500,
      showConfirmButton: false,
      willClose: () => {
        setCurrentView('dummy');
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const validationError = validate();
    if (validationError) {
      showError(validationError);
      return;
    }

    setLoading(true);
    try {
      if (isLoginMode) {
        if (needsVerification) {
          await axiosInstance.post('api/auth/confirm', {
            nickname: formData.nickname,
            code: formData.verificationCode,
          });
          setNeedsVerification(false);
          setFormData(prev => ({ ...prev, password: '' }));
          showSuccess('Verification successful! Please enter your password to login.');
        } else {
          try {
            await axiosInstance.post('api/auth/login', {
              nickname: formData.nickname,
              password: formData.password,
            });
            await updateUser();
          } catch (err) {
            if (err?.response?.data?.message === 'User has not confirmed registration.') {
              setNeedsVerification(true);
              setFormData(prev => ({ ...prev, verificationCode: '' }));
              return;
            }
            throw err;
          }
        }
      } else {
        await axiosInstance.post('api/auth/register', {
          nickname: formData.nickname,
          password: formData.password,
          timezone: formData.timezone.value,
          country: formData.country.value,
          fullName: formData.realName,
          about: formData.about,
        });
        showSuccess('Registration successful! Please contact an officer for your confirmation code to complete the registration.');
        setIsLoginMode(true);
      }
    } catch (err) {
      console.log(err);
      const errorMessage = err?.response?.data?.message || 'Operation failed';
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-lg space-y-5 relative z-10">
      <h2 className="text-3xl font-extrabold text-white mb-2 text-center">
        {isLoginMode ? (needsVerification ? 'Enter Verification Code' : 'Sign In') : 'Sign Up'}
      </h2>
      {error && <Error message={error} />}
      <div>
        <label className="block text-sm text-white mb-1 font-bold">Nickname *</label>
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-gray-800 border-2 border-blue-500/30 rounded-md focus:outline-none focus:border-blue-500 text-white text-sm"
          required
          disabled={needsVerification}
        />
      </div>
      {!needsVerification && (
      <div>
        <label className="block text-sm text-white mb-1 font-bold">Password *</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-gray-800 border-2 border-blue-500/30 rounded-md focus:outline-none focus:border-blue-500 text-white text-sm"
          required
        />
        {!isLoginMode && (
          <span className="text-xs text-gray-400">Min 8 chars, at least 1 uppercase letter</span>
        )}
      </div>
      )}
      {needsVerification && (
        <div>
          <label className="block text-sm text-white mb-1 font-bold">Verification Code *</label>
          <input
            type="text"
            name="verificationCode"
            value={formData.verificationCode}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-800 border-2 border-blue-500/30 rounded-md focus:outline-none focus:border-blue-500 text-white text-sm"
            required
            pattern="[0-9]{6}"
            maxLength={6}
            placeholder="Enter 6-digit code"
          />
        </div>
      )}
      {!isLoginMode && (
        <>
          <div>
            <label className="block text-sm text-white mb-1 font-bold">Timezone *</label>
            <Select
              name="timezone"
              options={timezones}
              value={formData.timezone}
              onChange={handleSelect}
              classNamePrefix="react-select"
              className="text-gray-900"
              required
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: '#1f2937',
                  borderColor: 'rgba(59, 130, 246, 0.3)',
                  '&:hover': {
                    borderColor: 'rgb(59, 130, 246)',
                  },
                }),
                singleValue: (base) => ({
                  ...base,
                  color: 'white',
                }),
                input: (base) => ({
                  ...base,
                  color: 'white',
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: '#1f2937',
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected ? 'rgb(59, 130, 246)' : '#1f2937',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgb(59, 130, 246)',
                  },
                }),
              }}
            />
          </div>
          <div>
            <label className="block text-sm text-white mb-1 font-bold">Country *</label>
            <Select
              name="country"
              options={countries}
              value={formData.country}
              onChange={handleSelect}
              classNamePrefix="react-select"
              className="text-gray-900"
              required
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: '#1f2937',
                  borderColor: 'rgba(59, 130, 246, 0.3)',
                  '&:hover': {
                    borderColor: 'rgb(59, 130, 246)',
                  },
                }),
                singleValue: (base) => ({
                  ...base,
                  color: 'white',
                }),
                input: (base) => ({
                  ...base,
                  color: 'white',
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: '#1f2937',
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected ? 'rgb(59, 130, 246)' : '#1f2937',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgb(59, 130, 246)',
                  },
                }),
              }}
            />
          </div>
          <div>
            <label className="block text-sm text-white mb-1 font-bold">Real Name</label>
            <input
              type="text"
              name="realName"
              value={formData.realName}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-800 border-2 border-blue-500/30 rounded-md focus:outline-none focus:border-blue-500 text-white text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-white mb-1 font-bold">About</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-800 border-2 border-blue-500/30 rounded-md focus:outline-none focus:border-blue-500 text-white text-sm"
              rows={3}
            />
          </div>
        </>
      )}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-bold mt-2"
      >
        {isLoginMode ? 'Sign In' : 'Register'}
      </button>
      <div className="text-center mt-4">
        <button
          type="button"
          onClick={() => setIsLoginMode(!isLoginMode)}
          className="text-blue-400 hover:text-blue-300 text-sm"
        >
          {isLoginMode ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
        </button>
      </div>
    </form>
  );
} 