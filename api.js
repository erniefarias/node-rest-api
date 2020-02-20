const api = require("express").Router();
const database = require("./database");

api.get("/", (req, res) => {
  res.json(database.getAll());
});

// GET implement paging

// GET by id with query params

// GET doggos by breed

// GET doggos by color

// POST create

// PATCH update

// PUT update

// DELETE 😢

module.exports = api;
