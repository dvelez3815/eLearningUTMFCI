import React from 'react'
import { mostrarAlertaError } from '../../Alert/Alerts'

const EjercicioFooter = () => {
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
            onClick={() => mostrarAlertaError()}
          >
            <span>
              <p>comprobar</p>
            </span>
          </button>
        </div>
      </div>
    )
}

export default EjercicioFooter
