import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaInstagram, FaEnvelope, FaUserShield } from "react-icons/fa";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { Link } from "react-router-dom";

function Home() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} flex flex-col items-center justify-center px-6 relative text-center`}> 
      
      {/* Dark Mode Toggle Switch */}
      <div className="absolute top-5 right-5 sm:right-10">
        <DarkModeSwitch
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          size={35}
          sunColor="gold"
          moonColor="gray"
        />
      </div>
      
      {/* Admin Link */}
      <div className="absolute top-5 left-5 sm:left-10">
        <Link to="/login" className="text-gray-500 hover:text-blue-400 flex items-center">
          <FaUserShield className="mr-1" />
          <span className="text-sm">Admin</span>
        </Link>
      </div>

      <motion.h1
        className="text-4xl sm:text-5xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Hi, I'm <span className="text-blue-400">Miyade Yasin Daud</span>
      </motion.h1>

      <motion.p
        className="text-base sm:text-lg text-gray-300 mb-6 max-w-md sm:max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Front-End Developer | Passionate about building interactive web experiences.
      </motion.p>

      {/* Social Links */}
      <motion.div
        className="flex space-x-6 text-2xl sm:text-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <a href="https://github.com/yasin-miyade" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
          <FaGithub />
        </a>
        <a href="https://www.instagram.com/_its_yasin_01?igsh=ZHg3NTIxemZra3I=" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
          <FaInstagram />
        </a>
        <a href="mailto:yasinmiyade66@gmail.com" className="hover:text-blue-400">
          <FaEnvelope />
        </a>
      </motion.div>

      {/* View My Work Button */}
      <Link to="/profile">  
        <motion.button
          className="mt-8 px-6 py-3 bg-blue-500 rounded-lg text-lg font-semibold hover:bg-blue-600 transition shadow-md"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
        >
          View My Work
        </motion.button>
      </Link>
    </div>
  );
}

export default Home;

