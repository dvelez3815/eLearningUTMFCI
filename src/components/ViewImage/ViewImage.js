import React, { Component } from "react";

import {mostrarImagen} from '../Alert/Alerts';
class Viewimage extends Component {
    constructor(props){
        super(props);
    }
  render() {
    return (
      <div className="m-auto my-6">
        <button onClick={( img)=>mostrarImagen(`https://drive.google.com/uc?export=view&id=${this.props.img}` )}
          className="p-3 text-xs sm:text-xl  text-white transition-colors duration-150 border border-gray-300 bg-gray-400 rounded-lg focus:shadow-outline font-bold"
        >
          Ver imagen
        </button>
      </div>
    );
  }
}

export default Viewimage;
