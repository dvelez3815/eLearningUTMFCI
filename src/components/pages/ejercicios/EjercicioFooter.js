import React, { useEffect } from 'react'
import Cookies from 'universal-cookie';
import { mostrarAlertaError, mostrarAlertaExito, mostrarAlertaExitoFin } from '../../Alert/Alerts'

const cookies = new Cookies();

const EjercicioFooter = (props) => {
  useEffect(() => {

  }, [])

    return (
      <div className="mr-8 ml-8">
        <div className="flex justify-between flex-row container m-auto p-auto">
        <div className="mb-4">
          <button
            disabled={false}
            onClick={() => ("hola")}
            className="bg-transparent text-xs sm:text-xl tracking-wider  my-2 text-gray-500 font-semibold hover:text-gray-400 py-2 px-4 border border-gray-500 hover:border-gray-500 rounded"
            >
            Saltar
          </button>
        </div>
        <div className="mb-4">
          <button
            className=" text-xs sm:text-xl tracking-wider  my-2 text-white bg-green-500 font-semibold  hover:bg-green-400 py-2 px-4 capitalize border border-green-500 hover:border-green-600 rounded "
            onClick={() => validarRespuesta(props)}
            >
            <span>
              <p>comprobar</p>
            </span>
          </button>
        </div>
            </div>
      </div>
    )
}

const validarRespuesta = async(props)=>{
  let tipo_ejercicio = props.ejercicio.props.ejercicio.type;
  let contadorRespuestas = props.contadorRespondidas;

  if(tipo_ejercicio === "opcion_correcta_1"){
    let hijos = props.miref.current.children;
    await verificarOpcion_Correcta_1(props,hijos,contadorRespuestas);
  }else if(tipo_ejercicio === "opcion_correcta_n"){
    let hijos = props.miref.current.children;
    await verificarOpcion_Correcta_n(props,hijos,contadorRespuestas);
  }
  

}




const verificarOpcion_Correcta_1 = async (props,hijos,contadorRespondidas)=>{
  let esCorrecta = false;
  let userSelection;
  let hasSelected = false;    
  (contadorRespondidas);

  for(let i = 0; i < hijos.length; i++){
    if(hijos[i].classList.contains("activado")){
      hasSelected = true;
      userSelection = hijos[i].innerText;
      break;
    }
  }
  if(hasSelected){
    (props.ejercicio.props.ejercicio.options)
    //Se obtiene la respuesta correcta para esto utilizo la funcion filter, itero las opciones de los ejercicios y para cada opcion si la respuesta es correcta se guarda en un arreglo
    let correctAnswer = props.ejercicio.props.ejercicio.options.filter(option => option.answer === true)[0].item;
    if(correctAnswer === userSelection){
      esCorrecta = true;
      ("hola???");
    }
    ("AQUI");
    (correctAnswer);
    (userSelection);
    (correctAnswer === userSelection);
    if(esCorrecta){
      //Se es corecta se necesita saber si se ha llegado al final de la lista de ejercicios, de ser así, se debe de terminar el juego y guardar el progreso,
      //caso contrario se debe de pasar al siguiente ejercicio
      if(props.juego.length-1 === 0){
        let tasks_id = window.location.href.split('/')[window.location.href.split('/').length - 1];
        let id = cookies.get('_id');

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "user_id": `${id}`,
          "task_id": `${tasks_id}`
        });       
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
        };

        await fetch("https://utminglesapp.herokuapp.com/progress/update", requestOptions)
        .then(response => response.text())
        .then(result => (result))
        .catch(error => ('error', error));
        mostrarAlertaExitoFin(`Fin del juego`);
        props.setFinJuego(true)

      }else{
        mostrarAlertaExito(`Respuesta correcta`);
        props.juego.pop();
        props.setContadorRespondidas(contadorRespondidas+1)
        ("b",contadorRespondidas);
      }
      //Se guarda el progreso del usuario y se muestra una alerta de que la respuesta es correcta
    }else{
      //Se crea otro stack para guardar las respuestas pendiente, se elimina el ejercicio actual se trabaja con la stack creada y se randomiza la stack
      //Se muestra una alerta de que la respuesta es incorrecta
      let aux = randomizarArray([...props.juego]);
      mostrarAlertaError("Respuesta incorrecta");
      props.juego.pop();
      props.setJuego(aux);
    }

  }else{
    alert("No seleccionaste nada")

  }

}


const verificarOpcion_Correcta_n = async (props,hijos,contadorRespondidas)=>{
  let esCorrecta = false;
  let userSelection = [];
  let hasSelected = false;    

  for(let i = 0; i < hijos.length; i++){
    if(hijos[i].classList.contains("activado")){
      hasSelected = true;
      userSelection.push(hijos[i].innerText);
    }
  }

  if(hasSelected){
    (props.ejercicio.props.ejercicio.options)
    //Se obtiene la respuesta correcta para esto utilizo la funcion filter, itero las opciones de los ejercicios y para cada opcion si la respuesta es correcta se guarda en un arreglo
    let correctAnswer = [];
    props.ejercicio.props.ejercicio.options.forEach(option => {
      if(option.answer === true){
        correctAnswer.push(option.item);
      }
    });

    (userSelection);
    if(userSelection.length>correctAnswer.length || userSelection.length<correctAnswer.length){
      esCorrecta = false;
    }else if(userSelection.length === correctAnswer.length){
      //order array
      userSelection.sort();
      correctAnswer.sort();
      ("hola",userSelection,correctAnswer,"adios");
      if(userSelection.toString().trim() === correctAnswer.toString().trim()){
        esCorrecta = true;
      }
    }
    ("correctas",correctAnswer.toString().trim());
    if(esCorrecta){
      //Se es corecta se necesita saber si se ha llegado al final de la lista de ejercicios, de ser así, se debe de terminar el juego y guardar el progreso,
      //caso contrario se debe de pasar al siguiente ejercicio
      if(props.juego.length-1 === 0){
        let tasks_id = window.location.href.split('/')[window.location.href.split('/').length - 1];
        let id = cookies.get('_id');

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "user_id": `${id}`,
          "task_id": `${tasks_id}`
        });       
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
        };

        await fetch("https://utminglesapp.herokuapp.com/progress/update", requestOptions)
        .then(response => response.text())
        .then(result => (result))
        .catch(error => ('error', error));
        props.setContadorRespondidas(contadorRespondidas+1)
        props.juego.pop();
        setInterval(() => {
          
        }, 4000);
        mostrarAlertaExitoFin(`Fin del juego`);
        props.setFinJuego(true)

      }else{
        mostrarAlertaExito(`Respuesta correcta`);
        props.juego.pop();
        props.setContadorRespondidas(contadorRespondidas+1)
      }
      //Se guarda el progreso del usuario y se muestra una alerta de que la respuesta es correcta
    }else{
      //Se crea otro stack para guardar las respuestas pendiente, se elimina el ejercicio actual se trabaja con la stack creada y se randomiza la stack
      //Se muestra una alerta de que la respuesta es incorrecta
    
      let aux = [...props.juego];
      //se guarda el ejercicio para no mostrarlo en la siguiente iteracion
      let actual = props.juego.pop();
      //se randomiza todo al arreglo de props.juego
      ("no random",aux);
      aux = randomizarArray(aux);
      //se elimina el ejercicio actual
      ("random",aux);
      
      mostrarAlertaError("Respuesta incorrecta");
      props.juego.pop();
      props.setJuego(aux);
    }

  }else{
    alert("No seleccionaste nada")

  }

}


function randomizarArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}


export default EjercicioFooter


