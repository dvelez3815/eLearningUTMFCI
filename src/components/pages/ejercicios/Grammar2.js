import React, { useEffect } from 'react'
import { Ejercicio } from './Ejercicio'
import ProgressBar from './ProgressBar'
import {api_url} from '../../../api.config'

export const Grammar2 = () => {

    const [ejercicios, setEjercicios] = React.useState(null);
    const [progreso, setProgreso] = React.useState(0);

    const getExercises = async() => {

        let taskid = window.location.href.split('/')[window.location.href.split('/').length - 1];
<<<<<<< HEAD
        const url = `${api_url}/task/${taskid}`;
=======
        
        const url = `https://utminglesapp.herokuapp.com/task/${taskid}`;
>>>>>>> 860f81eefd9da5f36b540ca51ea4eb5156e10fe6
        const response = await fetch(url,
            {
                method: 'POST',
            });
        const data = await response.json();
        return data;

    }

    useEffect(() => {
        const llenarEjercicios = async() =>{
            const data = await getExercises();
            setEjercicios(data);
        }
        llenarEjercicios();


    }, []);


    return (
        <div>
            {ejercicios && <Ejercicio ejercicios={ejercicios} />}
            
        </div>
    )
}
