import React from 'react'
import { api_url } from '../../../api.config';
import { Ejercicio } from '../ejercicios/Ejercicio';
import loading from "../../../assets/resource/loading.svg";
import NotFoundPage from '../NotFoundPage/NotFoundPage';

const Review = () => {

    const [data, setData] = React.useState([]);
    const [loadingData, setLoadingData] = React.useState(true);

    React.useEffect(() => {
        const tipo = window.location.href.split('/')[window.location.href.split('/').length - 1];
        const unidad = window.location.href.split('/')[window.location.href.split('/').length - 2];
        const modulo = window.location.href.split('/')[window.location.href.split('/').length - 3];
        const book = window.location.href.split('/')[window.location.href.split('/').length - 4];
        
        getData(book,modulo,unidad,tipo).then(data => {        
            setData(data)
            setLoadingData(false);
        });
        
        
    }, [])


    return (
        <div>
            {loadingData ? <div className="cargando"><img src={loading}></img></div> :data.length>0?<Ejercicio ejercicios={data} esPrueba = {true}/>:<NotFoundPage></NotFoundPage>}
            
        </div>
    )
}


const getData = async(book,modulo,unit,tipo) => {
    const response = await fetch(`${api_url}/review/${book}/${modulo}/${unit}/${tipo}`);


    const data = await response.json();
    return data;
}

export default Review
