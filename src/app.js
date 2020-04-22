const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  return res.json(repositories);
});

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body;

  const repo = {  id: uuid(), title, url, techs, like: 0 };

  repositories.push(repo);

  return res.json(repo);
});

app.put("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const { title, url, techs } = req.body;

  const repoIndex = repositories.findIndex(
    repo => repo.id === id
  );
  
  if(repoIndex < 0) {
    return res.status(400).json({ error: 'Repositorie not found!' });
  }

  const repo = {
    id,
    title,
    url,
    techs
  };

  repositories[repoIndex] = repo;

  return res.json(repo);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const repoIndex = repositories.findIndex(
    repo => repo.id === id
  );
  
  if(repoIndex < 0) {
    return res.status(400).json({ error: 'Repositorie not found!' });
  }

  repositories.splice(repoIndex, 1);

  return res.status(204).send();
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;

  const repoIndex = repositories.findIndex(
    repo => repo.id === id
  );
  
  if(repoIndex < 0) {
    return res.status(400).json({ error: 'Repositorie not found!' });
  }

  const repo = repositories[repoIndex];

  const likePlusOne = repo.like + 1;

  repo.like = likePlusOne;

  return res.json(`Repositório: ${repo.title}, Likes: ${repo.like}`);
});

module.exports = app;
