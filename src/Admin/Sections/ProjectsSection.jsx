import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaLink, FaExternalLinkAlt } from 'react-icons/fa';
import { crudService, ENTITIES } from '../../services/crudService';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([
    { id: 1, title: 'Project 1', description: 'Description of project 1.', link: 'https://example.com/project1' },
    { id: 2, title: 'Project 2', description: 'Description of project 2.', link: 'https://example.com/project2' },
    { id: 3, title: 'Project 3', description: 'Description of project 3.', link: 'https://example.com/project3' },
  ]);
  
  // Load projects using CRUD service
  useEffect(() => {
    try {
      const savedProjects = crudService.get(ENTITIES.PROJECTS);
      if (savedProjects) {
        setProjects(savedProjects);
      } else {
        // Save default projects if none exist
        crudService.save(ENTITIES.PROJECTS, projects);
      }
    } catch (error) {
      showStatusMessage('Error loading projects: ' + error.message, 'error');
    }
  }, []);

  // The rest of the dependencies can be removed since we're not doing automatic saves on change,
  // but rather explicit saves on add/edit/delete
  
  const [editingProject, setEditingProject] = useState(null);
  const [newProject, setNewProject] = useState({ title: '', description: '', link: '' });
  const [isAdding, setIsAdding] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleAddProject = () => {
    if (newProject.title && newProject.description) {
      try {
        // Format link if present
        let formattedLink = newProject.link.trim();
        if (formattedLink && !formattedLink.startsWith('http')) {
          formattedLink = 'https://' + formattedLink;
        }
        
        // Generate ID locally
        const newId = projects.length > 0 
          ? Math.max(...projects.map(p => p.id)) + 1 
          : 1;
        
        const projectToAdd = { 
          id: newId,
          title: newProject.title, 
          description: newProject.description, 
          link: formattedLink 
        };
        
        // Update local state
        const updatedProjects = [...projects, projectToAdd];
        setProjects(updatedProjects);
        
        // Save to storage
        crudService.save(ENTITIES.PROJECTS, updatedProjects);
        
        // Reset form
        setNewProject({ title: '', description: '', link: '' });
        setIsAdding(false);
        showStatusMessage('Project added successfully!');
      } catch (error) {
        showStatusMessage('Error adding project: ' + error.message, 'error');
      }
    }
  };

  const handleUpdateProject = () => {
    if (editingProject && editingProject.title && editingProject.description) {
      try {
        // Format link if present
        let formattedLink = editingProject.link ? editingProject.link.trim() : '';
        if (formattedLink && !formattedLink.startsWith('http')) {
          formattedLink = 'https://' + formattedLink;
        }
        
        const updatedProject = {...editingProject, link: formattedLink};
        
        // Update the project in our array
        const updatedProjects = projects.map(p => 
          p.id === editingProject.id ? updatedProject : p
        );
        
        // Update local state
        setProjects(updatedProjects);
        
        // Save to storage
        crudService.save(ENTITIES.PROJECTS, updatedProjects);
        
        setEditingProject(null);
        showStatusMessage('Project updated successfully!');
      } catch (error) {
        showStatusMessage('Error updating project: ' + error.message, 'error');
      }
    }
  };

  const handleDeleteProject = (id) => {
    try {
      // Filter out the project with this id
      const updatedProjects = projects.filter(p => p.id !== id);
      
      // Update local state
      setProjects(updatedProjects);
      
      // Save to storage
      crudService.save(ENTITIES.PROJECTS, updatedProjects);
      
      showStatusMessage('Project deleted successfully!');
    } catch (error) {
      showStatusMessage('Error deleting project: ' + error.message, 'error');
    }
  };

  const showStatusMessage = (message, type = 'success') => {
    setStatusMessage({ text: message, type });
    setTimeout(() => {
      setStatusMessage('');
    }, 3000);
  };

  // Function to check if a link is valid
  const isValidUrl = (url) => {
    if (!url) return true; // Empty is fine
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Projects Section</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center space-x-2"
        >
          <FaPlus />
          <span>Add Project</span>
        </button>
      </div>

      {statusMessage && (
        <div className={`${statusMessage.type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white p-3 rounded mb-4`}>
          {statusMessage.text}
        </div>
      )}

      {isAdding && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-bold mb-4">Add New Project</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Project Title</label>
              <input
                type="text"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Project Description</label>
              <textarea
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 h-32"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Project Link</label>
              <input
                type="text" 
                value={newProject.link}
                onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                placeholder="example.com or https://example.com"
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600"
              />
              <p className="text-xs text-gray-400 mt-1">If you don't include http:// or https://, it will be added automatically.</p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleAddProject}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                disabled={!newProject.title || !newProject.description || (newProject.link && !isValidUrl(newProject.link))}
              >
                Save Project
              </button>
              <button
                onClick={() => setIsAdding(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {editingProject && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-bold mb-4">Edit Project</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Project Title</label>
              <input
                type="text"
                value={editingProject.title}
                onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Project Description</label>
              <textarea
                value={editingProject.description}
                onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 h-32"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Project Link</label>
              <input
                type="text"
                value={editingProject.link || ''}
                onChange={(e) => setEditingProject({ ...editingProject, link: e.target.value })}
                placeholder="example.com or https://example.com"
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600"
              />
              <p className="text-xs text-gray-400 mt-1">If you don't include http:// or https://, it will be added automatically.</p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleUpdateProject}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                disabled={!editingProject.title || !editingProject.description || (editingProject.link && !isValidUrl(editingProject.link))}
              >
                Update Project
              </button>
              <button
                onClick={() => setEditingProject(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between">
              <h3 className="text-xl font-bold">{project.title}</h3>
              <div className="space-x-2">
                <button 
                  onClick={() => setEditingProject(project)}
                  className="text-blue-400 hover:text-blue-500"
                >
                  <FaEdit />
                </button>
                <button 
                  onClick={() => handleDeleteProject(project.id)}
                  className="text-red-400 hover:text-red-500"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <p className="mt-2 text-gray-300">{project.description}</p>
            {project.link && (
              <a 
                href={project.link.startsWith('http') ? project.link : `https://${project.link}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="mt-3 flex items-center text-blue-400 hover:text-blue-300"
              >
                <FaExternalLinkAlt className="mr-1" /> View Project
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
