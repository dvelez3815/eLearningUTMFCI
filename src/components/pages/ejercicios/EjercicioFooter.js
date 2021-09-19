import React, { useEffect } from 'react'
import { mostrarAlertaError } from '../../Alert/Alerts'

const EjercicioFooter = (props) => {
  useEffect(() => {

  }, [])

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
            onClick={() => validarRespuesta(props)}
          >
            <span>
              <p>comprobar</p>
            </span>
          </button>
        </div>
      </div>
    )
}

const validarRespuesta = (props)=>{
  let tipo_ejercicio = props.ejercicio.props.ejercicio.type;
  let contadorRespuestas = props.contadorRespondidas;

  if(tipo_ejercicio === "opcion_correcta_1"){
    let hijos = props.miref.current.children;
    verificarOpcion_Correcta_1(props,hijos,contadorRespuestas);
  }
  

}

const verificarOpcion_Correcta_1 = (props,hijos,contadorRespondidas)=>{
  let esCorrecta = false;
  let userSelection;
  let hasSelected = false;    

  for(let i = 0; i < hijos.length; i++){
    if(hijos[i].classList.contains("activado")){
      hasSelected = true;
      userSelection = hijos[i].innerText;
      break;
    }
  }
  if(hasSelected){
    console.log(props.ejercicio.props.ejercicio.options)
    //Se obtiene la respuesta correcta para esto utilizo la funcion filter, itero las opciones de los ejercicios y para cada opcion si la respuesta es correcta se guarda en un arreglo
    let correctAnswer = props.ejercicio.props.ejercicio.options.filter(option => option.answer === true)[0].item;
    if(correctAnswer === userSelection){
      esCorrecta = true;
    }

    if(esCorrecta){
      //Se es corecta se necesita saber si se ha llegado al final de la lista de ejercicios, de ser así, se debe de terminar el juego y guardar el progreso,
      //caso contrario se debe de pasar al siguiente ejercicio
      if(props.juego.length-1 === 0){
        alert("Juego terminado")
        props.setFinJuego(true)

        
      }else{
        props.juego.pop();
        props.setContadorRespondidas(contadorRespondidas+1)
        console.log("b",contadorRespondidas);
      }
      //Se guarda el progreso del usuario y se muestra una alerta de que la respuesta es correcta
    }else{
      //Se crea otro stack para guardar las respuestas pendiente, se elimina el ejercicio actual se trabaja con la stack creada y se randomiza la stack
      //Se muestra una alerta de que la respuesta es incorrecta
      mostrarAlertaError("Respuesta incorrecta");

    }

  }else{
    alert("No seleccionaste nada")

  }

}

const functionPruebas = (props)=> {
  let actual = props.contadorRespondidas;
    console.log(props.juego.pop());
    if(props.juego.length === 0){
      props.setFinJuego(true)
      // console.log(props.miref.current);
      // console.log("hola",props.contadorRespondidas);
      // console.log("1");

      props.setContadorRespondidas(actual + 1);
    }else{
      // console.log(props.miref.current);

      // console.log("hola",props.contadorRespondidas);
      // console.log("2");
      props.setContadorRespondidas(actual + 1);
      console.log("a",props.juego[0].props.ejercicio.type);
    }
    props.setCargado(false);
  
}
const verificarRespuesta = (props)=>{
  let tipo_ejercicio = props.juego[0].props.ejercicio.type;

  if(props.miref.current.classList.contains("activado")){
    if(tipo_ejercicio === "opcion_correcta"){
  
    }else if(tipo_ejercicio === "ordenar"){
  
    }

  }else{

  }


}
const verificarOpcionCorrecta1 = (props)=>{
  let esCorrecta = false;
  let userSelection = props.miref.current.classList.contains("activado");
  if(props.miref.current.classList.contains("activado")){

  }else{
    //alerta que diga que no selecciono nada
    alert("No seleccionaste nada")
  }
}

export default EjercicioFooter
