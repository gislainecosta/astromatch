import React, { useState, useEffect } from "react";
import "./components.css";
import axios from "axios";
import { ContainerMatch } from './ImagensBackground.js'

function Perfil(props) {

  const [match, setMatch] = useState([
  ]);


useEffect(() => {
  axios
    .get(`${props.baseUrl}/matches`)
    .then(response => {
      setMatch(response.data.matches)
    })
    .catch(err => {
      console.log(err);
    });
}, [match, props.baseUrl])

  const clicouPerfilMatch = () =>{}

  const listaMatchs = match.map((pessoa) => {
  return <article onClick={clicouPerfilMatch()} className='perfis-match' key={pessoa.id}>
            <ContainerMatch imagem= {pessoa.photo} />
            <p>{pessoa.name}</p>
    </article>
  })

  return (
    <div className="App">
      {listaMatchs}
    </div>
  );
}

export default Perfil;