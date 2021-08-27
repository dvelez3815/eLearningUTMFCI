import './App.css';
import {NavComponent} from './components/NavComponent';
import EModule from './components/EModules/EModule';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Grammar from './components/pages/ejercicios/Grammar';
/* PAGES */
import  Inicio  from './components/pages/inicio/Inicio.js';
import HomePage from './components/pages/HomePage/HomePage'
import SignUpPage from './components/pages/SignUpPage/SignUpPage'
import SigInPage from './components/pages/SigInPage/SigInPage'
import NotFoundPage from './components/pages/NotFoundPage/NotFoundPage'
function App() {
  return (
    <div className="App">      
    {/* Rutas solo de pruebas para probar las vistas */}

    <Router>
    <Switch>
      <Route exact path="/modulo/1/grammar/1">
        <Grammar />
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
      <Route > <NotFoundPage/> </Route>
      </Switch>
    </Router>

    </div>
  );
}

export default App;


