import React from 'react'
import { Link } from 'react-router-dom';
import { finPrueba, mostrarAlertaError } from '../../Alert/Alerts';
import Morty from "../../../assets/resource/pensar.gif";

let ab = []
let game = []
let id = 0

const pru = (ab) => {
  let texto = ''
  for (let i = 0; i < ab.length; i++) {
    texto += ab[i].toLowerCase();
    //console.log(ab.length,' vfor: ',(i+1))
    if(ab.length == (i+1)){
      return texto
    }
    texto += ' - '
  }
  return texto
};


const EjercicioReview = (props) => {
  //validarRespuesta(props)  
  //console.log('EJERCICIOS rew: ',props.ejercicios[0].props.miref)
  
  
  if ( props.id !== -1 && props.miref.toString()!==null){
    id = props.id
    validarRespuesta(props)
  }
  
  return (
       
        <div className="flex items-center justify-center ">
          <div className="w-full p-5">
            
            { (true ) ?( 
              <div className='py-5 flex items-center justify-center'>
                <div className='p-4'>
                  {id===props.totalEjercicios-1?
                    <button
                      className=" text-xs sm:text-xl tracking-wider  text-white bg-gray-500 font-semibold  py-2 px-4 capitalize border border-gray-500  rounded "
                      >
                      <span>
                        <p>Previous</p>    
                      </span>
                    </button>
                  :
                    <button
                      className=" text-xs sm:text-xl tracking-wider  text-white bg-yellow-500 font-semibold  hover:bg-yellow-400 py-2 px-4 capitalize border border-yellow-500 hover:border-yellow-600 rounded "
                      onClick={() => {anterior(props)} }>
                      <span>
                        <p>Previous</p>    
                      </span>
                    </button>
                  }
                   
                </div>
                <div>
                  {id === 0?
                  
                    <button
                      className=" text-xs sm:text-xl tracking-wider  text-white bg-gray-500 font-semibold   py-2 px-4 capitalize border border-gray-500  rounded "
                      >
                      <span>
                        <p>Next</p>    
                      </span>
                    </button>
                  :
                    <button
                      className=" text-xs sm:text-xl tracking-wider  text-white bg-green-500 font-semibold  hover:bg-green-400 py-2 px-4 capitalize border border-green-500 hover:border-green-600 rounded "
                      onClick={() => {siguiente(props)} }>
                      <span>
                        <p>Next</p>    
                      </span>
                    </button>
                  }
                 
                </div>
              </div>
              ): 
              <div>
                <button
                  className=" text-xs sm:text-xl tracking-wider  text-white bg-green-500 font-semibold  hover:bg-green-400 py-2 px-4 capitalize border border-green-500 hover:border-green-600 rounded "
                  onClick={() => {anterior(props)} }>
                  <span>
                    <p>Next</p>    
                  </span>
                </button> 
              </div>
           }
            <div className=' bg-white w-full py-5'>
              <div className='py-2'>
                {ab.length !==1? <h2 className=' font-bold  text-2xl  text-green-500 '>ANSWERS</h2>:<h2 className=' font-bold  text-2xl  text-green-500 '>ANSWER</h2> } 
              </div>
              <div className='p-4 pb-10'>
                {
                  pru(ab)
                //ab.toString().trim()
                }
              </div>
            </div>
          </div>
        </div>
    );
}

async function siguiente(props) {
  let cantidad = props.id;
  let contadorRespuestas = props.contadorRespondidas;
  props.setContadorRespondidas(contadorRespuestas + 1);
  props.setId(cantidad - 1);
}

