import React, { useState, useEffect } from "react";
import "./components.css";
import styled from 'styled-components'
import axios from "axios";
import Botao from '@material-ui/core/Fab';
import IconMatch from '@material-ui/icons/Favorite'
import IconNoMatch from '@material-ui/icons/Close'
import Coracao from '../img/Coracao.gif'
import Logo from '../img/logo.png'
import { Informações } from './ImagensBackground.js'
import { ImagemPerfil } from './ImagensBackground.js'

const CardPerfil = styled.section`
  animation: ${props =>{
    switch (props.animado) {
      case "left":
        return "left 1s linear 1;"
      
      case "right":
        return "right 1s linear 1;"
      default:
        return "none"
    }
  }};
  
  @keyframes left {
    0% {transform: rotateZ(0deg) translate(0vw, 0vw); opacity: 1;}
    100% {transform: rotateZ(-45deg) translate(-400vw, 200vh); opacity: 0;}
  }

  @keyframes right{
    0% {transform: rotateZ(0deg) translate(0vw, 0vw); opacity:1}
    100% {transform: rotateZ(45deg) translate(400vw, 200vh); opacity: 0; } /*xvw yvw*/
  }
`

function Perfil(props) {
  
  const [perfil, setPerfil] = useState([]);
  const [mostraConteudo, setMostraConteudo] = useState('icones')
  const [animacao, setAnimacao] = useState('none')
  
  useEffect(() => {
    pegaPerfil()}, 
  [props.baseUrl])

  useEffect(() =>{
    setAnimacao("none")
  }, [perfil])

  const pegaPerfil = () => {
    setMostraConteudo('icones')  
    axios
      .get(`${props.baseUrl}/person`)
      .then(response => {
        setPerfil(response.data.profile);
        setMostraConteudo('perfis')
      })
      .catch(err => {
        console.log(err);
      });
  }

  const gosteiPerfil = () => {    
    setAnimacao("right")
    const body ={
        id: perfil.id,
        choice: true
    }
    axios
      .post(`${props.baseUrl}/choose-person`, body)
      .then(response => {
        console.log(response.data)
        pegaPerfil()
      })
      .catch(err => {
        console.log(err);
      });
    
  }

  const naoGosteiPerfil = () => {
    setAnimacao('left')
    const body = {
      id: perfil.id,
      choice: false
    }
    axios
      .post(`${props.baseUrl}/choose-person`, body)
      .then(response => {
        console.log(response.data)
        pegaPerfil()
      })
      .catch(err => {
        console.log(err);
      });
  }

  let conteudoNaTela;
    
  if (mostraConteudo === 'icones') {
      conteudoNaTela = <div id='loading'>
        <img className='coracao-loading' src={Coracao} alt='Coração Pulsando'/>
        <img id='logo-loading' src={Logo} alt='Logo'/>
      </div>
  } else{
    if (perfil === null) {
      conteudoNaTela = <div id='sem-perfis'>
        <img className='coracao-loading' src={Coracao} alt='Coração Pulsando'/>
        <h1>Acabaram os perfis</h1>
        <p id='texto-acabou'>Aproveite para xavecar aquele match ou comece tudo novamente clicando na Lixeira</p>
      </div>
    }else{
      conteudoNaTela = <div>
        <CardPerfil id="card-pessoa" animado={animacao}>
          <Informações imagem= {perfil.photo} />
          <ImagemPerfil imagem= {perfil.photo} />
          <div id='textousuario'>
            <p>{perfil.name}, {perfil.age}</p>
            <p>{perfil.bio}</p>
          </div>
        </CardPerfil>
      
        <section id='container-botoes'> 
          <Botao 
            id='botao-x'
            onClick ={naoGosteiPerfil}
            variant ="outlined">
            <IconNoMatch id='icone-x'/>
          </Botao>
      
          <Botao 
            id='botao-coracao'
            onClick ={gosteiPerfil}
            variant ="outlined">
            <IconMatch id='icone-coracao'/>
          </Botao> 
        </section>
      </div>
    }
  }

  return (
    <div id="App" >
      {conteudoNaTela}
    </div>
  );
}

export default Perfil;
