const express = require("express");
const cors = require("cors");
const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
}); // DONE

app.post("/repositories", (request, response) => {
  const { title, url, techs} = request.body;
  const repository = {id: uuid(), title, url, techs, like: 0}

  repositories.push(repository);
  
  return response.json(repository);
}); //DONE

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({error: 'Repository not Found.'})
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes
  };

  repositories[repositoryIndex] = repository;

  return response.json(repository);
}); // DONE

app.delete("/repositories/:id", (request, response) => {

  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({error: 'Repository not Found.'})
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
}); //DONE

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs} = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({error: 'Repository not Found.'})
  }
  const repository = {
    id: repositories[repositoryIndex].id,
    title: repositories[repositoryIndex].title,
    url: repositories[repositoryIndex].url,
    techs: repositories[repositoryIndex].techs,
    like: repositories[repositoryIndex].like + 1,
  };

  repositories[repositoryIndex] = repository;
  
  return response.json(repository);
}); //DONE

 

app.listen(3334, () => {
  console.log('😊 Back-end Started!');
});
module.exports = app;

