import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { HardHat, Moon, Sun, Home, FolderOpen, User } from 'lucide-react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

const NavLink = ({ to, icon: Icon, children }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(to);

  return (
    <Link
      to={to}
      className={clsx(
        "inline-flex items-center px-3 py-2 rounded-lg text-sm font-semibold transition-all",
        isActive 
          ? "bg-[#0EA5E9]/10 text-[#0EA5E9] dark:bg-[#0EA5E9]/20" 
          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-800"
      )}
    >
      <Icon className={clsx("h-4 w-4 mr-2", isActive ? "text-[#0EA5E9]" : "text-gray-400")} />
      {children}
    </Link>
  );
};

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) return null;

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          <div className="flex items-center space-x-8">
            {/* Brand Logo */}
            <div className="flex items-center cursor-pointer group" onClick={() => navigate('/home')}>
              <div className="p-1.5 bg-[#0EA5E9] rounded-lg group-hover:bg-[#0284c7] transition-colors flex items-center justify-center">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 10V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V10M4 10L12 3L20 10M4 10H20M9 22V14H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="ml-3 text-xl font-extrabold text-[#0B2A4A] dark:text-white tracking-tight">Construct<span className="text-[#0EA5E9]">IQ</span></span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-2">
              <NavLink to="/home" icon={Home}>Dashboard</NavLink>
              <NavLink to="/projects" icon={FolderOpen}>Projects</NavLink>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-6">
            <button 
              type="button"
              onClick={toggleTheme}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link to="/profile" className="hidden sm:flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-[#0EA5E9] transition-colors p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800">
              <User className="h-5 w-5 mr-2" />
              Profile
            </Link>
            
            <div className="hidden sm:block text-sm font-semibold text-gray-400 dark:text-gray-600">
              |
            </div>

            <div className="hidden sm:block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Site Manager
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-1.5 border border-gray-300 dark:border-slate-700 text-sm font-bold rounded-full text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 focus:outline-none transition-all shadow-sm"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Navigation Bar (Bottom) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 px-4 py-2 flex justify-around z-50 pb-safe">
         <NavLink to="/home" icon={Home}>Home</NavLink>
         <NavLink to="/projects" icon={FolderOpen}>Projects</NavLink>
         <NavLink to="/profile" icon={User}>Profile</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
