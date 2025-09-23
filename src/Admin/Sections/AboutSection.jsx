import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSave } from 'react-icons/fa';
import { crudService, ENTITIES } from '../../services/crudService';

const AboutSection = () => {
  const [aboutContent, setAboutContent] = useState({
    heading: "Hello, I'm a Front-End Developer",
    description: "I specialize in building responsive and interactive web applications using modern technologies."
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState('');

  // Load about content using CRUD service
  useEffect(() => {
    try {
      const savedAbout = crudService.get(ENTITIES.ABOUT);
      if (savedAbout) {
        setAboutContent(savedAbout);
      }
    } catch (err) {
      setError('Failed to load about section data');
      console.error(err);
    }
  }, []);

  const handleSave = () => {
    try {
      // Save to localStorage using CRUD service
      crudService.save(ENTITIES.ABOUT, aboutContent);
      setIsEditing(false);
      setIsSaved(true);
      setError('');
      
      setTimeout(() => {
        setIsSaved(false);
      }, 2000);
    } catch (err) {
      setError('Failed to save changes');
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">About Section</h2>
        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center space-x-2"
          >
            <FaSave />
            <span>Save Changes</span>
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Edit Section
          </button>
        )}
      </div>

      {isSaved && (
        <div className="bg-green-500 text-white p-3 rounded mb-4">
          Changes saved successfully!
        </div>
      )}
      
      {error && (
        <div className="bg-red-500 text-white p-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Heading</label>
              <input
                type="text"
                value={aboutContent.heading}
                onChange={(e) => setAboutContent({...aboutContent, heading: e.target.value})}
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Description</label>
              <textarea
                value={aboutContent.description}
                onChange={(e) => setAboutContent({...aboutContent, description: e.target.value})}
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 h-32"
              />
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-bold mb-4">Preview</h3>
            <div className="bg-gray-900 p-6 rounded">
              <h2 className="text-2xl font-bold">{aboutContent.heading}</h2>
              <p className="mt-4 text-gray-300">{aboutContent.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutSection;
