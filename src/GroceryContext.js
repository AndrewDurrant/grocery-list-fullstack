import React from 'react';

const GroceryContext = React.createContext({
  categories: [],
  items: [],
  error: null,
  addItem: () => {},
  deleteItem: () => {},
});

export default GroceryContext;