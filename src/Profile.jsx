import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { FiMenu } from "react-icons/fi";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { ENTITIES } from './services/crudService';
import ContactForm from './components/ContactForm';

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  
  // State for content from admin panel
  const [about, setAbout] = useState({
    heading: "Hello, I'm a Front-End Developer",
    description: "I specialize in building responsive and interactive web applications using modern technologies."
  });
  
  const [projects, setProjects] = useState([
    { id: 1, title: 'Project 1', description: 'Description of project 1.', link: '' },
    { id: 2, title: 'Project 2', description: 'Description of project 2.', link: '' },
    { id: 3, title: 'Project 3', description: 'Description of project 3.', link: '' },
  ]);
  
  const [skills, setSkills] = useState([
    "HTML", "CSS", "JavaScript", "React.js", "Tailwind CSS", "Git & GitHub"
  ]);
  
  const [profileImage, setProfileImage] = useState('');
  const [contactInfo, setContactInfo] = useState(null);
  
  // Load data from localStorage using the same keys as our CRUD service
  useEffect(() => {
    // Load about content
    const savedAbout = localStorage.getItem(ENTITIES.ABOUT);
    if (savedAbout) {
      try {
        setAbout(JSON.parse(savedAbout));
      } catch (e) {
        console.error("Error parsing about content:", e);
      }
    }
    
    // Load projects
    const savedProjects = localStorage.getItem(ENTITIES.PROJECTS);
    if (savedProjects) {
      try {
        setProjects(JSON.parse(savedProjects));
      } catch (e) {
        console.error("Error parsing projects:", e);
      }
    }
    
    // Load skills
    const savedSkills = localStorage.getItem(ENTITIES.SKILLS);
    if (savedSkills) {
      try {
        setSkills(JSON.parse(savedSkills));
      } catch (e) {
        console.error("Error parsing skills:", e);
      }
    }
    
    // Load profile image
    const savedImage = localStorage.getItem(ENTITIES.PROFILE_IMAGE);
    if (savedImage) {
      setProfileImage(savedImage);
    }

    // Load contact info
    const savedContact = localStorage.getItem(ENTITIES.CONTACT);
    if (savedContact) {
      try {
        setContactInfo(JSON.parse(savedContact));
      } catch (e) {
        console.error("Error parsing contact info:", e);
      }
    }
  }, []);

  const handleContactSubmit = (formData) => {
    try {
      // Get existing messages or initialize empty array
      const existingMessages = JSON.parse(localStorage.getItem(ENTITIES.MESSAGES) || '[]');
      
      // Add timestamp and create new message
      const newMessage = {
        id: Date.now(),
        ...formData,
        timestamp: new Date().toISOString(),
        read: false
      };
      
      // Add new message to existing messages
      const updatedMessages = [...existingMessages, newMessage];
      
      // Save to localStorage
      localStorage.setItem(ENTITIES.MESSAGES, JSON.stringify(updatedMessages));
      
      // Close contact form and show success
      setShowContactForm(false);
      alert('Message sent successfully!');
    } catch (error) {
      console.error("Error saving contact message:", error);
      alert('Error sending message. Please try again.');
    }
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen relative text-center`}> 
      
      <motion.header 
        className={`${darkMode ? "bg-gray-800" : "bg-gray-200"} flex justify-between items-center p-6 shadow-lg relative`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-2xl font-bold">Miyade Yasin Daud</h1>
        
        <div className="flex items-center md:space-x-6">
          <DarkModeSwitch
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            size={30}
            sunColor="gold"
            moonColor="gray"
          />
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li><a href="#about" className="hover:text-blue-400">About</a></li>
              <li><a href="#projects" className="hover:text-blue-400">Projects</a></li>
              <li><a href="#skills" className="hover:text-blue-400">Skills</a></li>
              <li><a href="#contact" className="hover:text-blue-400">Contact</a></li>
            </ul>
          </nav>
          <div className="md:hidden">
            <FiMenu size={30} className="text-2xl cursor-pointer ml-2" onClick={() => setMenuOpen(!menuOpen)} />
          </div>
        </div>
      </motion.header>

      <nav className={`${menuOpen ? "block" : "hidden"} ${darkMode ? "bg-gray-800" : "bg-gray-300"} md:hidden absolute top-16 left-0 w-full p-6 shadow-lg z-10`}>  
        <ul className="flex flex-col space-y-4">
          <li><a href="#about" className="hover:text-blue-400">About</a></li>
          <li><a href="#projects" className="hover:text-blue-400">Projects</a></li>
          <li><a href="#skills" className="hover:text-blue-400">Skills</a></li>
          <li><a href="#contact" className="hover:text-blue-400">Contact</a></li>
        </ul>
      </nav>

      <motion.section id="about" className="text-center py-20 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Profile Image */}
        {profileImage && (
          <motion.div 
            className="mx-auto mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src={profileImage} 
              alt="Profile" 
              className="w-40 h-40 object-cover rounded-full border-4 border-blue-500 shadow-lg mx-auto"
            />
          </motion.div>
        )}
        
        <h2 className="text-3xl sm:text-4xl font-bold">{about.heading}</h2>
        <p className="mt-4 text-base sm:text-lg text-gray-300 max-w-xl mx-auto">{about.description}</p>
      </motion.section>

      <section id="projects" className="py-20 px-6 sm:px-10">
        <h2 className="text-3xl font-bold text-center mb-10">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div 
              key={project.id}
              className={`${darkMode ? "bg-gray-800" : "bg-gray-300"} p-6 rounded-lg shadow-lg`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-700"} mt-2`}>{project.description}</p>
              {project.link && (
                <div className="mt-4">
                  <a 
                    href={project.link.startsWith('http') ? project.link : `https://${project.link}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300"
                  >
                    <FaExternalLinkAlt className="mr-1" />
                    <span>View Project</span>
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      <section id="skills" className={`${darkMode ? "bg-gray-800" : "bg-gray-200"} py-20 px-6 sm:px-10`}>
        <h2 className="text-3xl font-bold text-center mb-10">Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center">
          {skills.map((skill, index) => (
            <motion.div 
              key={index} 
              className={`${darkMode ? "bg-gray-700" : "bg-gray-400"} p-4 rounded-lg`}
              whileHover={{ scale: 1.1 }}
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </section>

      <motion.section id="contact" className="py-20 px-6 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold">Contact Me</h2>
        <p className="mt-4 text-gray-300 max-w-lg mx-auto">Feel free to reach out for collaborations or just to say hi!</p>
        <button
          onClick={() => setShowContactForm(true)}
          className="mt-6 inline-block bg-blue-500 px-6 py-3 text-lg font-semibold rounded-lg hover:bg-blue-600"
        >
          Email Me
        </button>
        
        <div className="mt-8 flex justify-center space-x-6">
          <a 
            href="https://github.com/yasin-miyade" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-3xl text-gray-400 hover:text-white transition-colors"
          >
            <FaGithub />
          </a>
          {/* Add more social links as needed */}
        </div>
      </motion.section>

      {/* Contact Form Modal */}
      {showContactForm && (
        <ContactForm 
          darkMode={darkMode} 
          onClose={() => setShowContactForm(false)} 
          onSubmit={handleContactSubmit}
        />
      )}
    </div>
  );
};

export default Portfolio;
