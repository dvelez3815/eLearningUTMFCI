
import React from 'react';
import shortid from 'shortid';
import Modulo from '../Modulos/Modulo';
import ActivityFile from '../Activities/ActivityFile';
import "./Libro.css";


import writingimg from "../../assets/icons/Writing.png";
import speakingimg from "../../assets/icons/speaking.png";
import writingimgng from "../../assets/icons/Writing_0.png";
import speakingimgng from "../../assets/icons/speaking_0.png";
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
        <h2 key={shortid.generate()} id={`libro${props.libroactual}`} className="shadow-lg hover:bg-gray-100 border-solid border- bg-gray-100 border-yellow-300 p-2 rounded-lg text-2xl  text-yellow-600 font-bold">{`BOOK ${props.libroactual}`}
        </h2>
      </button>
    </div>

    <div className='modulos'>
      <div className='flex justify-center flex-wrap items-center space-x-2'>
        <ActivityFile img={bloqueo ? speakingimgng : speakingimg} title="SPEAKING"
          bloqueo={bloqueo} name={"Speaking Example"} percent={parseInt(0)} libro={props.libroactual} />
        <ActivityFile img={bloqueo ? writingimgng : writingimg}
          bloqueo={bloqueo} name={"Writing Example"} percent={parseInt(0)} title="WRITING" libro={props.libroactual}/>
      </div>
      {props.modulos.map((modulo, index) => {
        if (!props.lastbook_is_aproved) {
          bloqueo = true;
        }
        if (index === 1) {
          if (props.modulos[index - 1].totalmoduleprogress !== 100) {
            bloqueo = true;
          }
        }
        return (<div key={index}>
          <Modulo modulo={modulo.modulo} moduloindex={(index + 1)} lecciones={props.lecciones} libroactual={props.libroactual} bloqueo={bloqueo} />
        </div>)
      })}
    </div>
  </div>;
};

export default Libro;
