import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaEnvelope, FaEnvelopeOpen } from 'react-icons/fa';
import { ENTITIES } from '../../services/crudService';

const MessagesSection = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = () => {
    try {
      const savedMessages = localStorage.getItem(ENTITIES.MESSAGES);
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages);
        // Sort by date (newest first)
        parsedMessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setMessages(parsedMessages);
      }
    } catch (error) {
      showStatusMessage('Error loading messages: ' + error.message, 'error');
    }
  };

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    
    // Mark as read if it was unread
    if (!message.read) {
      const updatedMessages = messages.map(msg => {
        if (msg.id === message.id) {
          return { ...msg, read: true };
        }
        return msg;
      });
      
      setMessages(updatedMessages);
      localStorage.setItem(ENTITIES.MESSAGES, JSON.stringify(updatedMessages));
    }
  };

  const handleDeleteMessage = (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        const updatedMessages = messages.filter(message => message.id !== id);
        setMessages(updatedMessages);
        localStorage.setItem(ENTITIES.MESSAGES, JSON.stringify(updatedMessages));
        
        if (selectedMessage && selectedMessage.id === id) {
          setSelectedMessage(null);
        }
        
        showStatusMessage('Message deleted successfully');
      } catch (error) {
        showStatusMessage('Error deleting message: ' + error.message, 'error');
      }
    }
  };

  const handleDeleteAllMessages = () => {
    if (window.confirm('Are you sure you want to delete all messages? This cannot be undone.')) {
      try {
        setMessages([]);
        localStorage.removeItem(ENTITIES.MESSAGES);
        setSelectedMessage(null);
        showStatusMessage('All messages deleted successfully');
      } catch (error) {
        showStatusMessage('Error deleting messages: ' + error.message, 'error');
      }
    }
  };

  const showStatusMessage = (message, type = 'success') => {
    setStatusMessage({ text: message, type });
    setTimeout(() => {
      setStatusMessage('');
    }, 3000);
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const unreadCount = messages.filter(msg => !msg.read).length;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Messages</h2>
        {messages.length > 0 && (
          <button
            onClick={handleDeleteAllMessages}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center"
          >
            <FaTrash className="mr-2" /> Delete All
          </button>
        )}
      </div>

      {statusMessage && (
        <div className={`${statusMessage.type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white p-3 rounded mb-4`}>
          {statusMessage.text}
        </div>
      )}

      {messages.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <p className="text-gray-400">No messages yet</p>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row h-[500px]">
            {/* Messages List */}
            <div className="w-full md:w-2/5 border-r border-gray-700 overflow-y-auto">
              {unreadCount > 0 && (
                <div className="bg-blue-900 py-2 px-4">
                  <span className="text-sm">{unreadCount} unread {unreadCount === 1 ? 'message' : 'messages'}</span>
                </div>
              )}
              
              {messages.map(message => (
                <motion.div
                  key={message.id}
                  className={`p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors 
                    ${selectedMessage && selectedMessage.id === message.id ? 'bg-gray-700' : ''}
                    ${!message.read ? 'bg-blue-900 bg-opacity-20' : ''}`}
                  onClick={() => handleMessageClick(message)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {!message.read ? (
                        <FaEnvelope className="text-blue-400 mr-2" />
                      ) : (
                        <FaEnvelopeOpen className="text-gray-500 mr-2" />
                      )}
                      <span className={`font-semibold ${!message.read ? 'text-white' : 'text-gray-300'}`}>
                        {message.name}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteMessage(message.id);
                      }}
                      className="text-red-400 hover:text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </div>
                  <p className="text-sm text-gray-400 truncate">{message.subject}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatDate(message.timestamp)}</p>
                </motion.div>
              ))}
            </div>
            
            {/* Message Content */}
            <div className="w-full md:w-3/5 p-6 overflow-y-auto">
              {selectedMessage ? (
                <div>
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">{selectedMessage.subject}</h3>
                    <div className="flex space-x-4 text-sm text-gray-400 mb-2">
                      <span>From: <strong>{selectedMessage.name}</strong></span>
                      <span>Email: <strong>{selectedMessage.email}</strong></span>
                    </div>
                    <span className="text-xs text-gray-500">{formatDate(selectedMessage.timestamp)}</span>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-4">
                    <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                  
                  <div className="mt-4">
                    <a 
                      href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded inline-flex items-center"
                    >
                      <FaEnvelope className="mr-2" /> Reply by Email
                    </a>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-500">Select a message to view its contents</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesSection;
