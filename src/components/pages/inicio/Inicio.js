import React from 'react'
import { NavComponent } from '../../NavComponent'
import logo from '../../../assets/icons/medalla.svg';
import EModule from '../../EModules/EModule';

export const Inicio = () => {
    return (
        <div>
            <NavComponent logo={logo}/>
            <EModule percent={100}/>
            <EModule percent={50}/>
        </div>
    )
}


