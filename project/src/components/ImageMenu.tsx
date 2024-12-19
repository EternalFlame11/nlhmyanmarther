import React from 'react';
import { MoreVertical, Upload, Trash2 } from 'lucide-react';
import type { SliderImage } from '../types';

interface ImageMenuProps {
  onUpload: (file: File) => void;
  onDelete: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function ImageMenu({ onUpload, onDelete, isOpen, onToggle }: ImageMenuProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="p-2 rounded-full hover:bg-black/20 transition-colors"
        aria-label="Image options"
      >
        <MoreVertical className="w-5 h-5 text-white" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-10">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Image</span>
          </button>
          
          <button
            onClick={onDelete}
            className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Image</span>
          </button>
        </div>
      )}
    </div>
  );
}