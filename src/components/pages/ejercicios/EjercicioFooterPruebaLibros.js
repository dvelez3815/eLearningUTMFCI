import React from 'react'
import { EjercicioR } from '../ejercicios/Ejer_Review';
import { Link, useParams } from 'react-router-dom';
import Morty from "../../../assets/resource/pensar.gif";
import { updateProgressBook } from '../../../api/Progress';


const EjercicioFooterPruebaLibros = (props) => {
  const {idlibro} = useParams();
  const id_user  = JSON.parse(localStorage.getItem("user"))._id;
  // eslint-disable-next-line no-unused-vars
  const subirNivel = async () => {
    /* aqui colocar para actualizar el nivel */
    if (props.aciertos >= 25) {
      await updateProgressBook(id_user, idlibro);
    }
  }
    return (
        <div className="w-full  items-center justify-center  ">
          <div className="">
          { (props.juego.length > 0) ?( <button
                className=" text-xs sm:text-xl tracking-wider  text-white bg-green-500 font-semibold  hover:bg-green-400 py-2 px-4 capitalize border border-green-500 hover:border-green-600 rounded "
                onClick={() => {validarRespuesta(props)} }>
                <span>
                  <p>Next</p>    
                </span>
              </button>   
              ): 
              <div className='w-full flex flex-col  justify-center items-center '>
                <div className='  md:py-10'>
                  <div>
                    <h2 className=" font-bold  text-2xl  text-yellow-400  ">RESULTS</h2>
                  </div>
                  <div className=' md:flex   '>
                    <div className="items-center justify-center  p-3 ">
                      <div className="md:pt-10 col-span-12">
                        <div className=" overflow-auto lg:overflow-visible ">
                          <table className="md:px-8 px-3 table text-gray-900 border-separate space-y-2 text-sm">
                            <thead className="bg-gray-800 text-gray-100">
                              <tr>
                                <th className="p-3"></th>
                                <th className="p-3 text-left">Information</th>
                                <th className="p-3 text-center">Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="bg-gray-200">
                                <td className="p-3">

                                </td>
                                <td className="p-3 text-left">
                                NUMBER OF QUESTIONS
                                </td>
                                <td className="p-3">
                                  <span className="bg-green-400 text-gray-50 rounded-md px-2 sm:p-1">
                                  {props.totalEjercicios}
                                    </span>
                                </td>
                              </tr>
                              <tr className="bg-gray-200">
                                <td className="p-3">

                                </td>
                                <td className="p-3 text-left">
                                NUMBER OF CORRECT QUESTIONS
                                </td>
                                <td className="p-3">
                                  <span className="bg-yellow-500 text-gray-50 rounded-md px-2 sm:p-1">
                                    {props.aciertos}
                                    </span>
                                </td>
                              </tr>
                              <tr className="bg-gray-200">
                                <td className="p-3">

                                </td>
                                <td className="p-3 text-left">
                                NUMBER OF INCORRECT QUESTIONS
                                </td>
                                <td className="p-3">
                                  <span className="bg-red-500  text-gray-50  rounded-md px-2 sm:p-1">
                                  {props.totalEjercicios - props.aciertos}
                                    </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      
                      <div className='  content-center align-items-center'>
                        <div className=' justify-center'>
                          <div className='md:p-5 pb-3'>
                            <p className="text-black-500 text-sm md:mt-2 mt-5 mb-6  ">
                              Slide the page to view the questions.
                            </p>
                            <div className='md:flex justify-center'> 
                              <div className=' '>
                                <Link to="/evaluacion">
                                  <button /* onClick={subirNivel}  */className=" inline-flex items-center justify-center px-10 py-2  bg-green-300 hover:bg-green-500 text-black rounded-full font-semibold text-xs   uppercase tracking-widest ">
                                    Continue
                                  </button>
                                </Link> 
                              </div>
                              <div className='md:pl-2 pt-2 md:pt-0 md:pb-1'>
                                <button onClick={() => {window.location.replace('')} }  className="  px-11  py-2  bg-yellow-300 hover:bg-yellow-500 rounded-full font-semibold text-xs   uppercase ">
                                  TRY AGAIN
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                      </div>
                      
                      
                    </div>
                    <div className='hidden md:block'>
                      <img className="" src={Morty} alt=" Animación"  />
                    </div>
                    
                  </div>
                </div>
                <div className='md:pt-2 pt-10 relative flex flex-col min-w-0 break-words  w-full mb-6 px-4 md:px-10' id='review'>
                  <div className='relative flex flex-col min-w-0 break-words bg-gray-50 w-full mb-6 shadow-lg rounded '>
                    <EjercicioR ejercicios={props.ejercicios} esPrueba = {true} esLeccion={false}/>
                  </div>
                </div> 
            </div>
          }
            
          </div>
        </div>
    );
}

  
async function noEsCorrecta(props) {
    let contadorRespuestas = props.contadorRespondidas;
    props.juego.pop();
    props.setContadorRespondidas(contadorRespuestas + 1);

    if (props.juego.length === 0) {
        //finPrueba(props.aciertos, props.totalEjercicios)  
    } else {    
    }
  }

  async function enviarSiEsCorrecta(props, contador) {
    //Se es corecta se necesita saber si se ha llegado al final de la lista de ejercicios, de ser así, se debe de terminar el juego y guardar el progreso,
    //caso contrario se debe de pasar al siguiente ejercicio
    
    let contadorRespuestas = props.contadorRespondidas;
    if (props.juego.length === 0) {
        props.setAciertos(contador + 1);
        //finPrueba(props.aciertos, props.totalEjercicios)
        
    } else {
        props.setAciertos(contador + 1);
    }

    props.juego.pop();
    props.setContadorRespondidas(contadorRespuestas + 1);
    
  }



  


  const validarRespuesta = async (props) => {
    let tipo_ejercicio = props.ejercicio.props.ejercicio.type;
    let aciertos = props.aciertos;

    //console.log('EJERCICIO: ',props.ejercicio.props.ejercicio)
  
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
      // eslint-disable-next-line array-callback-return
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
      //console.log(hijos);
      await verificarVerdadero_Falso(props, hijos, aciertos);
    } else if (tipo_ejercicio === "completar_texto") {
      let hijos = Array.from(props.miref.current.children);
      await verificarCompletar_Texto(props, hijos, aciertos);
    } else if (tipo_ejercicio === "emparejar" || tipo_ejercicio === "emparejar_img") {
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
    // eslint-disable-next-line array-callback-return
    hijos.some((element) => {
      if (
        element.getElementsByClassName("opt-1")[0].innerText ===
        "Waiting answer..."
      ) {
        faltaMarcar = true;
        return true;
      }
    });
    if (faltaMarcar) {
      noEsCorrecta(props)
    } else {
      // eslint-disable-next-line array-callback-return
      hijos.some((element) => {
        respuestaUser.push(element.getElementsByClassName("opt-1")[0].innerText);
      });
      if (JSON.stringify(respuestaUser) === JSON.stringify(respuestasBack)) {
        esCorrecta = true;
      } else {
        esCorrecta = false;
      }
      if (esCorrecta) {
        enviarSiEsCorrecta(props, aciertos);
      } else {
        //console.log('INCORRECTA: ', props)
        //console.log('Incorrec_2: ', respuestasBack)
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
      //console.log(respuestaBackEnd);
    }
    if (aRespondido && esCorrecta) {
      enviarSiEsCorrecta(props, aciertos);
    } else if (aRespondido && !esCorrecta) {
      noEsCorrecta(props,respuestaBackEnd);
    }
  
    // //console.log(hijos[0].children[1].value);
  };
  
  const verificarVerdadero_Falso = async (props, hijos, aciertos) => {
    let respuestasBack = [];
  
    // eslint-disable-next-line array-callback-return
    props.ejercicio.props.ejercicio.body.map((item, index) => {
      // eslint-disable-next-line array-callback-return
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
      try {
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
      } catch (error) {
        
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
  
  


  

export default EjercicioFooterPruebaLibros
