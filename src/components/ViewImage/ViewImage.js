
import React, { Component } from "react";

import {mostrarImagen} from '../Alert/Alerts';
class Viewimage extends Component {
  
  

  render() {
    return (
    
      <div className="m-auto my-6">
        <div className="">
           </div>
         <button onClick={( img)=>mostrarImagen(this.props.img)} 
          className="p-3 text-xs sm:text-lg  text-yellow-600 transition-colors duration-150 border border-yellow-300 bg-yellow-100 rounded-lg focus:shadow-outline "
        >
          view image
        </button>
      </div>
    );
  }
}

export default Viewimage;
