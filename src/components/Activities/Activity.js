import "./Activity.css"

import { useEffect, useRef } from "react";
import i_writting from '../../assets/icons/teacher.png'


export default function Activity(props){
    let activity = useRef(),
     circlePercent = useRef();
    const handlerActivity = ()=>{
        console.log("Me has dado click");
    }
    useEffect((e)=>{
        console.log("hola desde el useEfect");
        circlePercent.current.style.height = `${props.percent}%`;        
    },[props.percent])
    return(
        <div className="Container py-2">
        <div className="circle" ref={activity} onClick={handlerActivity}> 
        <div className="fill" ref={circlePercent}></div>
        <img src={props.img} alt="ActivityName" className="activity-img"></img>
        
        </div>
        <p>{props.name}</p>
        </div>
    );
}