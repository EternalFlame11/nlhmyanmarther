import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageMenu } from './ImageMenu';
import type { SliderImage } from '../types';

const defaultImages: SliderImage[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80',
    title: 'Nature 1'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?auto=format&fit=crop&w=800&q=80',
    title: 'Nature 2'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=80',
    title: 'Nature 3'
  }
];

export function ImageSlider() {
  const [images, setImages] = useState<SliderImage[]>(defaultImages);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const handleUpload = async (file: File) => {
    try {
      const imageUrl = URL.createObjectURL(file);
      const newImage: SliderImage = {
        id: Date.now().toString(),
        url: imageUrl,
        title: file.name
      };
      setImages([...images, newImage]);
      setCurrentIndex(images.length);
      setMenuOpen(false);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleDelete = () => {
    if (images.length <= 1) return;
    
    const newImages = images.filter((_, index) => index !== currentIndex);
    setImages(newImages);
    setCurrentIndex(prev => prev % newImages.length);
    setMenuOpen(false);
  };

  return (
    <div className="relative w-full h-48 overflow-hidden rounded-lg">
      {images.map((image, index) => (
        <img
          key={image.id}
          src={image.url}
          alt={image.title}
          className={`absolute w-full h-full object-cover transition-opacity duration-500 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
          className="p-1 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
          className="p-1 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute top-4 right-4">
        <ImageMenu
          onUpload={handleUpload}
          onDelete={handleDelete}
          isOpen={menuOpen}
          onToggle={() => setMenuOpen(!menuOpen)}
        />
      </div>
    </div>
  );
}