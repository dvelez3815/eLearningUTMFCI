import "./Activity.css";

import { useEffect, useRef, useState } from "react";
import i_writting from "../../assets/icons/teacher.png";
import { getProgressColor } from "../../helpers/indexFuntions";

export default function Activity(props) {
  const [modal, setModal] = useState(false);

  let circlePercent = useRef();


  useEffect(
    (e) => {
      circlePercent.current.style.height = `${props.percent}%`;
      circlePercent.current.style.backgroundColor = getProgressColor(
        props.percent
      );
    },
    [props.percent]
  );

  return (
    <div className={props.colspan + " py-2"} ref={props.myref}>
      <div className="circle" onClick={()=>props.handlerActivity(props.myref)}>
        <div className="fill" ref={circlePercent}></div>
        <img src={props.img} alt="ActivityName" className="activity-img"></img>
      </div>
      <p className="circle-text">{props.name}</p>
    </div>
  );
}
