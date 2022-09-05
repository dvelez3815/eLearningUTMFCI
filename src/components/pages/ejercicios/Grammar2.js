import React from 'react'
import { Ejercicio } from './Ejercicio'


import NotFoundPage from '../NotFoundPage/NotFoundPage'
import loading from "../../../assets/resource/loading.svg";
import {
    AlertaLeccion
  } from "../../Alert/Alerts";

const USER = JSON.parse(localStorage.getItem("user"));
export const Grammar2 = () => {

    const [task, setTask] = React.useState([]);
    const [control, setControl] = React.useState(true);
    const [ejercicios, setEjercicios] = React.useState([]);
    const [loadingData, setLoadingData] = React.useState(true);
    const taskid = window.location.href.split('/')[window.location.href.split('/').length - 1];

    React.useEffect(async()  => {
        if (!USER) {
            let valor = AlertaLeccion('SU SESIÓN HA EXPIRADO, VUELVA A INGRESAR')
            if((await valor).value){
            window.location.href = "/signin";
            }
          }else{
            
            if(ejercicios.length ===0){
                getExercises(taskid).then(data => {
                    setEjercicios(data);
                    //setLoadingData(false);
                });
            }
            
            if(task.length ===0){
                getTask().then(data => {
                    let task = data.res
                    let filter = task.filter(x => x._id === parseInt(taskid)  )
                    setTask(filter);
                    //setLoadingData(false);
                });
            }
            
          }
          
          if(control && ejercicios.length !==0 && task.length!==0){
            setControl(false)
            setLoadingData(false);
          }
     
    },)



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