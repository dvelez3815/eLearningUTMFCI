import React from 'react'
import { Ejercicio } from './Ejercicio'


import NotFoundPage from '../NotFoundPage/NotFoundPage'
import loading from "../../../assets/resource/loading.svg";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
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
    const url = `${process.env.REACT_APP_API_URL}/task/${taskid}`;
    const response = await fetch(url,
        {
            method: 'GET',
            headers: {
                'token': process.env.REACT_APP_SECRET_TOKEN,
              },            
        });
    const data = await response.json();
    return data;

}