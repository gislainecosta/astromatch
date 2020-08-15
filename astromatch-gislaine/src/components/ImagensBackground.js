import styled from 'styled-components';

export const ContainerMatch = styled.section `
  background-size: cover;
  background-image: url(${props => props.imagem});
  background-repeat: no-repeat;
  overflow: hidden;
  background-position: center;
  width: 13vw;
  height: 13vw;
  border-radius: 50%;
  margin-right: 3vw;
  box-shadow:  -3px 1px 4px 0px rgba(74, 163, 151, 0.7);
  border: 2px solid #753192;
`
export const Informações = styled.section `
  background-size: cover;
  background-image: url(${props => props.imagem});
  background-repeat: no-repeat;
  filter: blur(20px); 
  width: 87vw;
  height: 120vw;
  position: absolute;
  z-index: 1;
  background-position: center;
`
export const ImagemPerfil = styled.div `
  background-size: cover;
  background-image: url(${props => props.imagem});
  background-repeat: no-repeat;
  height: 120vw;
  width: 87vw;
  overflow: hidden;
  z-index: 2;
  position: absolute;
  background-position: center;
`