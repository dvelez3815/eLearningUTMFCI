import logo from './logo.svg';
import './App.css';
import {NavComponent} from './components/NavComponent';
import { ModuleProgress } from './components/ModuleProgress';
import Activity from './components/Activities/Activity';
import i_writting from './assets/icons/teacher.png'
import { useEffect } from 'react';
import Activities from './components/Activities/Activities';
import EModule from './components/EModules/EModule';


function App() {
  return (
    <div className="App">
    <NavComponent logo={logo}/>
    <EModule />
    
    </div>
  );
}

export default App;


