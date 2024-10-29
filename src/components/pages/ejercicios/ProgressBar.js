import React from 'react'
import CancelIcon from "@material-ui/icons/Cancel";
import { mostrarAlertaSalir } from '../../Alert/Alerts';
import { mostrarAlertaSalirEva } from '../../Alert/Alerts';


const ProgressBar = (props) => {
  // eslint-disable-next-line no-unused-vars


  return (
    <div className="mr-8 ml-8">
      <div className="container m-auto p-auto ">
        <div className="flex justify-between  items-center">

          <div className="order-last my-3 ">
            <button onClick={salirVentana}
              className="md:hidden bg-transparent tracking-wider  my-2 text-yellow-500 font-semibold hover:text-yellow-400 py-2 px-4 border border-yellow-500 hover:border-yellow-500 rounded">
              <CancelIcon style={{ fontSize: 27 }} />
            </button>
            <button onClick={salirVentana}
              className="bg-transparent tracking-wider hidden md:block my-2 text-yellow-500 font-semibold hover:text-yellow-400 py-2 px-4 border border-yellow-500 hover:border-yellow-500 rounded">
              <CancelIcon />
              <span className='uppercase'> Exit</span>
            </button>
          </div>
          <div>
            <p className='my-2 text-yellow-500 text-xl font-semibold hover:text-yellow-400 py-5 '>Question {props.contadorRespondidas + 1} of {props.totalEjercicios}</p>
          </div>
          <div className='mx-4 truncate hidden md:block'>
            <span title={`${props.type} | Book: ${props.book} | Module: ${props.modulo} | Unit: ${props.unidad}`} className='font-semibold capitalize text-xl tracking-widest text-yellow-500  hover:text-yellow-400'>{props.type} | Book: {props.book} | Module: {props.modulo} | Unit: {props.unidad}</span>
          </div>
        </div>

        <div className="overflow-hidden mb-2 text-xs flex justify-center rounded bg-amber-200 h-4 border">
          <div
            style={{ width: `${(props.contadorRespondidas / props.totalEjercicios) * 100}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-400"
          ></div>
        </div>
      </div>
    </div>
  )
}

const salirVentana = () => {
  let prueba = window.location.href.split('/')[3];
  if (prueba === 'pruebas') {
    mostrarAlertaSalirEva();
  } else {
    mostrarAlertaSalir();
  }
}


export default ProgressBar
