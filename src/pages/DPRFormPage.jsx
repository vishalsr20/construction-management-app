import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import FormInput from '../components/FormInput';
import ImageUploader from '../components/ImageUploader';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const DPRFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Use lazy initialization to check for draft data
  const [formData, setFormData] = useState(() => {
    const draft = localStorage.getItem(`dpr_draft_${id}`);
    if (draft) {
      try {
        return JSON.parse(draft);
      } catch (e) {
        console.error('Failed to parse draft', e);
      }
    }
    return {
      projectId: id || '',
      date: new Date().toISOString().split('T')[0],
      weather: '',
      description: '',
      workerCount: ''
    };
  });
  
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-save effect
  useEffect(() => {
    if (id) {
      localStorage.setItem(`dpr_draft_${id}`, JSON.stringify(formData));
    }
  }, [formData, id]);

  useEffect(() => {
    if (id && !projects.find(p => p.id === parseInt(id))) {
      toast.error('Project not found');
      navigate('/projects');
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.projectId) newErrors.projectId = 'Project selection is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.weather) newErrors.weather = 'Weather condition is required';
    
    if (!formData.description) {
      newErrors.description = 'Work description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Work description must be at least 20 characters';
    }
    
    if (!formData.workerCount) {
      newErrors.workerCount = 'Worker count is required';
    } else if (parseInt(formData.workerCount) <= 0) {
      newErrors.workerCount = 'Worker count must be a positive number';
    }

    if (images.length === 0) {
      newErrors.images = 'At least 1 image is required';
    } else if (images.length > 3) {
      newErrors.images = 'Maximum 3 images allowed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      
      // Simulate API Submission
      setTimeout(() => {
        setIsSubmitting(false);
        // Clear draft on success
        localStorage.removeItem(`dpr_draft_${id}`);
        toast.success('Daily Progress Report submitted successfully', {
          icon: <CheckCircle2 className="text-green-500" />
        });
        navigate('/projects');
      }, 1200);
    } else {
      toast.error('Please fix the errors in the form before submitting');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link 
          to="/projects" 
          className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-primary-600 transition-colors bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Projects
        </Link>
        <div className="mt-6">
          <h2 className="text-3xl font-extrabold leading-tight text-gray-900 tracking-tight sm:text-4xl">
            Daily Progress Report
          </h2>
          <p className="mt-2 text-base text-gray-500 font-medium">
            Submit today's work progress, weather conditions, and site photos.
          </p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white shadow-xl shadow-slate-200/50 rounded-2xl sm:rounded-3xl border border-gray-100 overflow-hidden"
      >
        <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
          
          <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
            
            <div className="sm:col-span-2">
              <label htmlFor="projectId" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Project
              </label>
              <div className="relative">
                <select
                  id="projectId"
                  name="projectId"
                  value={formData.projectId}
                  onChange={handleChange}
                  className={`block w-full rounded-xl sm:text-sm p-3.5 border transition-colors outline-none appearance-none ${
                    errors.projectId ? 'border-red-300 bg-red-50 focus:border-red-500 text-red-900 focus:ring-4 focus:ring-red-500/10' : 'border-gray-300 bg-gray-50 focus:border-primary-500 text-gray-900 bg-white focus:ring-4 focus:ring-primary-500/10 hover:border-gray-400'
                  }`}
                >
                  <option value="">Select a project...</option>
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.name} - {p.location}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
              {errors.projectId && <p className="mt-2 text-sm text-red-600 font-medium animate-pulse">{errors.projectId}</p>}
            </div>

            <FormInput
              label="Date"
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              error={errors.date}
            />

            <div>
              <label htmlFor="weather" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Weather Conditions
              </label>
              <div className="relative">
                <select
                  id="weather"
                  name="weather"
                  value={formData.weather}
                  onChange={handleChange}
                  className={`block w-full rounded-xl sm:text-sm p-3.5 border transition-colors outline-none appearance-none ${
                    errors.weather ? 'border-red-300 bg-red-50 focus:border-red-500 text-red-900 focus:ring-4 focus:ring-red-500/10' : 'border-gray-300 bg-gray-50 focus:border-primary-500 text-gray-900 bg-white focus:ring-4 focus:ring-primary-500/10 hover:border-gray-400'
                  }`}
                >
                  <option value="">Select weather...</option>
                  <option value="Sunny">☀️ Sunny</option>
                  <option value="Cloudy">⛅ Cloudy</option>
                  <option value="Rainy">🌧️ Rainy</option>
                  <option value="Stormy">⛈️ Stormy</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
              {errors.weather && <p className="mt-2 text-sm text-red-600 font-medium animate-pulse">{errors.weather}</p>}
            </div>

          </div>

          <FormInput
            label="Work Description"
            id="description"
            name="description"
            type="textarea"
            placeholder="Describe the work completed today (min 20 characters)..."
            value={formData.description}
            onChange={handleChange}
            error={errors.description}
          />

          <div className="sm:w-1/2 pr-0 sm:pr-4">
            <FormInput
              label="Worker Count"
              id="workerCount"
              name="workerCount"
              type="number"
              min="1"
              placeholder="e.g. 15"
              value={formData.workerCount}
              onChange={handleChange}
              error={errors.workerCount}
            />
          </div>

          <div className="border-t border-gray-200 pt-8 mt-2">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Site Photos</h3>
            <ImageUploader 
              images={images} 
              setImages={setImages} 
              error={errors.images} 
            />
          </div>

          <div className="pt-6 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 sm:gap-4 border-t border-gray-100 mt-8">
            <Link 
              to="/projects"
              className="w-full sm:w-auto px-6 py-3 text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-3 border border-transparent text-sm font-bold rounded-xl shadow-[0_4px_14px_0_rgba(34,197,94,0.39)] hover:shadow-[0_6px_20px_rgba(34,197,94,0.23)] hover:bg-primary-500 text-white bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting Report...
                </>
              ) : (
                'Submit Report'
              )}
            </button>
          </div>

        </form>
      </motion.div>
    </main>
  );
};

export default DPRFormPage;
