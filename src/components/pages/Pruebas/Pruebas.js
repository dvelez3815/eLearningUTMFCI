import React from 'react'
import { api_url } from '../../../api.config';
import { Ejercicio } from '../ejercicios/Ejercicio';
import loading from "../../../assets/resource/loading.svg";
import NotFoundPage from '../NotFoundPage/NotFoundPage';

const Pruebas = () => {

    const [data, setData] = React.useState([]);
    const [idlibro, setIdlibro] = React.useState(null);
    const [loadingData, setLoadingData] = React.useState(true);

    React.useEffect(() => {
        const id = window.location.href.split('/')[window.location.href.split('/').length - 1];
        setIdlibro(id);
        getData(id).then(data => {
            setData(data);
            setLoadingData(false);
        });
        console.log(id);
    }, [])


    return (
        <div>
            {loadingData ? <div className="cargando"><img src={loading}></img></div> :data.length>0?<Ejercicio ejercicios={data} />:<NotFoundPage></NotFoundPage>}
            
            
        </div>
    )
}


const getData = async(idlibro) => {
    const response = await fetch(`${api_url}/book/${idlibro}`);
    const data = await response.json();
    return data;
}

export default Pruebas
