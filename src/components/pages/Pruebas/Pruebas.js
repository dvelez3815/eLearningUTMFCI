import React from 'react'
import { Ejercicio } from '../ejercicios/Ejercicio';
import loading from "../../../assets/resource/loading.svg";
import NotFoundPage from '../NotFoundPage/NotFoundPage';
const Pruebas = () => {

    const [data, setData] = React.useState([]);
    const [loadingData, setLoadingData] = React.useState(true);
    const [esPrueba, setPrueba] = React.useState(false);

    React.useEffect(() => {
        const id = window.location.href.split('/')[window.location.href.split('/').length - 1];
        let prueba = window.location.href.split('/')[3];
        getData(id).then(data => {
            if (prueba==='pruebas') {
                let dataPrueba = cutData(data);
                setData(dataPrueba);
                setPrueba(true);
            } else {
                setData(data)
                
            }
            setLoadingData(false);
        });
        
        
    }, [])

    return (
        
        <div>
            {loadingData ? <div className="pt-20"><img src={loading} alt="pt-20"></img></div> :data.length>0?<Ejercicio ejercicios={data} esPrueba = {esPrueba}/>:<NotFoundPage></NotFoundPage>}
        </div>
    )
}


const getData = async(idlibro) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/book/books/${idlibro}`, {
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

    for (let i = 0; i < 30; i++) {
        let random = Math.floor(Math.random() * data.length);
        newData.push(data[random]);
        
    }
    //console.log(newData)
    return newData;
}
export default Pruebas
