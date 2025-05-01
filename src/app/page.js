"use client";

import { useState, useEffect } from 'react';
import AuthForm from '../components/auth/AuthForm';
import DummyView from '../components/views/DummyView';
import HeroesView from '../components/views/HeroesView';
import MembersView from '../components/views/MembersView';
import EventsView from '../components/views/EventsView';
import QuestsView from '../components/views/QuestsView';
import ReferralView from '../components/views/ReferralView';
import SupportView from '../components/views/SupportView';
import BaseView from '../components/views/BaseView';
import axiosInstance from '../lib/axios';

export default function Home() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('dummy');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get('/api/auth/me');
        setUser(response.data);
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setShowSignUp(false);
    setCurrentView('heroes');
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/api/auth/logout');
      setUser(null);
      setCurrentView('dummy');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const renderView = () => {
    if (!user) return null;
    
    let content;
    switch (currentView) {
      case 'dummy':
        content = <DummyView />;
        break;
      case 'heroes':
        content = <HeroesView user={user} currentView={currentView} setCurrentView={setCurrentView} />;
        break;
      case 'members':
        content = <MembersView user={user} currentView={currentView} setCurrentView={setCurrentView} />;
        break;
      case 'events':
        content = <EventsView user={user} currentView={currentView} setCurrentView={setCurrentView} />;
        break;
      case 'quests':
        content = <QuestsView user={user} currentView={currentView} setCurrentView={setCurrentView} />;
        break;
      case 'referral':
        content = <ReferralView user={user} currentView={currentView} setCurrentView={setCurrentView} />;
        break;
      case 'support':
        content = <SupportView user={user} currentView={currentView} setCurrentView={setCurrentView} />;
        break;
      default:
        content = <DummyView />;
    }

    return (
      <BaseView user={user} currentView={currentView} setCurrentView={setCurrentView} setUser={setUser}>
        {content}
      </BaseView>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="absolute top-10 left-10 w-40 h-40 bg-pink-500 opacity-30 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-blue-500 opacity-20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500 opacity-10 rounded-full blur-3xl animate-pulse -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl animate-fade-in-up max-w-lg w-full mx-auto">
          <h2 className="text-4xl font-extrabold text-white mb-4 drop-shadow-lg animate-glow">Welcome to 1UP Power!</h2>
          <p className="text-lg text-white/80 mb-2">Join the Call of Dragons guild and become a legend!</p>
          <div className="flex gap-6 mt-8 justify-center">
            <button className="px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-xl shadow-lg transition-all duration-300 animate-bounce" onClick={() => setShowSignUp(true)}>Sign Up</button>
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all duration-300 animate-bounce" onClick={() => {
              setShowSignUp(true);
              setIsLoginMode(true);
            }}>Sign In</button>
          </div>
          {showSignUp && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
              <div className="relative w-full max-w-lg">
                <button className="absolute top-2 right-2 text-white text-2xl z-10" onClick={() => setShowSignUp(false)}>&times;</button>
                <AuthForm mode={isLoginMode ? 'login' : 'signup'} onSuccess={handleAuthSuccess} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return renderView();
}
