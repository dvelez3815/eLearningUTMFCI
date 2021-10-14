import React from 'react'
import { finPrueba, mostrarAlertaError } from '../../Alert/Alerts';


const EjercicioFooterPruebaLibros = (props) => {
    return (
        <div className="mr-8 ml-8 mt-8">
        <div className="flex items-center justify-center flex-row container m-auto p-auto">
          <div className="mb-4">
            <button
              className=" text-xs sm:text-xl tracking-wider  my-2 text-white bg-green-500 font-semibold  hover:bg-green-400 py-2 px-4 capitalize border border-green-500 hover:border-green-600 rounded "
              onClick={() => {validarRespuesta(props)} }
            >
              <span>
                <p>Siguiente</p>    
              </span>
            </button>
          </div>
        </div>
      </div>
    );
}

  
async function noEsCorrecta(props) {
    let contadorRespuestas = props.contadorRespondidas;
    props.juego.pop();
    props.setContadorRespondidas(contadorRespuestas + 1);

    if (props.juego.length === 0) {
        
        finPrueba(props.aciertos, props.totalEjercicios)
        
    } else {
        
    }

  }
  


  const validarRespuesta = async (props) => {
    let tipo_ejercicio = props.ejercicio.props.ejercicio.type;
    let aciertos = props.aciertos;
  
    if (tipo_ejercicio === "opcion_correcta_1") {
      let hijos = props.miref.current.children;
      await verificarOpcion_Correcta_1(props, hijos, aciertos);
    } else if (tipo_ejercicio === "opcion_correcta_n") {
      let hijos = props.miref.current.children;
      await verificarOpcion_Correcta_n(props, hijos, aciertos);
    } else if (tipo_ejercicio === "ordenar") {
      let hijos = [...props.miref.current.children];
  
      //se quita la ref
      const respuestasBack = Array.from(
        props.ejercicio.props.ejercicio.options
      ).map((item) => [...item]);
      const respuestasBackEndOrdenadas = [...respuestasBack].map((item) => {
        if (item) {
          item = [...item.sort((a, b) => (a.answer > b.answer ? 1 : -1))];
          let texto = "";
          for (let i = 0; i < item.length; i++) {
            const element = item[i];
            texto += element.item;
          }
          return texto;
        }
      });
      await verificarOrdenar(
        props,
        hijos,
        aciertos,
        respuestasBackEndOrdenadas
      );
    } else if (tipo_ejercicio === "true_false") {
      let hijos = props.miref.current.children;
      console.log(hijos);
      await verificarVerdadero_Falso(props, hijos, aciertos);
    } else if (tipo_ejercicio === "completar_texto") {
      let hijos = Array.from(props.miref.current.children);
      await verificarCompletar_Texto(props, hijos, aciertos);
    } else if (tipo_ejercicio === "emparejar") {
      let hijos = Array.from(props.miref.current.children);
      await verificarEmparejar(props, hijos, aciertos);
    } else {
      noEsCorrecta(props,"asd");
    }
  };
  
  
  const verificarEmparejar = async (props, hijos, aciertos) => {
    let respuestaUser = [];
    let respuestasBack = [];
    let esCorrecta = false;
    props.ejercicio.props.ejercicio.body.forEach((item) => {
      respuestasBack.push(item.answer);
    });
    let faltaMarcar = false;
    hijos.some((element) => {
      if (
        element.getElementsByTagName("button")[0].innerText ===
        "esperando respuesta..."
      ) {
        faltaMarcar = true;
        return true;
      }
    });
    if (faltaMarcar) {
      noEsCorrecta(props)
    } else {
      hijos.some((element) => {
        respuestaUser.push(element.getElementsByTagName("button")[0].innerText);
      });
      if (JSON.stringify(respuestaUser) === JSON.stringify(respuestasBack)) {
        esCorrecta = true;
      } else {
        esCorrecta = false;
      }
      if (esCorrecta) {
        enviarSiEsCorrecta(props, aciertos);
      } else {
        noEsCorrecta(props,respuestasBack);
      }
  
    }
  };
  
  const verificarCompletar_Texto = async (props, hijos, aciertos) => {
    let respuestaUser = [];
    let respuestaBackEnd = [];
  
    //rellena las respuestas del back end y las formatea, le quita los espacios en blanco y los transforma a minusculas
    props.ejercicio.props.ejercicio.body.forEach((item) => {
      let answer = item.answer.toString().toLowerCase();
      answer = answer.replace(/\s/g, "");
      respuestaBackEnd.push(answer);
    });
  
    //rellena las respuestas del usuario y las formatea, le quita los espacios en blanco y los transforma a minusculas
    hijos.forEach((item) => {
      let answer = item.children[1].value.toString().toLowerCase();
      answer = answer.replace(/\s/g, "");
      respuestaUser.push(answer);
    });
  
    let aRespondido = true;
    respuestaUser.forEach((item, index) => {
      if (item === "") {
        aRespondido = false;
      }
    });
  
    let esCorrecta = false;
  
    if (aRespondido) {
      if (JSON.stringify(respuestaUser) === JSON.stringify(respuestaBackEnd)) {
        esCorrecta = true;
      } else {
        esCorrecta = false;
      }
    } else {
      noEsCorrecta(props)
      console.log(respuestaBackEnd);
    }
    if (aRespondido && esCorrecta) {
      enviarSiEsCorrecta(props, aciertos);
    } else if (aRespondido && !esCorrecta) {
      noEsCorrecta(props,respuestaBackEnd);
    }
  
    // console.log(hijos[0].children[1].value);
  };
  
  const verificarVerdadero_Falso = async (props, hijos, aciertos) => {
    let respuestasBack = [];
  
    props.ejercicio.props.ejercicio.body.map((item, index) => {
      item.answer.map((item2, index2) => {
        if (item2[1]) {
          respuestasBack.push(item2[0]);
        }
      });
    });
    let respuestasUser = [];
    //obtengo el div del ejercicio y lo guardo en un array
  
  
    for (let index = 0; index < hijos.length; index++) {
      const element = Array.from(hijos[index].getElementsByTagName("button"));
      element.forEach((item) => {
        if(item.classList.contains("activado")){
                  respuestasUser.push(
            item.innerText.toString()
              .replace(/\n/g, "")
              .trim()
          );
        }
      });
    
    }
    
    let esCorrecta = false;
  
    if (JSON.stringify(respuestasUser) === JSON.stringify(respuestasBack)) {
      esCorrecta = true;
    } else {
      esCorrecta = false;
    }
  
    if (esCorrecta) {
      enviarSiEsCorrecta(props, aciertos);
    } else {
      noEsCorrecta(props,respuestasBack);
    }
  };
  
  const verificarOrdenar = async (
    props,
    hijos,
    aciertos,
    respuestasBackEndOrdenadas
  ) => {
    let esCorrecta = false;
    let respuestasUser = [];
    //aca en este for se agarran los div que tengan id agarrar el texto y agregarlo a un array
    for (let i = 0; i < hijos.length; i++) {
      if (hijos[i].id === "arrastrar") {
        let respuesta = hijos[i].children[1].innerText
          .toString()
          .replace(/\n/g, "")
          .trim();
        respuesta.replace(/\s\s+/g, " ");
        respuestasUser.push(respuesta);
      }
    }
  
    if (
      JSON.stringify(respuestasUser) ===
      JSON.stringify(respuestasBackEndOrdenadas)
    ) {
      esCorrecta = true;
    } else {
      esCorrecta = false;
    }
  
    if (esCorrecta) {
      enviarSiEsCorrecta(props, aciertos);
    } else {
      noEsCorrecta(props,respuestasBackEndOrdenadas);
    }
  };
  
  const verificarOpcion_Correcta_1 = async (
    props,
    hijos,
    contadorRespondidas
  ) => {
    let esCorrecta = false;
    let userSelection;
    let hasSelected = false;
  
    for (let i = 0; i < hijos.length; i++) {
      if (hijos[i].classList.contains("activado")) {
        hasSelected = true;
        userSelection = hijos[i].innerText.toString().trim();
        break;
      }
    }
    if (hasSelected) {
      //Se obtiene la respuesta correcta para esto utilizo la funcion filter, itero las opciones de los ejercicios y para cada opcion si la respuesta es correcta se guarda en un arreglo
      let correctAnswer = props.ejercicio.props.ejercicio.options
        .filter((option) => option.answer === true)[0]
        .item.toString()
        .trim();
      if (correctAnswer === userSelection) {
        esCorrecta = true;
      }
  
      if (esCorrecta) {
        enviarSiEsCorrecta(props, contadorRespondidas);
      } else {
        noEsCorrecta(props,correctAnswer);
      }
    } else {
      noEsCorrecta(props)
    }
  };
  
  const verificarOpcion_Correcta_n = async (
    props,
    hijos,
    contadorRespondidas
  ) => {
    let esCorrecta = false;
    let userSelection = [];
    let hasSelected = false;
  
    for (let i = 0; i < hijos.length; i++) {
      if (hijos[i].classList.contains("activado")) {
        hasSelected = true;
        userSelection.push(hijos[i].innerText);
      }
    }
  
    if (hasSelected) {
      //Se obtiene la respuesta correcta para esto utilizo la funcion filter, itero las opciones de los ejercicios y para cada opcion si la respuesta es correcta se guarda en un arreglo
      let correctAnswer = [];
      props.ejercicio.props.ejercicio.options.forEach((option) => {
        if (option.answer === true) {
          correctAnswer.push(option.item);
        }
      });
      if (
        userSelection.length > correctAnswer.length ||
        userSelection.length < correctAnswer.length
      ) {
        esCorrecta = false;
      } else if (userSelection.length === correctAnswer.length) {
        //order array
        userSelection.sort();
        correctAnswer.sort();
        if (userSelection.toString().trim() === correctAnswer.toString().trim()) {
          esCorrecta = true;
        }
      }
      if (esCorrecta) {
        enviarSiEsCorrecta(props, contadorRespondidas);
      } else {
        noEsCorrecta(props,correctAnswer);
      }
    } else {
      noEsCorrecta(props)
    }
  };
  
  

  async function enviarSiEsCorrecta(props, contador) {
    //Se es corecta se necesita saber si se ha llegado al final de la lista de ejercicios, de ser así, se debe de terminar el juego y guardar el progreso,
    //caso contrario se debe de pasar al siguiente ejercicio
    
    let contadorRespuestas = props.contadorRespondidas;
    if (props.juego.length === 0) {
        props.setAciertos(contador + 1);
        finPrueba(props.aciertos, props.totalEjercicios)
        
    } else {
        props.setAciertos(contador + 1);
    }

    props.juego.pop();
    props.setContadorRespondidas(contadorRespuestas + 1);
    
  }
  

export default EjercicioFooterPruebaLibros
