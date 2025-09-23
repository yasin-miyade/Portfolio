import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaCamera, FaUpload, FaTrash } from 'react-icons/fa';
import { crudService, ENTITIES } from '../../services/crudService';

const ProfileSection = () => {
  const [profileImage, setProfileImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const fileInputRef = useRef(null);

  // Load profile image using CRUD service
  useEffect(() => {
    try {
      const savedImage = localStorage.getItem(ENTITIES.PROFILE_IMAGE); // Direct access for binary data
      if (savedImage) {
        setProfileImage(savedImage);
        setPreviewImage(savedImage);
      }
    } catch (error) {
      showStatusMessage('Error loading profile image: ' + error.message, 'error');
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        showStatusMessage('Image must be smaller than 2MB', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setPreviewImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = () => {
    if (previewImage) {
      try {
        // Save to localStorage directly for binary data
        localStorage.setItem(ENTITIES.PROFILE_IMAGE, previewImage);
        setProfileImage(previewImage);
        showStatusMessage('Profile image saved successfully!');
      } catch (error) {
        console.error("Error saving image:", error);
        showStatusMessage('Error saving image. It might be too large.', 'error');
      }
    }
  };

  const handleDeleteImage = () => {
    try {
      // Remove from localStorage
      localStorage.removeItem(ENTITIES.PROFILE_IMAGE);
      setProfileImage('');
      setPreviewImage('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      showStatusMessage('Profile image removed successfully!');
    } catch (error) {
      showStatusMessage('Error removing image: ' + error.message, 'error');
    }
  };

  const triggerFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const showStatusMessage = (message, type = 'success') => {
    setStatusMessage({ text: message, type });
    setTimeout(() => {
      setStatusMessage('');
    }, 3000);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Profile Photo</h2>
      </div>

      {statusMessage && (
        <div className={`${statusMessage.type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white p-3 rounded mb-4`}>
          {statusMessage.text}
        </div>
      )}

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center md:space-x-8">
          <div className="mb-6 md:mb-0">
            <div className="relative w-48 h-48 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center border-2 border-blue-500">
              {previewImage ? (
                <img 
                  src={previewImage} 
                  alt="Profile Preview" 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <FaCamera size={40} className="text-gray-500" />
              )}
            </div>
          </div>
          
          <div className="flex flex-col space-y-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/jpeg, image/png, image/jpg"
              className="hidden"
            />
            
            <button
              onClick={triggerFilePicker}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center space-x-2"
            >
              <FaCamera />
              <span>Choose Image</span>
            </button>
            
            {previewImage && (
              <>
                <button
                  onClick={handleSaveImage}
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center justify-center space-x-2"
                >
                  <FaUpload />
                  <span>Save Profile Photo</span>
                </button>
                
                <button
                  onClick={handleDeleteImage}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center space-x-2"
                >
                  <FaTrash />
                  <span>Remove Photo</span>
                </button>
              </>
            )}
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Profile Photo Guidelines:</h3>
          <ul className="list-disc list-inside text-gray-300">
            <li>Use a clear, professional photo</li>
            <li>Optimal dimensions: 400x400 pixels</li>
            <li>Maximum file size: 2MB</li>
            <li>Supported formats: JPG, PNG</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
