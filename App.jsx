
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import ViewIdeasPage from '@/pages/ViewIdeasPage';
import VoteIdeasPage from '@/pages/VoteIdeasPage';
import AdminPage from '@/pages/AdminPage';
import LoginPage from '@/pages/LoginPage';
import LegalPage from '@/pages/LegalPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('isAdminAuthenticated') === 'true';
  });

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>CACO&POLA - Diseña con ideas, viste con orgullo</title>
        <meta name="description" content="Plataforma para crear, compartir y votar ideas de diseño. Diseña con ideas, viste con orgullo." />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ver-ideas" element={<ViewIdeasPage />} />
          <Route path="/votar-ideas" element={<VoteIdeasPage />} />
          <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/legal" element={<LegalPage />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
