import React from 'react'
import NavComponent from '../../NavComponent'

import logo from "../../../assets/resource/Logo_Provicional.png";

const Evaluacion = () => {
    return (
        <div>
            <NavComponent logo={logo} activado={2}/>
            <ul>
                <li>Evaluar mis conocimientos <a className="bg-yellow-400" href="/pruebas/libro/1">libro 1</a></li>
                <li>Evaluar mis conocimientos <a className="bg-yellow-400" href="/pruebas/libro/2">libro 2</a></li>
                <li>Evaluar mis conocimientos <a className="bg-yellow-400" href="/pruebas/libro/3">libro 3</a></li>
                <li>Evaluar mis conocimientos <a className="bg-yellow-400" href="/pruebas/libro/4">libro 4</a></li>
                <li>Evaluar mis conocimientos <a className="bg-yellow-400" href="/pruebas/libro/5">libro 5</a></li>
            </ul>
        </div>
    )
}

export default Evaluacion
