import "./Activity.css"

import { useEffect, useRef, useState} from "react";
import i_writting from '../../assets/icons/teacher.png'
import { getProgressColor } from "../../helpers/indexFuntions";



export default function Activity(props){
    const [modal, setModal] = useState(false)

    let activity = useRef(),
     circlePercent = useRef(),
     modalCard = useRef();

    const handlerActivity = ()=>{

        if(modal){

            setModal(!modal)
        }else{
            setModal(!modal)
        }   
    }

    useEffect((e)=>{
        circlePercent.current.style.height = `${props.percent}%`;
        circlePercent.current.style.backgroundColor = getProgressColor(props.percent);
    },[props.percent])

    return(
        <div className={props.colspan}>
        <div className="circle" ref={activity} onClick={handlerActivity}> 
        <div className="fill" ref={circlePercent}></div>
        <img src={props.img} alt="ActivityName" className="activity-img"></img>
        </div>
        <p className="circle-text">{props.name}</p>
        {modal && <div className="modalCard" ref={modalCard}>
            <p>Lección 1/5</p>
            <nav>
                <button>APUNTES</button>
                <button>EMPEZAR</button>
            </nav>
        </div>
}
        </div>
    );
}