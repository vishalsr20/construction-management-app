import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Briefcase, MapPin, Edit3 } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-extrabold leading-tight text-gray-900 tracking-tight sm:text-4xl">
          My Profile
        </h2>
        <p className="mt-2 text-base text-gray-500 font-medium">
          Manage your account information and preferences.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white shadow-xl shadow-slate-200/50 rounded-3xl border border-gray-100 overflow-hidden"
      >
        <div className="h-32 bg-primary-600 sm:h-48 relative overflow-hidden">
           {/* Decorative shape */}
          <div className="absolute inset-0 opacity-20">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polygon fill="currentColor" points="0,100 100,0 100,100"></polygon>
            </svg>
          </div>
        </div>
        <div className="px-6 py-8 sm:p-10 relative">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="flex-shrink-0">
                <div className="mx-auto h-24 w-24 rounded-full bg-white border-4 border-white shadow-md relative -mt-20 sm:-mt-24 flex items-center justify-center overflow-hidden">
                  {user?.avatar ? (
                    <img className="object-cover h-full w-full" src={user.avatar} alt="Profile" />
                  ) : (
                    <User className="h-12 w-12 text-gray-400" />
                  )}
                </div>
              </div>
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">{user?.name || 'Field Engineer'}</p>
                <p className="text-sm font-medium text-gray-500">{user?.role || 'Senior Supervisor'}</p>
              </div>
            </div>
            <div className="mt-5 flex justify-center sm:mt-0">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all"
              >
                <Edit3 className="mr-2 -ml-1 h-4 w-4 text-gray-400" />
                Edit Profile
              </button>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-100 pt-8">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1 border border-gray-50 p-4 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
                <dt className="text-sm font-semibold text-gray-500 flex items-center">
                  <Mail className="h-4 w-4 mr-2" /> Email Address
                </dt>
                <dd className="mt-2 text-sm text-gray-900 font-medium">{user?.email || 'test@test.com'}</dd>
              </div>
              <div className="sm:col-span-1 border border-gray-50 p-4 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
                <dt className="text-sm font-semibold text-gray-500 flex items-center">
                  <Briefcase className="h-4 w-4 mr-2" /> Employee ID
                </dt>
                <dd className="mt-2 text-sm text-gray-900 font-medium">EMP-2025-4592</dd>
              </div>
              <div className="sm:col-span-1 border border-gray-50 p-4 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
                <dt className="text-sm font-semibold text-gray-500 flex items-center">
                  <MapPin className="h-4 w-4 mr-2" /> Base Location
                </dt>
                <dd className="mt-2 text-sm text-gray-900 font-medium">Mumbai Regional Office</dd>
              </div>
              <div className="sm:col-span-1 border border-gray-50 p-4 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
                <dt className="text-sm font-semibold text-gray-500 flex items-center">
                  <User className="h-4 w-4 mr-2" /> Assigned Region
                </dt>
                <dd className="mt-2 text-sm text-gray-900 font-medium">Western Zone (Maharashtra)</dd>
              </div>
            </dl>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default ProfilePage;
