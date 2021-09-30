import React from 'react'
import { Ejercicio } from './Ejercicio'

import {api_url} from '../../../api.config'
import NotFoundPage from '../NotFoundPage/NotFoundPage'
import loading from "../../../assets/resource/loading.svg";

export const Grammar2 = () => {

    const [ejercicios, setEjercicios] = React.useState(null);
    const [loadingData, setLoadingData] = React.useState(true);


    React.useEffect(() => {

        getExercises().then(data => {
            setEjercicios(data);
            setLoadingData(false);
        });
        
    }, [])



    return (
        <div>
            
            {loadingData ? <div className="cargando"><img src={loading}></img></div> :ejercicios.length>0?<Ejercicio ejercicios={ejercicios} />:<NotFoundPage></NotFoundPage>}
            
        </div>
    )
}


const getExercises = async() => {

    let taskid = window.location.href.split('/')[window.location.href.split('/').length - 1];
    const url = `${api_url}/task/${taskid}`;
    const response = await fetch(url,
        {
            method: 'POST',
        });
    const data = await response.json();
    return data;

}