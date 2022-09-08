import React, { useRef } from "react";


//load ejercicio.css
import "./Ejer_review.css";
import { OpcionCorrecta_1 } from "./OpcionCorrecta_1";
import { OpcionCorrecta_n } from "./OpcionCorrecta_n";
import Arrastrar from "./Arrastrar";
import VerdaderoFalso from "./VerdaderoFalso";
import CompletarTexto from "./CompletarTexto";
import Emparejar from "./Emparejar";
import EjercicioReview from "./EjerciciosReview";

export const EjercicioR = (props) => {
  const [juego, setJuego] = React.useState([]);
  const [cargado, setCargado] = React.useState(true);
  const [/* finJuego, */ setFinJuego] = React.useState(false);
  const [contadorRespondidas, setContadorRespondidas] = React.useState(0);
  const [preguntasValidas, setPreguntasValidas] = React.useState(0);
  const [aciertos, setAciertos] = React.useState(0);
  const [idp, setId] = React.useState(0);

  const panelJuego = useRef(null);

  React.useEffect(() => {
    // const cargarVista = async() => {
    //     await cargarEjercicios(juego, setJuego, panelJuego, setCargado, finJuego, ejercicios);
    // }
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
  }, []); //cuando haya un cambio de pregunta se actualiza el estado del componente.

  return (
    <div className=" w-full  flex flex-col  ">
      {props.esLeccion?
        <div></div>
      :
        <div className="pb-12">
          <div className="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ">
            <h1 className=" font-bold  text-2xl  text-gray-500 ">REVIEW </h1>
          </div>
        </div>
        }
      
      {cargado || (
          <div className="w-full "> 
            <div className=" "  >
              <div className=" font-bold  text-2xl  text-yellow-600 ">
                      QUESTION {contadorRespondidas + 1}
              </div>
              <div className="w-full">
                <EjercicioReview totalEjercicios = {preguntasValidas} ejercicios = {juego} ejercicio={juego[idp]} juego={juego} setJuego = {setJuego} cargado={cargado} setCargado={setCargado} setFinJuego={setFinJuego} miref={panelJuego} contadorRespondidas={contadorRespondidas} setContadorRespondidas={setContadorRespondidas} aciertos={aciertos} setAciertos={setAciertos} id = {idp} setId={setId}/>
              </div>
            </div>
            <div className="w-full p-5">
              <div className="w-full bg-white py-10">
                <div className=" font-bold  text-2xl  text-yellow-400 ">
                      STATEMENT
                </div>
                <div className=" w-full "  > 
                  <div className="w-full ">
                      <div className="w-full flex flex-col pb-10" > 
                          {juego[idp]}
                      </div>
                  </div> 
                </div>
              </div>
          </div> 
            
            
          </div>
        
      )}

        </div>
    )
}

const cargarEjercicios2 = (ejercicios, setJuego, panelJuego,setCargado,preguntasValidas,setPreguntasValidas, setId)=>{

    //los ejercicios ya están cargando desde la vista anterior, solo se necesita una estructura que almacene los ejercicios de forma con componente
    // para esto se iterra atravez de ejercicios y en una variable llamada Juego se guardan los ejercicios en forma de componentes

    //finalmente iteramos los ejercicios, preguntamos el tipo, cargamos la variable juego con el tipo de juego correspondiente y una vez se cargan todos los juegos
    //se actualiza el estado de cargando.

    //De esta manera la renderización del mensaje con estado cargando se va a mostrar hasta que se carguen todos los ejercicios.
    let contador = 0;

    ejercicios.map((ejercicio, index) => {
      if(ejercicio.type === "completar_texto"){
        setJuego(juego => [...juego, <CompletarTexto key={index} ejercicio={ejercicio} miref={panelJuego}/>])
        contador++;
      }else  if(ejercicio.type === "ordenar"){
        setJuego(juego => [...juego, <Arrastrar key={index} ejercicio={ejercicio} miref={panelJuego}/>])
        contador++; 
      }else  if((ejercicio.type === "true_false" && ejercicio.img) || ejercicio.type === "true_false" ){
        setJuego(juego => [...juego, <VerdaderoFalso key={index} ejercicio={ejercicio} miref={panelJuego}/>])
        contador++;
      }else if(ejercicio.type === "opcion_correcta_1"){
          setJuego(juego => [...juego, <OpcionCorrecta_1 key={index} ejercicio={ejercicio} miref={panelJuego}/>])
          contador++;
      }else if(ejercicio.type === "opcion_correcta_n"){
          setJuego(juego => [...juego, <OpcionCorrecta_n key={index} ejercicio={ejercicio} miref={panelJuego}/>])
          contador++; 
      }else if(ejercicio.type === "emparejar"  ||  ejercicio.type === "emparejar_img"  ){
          setJuego(juego => [...juego, <Emparejar key={index} ejercicio={ejercicio} miref={panelJuego}/>])
          contador++;
      } 

    } 

  );
  setId(contador-1)
  //console.log('can ejerci: ',contador)
  setPreguntasValidas(contador);
  setCargado(false);
};
