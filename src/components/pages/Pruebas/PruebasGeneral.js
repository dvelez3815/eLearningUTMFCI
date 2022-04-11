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
        
        if (data.lenght === 0) {
            addData();
            //console.log('valor cero')
        }
                
        if (data.length !== 0) {
            setLoadingData(false);
        }

    }, [])

    //console.log('data_lon: ', data.length)
    return (
        <div>
            {loadingData ? <div className="cargando"><img src={loading} alt="cargando"></img> </div> :data.length>0?<Ejercicio ejercicios={data} esPrueba = {true}/>:<NotFoundPage></NotFoundPage>}
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

const addData = () => {
    getData(1).then((a) => {
      let DataMini = cutData(a) 
      for (let i = 0; i < 10; i++) {
        ab.push(DataMini[i])

    }  
    });
    //console.log('valor de a :',ab)
    getData(2).then((a) => {
      let DataMini = cutData(a) 
      for (let i = 0; i < 10; i++) {
        ab.push(DataMini[i])
      }

    });
    getData(3).then((a) => {
        let DataMini = cutData(a) 
        for (let i = 0; i < 10; i++) {
            ab.push(DataMini[i])
        }
    });
     getData(4).then((a) => {
        let DataMini = cutData(a) 
        for (let i = 0; i < 10; i++) {
            ab.push(DataMini[i])
        }
    });
    getData(5).then((a) => {
        let DataMini = cutData(a) 
        for (let i = 0; i < 10; i++) {
            ab.push(DataMini[i])
        }
    });

    //setData(ab)
  };

addData();

const cutData = (data) => {
    let newData = [];

    for (let i = 0; i < 10; i++) {
        let random = Math.floor(Math.random() * data.length);
        newData.push(data[random]);
        
    }
    //console.log(newData)
    return newData;
}
export default PruebaGeneral
