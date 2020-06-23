import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

const [repositories, setRepository] =  useState([]);

  useEffect(()=> {

    api.get('repositories').then(response =>{
        setRepository(response.data);
    });

  }, []);

  async function handleAddRepository() {

    const newStaticRepository = {
      title: "Desafio 03 - React JS",
      url: "http://github.com/AndersonBelchior",
      techs: ["Angular 2+", "NodeJS", "ReactJS"],
    };

    // TODO
    const response = await api.post('repositories', newStaticRepository );
    const repository = response.data;

    setRepository([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    const response = await api.delete(`repositories/${id}`);

     const updatedRepositories = repositories.filter(
      (repository) => repository.id !== id
    );

    if (response.status === 204) {
      setRepository(updatedRepositories);
      return;
    }
   
  }

  return (
    <div>
      <button onClick={handleAddRepository}>Adicionar</button>  
      <h3>Lista de repositórios:</h3>
      {!repositories.length && <p>Nenhum repositório encontrado.</p>}
      <ul data-testid="repository-list">
          {repositories.map(repository => (
              <li key={repository.id}>
                    {repository.title}
                    <button
                      title="Excluir"
                      onClick={() => handleRemoveRepository(repository.id)}
                    >
                    Remover
                  </button>
              </li>)
          )}         
      </ul>     
    </div>
  );
}

export default App;