async function anterior(props) {
  let cantidad = props.id;
  let contadorRespuestas = props.contadorRespondidas;
  props.setContadorRespondidas(contadorRespuestas - 1);
  props.setId(cantidad + 1);
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
    let aciertos = props.id;
    //[object Object]

    if (tipo_ejercicio === "opcion_correcta_1") {
      let hijos = 0

      await verificarOpcion_Correcta_1(props, hijos, aciertos);
    } else if (tipo_ejercicio === "opcion_correcta_n") {
      let hijos = 0
      //console.log('opcion_correcta_n')
      //console.log('hijo: ',hijos)
      await verificarOpcion_Correcta_n(props, hijos, aciertos);
    } else if (tipo_ejercicio === "ordenar") {
      let hijos = [0];
     // console.log('hijo: ',hijos)
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
            texto += " "
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
      let hijos = 0;

      await verificarVerdadero_Falso(props, hijos, aciertos);
    } else if (tipo_ejercicio === "completar_texto") {
      let hijos = 0;

      await verificarCompletar_Texto(props, hijos, aciertos);
    } else if (tipo_ejercicio === "emparejar" || tipo_ejercicio === "emparejar_img") {
      let hijos = 0;

      await verificarEmparejar(props, hijos, aciertos);
    } else {
      noEsCorrecta(props,"asd");
    }
  };
  
  
  const verificarEmparejar = async (props, hijos, aciertos) => {

    let respuestasBack = [];

    props.ejercicio.props.ejercicio.body.forEach((item) => {
      respuestasBack.push(item.answer);
      ab=respuestasBack
      //enviarSiEsCorrecta(props, aciertos);
    });
  };
  
  const verificarCompletar_Texto = async (props, hijos, aciertos) => {
    let respuestaBackEnd = [];
  
    //rellena las respuestas del back end y las formatea, le quita los espacios en blanco y los transforma a minusculas
    props.ejercicio.props.ejercicio.body.forEach((item) => {
      let answer = item.answer.toString().toLowerCase();
      answer = answer.replace(/\s/g, "");
      respuestaBackEnd.push(answer);
      ab=respuestaBackEnd
      //enviarSiEsCorrecta(props, aciertos);
    });
  
  
    // //console.log(hijos[0].children[1].value);
  };
  
  const verificarVerdadero_Falso = async (props, hijos, aciertos) => {
    let respuestasBack = [];
  
    props.ejercicio.props.ejercicio.body.map((item, index) => {
      item.answer.map((item2, index2) => {
        if (item2[1]) {
          respuestasBack.push(item2[0]);
        }
      });
      ab = respuestasBack
      //enviarSiEsCorrecta(props, aciertos);
    });

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
    ab = respuestasBackEndOrdenadas
    //enviarSiEsCorrecta(props, aciertos);

  };
  
  const verificarOpcion_Correcta_1 = async (
    props,
    hijos,
    contadorRespondidas
  ) => {
    let hasSelected = true;
  
    if (hasSelected) {
      //Se obtiene la respuesta correcta para esto utilizo la funcion filter, itero las opciones de los ejercicios y para cada opcion si la respuesta es correcta se guarda en un arreglo
      try {
        let correctAnswer = props.ejercicio.props.ejercicio.options
        .filter((option) => option.answer === true)[0]
        .item.toString()
        .trim();
        ab = [correctAnswer]
       //enviarSiEsCorrecta(props, contadorRespondidas);
      } catch (error) {
        ab=['']
        //enviarSiEsCorrecta(props, contadorRespondidas);
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
    let hasSelected = true;
  
    if (hasSelected) {
      //Se obtiene la respuesta correcta para esto utilizo la funcion filter, itero las opciones de los ejercicios y para cada opcion si la respuesta es correcta se guarda en un arreglo
      let correctAnswer = [];
      props.ejercicio.props.ejercicio.options.forEach((option) => {
        if (option.answer === true) {
          correctAnswer.push(option.item);
        }
      });
      ab = correctAnswer
      //enviarSiEsCorrecta(props, contadorRespondidas);
      // PARA QUE SEA TEXTO correctAnswer.toString().trim()
    } else {
      noEsCorrecta(props)
    }
  };
  
  
  
  

export default EjercicioReview
