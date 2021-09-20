import React from 'react'
import CancelIcon from "@material-ui/icons/Cancel";
import { useHistory } from 'react-router';


const ProgressBar = (props) => {
  const history = useHistory();
    return (
        <div className="container m-auto p-auto">
        <div className="flex justify-between">
          <div></div>
          <div className="order-last my-3 ">
            <button onClick={()=>history.push('/dashboard')}
              className="bg-transparent tracking-wider  my-2 text-yellow-500 font-semibold hover:text-yellow-400 py-2 px-4 border border-yellow-500 hover:border-yellow-500 rounded">
              <CancelIcon style={{ fontSize: 27 }}/> Salir
            </button>
          </div>
        </div>
        <div className="overflow-hidden mb-2 text-xs flex rounded bg-amber-200 h-4 border">
        <div
          style={{ width: `${(props.resueltos/props.totalEjercicios)*100}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-400"
        ></div>
      </div>
        </div>
    )
}

export default ProgressBar
