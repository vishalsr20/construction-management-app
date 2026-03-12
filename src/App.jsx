import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200 flex flex-col text-slate-900 dark:text-slate-100">
            <Navbar />
            <AppRoutes />
          </div>
        </BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
