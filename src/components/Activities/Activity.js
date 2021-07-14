import "./Activity.css"

import { useEffect, useRef } from "react";
import i_writting from '../../assets/icons/teacher.png'
import { getProgressColor } from "../../helpers/indexFuntions";


export default function Activity(props){
    let activity = useRef(),
     circlePercent = useRef();
    const handlerActivity = ()=>{
        console.log("Me has dado click");
    }
    useEffect((e)=>{
        console.log("hola desde el useEfect");
        circlePercent.current.style.height = `${props.percent}%`;
        circlePercent.current.style.backgroundColor = getProgressColor(props.percent);
        console.log(getProgressColor(5));
    },[props.percent])

    return(
        <div className={props.colspan}>
        <div className="circle" ref={activity} onClick={handlerActivity}> 
        <div className="fill" ref={circlePercent}></div>
        <img src={props.img} alt="ActivityName" className="activity-img"></img>
        </div>
        <p className="circle-text">{props.name}</p>
        </div>
    );
}