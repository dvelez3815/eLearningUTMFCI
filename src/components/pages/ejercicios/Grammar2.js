import React from 'react'
import { Ejercicio } from './Ejercicio'


import NotFoundPage from '../NotFoundPage/NotFoundPage'
import loading from "../../../assets/resource/loading.svg";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export const Grammar2 = () => {

    const [task, setTask] = React.useState(null);
    const [ejercicios, setEjercicios] = React.useState(null);
    const [loadingData, setLoadingData] = React.useState(true);
    const taskid = window.location.href.split('/')[window.location.href.split('/').length - 1];

    React.useEffect(() => {
        if (!cookies.get("_id")) {
            window.location.href = "/signin";
          }else{
            getExercises(taskid).then(data => {
                setEjercicios(data);
                //setLoadingData(false);
            });
    
            getTask().then(data => {
                let task = data.res
                let filter = task.filter(x => x._id === parseInt(taskid)  )
                setTask(filter);
                setLoadingData(false);
            });
          }
     
    }, [])



    return (
        <div>
            
            {loadingData ? <div className="pt-10"><img src={loading}></img></div> :ejercicios.length>0?<Ejercicio ejercicios={ejercicios} taskInfo={task}/>:<NotFoundPage></NotFoundPage>}
            
        </div>
    )
}


const getExercises = async(taskid) => {

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
const getTask = async() => {

    const url = `${process.env.REACT_APP_API_URL}/task`;
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