import './App.css';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
/* PAGES */
import  Inicio  from './components/pages/inicio/Inicio.js';
import HomePage from './components/pages/HomePage/HomePage'
import SignUpPage from './components/pages/SignUpPage/SignUpPage'
import SigInPage from './components/pages/SigInPage/SigInPage'
import NotFoundPage from './components/pages/NotFoundPage/NotFoundPage'
import { Grammar2 } from './components/pages/ejercicios/Grammar2';
import AccountPendingPage from './components/pages/AccountPendingPage/AccountPendingPage'
import Evaluacion from './components/pages/Evaluacion/Evaluacion';
import Pruebas from './components/pages/Pruebas/Pruebas';
import Review from './components/pages/Review/Review';
import PruebasGeneral from './components/pages/Pruebas/PruebasGeneral';
import PerfilUser from './components/pages/user/PerfilUser';



function App() {
  
  return (
    <div className="App h-full">      
    {/* Rutas solo de pruebas para probar las vistas */}

    <Router>
    <Switch>
      <Route path="/modulo/:pmodulo/grammar/:punidad/:id">
        <Grammar2 />
      </Route>
      <Route path="/modulo/:pmodulo/reading/:punidad/:id">
        <Grammar2 />
      </Route>
      <Route path="/modulo/:pmodulo/vocabulary/:punidad/:id">
        <Grammar2 />
      </Route>
      <Route path="/modulo/:pmodulo/writing/:punidad/:id">
        <Grammar2 />
      </Route>
      <Route path="/evaluacion">
        <Evaluacion/>
      </Route>

      <Route path="/pruebas/prueba-general">
        <PruebasGeneral/>
      </Route> 

      <Route path="/pruebas/libro/:idlibro">
        <Pruebas/>
      </Route> 
           
      <Route path="/review/:book/:module/:unit/:type">
        <Review/>
      </Route>      

      <Route path="/profile">
        <PerfilUser/>
      </Route> 
      <Route exact path="/dashboard">
        <Inicio />
      </Route>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route exact path="/signup">
        <SignUpPage />
      </Route>
      <Route exact path="/signin">
        <SigInPage />
      </Route>
      <Route exact path="/PendingAccount">
        <AccountPendingPage />
      </Route>
      {/* <Route exact path="/restartPassword">
        <RestarPaswor />
      </Route> */}
      <Route > <NotFoundPage/> </Route>
      </Switch>
    </Router>

    </div>
  );
}

export default App;
