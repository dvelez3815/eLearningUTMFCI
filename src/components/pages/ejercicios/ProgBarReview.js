import React from 'react'
import { useHistory } from 'react-router';

const ProgressBarR = (props) => {
  // eslint-disable-next-line no-unused-vars
  const history = useHistory();
  

    return (
      <div className="mr-8 ml-8">
        <div className="container m-auto p-auto">
        <div className="flex justify-between">
          <div></div>
        </div>
        <div className="overflow-hidden mb-2 text-xs flex rounded bg-amber-200 h-4 border">
        <div
          style={{ width: `${(props.contadorRespondidas/props.totalEjercicios)*100}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-400"
        ></div>
      </div>
      </div>
        </div>
    )
}


export default ProgressBarR
