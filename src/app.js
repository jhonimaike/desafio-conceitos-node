const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
  // TODO
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  var { title, url, techs, likes } = request.body;


  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({
      message: 'Repository not found.'
    })
  }

  likes = repositories[repositoryIndex].likes;

  const repository = { id, title, url, techs, likes };

  repositories[repositoryIndex] = repository;

  return response.json(repository);

});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return res.status(400).json({
      message: 'Repository not found.'
    })
  }

  repositories.splice(repositoryIndex, 1);

  return res.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({
      message: 'Repository not found.'
    })
  }

  const repository = repositories[repositoryIndex];
  console.log(repository.likes);
  repository.likes += 1;
  console.log(repository.likes);
  repositories[repositoryIndex] = repository;

  return response.json(repository);

});

module.exports = app;
