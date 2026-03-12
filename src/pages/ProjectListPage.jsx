import React, { useState, useMemo } from 'react';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const StatPill = ({ title, value, colorClass, numberColorClass, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.3 }}
    className={clsx("rounded-2xl p-5 border border-transparent flex flex-col justify-between h-28 transform transition-transform hover:-translate-y-1", colorClass)}
  >
    <h3 className="text-xs font-bold tracking-wider text-gray-500 uppercase">{title}</h3>
    <p className={clsx("text-3xl font-bold", numberColorClass)}>{value}</p>
  </motion.div>
);

const ProjectListPage = () => {
  const [filter, setFilter] = useState('All');

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      return filter === 'All' || project.status === filter;
    });
  }, [filter]);

  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'Active').length,
    completed: projects.filter(p => p.status === 'Completed').length,
    delayed: projects.filter(p => p.status === 'Delayed').length,
  };

  return (
    <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-extrabold text-[#0B2A4A] dark:text-white tracking-tight"
        >
          Projects
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium"
        >
          Select a project to submit a Daily Progress Report.
        </motion.p>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatPill delay={0.1} title="TOTAL" value={stats.total} colorClass="bg-slate-100 dark:bg-slate-800" numberColorClass="text-slate-800 dark:text-slate-200" />
        <StatPill delay={0.2} title="ACTIVE" value={stats.active} colorClass="bg-green-50/50 dark:bg-green-900/20 border-green-100 dark:border-green-800/30" numberColorClass="text-green-600 dark:text-green-500" />
        <StatPill delay={0.3} title="DELAYED" value={stats.delayed} colorClass="bg-red-50/50 dark:bg-red-900/20 border-red-100 dark:border-red-800/30" numberColorClass="text-red-500 dark:text-red-400" />
        <StatPill delay={0.4} title="COMPLETED" value={stats.completed} colorClass="bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-700" numberColorClass="text-slate-700 dark:text-slate-400" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8 flex flex-wrap items-center gap-3"
      >
        <span className="text-sm font-semibold text-gray-500 mr-2">Filter:</span>
        <div className="flex flex-wrap gap-2">
          {['All', 'Active', 'Completed', 'Delayed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={clsx(
                "px-4 py-1.5 rounded-full text-sm font-bold transition-all border",
                filter === status 
                  ? "bg-[#0EA5E9] text-white border-[#0EA5E9] shadow-sm" 
                  : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700"
              )}
            >
              {status} ({status === 'All' ? stats.total : stats[status.toLowerCase()]})
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))
        ) : (
          <div className="col-span-full py-16 text-center bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-gray-300 dark:border-slate-700">
            <p className="text-gray-900 dark:text-white font-semibold text-lg">No projects found</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default ProjectListPage;
