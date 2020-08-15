import React, { useState, useEffect } from "react";
import "./App.css";
import IconButton from '@material-ui/core/IconButton';
import Perfis from './components/perfis'
import Matchs from './components/matchs'
import IconMatch from '@material-ui/icons/Favorite'
import Left from '@material-ui/icons/Undo'
import Right from '@material-ui/icons/Redo'
import IconPerfil from '@material-ui/icons/Group'
import Toolbar from '@material-ui/core/Toolbar';
import Apagar from '@material-ui/icons/DeleteForever'
import axios from "axios";
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Logo from './img/logo.png'
import Core from './img/core.png'
import MenuIcon from '@material-ui/icons/Menu';


const apiUrl = "https://us-central1-missao-newton.cloudfunctions.net/astroMatch/gislaine-costa-julian"

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  }),
);

function App() {
  const [escolheTela, setEscolheTela] = useState('perfis')
  const [open, setOpen] = useState(false)
  const classes = useStyles();
  
  const confirmaExclui = () => {
    setOpen(true);
  };

  const fechaConfirma = () => {
    setOpen(false);
  };

  
  const apagaTudo = () =>{
    console.log("funciou")
    const body ={
        id: "PatusZf4mHH6UoZfYC8I"
    }
    axios
      .put(`${apiUrl}/clear`, body)
      .then(response => {
        console.log(response.data)
      })
      .catch(err => {
        console.log(err);
      });
    setOpen(false)
    setEscolheTela('perfis')
  }
  
  const escolhePerfis = () =>{
    setEscolheTela('perfis')
  }

  const escolheMatchs = () =>{
    setEscolheTela('matchs')
  }

  let telaMostrada;
    
  if (escolheTela === 'perfis') {
      telaMostrada = <Perfis baseUrl={apiUrl}/>
    } else {
      telaMostrada = <Matchs baseUrl={apiUrl}/>
  }

  return (
    <div className="App">
        <AppBar id="cabecalho-mobile" position="static" >
          <Toolbar className='Cabecalho' >
            <IconButton onClick={escolhePerfis} aria-label="Ver Matchs" >
              <div id='icone-perfil' >
                <IconPerfil fontSize={'large'} className='iconeRoxo'/>
                <Left fontSize={'small'} className='iconeRoxo'/>
                <Right fontSize={'small'} className='iconeRoxo'/>
              </div>
            </IconButton>

            <IconButton IconButton onClick={escolheMatchs} id="icone-match" aria-label="Ver Matchs" >
              <IconMatch fontSize={'large'} className='iconeRoxo'/>
            </IconButton>

            <Tooltip title="Apagar Tudo" arrow >
              <IconButton onClick={confirmaExclui} aria-label="Resetar" >
                <Apagar fontSize={'large'} className='iconeRoxo'/>
              </IconButton>
            </Tooltip>
            <Dialog
              open={open}
              onClose={fechaConfirma}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              id='dialogo'
            >
              <DialogTitle id="alert-dialog-title">{"Você tem certeza que quer resetar?"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Isso irá apagar todos os matchs e todas as suas escolhas
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button id="botao-confimra" onClick={fechaConfirma} >
                  Não
                </Button>
                <Button onClick={apagaTudo} id="botao-confimra" autoFocus>
                  Sim
                </Button>
              </DialogActions>
            </Dialog>
          </Toolbar>
        </AppBar>

        <div id='menu-desktop' className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar id="cabeçalho">
              <img className='logo' src={Core} alt='coração'/>
              <img className='logo' src={Logo} alt='Logo'/>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor="left"
          >
            <List>
                <ListItem id='titulo-menu'>
                    <MenuIcon fontSize={'large'} className='iconeRoxo'/>
                    <ListItemText className="texto-menu"> MENU </ListItemText>
                </ListItem>
                <Divider />
              
                <section id="lista-menus">
                  <ListItem className="item-lista" onClick={escolhePerfis}>
                      <IconPerfil fontSize={'large'} className='iconeRoxo'/>
                      <ListItemText className="texto-menu"> Visualizar Perfis </ListItemText>
                  </ListItem>
                  <ListItem className="item-lista" onClick={escolheMatchs}>
                      <IconMatch fontSize={'large'} className='iconeRoxo'/>
                      <ListItemText className="texto-menu"> Visualizar Matchs </ListItemText>
                  </ListItem>
                  <ListItem className="item-lista" onClick={confirmaExclui}>
                      <Apagar fontSize={'large'} className='iconeRoxo'/>
                      <ListItemText className="texto-menu"> Resetar tudo </ListItemText>
                  </ListItem>
                </section>
            </List>
          </Drawer> 
        </div>
        
      <section id='conteudo-principal'>
        {telaMostrada}
      </section>

    </div>
  );
}

export default App;
