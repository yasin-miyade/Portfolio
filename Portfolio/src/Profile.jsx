import React, { useState } from "react";
import { motion } from "framer-motion";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { FiMenu } from "react-icons/fi";

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

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

      <nav className={`${menuOpen ? "block" : "hidden"} md:hidden absolute top-16 left-0 w-full bg-gray-300 p-6 shadow-lg`}>  
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
        <h2 className="text-3xl sm:text-4xl font-bold">Hello, I'm a Front-End Developer</h2>
        <p className="mt-4 text-base sm:text-lg text-gray-300 max-w-xl mx-auto">I specialize in building responsive and interactive web applications using modern technologies.</p>
      </motion.section>

      <section id="projects" className="py-20 px-6 sm:px-10">
        <h2 className="text-3xl font-bold text-center mb-10">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((project, index) => (
            <motion.div 
              key={index}
              className={`${darkMode ? "bg-gray-800" : "bg-gray-300"} p-6 rounded-lg shadow-lg`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold">Project {project}</h3>
              <p className="text-gray-300 mt-2">Description of project {project}.</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="skills" className={`${darkMode ? "bg-gray-800" : "bg-gray-200"} py-20 px-6 sm:px-10`}>
        <h2 className="text-3xl font-bold text-center mb-10">Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center">
          {["HTML", "CSS", "JavaScript", "React.js", "Tailwind CSS", "Git & GitHub"].map((skill, index) => (
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
        <a
          href="mailto:yasinmiyade66@gmail.com"
          className="mt-6 inline-block bg-blue-500 px-6 py-3 text-lg font-semibold rounded-lg hover:bg-blue-600"
        >
          Email Me
        </a>
      </motion.section>
    </div>
  );
};

export default Portfolio;
