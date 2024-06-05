import React from "react";
import loading from "../../assets/resource/loading.svg"



const Loading = (props) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="">
        <img src={loading} width={props.width || 250} alt="cargando"></img>
        <h1 className="text-2xl text-gray-700 font-semibold text-center" style={{fontFamily: 'Montserrat'}}>Cargando...</h1>
      </div>
    </div>
  );
};

export default Loading;
