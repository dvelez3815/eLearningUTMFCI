import React from "react";

import logo from "../../assets/resource/Logo_Provicional.png";
import {Link} from 'react-router-dom';
class NavBar extends React.Component {

  render() {
    return (
      <nav className="shadow-sm flex items-center justify-between flex-wrap bg-gray-50 p-4 h-1/5" >
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <img src={logo} className="block h-8 w-auto" alt="LogoUtm"></img>
        </div>
        {/* prueba */}
        <div className=" hidden md:block">
        <div className={`absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ${this.props.ocultar}`}id="botones">
          <button className="h-8 px-5 text-gray-400 transition-colors duration-150 border border-gray-300  rounded-lg focus:shadow-outline hover:bg-gray-300 hover:text-white font-bold">
          <Link to="/signup">Registrate</Link>
          </button>

          <div className="ml-3 relative">
            <div>
              <button className="h-8 px-5 text-white font-bold transition-colors duration-150 bg-yellow-400 rounded-lg focus:shadow-outline hover:bg-yellow-500">
              <Link to="/signin">Inicia sesión</Link>
              </button>
            </div>
          </div>
        </div>
        </div>
        <div className="md:hidden">
        <div className={`absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0  ${this.props.ocultar}`}id="botones">
          <button className="h-8 px-5 text-gray-400 transition-colors duration-150 border border-gray-300  rounded-lg focus:shadow-outline hover:bg-gray-300 hover:text-white font-bold">
          <Link to="/signup">Registrate</Link>
          </button>

          <div className="ml-3 relative">
            <div>
              <button className="h-8 px-5 text-white font-bold transition-colors duration-150 bg-yellow-400 rounded-lg focus:shadow-outline hover:bg-yellow-500">
              <Link to="/signin">Inicia sesión</Link>
              </button>
            </div>
          </div>
        </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
