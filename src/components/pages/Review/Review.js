import React from 'react'
import { Ejercicio } from '../ejercicios/Ejercicio';
import loading from "../../../assets/resource/loading.svg";
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const Review = () => {

    const [data, setData] = React.useState([]);
    const [loadingData, setLoadingData] = React.useState(true);

    React.useEffect(() => {
        const tipo = window.location.href.split('/')[window.location.href.split('/').length - 1];
        const unidad = window.location.href.split('/')[window.location.href.split('/').length - 2];
        const modulo = window.location.href.split('/')[window.location.href.split('/').length - 3];
        const book = window.location.href.split('/')[window.location.href.split('/').length - 4];
        
        //Se manada en ese orden porque el valor de modulo llega como libro al server
        getData(unidad,modulo,book,tipo).then(data => {        
            setData(data)
            setLoadingData(false);
        });
        
        
    }, [])


    return (
        <div>
            {loadingData ? <div className="cargando"><img src={loading} alt="cargando"></img></div> :data.length>0?<Ejercicio ejercicios={data} esPrueba = {false}/>:<NotFoundPage></NotFoundPage>}
            
        </div>
    )
}


const getData = async(book,modulo,unit,tipo) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/question/review/${book}/${modulo}/${unit}/${tipo}`,
        {
            method: 'GET',
            headers: {
                'token':process.env.REACT_APP_SECRET_TOKEN,
              },
            });

    const data = await response.json();
    return data;
}

export default Review
