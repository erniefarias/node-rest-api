const express = require("express");
const bodyParser = require("body-parser");
const api = require("./api");

const app = express();

app.use(bodyParser.json());
app.use("/api/doggos", api);

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`JSON Server is running at: "http://localhost:${port}"`)
);
