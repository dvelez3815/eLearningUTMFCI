
import React from 'react';
import shortid from 'shortid';
import Modulo from '../Modulos/Modulo';
import Progreso from '../pages/inicio/Progreso';

import "./Libro.css";


const Libro = (props) => {
    const [habilitado, setHabilitado] = React.useState(true);
    let progresspasado = 0;
    let progressactual = 0;
    let progressnext = 0;
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
        let userprogress = (modulo[index].writing.user_progress + modulo[index].grammar.user_progress + modulo[index].reading.user_progress + modulo[index].vocabulary.user_progress);
        let total_task = (modulo[index].writing.total_task + modulo[index].grammar.total_task + modulo[index].reading.total_task + modulo[index].vocabulary.total_task);
        let progress = (userprogress / total_task) * 100;  
        progressactual = progress;
        

        if(modulo[index].book_info.module === 1){
          progresspasado = progress;
        }else{
          if(props.lastbook_is_aproved && index===0){
            progresspasado = 100;
          }else{
            if(progressnext!==100){
              bloqueo = true;
            }
          }            
          }
          progressnext = progress;
          console.log(progresspasado,progress,progressnext);
        //   if (progresspasado !== 100) {
        //     bloqueo = true;
        // }
        //   if(progressactual !== 100){
        //     progresspasado = progressactual;
        //   }


        
        // console.log(progresspasado,progressactual);
        // if(progress< 100 && index!=0){
        //     bloqueo = true;
        // }

        return <div key={index} className='modulos'>
          <div key={shortid.generate()}>
          <Modulo modulo={modulo} moduloindex={(index+1)} libroactual={props.libroactual} bloqueo={bloqueo}/>
          </div>
        </div>

      })}
  </div>;
};

export default Libro;
