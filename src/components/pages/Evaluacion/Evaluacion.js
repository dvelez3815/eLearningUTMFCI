import React from 'react'
import NavComponent from '../../NavComponent'

import logo from "../../../assets/resource/Logo_Provicional.png";

const Evaluacion = () => {
    return (
        <div>
            <NavComponent logo={logo} activado={2}/>
            <ul>
                <li>Evaluar mis conocimientos <a>libro 1</a></li>
                <li>Evaluar mis conocimientos <a>libro 2</a></li>
                <li>Evaluar mis conocimientos <a>libro 3</a></li>
                <li>Evaluar mis conocimientos <a>libro 4</a></li>
                <li>Evaluar mis conocimientos <a>libro 5</a></li>
                <li>Evaluacion general de todos los libros <a>Comenzar</a></li>
                

            </ul>
        </div>
    )
}

export default Evaluacion
