"use client";

import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { ViewProvider } from '../context/ViewContext';
import { LoaderProvider } from '../context/LoaderContext';
import { useAuth } from '../context/AuthContext';
import Header from '../components/global/Header';
import Sidebar from '../components/global/Sidebar';
import Loader from '../components/global/Loader';
import MobileSidebar from '../components/global/MobileSidebar';
import { useState } from 'react';

function LayoutContent({ children }) {
  const { user } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 flex flex-col">
      {/* Header всегда сверху */}
      {user && <Header />}

      <div className="flex flex-1">
        {/* Sidebar для десктопа */}
        {user && <Sidebar />}

        {/* MobileSidebar для мобильных */}
        {user && (
          <>
            <button
              className="md:hidden fixed top-4 left-4 z-40 bg-blue-600 p-2 rounded"
              onClick={() => setMobileSidebarOpen(true)}
            >
              <span className="block w-6 h-0.5 bg-white mb-1"></span>
              <span className="block w-6 h-0.5 bg-white mb-1"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </button>
            <MobileSidebar open={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />
          </>
        )}

        {/* Контент */}
        <main className="flex-1 pt-8 px-8">
          {children}
        </main>
      </div>
      <Loader />
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ViewProvider>
            <LoaderProvider>
              <LayoutContent>
                {children}
              </LayoutContent>
            </LoaderProvider>
          </ViewProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
