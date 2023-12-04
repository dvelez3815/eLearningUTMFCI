import React from 'react'
import { Ejercicio } from './Ejercicio'


import NotFoundPage from '../NotFoundPage/NotFoundPage'
import loading from "../../../assets/resource/loading.svg";

import { useDispatch, useSelector } from "react-redux";
import { obtenerQuestionsAccion, selectAllquestion } from "../../../redux/QuestionDucks";
import { obtenerTaskAccion, selectAllTask } from "../../../redux/TaskDucks";

const USER = JSON.parse(localStorage.getItem("user"));
export const Grammar2 = () => {

    const [tasks, setTask] = React.useState([]);
    const [ejercicios, setEjercicios] = React.useState([]);
    const [loadingData, setLoadingData] = React.useState(true);
    const taskid = window.location.href.split('/')[window.location.href.split('/').length - 1];

    const dispatch = useDispatch();
    const task = useSelector(selectAllTask);
    const taskStatus = useSelector((store) => store.task.status);
    const question = useSelector(selectAllquestion);
    const questionStatus = useSelector((store) => store.question.status);

    React.useEffect(() => {
        if (!USER?._id) {
            window.location.href = "./signin";
        }
        if (taskStatus === 'idle') {
            dispatch(obtenerTaskAccion())
        }
        if (questionStatus === 'idle') {
            dispatch(obtenerQuestionsAccion(taskid))
        }
        if (taskStatus === 'succeeded' && questionStatus === 'succeeded') {
            let filter = task.filter(x => x._id === parseInt(taskid))
            setTask(filter);
            setEjercicios(question);
            setLoadingData(false);
        }
        
    }, [ taskStatus, questionStatus, dispatch, taskid, task, question])

    return (
        <div>
{console.log(ejercicios, "ejercicios")}
{console.log(tasks, "tasks")}
            {loadingData ?
                <div className="pt-10">
                    <img alt="img" src={loading}></img>
                </div>
                : ejercicios.length > 0 ?
                    <Ejercicio ejercicios={ejercicios} taskInfo={tasks} />
                    : <NotFoundPage></NotFoundPage>
            }
        </div>
    )
}

// Path: eLearningUTMFCI/src/components/pages/ejercicios/Ejercicio.js