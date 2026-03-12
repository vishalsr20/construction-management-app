import React from 'react';
import clsx from 'clsx';
import { AlertCircle } from 'lucide-react';

const FormInput = ({ 
  label, 
  id, 
  type = 'text', 
  error, 
  className,
  ...props 
}) => {
  const isTextarea = type === 'textarea';
  const InputComponent = isTextarea ? 'textarea' : 'input';
  
  return (
    <div className={clsx("w-full mb-5", className)}>
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        <InputComponent
          id={id}
          type={isTextarea ? undefined : type}
          className={clsx(
            "block w-full rounded-lg sm:text-sm p-3 border transition-all duration-200 outline-none",
            error 
              ? "border-red-300 bg-red-50 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10" 
              : "border-gray-300 bg-gray-50 text-gray-900 focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10",
            isTextarea ? "min-h-[120px] resize-y" : ""
          )}
          {...props}
        />
        {error && !isTextarea && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <AlertCircle className="h-5 w-5 text-red-500" />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 font-medium animate-pulse flex items-center">
          {isTextarea && <AlertCircle className="h-4 w-4 mr-1 inline" />}
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;
