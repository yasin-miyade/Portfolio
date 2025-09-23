/**
 * A service to handle CRUD operations for the admin panel
 * Uses localStorage for persistence in this implementation
 */

// Define entity keys used in localStorage
export const ENTITIES = {
  ABOUT: 'portfolioAbout',
  PROJECTS: 'portfolioProjects',
  SKILLS: 'portfolioSkills',
  PROFILE_IMAGE: 'portfolioProfileImage',
  CONTACT: 'portfolioContact',
  MESSAGES: 'portfolio_messages'
};

// Helper functions
const handleError = (error, message) => {
  console.error(message, error);
  throw new Error(message);
};

export const crudService = {
  // Get all items of a specific entity type
  getAll: (entityType) => {
    try {
      const data = localStorage.getItem(entityType);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      handleError(error, `Failed to get ${entityType} data`);
    }
  },
  
  // Get a single entity
  get: (entityType) => {
    try {
      const data = localStorage.getItem(entityType);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      handleError(error, `Failed to get ${entityType} data`);
    }
  },
  
  // Save entity data (replace all)
  save: (entityType, data) => {
    try {
      localStorage.setItem(entityType, JSON.stringify(data));
      return true;
    } catch (error) {
      handleError(error, `Failed to save ${entityType} data`);
    }
  },
  
  // Update an entity in an array by id
  update: (entityType, id, updatedItem) => {
    try {
      const items = crudService.getAll(entityType) || [];
      const index = items.findIndex(item => item.id === id);
      
      if (index === -1) {
        throw new Error(`Item with id ${id} not found in ${entityType}`);
      }
      
      items[index] = { ...items[index], ...updatedItem };
      localStorage.setItem(entityType, JSON.stringify(items));
      return items[index];
    } catch (error) {
      handleError(error, `Failed to update item in ${entityType}`);
    }
  },
  
  // Add a new entity to an array
  add: (entityType, newItem) => {
    try {
      const items = crudService.getAll(entityType) || [];
      
      // Generate new ID if not provided
      if (!newItem.id) {
        const newId = items.length > 0 
          ? Math.max(...items.map(item => item.id)) + 1 
          : 1;
        newItem.id = newId;
      }
      
      const updatedItems = [...items, newItem];
      localStorage.setItem(entityType, JSON.stringify(updatedItems));
      return newItem;
    } catch (error) {
      handleError(error, `Failed to add item to ${entityType}`);
    }
  },
  
  // Delete an entity from an array by id
  delete: (entityType, id) => {
    try {
      const items = crudService.getAll(entityType) || [];
      const filteredItems = items.filter(item => item.id !== id);
      
      if (filteredItems.length === items.length) {
        throw new Error(`Item with id ${id} not found in ${entityType}`);
      }
      
      localStorage.setItem(entityType, JSON.stringify(filteredItems));
      return true;
    } catch (error) {
      handleError(error, `Failed to delete item from ${entityType}`);
    }
  }
};
