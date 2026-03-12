import React from 'react';
import { Calendar, MapPin, Monitor, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const StatusBadge = ({ status }) => {
  const config = {
    Active: { color: 'bg-green-50 text-green-700 font-bold', dot: 'bg-green-500' },
    Completed: { color: 'bg-gray-100 text-gray-700 font-bold', dot: 'bg-gray-500' },
    Delayed: { color: 'bg-red-50 text-red-600 font-bold', dot: 'bg-red-500' }
  };
  
  const { color, dot } = config[status] || config.Active;

  return (
    <span className={clsx("inline-flex items-center px-2.5 py-1 rounded-full text-xs", color)}>
      <span className={clsx("w-1.5 h-1.5 rounded-full mr-1.5", dot)}></span>
      {status}
    </span>
  );
};

const ProjectCard = ({ project, index }) => {
  const isComplete = project.status === 'Completed';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-all duration-300 flex flex-col"
    >
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-5 gap-4">
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex-1 leading-snug">
            {project.name}
          </h3>
          <StatusBadge status={project.status} />
        </div>
        
        <div className="space-y-2.5 text-sm text-gray-500 dark:text-gray-400 font-medium">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            <span>{project.location}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
            <span>Start: {new Date(project.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
          <div className="flex items-center">
            <Monitor className="w-4 h-4 mr-2 text-gray-400" />
            <span>{project.budget}</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-8">
          <div className="flex justify-between text-xs font-bold mb-2">
            <span className="text-gray-500 dark:text-gray-400">Progress</span>
            <span className="text-gray-900 dark:text-white">{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-slate-700 rounded-full h-1.5 mb-1 overflow-hidden">
            <div 
              className={clsx(
                "h-1.5 rounded-full",
                project.status === 'Delayed' ? 'bg-red-500' :
                project.status === 'Completed' ? 'bg-green-500' :
                'bg-[#0EA5E9]' // ConstructIQ blue
              )} 
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-100 dark:border-slate-700 px-6 py-4">
        <Link 
          to={`/projects/${project.id}/dpr`}
          className="flex items-center justify-between text-sm font-semibold text-gray-400 dark:text-gray-500 hover:text-[#0EA5E9] dark:hover:text-[#0EA5E9] transition-colors group"
        >
          <span>Click to submit DPR</span>
          <ArrowRight className="w-4 h-4 text-[#0EA5E9] transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
