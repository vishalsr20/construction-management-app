import React from 'react';
import { Upload, X } from 'lucide-react';
import clsx from 'clsx';
import { toast } from 'react-toastify';

const MAX_IMAGES = 3;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const ImageUploader = ({ images, setImages, error }) => {
  
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    if (images.length + files.length > MAX_IMAGES) {
      toast.error(`You can only upload up to ${MAX_IMAGES} images.`);
      return;
    }

    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image.`);
        return false;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} exceeds 5MB size limit.`);
        return false;
      }
      return true;
    });

    const newImages = validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (indexToRemove) => {
    setImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[indexToRemove].preview); // Cleanup
      newImages.splice(indexToRemove, 1);
      return newImages;
    });
  };

  return (
    <div className="w-full mb-5">
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        Photo Upload <span className="text-gray-500 font-normal ml-1">(1-3 images required)</span>
      </label>
      
      <div className={clsx(
        "mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-dashed rounded-xl transition-all duration-200 w-full",
        images.length >= MAX_IMAGES ? "bg-gray-50 border-gray-200" : "hover:border-primary-400 hover:bg-primary-50/50 cursor-pointer",
        error ? "border-red-300 bg-red-50/50" : "border-gray-300 bg-white"
      )}>
        <div className="space-y-2 text-center w-full">
          <Upload className={clsx("mx-auto h-12 w-12", error ? "text-red-400" : "text-gray-400")} />
          <div className="flex text-sm text-gray-600 justify-center">
            <label className={clsx(
              "relative cursor-pointer rounded-md font-semibold text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500",
              images.length >= MAX_IMAGES ? "pointer-events-none opacity-50" : ""
            )}>
              <span>Upload files</span>
              <input 
                type="file" 
                className="sr-only" 
                multiple 
                accept="image/*"
                onChange={handleFileChange}
                disabled={images.length >= MAX_IMAGES}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">
            PNG, JPG, GIF up to 5MB
          </p>
        </div>
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600 font-medium animate-pulse">
          {error}
        </p>
      )}

      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          {images.map((img, index) => (
            <div key={index} className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-square bg-gray-100 flex items-center justify-center shadow-sm">
              <img 
                src={img.preview} 
                alt={`Preview ${index}`} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 hover:text-red-600 shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
