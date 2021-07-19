import './App.css';
import {NavComponent} from './components/NavComponent';
import EModule from './components/EModules/EModule';
import {BrowserRouter as Router, Route} from "react-router-dom"
import Grammar from './components/pages/ejercicios/Grammar';
import { Inicio } from './components/pages/inicio/Inicio.js';
 
function App() {
  return (
    <div className="App">      
    {/* Rutas solo de pruebas para probar las vistas */}

    <Router>
      <Route exact path="/modulo/1/grammar/1">
        <Grammar />
      </Route>
      <Route exact path="/inicio">
        <Inicio />
      </Route>
    </Router>

    </div>
  );
}

export default App;


