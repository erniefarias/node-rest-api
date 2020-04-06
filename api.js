const api = require("express").Router();
const database = require("./database");

api.get("/", (req, res) => {
  res.json(database.getAll());
});

// GET implement paging
api.get("/", (req, res, next) => {
  const pageParam = parseInt(req.query.page, 10) || 1;
  const page = pageParam > 0 ? pageParam - 1 : pageParam;

  const limitParam = parseInt(req.query.limit, 10) || 10;
  const limit = limitParam < 1 ? 1 : limitParam;

  const pagedDoggos = database.getAll().slice(page * limit, (page+1) * limit);

  res.append("Link", [
    `Link1`,
    `Link2`
  ]);

  res.json(pagedDoggos);
});

// GET by id with query params
api.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const dog = database.getById(id);

  dog ? res.json(dog) : res.status(404).send(`Dog not found`);
});

// GET doggos by breed
api.get("/breeds/:breed", (req, res) => {
  const breed = req.params.breed;
  const dogs = database.getByAttribute("breed", breed);

  dogs ? res.json(dogs) : res.status(404).send(`Breed not found`);
});

// GET doggos by color
api.get("/colors/:color", (req, res) => {
  const color = req.params.color;
  const dogs = database.getByAttribute("color", color);

  dogs ? res.json(dogs) : res.status(404).send(`Color not found`);
});

// POST create
api.post("/", (req, res) => {
  const newDog = database.create(req.body);
  res.status(201).send(newDog);
});

// PATCH update
api.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedDoggo = database.update(id, req.body);

  res.send(updatedDoggo);
}); 

// PUT update
api.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedDoggo = database.put(id, req.body);

  res.send(updatedDoggo);
}); 

// DELETE 😢
api.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  database.delete(id);

  const dog = database.getById(id);
  dog ? res.status(404).send(`Doggo survived`) : res.status(200).send(`Doggo is gonno`);
}); 

module.exports = api;
