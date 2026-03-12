import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FormInput from '../components/FormInput';
import { HardHat } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Valid email format required';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Minimum 6 characters required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        const success = login(email, password);
        setIsLoading(false);
        
        if (success) {
          toast.success('Login successful!');
          navigate('/projects', { replace: true });
        } else {
          toast.error('Invalid credentials. Use test@test.com / 123456');
          setErrors({ form: 'Invalid email or password' });
        }
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 absolute inset-0 z-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center"
        >
          <div className="p-4 bg-primary-100 rounded-2xl shadow-sm border border-primary-200">
            <HardHat className="h-12 w-12 text-primary-600" />
          </div>
        </motion.div>
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight"
        >
          Sign in to BuildTrack
        </motion.h2>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-2 text-center text-sm text-gray-600"
        >
          Manage your field projects with ease
        </motion.p>
      </div>

      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0"
      >
        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <FormInput
              label="Email address"
              id="email"
              type="email"
              placeholder="test@test.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />

            <FormInput
              label="Password"
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />

            {errors.form && (
              <div className="text-sm text-red-600 font-medium text-center bg-red-50 p-3 rounded-lg border border-red-100">
                {errors.form}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
            
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>Demo Credentials:</p>
              <p className="font-mono mt-1 bg-gray-50 p-2 rounded inline-block text-xs font-semibold text-gray-700 border border-gray-200">test@test.com / 123456</p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
