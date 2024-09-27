import React from 'react'
import { Ejercicio } from '../ejercicios/Ejercicio';
import loading from "../../../assets/resource/loading.svg";
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { getPruebaGeneral } from '../../../api/Evaluation';
const ab = []


const PruebaGeneral = () => {

    const [data, setData] = React.useState(ab);
    const [loadingData, setLoadingData] = React.useState(true);


    React.useEffect(() => {
        getPruebaGeneral().then(data => {
            let dataPrueba = cutData(data);
            setData(dataPrueba);
            setLoadingData(false);
        });
    }, [])

    return (
        <div>
            {loadingData ? <div className="pt-20"><img src={loading} alt="cargando"></img> </div> : data.length > 0 ? <Ejercicio ejercicios={data} esPrueba={true} /> : <NotFoundPage></NotFoundPage>}
        </div>
    )
}

const cutData = (data) => {
    let newData = [];

    for (let i = 0; i < 50; i++) {
        let random = Math.floor(Math.random() * data.length);
        newData.push(data[random]);

    }
    return newData;
}
export default PruebaGeneral
