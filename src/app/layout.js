"use client";

import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { ViewProvider } from '../context/ViewContext';
import { useAuth } from '../context/AuthContext';
import Header from '../components/global/Header';
import Sidebar from '../components/global/Sidebar';

function LayoutContent({ children }) {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900">
      {user && (
        <div className="flex">
          <div className="fixed left-0 top-0 h-full">
            <Sidebar />
          </div>
          <div className="fixed top-0 left-64 right-0">
            <Header />
          </div>
        </div>
      )}
      <main className={`min-h-screen ${user ? 'ml-64 pt-20' : ''}`}>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ViewProvider>
            <LayoutContent>
              {children}
            </LayoutContent>
          </ViewProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
