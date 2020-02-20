const doggos = require("./doggos.json");

const state = {
  primaryKey: 1,
  database: []
};

const database = {
  initialize: items =>
    (state.database = items.map(item => ({
      id: state.primaryKey++,
      ...item
    }))),

  getAll: () => state.database,

  getById: id => state.database.find(item => item.id === id),

  getByAttribute: (attribute, value) =>
    state.database.filter(
      item => item[attribute].toLowerCase() === value.toLowerCase()
    ),

  create: item => {
    const newItem = { id: state.primaryKey++, ...item };
    state.database.push(newItem);

    return newItem;
  },

  update: (id, item) => {
    const index = state.database.findIndex(item => item.id === id);
    const updatedItem = { ...state.database[index], id, ...item };

    state.database[index] = updatedItem;
    return updatedItem;
  },

  put: (id, item) => {
    const index = state.database.findIndex(item => item.id === id);
    const updatedItem = { id, ...item };

    state.database[index] = updatedItem;
    return updatedItem;
  },

  delete: id => (state.database = state.database.filter(item => item.id !== id))
};

database.initialize(doggos);

module.exports = database;
