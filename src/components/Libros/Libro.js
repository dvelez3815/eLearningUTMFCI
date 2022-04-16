
import React from 'react';
import shortid from 'shortid';
import Modulo from '../Modulos/Modulo';
import flecha from "../../assets/icons/flecha.png";

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
        <button onClick={ocultarlibros} className=' p-2 rounded-lg text-2xl  text-yellow-500 mt-5 mx-5 font-bold'>
          <h2  key={shortid.generate()} id={`libro${props.libroactual}`} className="shadow-lg hover:bg-gray-100 border-solid border- bg-gray-100 border-yellow-300 p-2 rounded-lg text-2xl  text-yellow-600 font-bold">{`BOOK ${props.libroactual}`}
          </h2>
        </button>
        <button onClick={ocultarlibros} className='text-yellow-600 content-center justify-center '>
            <img src={flecha} alt="Desplegar Libro" />
        </button>
      </div>
      
      
      {props.modulos.map((modulo, index) => {

        if(!props.lastbook_is_aproved){
          bloqueo = true;
        }
        
        if(index=== 1){
           //console.log(props.modulos[index-1].totalmoduleprogress);
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
