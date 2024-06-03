import React from "react";
import loading from "../../assets/resource/loading.svg"

const Loading = (props) => {

    return(
        <div className="flex items-center justify-center">
        <img src={loading} width={props.width} alt="cargando"></img>
      </div>
    )

};


export default Loading