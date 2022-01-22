
import React from 'react';
import shortid from 'shortid';
import Modulo from '../Modulos/Modulo';
import Progreso from '../pages/inicio/Progreso';

import "./Libro.css";


const Libro = (props) => {
    let bloqueo = false;
    const ocultarlibros = (event) => {
        let libro = (event.target.parentNode.parentNode.parentNode);
        let modulos = libro.getElementsByClassName("modulos");
        for (let i = 0; i < modulos.length; i++) {
            modulos[i].classList.toggle("ocultar");
        }
    }


  return <div>
      {/* <h2>LIBRO {props.libroactual}</h2> */}
      <div className='flex flex-col'>
          <h2  key={shortid.generate()} id={`libro${props.libroactual}`} className="text-2xl text-left text-yellow-600 mt-5 mx-10 font-bold">{`Book ${props.libroactual}`}</h2>
          <button onClick={ocultarlibros}>
            <img className='w-8 mx-10' src="https://img.icons8.com/external-those-icons-lineal-those-icons/48/000000/external-down-arrows-those-icons-lineal-those-icons-1.png"/>
          </button>
      </div>
      
      {props.modulos.map((modulo, index) => {

        if(!props.lastbook_is_aproved){
          bloqueo = true;
        }
        
        if(index=== 1){
           console.log(props.modulos[index-1].totalmoduleprogress);
           if(props.modulos[index-1].totalmoduleprogress!==100){
             bloqueo=true;
           }
           
        }
        return <div key={index} className='modulos'>
          <div key={shortid.generate()}>
          <Modulo modulo={modulo.modulo} moduloindex={(index+1)} libroactual={props.libroactual} bloqueo={bloqueo}/>
          </div>
        </div>

      })}
  </div>;
};

export default Libro;
