const api = require("express").Router();
const database = require("./database");

// api.get("/", (req, res) => {
//   res.json(database.getAll());
// });

// implement paging
api.get("/", (req, res) => {
  const pageParam = parseInt(req.query.page, 10) || 1;
  const page = pageParam > 0 ? pageParam - 1 : pageParam;

  const limitParam = parseInt(req.query.limit, 10) || 10;
  const limit = limitParam < 1 ? 1 : limitParam;

  const pagedDoggos = database
    .getAll()
    .filter((_, i) => i >= page * limit && i < (page + 1) * limit);

  res.append("Link", [
    `<http://localhost:5000/api/doggos?limit=${limitParam}&page=${pageParam +
      1}>; rel="next"`,
    `<http://localhost:5000/api/doggos?limit=${limitParam}&page=${pageParam -
      1}>; rel="prev"`
  ]);
  res.json(pagedDoggos);
});

// query params
api.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = database.getById(id);

  item ? res.json(item) : res.status(404).send();
});

// get doggos by breed
api.get("/breeds/:breed", (req, res) => {
  const breed = req.params.breed;
  const doggosByBreed = database.getByAttribute("breed", breed);

  res.json(doggosByBreed);
});

// get doggos by color
api.get("/colors/:color", (req, res) => {
  const color = req.params.color;
  const doggosByColor = database.getByAttribute("color", color);

  res.json(doggosByColor);
});

// create
api.post("/", (req, res) => {
  const createdItem = database.create(req.body);
  res.json(createdItem);
});

// update
api.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedItem = database.update(id, req.body);

  res.json(updatedItem);
});

// PATCH vs PUT
api.put("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedItem = database.put(id, req.body);

  res.json(updatedItem);
});

// delete
api.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  database.delete(id);
  res.status(204).send();
});

module.exports = api;
