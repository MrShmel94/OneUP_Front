"use client";

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useView } from '../context/ViewContext';
import AuthForm from '../components/auth/AuthForm';
import HeroesView from '../components/views/HeroesView';
import MembersView from '../components/views/MembersView';
import EventsView from '../components/views/EventsView';
import QuestsView from '../components/views/QuestsView';
import ReferralView from '../components/views/ReferralView';
import SupportView from '../components/views/SupportView';
import DummyView from '@/components/views/DummyView';

export default function Home() {
  const { user, isLoading } = useAuth();
  const { currentView } = useView();
  const [showSignUp, setShowSignUp] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute top-10 left-10 w-40 h-40 bg-pink-500 opacity-30 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-blue-500 opacity-20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500 opacity-10 rounded-full blur-3xl animate-pulse -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl animate-fade-in-up max-w-lg w-full mx-auto">
          <h2 className="text-4xl font-extrabold text-white mb-4 drop-shadow-lg animate-glow">Welcome to 1UP Power!</h2>
          <p className="text-lg text-white/80 mb-2">Join the Call of Dragons guild and become a legend!</p>
          <div className="flex gap-6 mt-8 justify-center">
            <button 
              className="px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-xl shadow-lg transition-all duration-300 animate-bounce" 
              onClick={() => setShowSignUp(true)}
            >
              Sign Up
            </button>
            <button 
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all duration-300 animate-bounce" 
              onClick={() => {
                setShowSignUp(true);
                setIsLoginMode(true);
              }}
            >
              Sign In
            </button>
          </div>
          {showSignUp && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
              <div className="relative w-full max-w-lg">
                <button 
                  className="absolute top-2 right-2 text-white text-2xl z-10" 
                  onClick={() => setShowSignUp(false)}
                >
                  &times;
                </button>
                <AuthForm mode={isLoginMode ? 'login' : 'signup'} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case 'dummy':
        return <DummyView />;
      case 'heroes':
        return <HeroesView />;
      case 'members':
        return <MembersView />;
      case 'events':
        return <EventsView />;
      case 'quests':
        return <QuestsView />;
      case 'referral':
        return <ReferralView />;
      case 'support':
        return <SupportView />;
      default:
        return <DummyView />;
    }
  };

  return renderView();
}
