import React, { useRef } from "react";
import ProgressBar from "./ProgBarReview";
import {Link} from  "react-router-dom"

//load ejercicio.css
import "./Ejer_review.css";
import EjercicioFooter from "./EjercicioFooter";
import { OpcionCorrecta_1 } from "./OpcionCorrecta_1";
import { OpcionCorrecta_n } from "./OpcionCorrecta_n";
import Arrastrar from "./Arrastrar";
import VerdaderoFalso from "./VerdaderoFalso";
import CompletarTexto from "./CompletarTexto";
import Emparejar from "./Emparejar";
import EjercicioFooterPruebaLibros from "./EjercicioFooterPruebaLibros";
import EjercicioReview from "./EjerciciosReview";
import Morty from "../../../assets/resource/Morty.gif";

export const Ejercicio = (props) => {
  const [juego, setJuego] = React.useState([]);
  const [cargado, setCargado] = React.useState(true);
  const [finJuego, setFinJuego] = React.useState(false);
  const [contadorRespondidas, setContadorRespondidas] = React.useState(0);
  const [preguntasValidas, setPreguntasValidas] = React.useState(0);
  const [aciertos, setAciertos] = React.useState(0);
  const [id, setId] = React.useState(0);

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
    <div className=" flex flex-col py-10 ">
      <div className="py-10">
        <h1 className=" font-bold  text-2xl  text-yellow-500 ">REVIEW </h1>
      </div>
      {cargado || (
          <div className=" "> 
            <div className=" "  >
              <EjercicioReview totalEjercicios = {preguntasValidas} ejercicios = {juego} ejercicio={juego[id]} juego={juego} setJuego = {setJuego} cargado={cargado} setCargado={setCargado} setFinJuego={setFinJuego} miref={panelJuego} contadorRespondidas={contadorRespondidas} setContadorRespondidas={setContadorRespondidas} aciertos={aciertos} setAciertos={setAciertos} id = {id} setId={setId}/>
            </div>
            
          </div>
        
      )}
      {finJuego ? (
        <div className='flex flex-col justify-center items-center'>
          <h2 className="container font-bold  text-2xl  text-yellow-400  ">Congrulation | Activity Completed...</h2>
          <img className="h-1/2" src={Morty} alt=" Animación" />
        </div>

      ) : (
        <div className="">
          <div className=" font-bold  text-2xl  text-yellow-400 ">
                QUESTION {contadorRespondidas + 1}
            </div>
            <div className=" "  > 
            <div className="">
                <div className="flex flex-col pb-10" > 
                    {juego[id]}
                </div>
            </div> 

            </div>
        </div>  
       // 
        
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
  console.log('can ejerci: ',contador)
  setPreguntasValidas(contador);
  setCargado(false);
};
