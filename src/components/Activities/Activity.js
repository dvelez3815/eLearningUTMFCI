import "./Activity.css";

import { useEffect, useRef} from "react";
import { getProgressColor } from "../../helpers/indexFuntions";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";


export default function Activity(props) {
  

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
    <Menu
      
      as="div"
      className={"relative inline-block"}
      ref={props.myref}
    >
      <div>
        <Menu.Button className="inline-flex justify-center w-full  px-4 py-2 bg-white text-sm font-medium text-gray-700" /*disabled={props.percent===100?true:false}*/>
          <div
            className={props.percent !== 100?"circle":"completed"}
          >
            <div className="fill" ref={circlePercent}></div>
            <img
              src={props.img}
              alt="ActivityName"
              className="activity-img"
            ></img>
          </div>
        </Menu.Button>
      </div>
      <div className="circle-text">
        <h2 className="text-base font-bold capitalize">{props.name}</h2>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-center absolute  mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1">
            <div className="p-2 text-left">
              <h2 className="text-lg mx-2 font-bold text-gray-900">
                Completed: {props.percent}% 
              </h2>
              <h2 className="text-sm mx-2 font-bold text-gray-500">
                {props.percent == 100?"activities completed":"Do activities"}
              </h2>
            </div>

          
            <Menu.Item className={props.percent == 100?"bg-yellow-500 w-3/4 my-2 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded":"bg-green-600 w-3/4 my-2 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"}  >
              {({ active }) => (
                <button >
                  <a className="block"
                    href={props.percent == 100?props.rutaReview:props.ruta} 
                   /*  className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )} */
                  >
                     {props.percent == 100?"review":"start"}
                  </a>
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
    /*   <div className={props.colspan + " p-2 relative inline-block text-left"} ref={props.myref}>
    <button type="button" className="inline-flex justify-center w-full rounded-md  shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 " id="menu-button-actividad" aria-expanded="true" aria-haspopup="true">
      <div className="circle" onClick={()=>props.handlerActivity(props.myref)}>
        <div className="fill" ref={circlePercent}></div>
        <img src={props.img} alt="ActivityName" className="activity-img"></img>
      </div>
    </button>
    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button-actividad" >
    <div className="py-1" role="none">
      <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Account settings</a>
      <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Support</a>
      <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">License</a>
      <form method="POST" action="#" role="none">
        <button type="submit" className="text-gray-700 block w-full text-left px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-3">
          Sign out
        </button>
      </form>
    </div>
  </div>
    <div className="circle-text ">
      <h2 className="text-base font-bold">{props.name}</h2>
    </div> 
    
    </div>*/
  );
}
