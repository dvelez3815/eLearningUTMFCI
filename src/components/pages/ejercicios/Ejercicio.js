import React, { useRef } from "react";
import ProgressBar from "./ProgressBar";


//load ejercicio.css
import EjercicioFooter from "./EjercicioFooter";
import { OpcionCorrecta_1 } from "./OpcionCorrecta_1";
import { OpcionCorrecta_n } from "./OpcionCorrecta_n";
import Arrastrar from "./Arrastrar";
import VerdaderoFalso from "./VerdaderoFalso";
import CompletarTexto from "./CompletarTexto";
import Emparejar from "./Emparejar";
import EjercicioFooterPruebaLibros from "./EjercicioFooterPruebaLibros";
import { EjercicioR } from '../ejercicios/Ejer_Review';

import image1 from "../../../assets/resource/lesson4.webp";
import image2 from "../../../assets/resource/lesson3.webp";


export const Ejercicio = (props) => {
  const [juego, setJuego] = React.useState([]);
  const [cargado, setCargado] = React.useState(true);
  const [finJuego, setFinJuego] = React.useState(false);
  const [contadorRespondidas, setContadorRespondidas] = React.useState(0);
  const [preguntasValidas, setPreguntasValidas] = React.useState(0);
  const [aciertos, setAciertos] = React.useState(0);
  const [openTab, setOpenTab] = React.useState(1);
  // eslint-disable-next-line no-unused-vars
  const [idp, setId] = React.useState(0);
  let topic = ''
  let Objetive = ''
  let explanation = ''
  let type = ' '
  let book = ''
  let modulo
  let unidad = ''
  try {
    type = String(props.taskInfo[0].type)
    book = String(props.taskInfo[0].unit.book)
    modulo = parseInt(props.taskInfo[0].unit.modulo) % 2 !== 0 ? parseInt(1) : parseInt(2)
    unidad = String(props.taskInfo[0].unit.unit)
    topic = String(props.taskInfo[0].topic.top)
    Objetive = String(props.taskInfo[0].objetive.text)
    explanation = String(props.taskInfo[0].explanation)
  } catch (error) {

  }

  const panelJuego = useRef(null);

  React.useEffect(() => {
    if (juego.length === 0) {
      cargarEjercicios2(
        props.ejercicios,
        setJuego,
        panelJuego,
        setCargado,
        preguntasValidas,
        setPreguntasValidas,
        setId
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //cuando haya un cambio de pregunta se actualiza el estado del componente.

  return (
    <div className={"ejercicio md:px-20 "}>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          {cargado || (
            <ProgressBar
              totalEjercicios={preguntasValidas}
              type={type}
              book={book}
              modulo={modulo}
              unidad={unidad}
              resueltos={contadorRespondidas}
              contadorRespondidas={contadorRespondidas}
            />

          )}
          {finJuego ? (
            <div className='flex flex-col  '>
              <div className="max-w-screen-xl   mx-auto" id="about">
                {type !== ' ' ?
                  <div className="grid grid-flow-row sm:grid-flow-col grid-rows-1  md:grid-rows-1 sm:grid-cols-2 py-6 sm:py-8 ">

                    <div className=" p-2 flex flex-col  pt-4 md:pt-1 justify-center items-center row-start-2 sm:row-start-1 ">
                      <h1 className="text-3xl lg:text-4xl xl:text-5xl font-black text-yellow-500 leading-normal">
                        CONGRATULATIONS <p className="text-lg text-center"> LESSON COMPLETED: <strong className='text-gray-400'>{type.toUpperCase()}</strong></p>
                      </h1>
                      <p className="text-black-500 text-sm mt-4 mb-6  ">
                        For more information about the lesson slide the page.
                      </p>
                      <a href="/dashboard">
                        <button className="py-3 lg:py-4 px-12 lg:px-16 text-white font-semibold rounded-lg bg-green-500 hover:shadow-lg hover:bg-green-600 transition-all outline-none">CONTINUE</button>

                      </a>
                    </div>
                    <div className="flex w-full ">
                      <div className=" w-full">
                        <img className="" src={image1} alt=" Animación" width={612}
                          height={383} />

                      </div>
                    </div>
                  </div>
                  :
                  <div className="grid grid-flow-row sm:grid-flow-col grid-rows-1  md:grid-rows-1 sm:grid-cols-2 py-10 pb-20">

                    <div className=" p-2 flex flex-col  pt-4 md:pt-1 justify-center items-center row-start-2 sm:row-start-1 ">
                      <h1 className="text-3xl lg:text-4xl xl:text-5xl font-black text-yellow-500 leading-normal">
                        CONGRATULATIONS <p className="text-lg text-center"> REVIEW COMPLETED</p>
                      </h1>
                      <p className="text-black-500 text-sm mt-4 mb-6  ">
                        Slide the page to view the questions.
                      </p>
                      <a href="/dashboard">
                        <button className="py-3 lg:py-4 px-12 lg:px-16 text-white font-semibold rounded-lg bg-green-500 hover:shadow-lg hover:bg-green-600 transition-all outline-none">CONTINUE</button>

                      </a>
                    </div>
                    <div className="flex w-full ">
                      <div className=" w-full">
                        <img className="" src={image2} alt=" Animación" width={612}
                          height={383} />

                      </div>
                    </div>
                  </div>
                }
              </div>
              {type !== ' ' ?
                <div className="flex flex-wrap">
                  <div className="w-full mx-auto max-w-screen-xl md:px-10 px-3">
                    <ul
                      className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                      role="tablist"
                    >
                      <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a
                          className={
                            "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                            (openTab === 1
                              ? "text-yellow-500 bg-gray-100 bg-gradient-to-t from-gray-100"
                              : "text-gray-600 bg-white")
                          }
                          onClick={e => {
                            e.preventDefault();
                            setOpenTab(1);
                          }}
                          data-toggle="tab"
                          href="#link1"
                          role="tablist"
                        >
                          <i className="fas fa-space-shuttle text-base mr-1"></i> Information
                        </a>
                      </li>
                      <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a
                          className={
                            "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                            (openTab === 2
                              ? "text-yellow-500 bg-gray-100 bg-gradient-to-t from-gray-100"
                              : "text-gray-600 bg-white")
                          }
                          onClick={e => {
                            e.preventDefault();
                            setOpenTab(2);
                          }}
                          data-toggle="tab"
                          href="#link2"
                          role="tablist"
                        >
                          <i className="fas fa-cog text-base mr-1"></i>  Review
                        </a>
                      </li>

                    </ul>
                    <div className="relative flex flex-col  break-words bg-white w-full mb-6 shadow-lg rounded">
                      <div className="px-4 py-5 flex-auto">
                        <div className="tab-content tab-space">
                          <div className={openTab === 1 ? "block md:px-4" : "hidden"} id="link1">
                            <div className="items-center w-full justify-center  md:p-3 ">
                              <div className=" text-green-700 pt-5 font-bold text-center  rounded-md ">
                                INFORMATION OF LESSON
                              </div>
                              <div className="justify-center  py-5 w-full ">

                                <div className="grid grid-cols-3 gap-4  pt-2">
                                  <div className=" text-sm  md:text-lg pt-1 md:pt-2 md:pl-10 pt-3 pl-4 font-bold text-left  bg-gray-50   rounded-lg ">
                                    TOPIC
                                  </div>
                                  <div className="col-span-2">
                                    <div className=" bg-white md:px-10 md:h-10 h-full px-2  text-center border border-gray-200 w-full text-sm  py-2 rounded-lg ">
                                      {(topic.toLowerCase() === 'null') ?
                                        'There is not topic for this lesson'
                                        :
                                        topic.toLowerCase()
                                      }
                                    </div>
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4  pt-2">
                                  <div className="text-sm  md:text-lg md:pl-8 pt-3 pl-2 font-bold text-left bg-gray-50   rounded-lg ">
                                    OBJETIVE

                                  </div>
                                  <div className="col-span-2">
                                    <div className="px-2 bg-white .
                              text-center overflow-y-auto border border-gray-200 md:h-36 h-24 w-full text-sm  py-2 rounded-lg ">
                                      {(Objetive.toLowerCase() === 'null') ?
                                        'There is not objetive for this lesson'
                                        :
                                        Objetive.toLowerCase()
                                      }
                                    </div>
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4  pt-2">
                                  <div className="text-sm  md:text-lg  py-1  md:pl-8 pt-3 pl-2 font-bold text-left bg-gray-50   rounded-lg ">
                                    EXPLANATION
                                  </div>
                                  <div className="col-span-2">
                                    <div className=" px-2 bg-white text-center overflow-y-auto border border-gray-200 md:h-36  h-24 w-full text-sm  py-2 rounded-lg ">
                                      {(explanation.toLowerCase() === 'null') ?
                                        'There is not explanation for this lesson'
                                        :
                                        explanation.toLowerCase()
                                      }
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>
                          <div className={openTab === 2 ? "block bg-gray-50" : "hidden"} id="link2">
                            <div className="">

                              <div className=" px-5 text-green-700  font-bold text-center  rounded-md ">
                                {('review of lesson questions').toUpperCase()}
                              </div>

                              <div className=' w-full    ' id='review'>
                                <EjercicioR ejercicios={props.ejercicios} esPrueba={true} esLeccion={true} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                :
                <div className='relative flex flex-col min-w-0 break-words  w-full  px-4 md:px-10' id='review'>
                  <div className='relative flex flex-col min-w-0 break-words bg-gray-50 w-full mb-6 shadow-lg rounded '>
                    <EjercicioR ejercicios={props.ejercicios} esPrueba={true} esLeccion={false} />
                  </div>
                </div>
              }
            </div>
          ) : (
            juego[juego.length - 1]
          )}
        </div>
        {finJuego ? (
          <div></div>
        ) : props.esPrueba ?
          <div className="">
            <EjercicioFooterPruebaLibros totalEjercicios={preguntasValidas} ejercicios={props.ejercicios} ejercicio={juego[juego.length - 1]} juego={juego} setJuego={setJuego} cargado={cargado} setCargado={setCargado} setFinJuego={setFinJuego} miref={panelJuego} contadorRespondidas={contadorRespondidas} setContadorRespondidas={setContadorRespondidas} aciertos={aciertos} setAciertos={setAciertos} />
          </div>
          : <EjercicioFooter control={type} ejercicio={juego[juego.length - 1]} juego={juego} setJuego={setJuego} cargado={cargado} setCargado={setCargado} setFinJuego={setFinJuego} miref={panelJuego} contadorRespondidas={contadorRespondidas} setContadorRespondidas={setContadorRespondidas} />}
      </div>
    </div>
  )
}

const cargarEjercicios2 = (ejercicios, setJuego, panelJuego, setCargado, preguntasValidas, setPreguntasValidas, setId) => {

  //los ejercicios ya están cargando desde la vista anterior, solo se necesita una estructura que almacene los ejercicios de forma con componente
  // para esto se iterra atravez de ejercicios y en una variable llamada Juego se guardan los ejercicios en forma de componentes

  //finalmente iteramos los ejercicios, preguntamos el tipo, cargamos la variable juego con el tipo de juego correspondiente y una vez se cargan todos los juegos
  //se actualiza el estado de cargando.

  //De esta manera la renderización del mensaje con estado cargando se va a mostrar hasta que se carguen todos los ejercicios.
  let contador = 0;
  // eslint-disable-next-line array-callback-return
  ejercicios.map((ejercicio, index) => {

    if (ejercicio.type === "completar_texto") {
      setJuego(juego => [...juego, <CompletarTexto key={index} ejercicio={ejercicio} miref={panelJuego} />])
      contador++;
    } else if (ejercicio.type === "ordenar") {
      setJuego(juego => [...juego, <Arrastrar key={index} ejercicio={ejercicio} miref={panelJuego} />])
      contador++;
    } else if ((ejercicio.type === "true_false" && ejercicio.img) || ejercicio.type === "true_false") {
      setJuego(juego => [...juego, <VerdaderoFalso key={index} ejercicio={ejercicio} miref={panelJuego} />])
      contador++;
    } else if (ejercicio.type === "opcion_correcta_1") {
      // eslint-disable-next-line react/jsx-pascal-case
      setJuego(juego => [...juego, <OpcionCorrecta_1 key={index} ejercicio={ejercicio} miref={panelJuego} />])
      contador++;
    } /* else if (ejercicio.type === "opcion_correcta_n") {
      setJuego(juego => [...juego, <OpcionCorrecta_n key={index} ejercicio={ejercicio} miref={panelJuego} />])
      contador++;
    }  */else if (ejercicio.type === "emparejar" || ejercicio.type === "emparejar_img") {
      setJuego(juego => [...juego, <Emparejar key={index} ejercicio={ejercicio} miref={panelJuego} />])
      contador++;
    }

  }

  );
  setId(contador - 1)
  setPreguntasValidas(contador);
  setCargado(false);
};
