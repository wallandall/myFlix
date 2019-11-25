const express = require("express");
const morgan = require("morgan");

const app = express();

const PORT = process.env.PORT || 8080;

let movies = require("./data/movies");

let users = require("./data/users");

let genre = require("./data/genre");

let directors = require("./data/directors");

app.use(morgan("common"));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.send("myFlix API");
});

app.get("/movies", function(req, res) {
  res.json(movies);
});

app.get("/movies/:title", function(req, res) {
  res.send("Successful GET request returning movie title");
});

app.post("/movies", function(req, res) {
  res.send("Successful POST request movie added");
});

app.get("/genre", function(req, res) {
  res.json(genre);
});

app.get("/genre/:name", function(req, res) {
  res.send("Successful GET request returning genre by name");
});

app.post("/genre", function(req, res) {
  res.send("Successful POST request genre added");
});

app.get("/directors", function(req, res) {
  res.json(directors);
});

app.get("/directors/:name", function(req, res) {
  res.send("Successful GET request returning director by name");
});

app.post("/directors", function(req, res) {
  res.send("Successful POST request director added");
});

app.get("/users", function(req, res) {
  res.json(users);
});

app.post("/users/:username", function(req, res) {
  res.send("Successful POST request user added");
});

app.post("/users/:username/:id", function(req, res) {
  res.send("Successful POST request favourite added");
});

app.put("/users/:username", function(req, res) {
  res.send("Successful PUT request user updated");
});

app.delete("/users/:username", function(req, res) {
  res.send("Successful DELET request user deleted");
});

app.get("/documentation", function(req, res) {
  res.sendFile("/public/documentation.html", { root: __dirname });
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
