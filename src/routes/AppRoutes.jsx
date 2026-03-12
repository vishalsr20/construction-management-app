import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginPage from '../pages/LoginPage';
import ProjectListPage from '../pages/ProjectListPage';
import DPRFormPage from '../pages/DPRFormPage';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/login" element={<LoginPage />} />
      
      <Route 
        path="/home" 
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/projects" 
        element={
          <ProtectedRoute>
            <ProjectListPage />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/projects/:id/dpr" 
        element={
          <ProtectedRoute>
            <DPRFormPage />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default AppRoutes;
