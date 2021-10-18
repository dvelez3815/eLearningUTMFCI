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
          className="p-3 text-xs sm:text-lg  text-yellow-600 transition-colors duration-150 border border-yellow-300 bg-yellow-100 rounded-lg focus:shadow-outline "
        >
          view image
        </button>
      </div>
    );
  }
}

export default Viewimage;