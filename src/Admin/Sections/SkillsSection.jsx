import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaTimes, FaGripVertical } from 'react-icons/fa';
import { crudService, ENTITIES } from '../../services/crudService';

const SkillsSection = () => {
  const [skills, setSkills] = useState([
    "HTML", "CSS", "JavaScript", "React.js", "Tailwind CSS", "Git & GitHub"
  ]);
  
  const [newSkill, setNewSkill] = useState('');
  const [message, setMessage] = useState('');

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  // Load skills using CRUD service
  useEffect(() => {
    try {
      const savedSkills = crudService.get(ENTITIES.SKILLS);
      if (savedSkills) {
        setSkills(savedSkills);
      } else {
        // Initial save of default skills if nothing exists
        crudService.save(ENTITIES.SKILLS, skills);
      }
    } catch (error) {
      showMessage('Error loading skills: ' + error.message, 'error');
    }
  }, []);

  // Save skills using CRUD service whenever they change
  useEffect(() => {
    try {
      if (skills.length > 0) {
        crudService.save(ENTITIES.SKILLS, skills);
      }
    } catch (error) {
      showMessage('Error saving skills: ' + error.message, 'error');
    }
  }, [skills]);

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      try {
        const updatedSkills = [...skills, newSkill];
        setSkills(updatedSkills);
        setNewSkill('');
        showMessage('Skill added successfully!');
      } catch (error) {
        showMessage('Error adding skill: ' + error.message, 'error');
      }
    } else if (skills.includes(newSkill)) {
      showMessage('This skill already exists!', 'error');
    } else {
      showMessage('Please enter a skill name', 'error');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    try {
      const updatedSkills = skills.filter(skill => skill !== skillToRemove);
      setSkills(updatedSkills);
      showMessage('Skill removed successfully!');
    } catch (error) {
      showMessage('Error removing skill: ' + error.message, 'error');
    }
  };

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  // Handle drag functionality
  const handleDragStart = (index) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    if (dragItem.current !== null && dragOverItem.current !== null && dragItem.current !== dragOverItem.current) {
      try {
        const newSkills = [...skills];
        const draggedItem = newSkills[dragItem.current];
        
        // Remove the dragged item
        newSkills.splice(dragItem.current, 1);
        
        // Insert at new position
        newSkills.splice(dragOverItem.current, 0, draggedItem);
        
        setSkills(newSkills);
        showMessage('Skill order updated!');
      } catch (error) {
        showMessage('Error reordering skills: ' + error.message, 'error');
      }
    }
    
    // Reset refs
    dragItem.current = null;
    dragOverItem.current = null;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Skills Section</h2>
      </div>

      {message && (
        <div className={`${message.type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white p-3 rounded mb-4`}>
          {message.text}
        </div>
      )}

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-xl font-bold mb-4">Add New Skill</h3>
        <div className="flex space-x-3">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Enter skill name"
            className="flex-grow p-3 rounded bg-gray-700 text-white border border-gray-600"
          />
          <button
            onClick={handleAddSkill}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center space-x-2"
          >
            <FaPlus />
            <span>Add</span>
          </button>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Current Skills</h3>
        <p className="text-gray-400 mb-4">Drag and drop skills to reorder them.</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="bg-gray-700 p-3 rounded-lg flex items-center justify-between cursor-move"
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              layout
            >
              <div className="flex items-center">
                <div className="mr-2 text-gray-400 hover:text-white">
                  <FaGripVertical />
                </div>
                <span>{skill}</span>
              </div>
              <button
                onClick={() => handleRemoveSkill(skill)}
                className="text-red-400 hover:text-red-500"
              >
                <FaTimes />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
