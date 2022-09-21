import React from "react";
import loading from "../../assets/resource/loading.svg"

const Loading = () => {

    return(
        <div className="flex items-center justify-center">
        <img src={loading} width={50} alt="cargando"></img>
      </div>
    )

};


export default Loading