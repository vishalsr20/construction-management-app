import React from 'react';
import { useAuth } from '../context/AuthContext';
import { projects } from '../data/projects';
import { Link } from 'react-router-dom';
import { Activity, CheckCircle, Clock, HardHat, TrendingUp, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const StatCard = ({ title, value, icon: Icon, colorClass, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.3 }}
    className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm rounded-2xl border border-gray-100 dark:border-slate-700 hover:shadow-md transition-shadow relative group"
  >
    <div className="p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className={`p-4 rounded-xl ${colorClass}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-semibold text-gray-500 dark:text-gray-400 truncate">{title}</dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </motion.div>
);

const HomePage = () => {
  const { user } = useAuth();
  
  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'Active').length,
    completed: projects.filter(p => p.status === 'Completed').length,
    delayed: projects.filter(p => p.status === 'Delayed').length,
  };

  const chartData = [
    { name: 'Active', value: stats.active, color: '#10b981' }, // green-500
    { name: 'Completed', value: stats.completed, color: '#64748b' }, // slate-500
    { name: 'Delayed', value: stats.delayed, color: '#ef4444' } // red-500
  ];

  const recentProjects = projects.slice(0, 3);

  return (
    <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8 md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-extrabold leading-7 text-gray-900 dark:text-white tracking-tight sm:text-4xl sm:truncate"
          >
            Welcome back, {user?.name || 'Engineer'} 👋
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium"
          >
            Here is your daily construction overview and pending tasks.
          </motion.p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        <StatCard delay={0.1} title="Total Projects" value={stats.total} icon={HardHat} colorClass="bg-blue-600 shadow-blue-500/30 shadow-lg" />
        <StatCard delay={0.2} title="Active Sites" value={stats.active} icon={Activity} colorClass="bg-green-600 shadow-green-500/30 shadow-lg" />
        <StatCard delay={0.3} title="Completed" value={stats.completed} icon={CheckCircle} colorClass="bg-slate-600 shadow-slate-500/30 shadow-lg" />
        <StatCard delay={0.4} title="Delayed" value={stats.delayed} icon={Clock} colorClass="bg-red-500 shadow-red-500/30 shadow-lg" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Quick Actions & Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-3xl border border-gray-100 dark:border-slate-700 p-6 lg:col-span-1 flex flex-col"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center mb-6">
            <TrendingUp className="h-5 w-5 mr-2 text-[#0EA5E9]" />
            Project Pipeline
          </h3>
          
          <div className="h-48 w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#1e293b', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4 mt-auto">
            <Link to="/projects" className="group flex items-center p-4 rounded-2xl bg-[#0EA5E9]/5 hover:bg-[#0EA5E9]/10 transition-colors border border-[#0EA5E9]/10">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-[#0EA5E9] dark:text-[#0EA5E9]">
                <HardHat className="h-6 w-6" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-bold text-gray-900 dark:text-gray-100 group-hover:text-[#0EA5E9] transition-colors">Submit DPR</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Log today's progress</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#0EA5E9] transition-colors" />
            </Link>
          </div>
        </motion.div>

        {/* Recent Projects List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-3xl border border-gray-100 dark:border-slate-700 p-6 lg:col-span-2 flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Projects</h3>
            <Link to="/projects" className="text-sm font-semibold text-[#0EA5E9] hover:text-[#0284c7]">
              View all
            </Link>
          </div>
          <div className="space-y-4 flex-1">
            {recentProjects.map((project, idx) => (
              <div key={project.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 hover:border-gray-200 dark:hover:border-slate-600 transition-all group">
                <div className="mb-4 sm:mb-0">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">{project.name}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{project.location}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                    project.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400' :
                    project.status === 'Completed' ? 'bg-gray-200 text-gray-800 dark:bg-slate-700 dark:text-gray-300' :
                    'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400'
                  }`}>
                    {project.status}
                  </span>
                  <Link to={`/projects/${project.id}/dpr`} className="p-2 text-gray-400 hover:text-[#0EA5E9] hover:bg-[#0EA5E9]/10 dark:hover:bg-slate-600 rounded-lg transition-colors">
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default HomePage;
