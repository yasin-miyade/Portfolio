import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';
import { crudService, ENTITIES } from '../../services/crudService';

const ContactSection = () => {
  const [messages, setMessages] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = () => {
    try {
      const savedMessages = localStorage.getItem(ENTITIES.MESSAGES);
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
    } catch (error) {
      showStatusMessage('Error loading messages: ' + error.message, 'error');
    }
  };

  const handleDeleteMessage = (id) => {
    try {
      const updatedMessages = messages.filter((message) => message.id !== id);
      localStorage.setItem(ENTITIES.MESSAGES, JSON.stringify(updatedMessages));
      setMessages(updatedMessages);
      showStatusMessage('Message deleted successfully!');
    } catch (error) {
      showStatusMessage('Error deleting message: ' + error.message, 'error');
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
        <h2 className="text-2xl font-bold">Contact Messages</h2>
      </div>

      {statusMessage && (
        <div className={`${statusMessage.type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white p-3 rounded mb-4`}>
          {statusMessage.text}
        </div>
      )}

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        {messages.length === 0 ? (
          <p className="text-gray-300">No messages found.</p>
        ) : (
          <ul className="space-y-4">
            {messages.map((message) => (
              <li key={message.id} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">{message.name}</p>
                  <p className="text-gray-300">{message.email}</p>
                  <p className="text-gray-300">{message.message}</p>
                  <p className="text-gray-500 text-sm">{new Date(message.timestamp).toLocaleString()}</p>
                </div>
                <button
                  onClick={() => handleDeleteMessage(message.id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center space-x-2"
                >
                  <FaTrash />
                  <span>Delete</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ContactSection;