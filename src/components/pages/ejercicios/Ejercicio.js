import React from 'react'
import { Grammar2 } from './Grammar2'
import ProgressBar from './ProgressBar'

//load ejercicio.css
import './Ejercicio.css'
import EjercicioFooter from './EjercicioFooter'
import { Emparejar } from './Emparejar'


export const Ejercicio = (props) => {
    
    const [juego, setJuego] = React.useState([]);
    
    React.useEffect(() => {
        setJuego(generarEjercicios(props.ejercicios))
    }, [])

    return (
        <div className={"ejercicio"}>
            <ProgressBar/>
            {juego && juego[juego.length-1]}
            <EjercicioFooter ejercicio={juego[juego.length-1]}/>
        </div>
    )
}


const generarEjercicios = (ejercicios) => {
    let juego = []
    ejercicios.map((ejercicio, index) => {
        if(ejercicio.type === "opcion_correcta"){  
            juego.push(<Emparejar key={index} ejercicio={ejercicio}/>)
            console.log(ejercicio);
        }
    })
    return juego;


}