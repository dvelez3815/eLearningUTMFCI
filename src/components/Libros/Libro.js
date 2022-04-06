
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
     
      <div className='flex flex-col justify-center'>
        <button onClick={ocultarlibros} className=' p-2 rounded-lg text-2xl  text-yellow-600 mt-5 mx-5 font-bold'>
          <h2  key={shortid.generate()} id={`libro${props.libroactual}`} className="shadow-lg hover:bg-gray-100 border-solid border-2 border-gray-300 p-2 rounded-lg text-2xl  text-yellow-600 font-bold">{`BOOK ${props.libroactual}`}
          </h2>
        </button>
        <button onClick={ocultarlibros} className='text-yellow-600 content-center justify-center '>
          <h2 className='font-bold'>
            v
          </h2>
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
