import React, { useEffect } from 'react'
import { mostrarAlertaError } from '../../Alert/Alerts'

const EjercicioFooter = (props) => {
  useEffect(() => {

  }, [props.juego])

    return (
        <div className="flex justify-between flex-col sm:flex-row container m-auto p-auto">
        <div className="mb-4">
          <button
            disabled={false}
            onClick={() => console.log("hola")}
            className="bg-transparent text-xl tracking-wider  my-2 text-gray-500 font-semibold hover:text-gray-400 py-2 px-4 border border-gray-500 hover:border-gray-500 rounded"
          >
            Saltar
          </button>
        </div>
        <div className="mb-4">
          <button
            className=" text-xl tracking-wider  my-2 text-white bg-green-500 font-semibold  hover:bg-green-400 py-2 px-4 capitalize border border-green-500 hover:border-green-600 rounded "
            onClick={() => functionPruebas(props)}
          >
            <span>
              <p>comprobar</p>
            </span>
          </button>
        </div>
      </div>
    )
}

const functionPruebas = (props)=> {
  let actual = props.contadorRespondidas;
    console.log(props.juego.pop());
    if(props.juego.length === 0){
      props.setFinJuego(true)
      console.log(props.miref.current);
      console.log("hola",props.contadorRespondidas);
      console.log("1");
      props.setContadorRespondidas(actual + 1);
    }else{
      console.log(props.miref.current);

      console.log("hola",props.contadorRespondidas);
      console.log("2");
      props.setContadorRespondidas(actual + 1);
    }
    props.setCargado(false);
  
}

export default EjercicioFooter
