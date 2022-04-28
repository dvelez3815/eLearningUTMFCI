import React from 'react'
import { Ejercicio } from '../ejercicios/Ejercicio';
import loading from "../../../assets/resource/loading.svg";
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const ab = []


const PruebaGeneral = () => {
    
    const [data, setData] = React.useState(ab);
    const [loadingData, setLoadingData] = React.useState(true);
    

    React.useEffect(() => {
        //console.log('entra')
        //addData(setData)
        getData().then(data => {
                let dataPrueba = cutData(data);
                setData(dataPrueba);
                setLoadingData(false);

        });

    }, [])

    return (
        <div>
            {loadingData ? <div className="pt-20"><img src={loading} alt="cargando"></img> </div> :data.length>0?<Ejercicio ejercicios={data} esPrueba = {true}/>:<NotFoundPage></NotFoundPage>}
        </div>
    )
}

const getData = async() => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/evaluation/`, {
        method: 'GET',
        headers: {
            'token':process.env.REACT_APP_SECRET_TOKEN,
          },
    });
    const data = await response.json();
    
    return data;
}


const cutData = (data) => {
    let newData = [];

    for (let i = 0; i < 50; i++) {
        let random = Math.floor(Math.random() * data.length);
        newData.push(data[random]);
        
    }
    //console.log(newData)
    return newData;
}


export default PruebaGeneral
