import logo from './logo.svg';
import './App.css';
import {NavComponent} from './components/NavComponent';
import { ModuleProgress } from './components/ModuleProgress';
import Activity from './components/Activities/Activity';
import i_writting from './assets/icons/teacher.png'
import { useEffect } from 'react';
import Activities from './components/Activities/Activities';

function App() {
  
  let libro_ingles = {

    "modulos": [
      {
        "id": 0,
        "imagenes":['../../assets/icons/teacher.png','../../assets/icons/teacher.png','../../assets/icons/teacher.png'],
        "tipo": ["grammar","writting","listening"],
        "unidades":[
          {
            "lecciones": [
              {
                "tipo": "writting",
                "topic": "GALAPAGOS NO SE QUE",
                "ejercicios": [
                  {
                    "titulo": "CHOOSE THE WORD THAT EXPRESS COMPARISON",
                    "tipo": "check",
                    "opciones": ["than","that","then"],
                    "respuesta": "that"
                  }
                ]

              },
              {
                "tipo": "Grammar",
                "topic": "GALAPAGOS NO SE QUE",
                "ejercicios": [
                  {
                    "titulo": "CHOOSE THE WORD THAT EXPRESS COMPARISON",
                    "tipo": "check",
                    "opciones": ["than","that","then"],
                    "respuesta": "that"
                  }
                ]
              },
              {

              },
              {

              }
            ]
          },
          {

          }
        ]
      },
      {
        "id": 1,
        "imagenes":['../../assets/icons/teacher.png','../../assets/icons/teacher.png','../../assets/icons/teacher.png'],
        "tipo": ["grammar","writting","listening"],
        "unidades":[
          {
            "lecciones": [
              {
                "tipo": "writting",
                "topic": "GALAPAGOS NO SE QUE",
                "ejercicios": [
                  {
                    "titulo": "CHOOSE THE WORD THAT EXPRESS COMPARISON",
                    "tipo": "check",
                    "opciones": ["than","that","then"],
                    "respuesta": "that"
                  }
                ]

              },
              {
                "tipo": "Grammar",
                "topic": "GALAPAGOS NO SE QUE",
                "ejercicios": [
                  {
                    "titulo": "CHOOSE THE WORD THAT EXPRESS COMPARISON",
                    "tipo": "check",
                    "opciones": ["than","that","then"],
                    "respuesta": "that"
                  }
                ]
              },
              {

              },
              {

              }
            ]
          },
          {

          }
        ]
      }
    ]
  }
  return (
    <div className="App">
      {/* <NavComponent logo={logo}></NavComponent> */}
      <ModuleProgress></ModuleProgress>
      {/* <Activities modules={libro_ingles.modulos}></Activities> */}
      <Activity img={i_writting} percent={100} name={"Grammar"}/>
      <Activity img={i_writting} percent={80} name={"Writting"}/>
      
    </div>
  );
}

export default App;


