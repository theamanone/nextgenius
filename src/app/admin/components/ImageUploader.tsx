'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { FaImage, FaCrop, FaCompress, FaUndo, FaCheck } from 'react-icons/fa';
import { FALLBACK_IMAGE } from '@/lib/data';
import { MotionDiv } from '@/components/motion';

interface ImageUploaderProps {
  onImageSelect: (image: string) => void;
  currentImage?: string;
}

export default function ImageUploader({ onImageSelect, currentImage }: ImageUploaderProps) {
  const [previewImage, setPreviewImage] = useState<string>(currentImage || '');
  const [isEditing, setIsEditing] = useState(false);
  const [imageScale, setImageScale] = useState(1);
  const [imageRotation, setImageRotation] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Size validation (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    try {
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setIsEditing(true);
      };
      reader.readAsDataURL(file);

      // Here you would typically upload to your storage service
      // const uploadedUrl = await uploadToStorage(file);
      // onImageSelect(uploadedUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    }
  };

  const handleImageSave = () => {
    onImageSelect(previewImage);
    setIsEditing(false);
  };

  const resetEdits = () => {
    setImageScale(1);
    setImageRotation(0);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        {/* Image Preview */}
        <div className="relative h-60 w-full rounded-lg overflow-hidden bg-gray-800">
          <MotionDiv
            style={{
              width: '100%',
              height: '100%',
              scale: imageScale,
              rotate: imageRotation,
            }}
          >
            {previewImage ? (
              <Image
                src={previewImage}
                alt="Preview"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                <FaImage size={48} />
              </div>
            )}
          </MotionDiv>

          {/* Upload Button */}
          <label className="absolute bottom-4 right-4 cursor-pointer">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <FaImage />
              {previewImage ? 'Change Image' : 'Upload Image'}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Edit Controls */}
        {isEditing && previewImage && (
          <MotionDiv
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4 bg-gray-900/90 backdrop-blur-sm p-4 rounded-lg shadow-xl z-50 max-w-md w-full mx-auto"
          >
            {/* Scale Control */}
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={imageScale}
              onChange={(e) => setImageScale(Number(e.target.value))}
              className="w-32"
            />

            {/* Rotation Control */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setImageRotation(prev => prev + 90);
              }}
              className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
              title="Rotate"
            >
              <FaUndo />
            </button>

            {/* Reset Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                resetEdits();
              }}
              className="p-2 text-yellow-400 hover:text-yellow-300 transition-colors"
              title="Reset"
            >
              <FaCrop />
            </button>

            {/* Save Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                handleImageSave();
              }}
              className="p-2 text-green-400 hover:text-green-300 transition-colors"
              title="Save"
            >
              <FaCheck />
            </button>
          </MotionDiv>
        )}
      </div>

      <p className="text-sm text-gray-400">
        Supported formats: JPG, PNG, WebP. Max size: 5MB
      </p>
    </div>
  );
}
