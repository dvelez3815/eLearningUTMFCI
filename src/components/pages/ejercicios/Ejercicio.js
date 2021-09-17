import React, { createRef, useRef } from 'react'
import { Grammar2 } from './Grammar2'
import ProgressBar from './ProgressBar'

//load ejercicio.css
import './Ejercicio.css'
import EjercicioFooter from './EjercicioFooter'
import { Emparejar } from './Emparejar'


export const Ejercicio = (props) => {
    let ejercicios = props.ejercicios;
    const [juego, setJuego] = React.useState([]);
    const [cargado, setCargado] = React.useState(false);
    const [finJuego, setFinJuego] = React.useState(false);
    const [contadorRespondidas, setContadorRespondidas] = React.useState(0);

    const panelJuego = useRef(null);
    
    const opcionesRef = useRef(
        [...Array(ejercicios.length)].map(() => createRef())
      );
    

    React.useEffect(() => {
        if(juego.length !== 0){
            juego.map((ejercicio, index) => {
                if(juego.type === "opcion_correcta"){  
                    setJuego(juego => [...juego, <Emparejar key={index} ejercicio={ejercicio} miref={panelJuego}/>])
                }           
            })
            setCargado(true)

        }else{
            if(finJuego){
                setJuego([<h2 ref={panelJuego} className="container m-auto p-auto w-6/12">Fin</h2>])
            }else{
                ejercicios.map((ejercicio, index) => {
                    if(ejercicio.type === "opcion_correcta"){  
                        setJuego(juego => [...juego, <Emparejar key={index} ejercicio={ejercicio} miref={panelJuego}/>])
                    }else{
                        console.log(ejercicio);
                    }
                })
                setCargado(true)
            }

        }
    }, [cargado])


    return (
        <div className={"ejercicio"}>
            <ProgressBar totalEjercicios = {juego.length} resueltos ={contadorRespondidas} />
            {juego && juego[juego.length-1]}
            <EjercicioFooter ejercicio={juego[juego.length-1]} juego={juego} cargado={cargado} setCargado={setCargado} setFinJuego={setFinJuego} miref={panelJuego} contadorRespondidas={contadorRespondidas} setContadorRespondidas={setContadorRespondidas}/>
        </div>
    )
}


const generarEjercicios = (ejercicios, setJuego) => {
    let juego = []
    
    ejercicios.map((ejercicio, index) => {
        if(ejercicio.type === "opcion_correcta"){  
            juego.push(<Emparejar key={index} ejercicio={ejercicio}/>)
            console.log(ejercicio);
        }else{
            console.log(ejercicio);
        }     
    })
    setJuego(juego)
    
}
