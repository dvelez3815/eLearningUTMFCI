import React from 'react'
import { Ejercicio } from '../ejercicios/Ejercicio';
import loading from "../../../assets/resource/loading.svg";
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Cookies from 'universal-cookie';
import { useFetch } from '../../hooks/useFetch';
const cookies = new Cookies();
const Pruebas = () => {

    const [data, setData] = React.useState([]);
    const [loadingData, setLoadingData] = React.useState(true);
    const [esPrueba, setPrueba] = React.useState(false);

    //Se obtiene el id del libro a consultar
    const id = window.location.href.split('/')[window.location.href.split('/').length - 1];
    //se define la url de la api
    const url = `${process.env.REACT_APP_API_URL}/book/${id}`;
    //se obtiene el tipo de evaluación, puede ser de tipo prueba (la del libro) o solo la de una lección (grammar, etc..)
    const tipoEvaluacion = window.location.href.split('/')[3];
    //se llama al custom hook useFetch, que obtiene los datos del libro
    let miData = useFetch(url);

    React.useEffect(() => {
        if(!miData.loading){
            if(!miData.error){
                if(tipoEvaluacion === 'pruebas'){
                    let dataPrueba = cutData(miData.data);
                    setData(dataPrueba);
                    setPrueba(true);                    
                }else{
                    setData(miData.data);
                    setPrueba(false);
                }
                setLoadingData(false);
            }
        }
        
    }, [miData.loading])


    return (
        <div>
            {loadingData ? <div className="cargando"><img src={loading} alt="cargando"></img></div> :miData.data.length>0?<Ejercicio ejercicios={data} esPrueba = {esPrueba}/>:<NotFoundPage></NotFoundPage>}
            
            
        </div>
    )
}


const getData = async(idlibro) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/book/${idlibro}`, {
        method: 'GET',
        headers: {
            'token': cookies.get("token"),
          },
    });
    const data = await response.json();
    return data;
}


const cutData = (data) => {
    let newData = [];

    for (let i = 0; i < 30; i++) {
        let random = Math.floor(Math.random() * data.length);
        newData.push(data[random]);
    }
    return newData;
}
export default Pruebas
