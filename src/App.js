import logo from './logo.svg';
import './App.css';
import {NavComponent} from './components/NavComponent';
import EModule from './components/EModules/EModule';
import {BrowserRouter as Router, Route} from "react-router-dom"
import Grammar from './components/pages/ejercicios/Grammar';
 
function App() {
  return (
    <div className="App">      
    <Router>
      <Route exact path="/modulo/1/grammar/1">
        <Grammar />
      </Route>
      <Route exact path="/f/">
        <NavComponent logo={logo}/>
        <EModule percent={100}/>
        <EModule percent={30}/>
      </Route>
    </Router>

    </div>
  );
}

export default App;


