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
    
    <div className={props.colspan + " p-2 relative inline-block text-left"} ref={props.myref}>
      <button type="button" class="inline-flex justify-center w-full rounded-md  shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 " id="menu-button-actividad" aria-expanded="true" aria-haspopup="true">
      <div className="circle" onClick={()=>props.handlerActivity(props.myref)}>
        <div className="fill" ref={circlePercent}></div>
        <img src={props.img} alt="ActivityName" className="activity-img"></img>
      </div>
    </button>
    <div class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button-actividad" >
    <div class="py-1" role="none">
      <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Account settings</a>
      <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Support</a>
      <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">License</a>
      <form method="POST" action="#" role="none">
        <button type="submit" class="text-gray-700 block w-full text-left px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-3">
          Sign out
        </button>
      </form>
    </div>
  </div>
    <div className="circle-text ">
      <h2 className="text-base font-bold">{props.name}</h2>
    </div>
    
    </div>
  );
}
