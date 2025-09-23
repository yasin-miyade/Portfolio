import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaSignOutAlt, FaUserEdit, FaCode, FaTools, FaEnvelope, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import AboutSection from './Sections/AboutSection';
import ProjectsSection from './Sections/ProjectsSection';
import SkillsSection from './Sections/SkillsSection';
import ContactSection from './Sections/ContactSection';
import ProfileSection from './Sections/ProfileSection';

const Admin = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile');
  
  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/');
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSection />;
      case 'about':
        return <AboutSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'skills':
        return <SkillsSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <motion.div 
        className="w-64 bg-gray-800 h-screen p-5 fixed"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col h-full">
          <div>
            <h2 className="text-2xl font-bold mb-8 text-blue-400">Admin Panel</h2>
            
            <nav className="space-y-2">
              <button 
                onClick={() => setActiveSection('profile')}
                className={`flex items-center space-x-3 w-full p-3 rounded-md transition ${activeSection === 'profile' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              >
                <FaUserCircle />
                <span>Profile Photo</span>
              </button>
              
              <button 
                onClick={() => setActiveSection('about')}
                className={`flex items-center space-x-3 w-full p-3 rounded-md transition ${activeSection === 'about' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              >
                <FaUserEdit />
                <span>About Section</span>
              </button>
              
              <button 
                onClick={() => setActiveSection('projects')}
                className={`flex items-center space-x-3 w-full p-3 rounded-md transition ${activeSection === 'projects' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              >
                <FaCode />
                <span>Projects Section</span>
              </button>
              
              <button 
                onClick={() => setActiveSection('skills')}
                className={`flex items-center space-x-3 w-full p-3 rounded-md transition ${activeSection === 'skills' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              >
                <FaTools />
                <span>Skills Section</span>
              </button>
              
              <button 
                onClick={() => setActiveSection('contact')}
                className={`flex items-center space-x-3 w-full p-3 rounded-md transition ${activeSection === 'contact' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              >
                <FaEnvelope />
                <span>Contact Section</span>
              </button>
            </nav>
          </div>
          
          <div className="mt-auto space-y-4">
            <Link 
              to="/"
              className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-700 transition w-full"
            >
              <FaHome />
              <span>Back to Site</span>
            </Link>
            
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-3 p-3 rounded-md text-red-400 hover:bg-gray-700 transition w-full"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          key={activeSection} // This triggers animation when section changes
        >
          {renderActiveSection()}
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;
