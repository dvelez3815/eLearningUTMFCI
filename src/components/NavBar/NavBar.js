import React from "react";

import logo from '../../assets/resource/Logo_Provicional.png';

class NavBar extends React.Component {
  render() {
    return (
        <nav class="shadow-sm flex items-center justify-between flex-wrap bg-gray-50 p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
            <img src={logo} class="block h-8 w-auto" alt="LogoUtm"></img>
        </div>
        {/* prueba */}
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <button class="h-8 px-5 text-gray-400 transition-colors duration-150 border border-gray-300  rounded-lg focus:shadow-outline hover:bg-gray-300 hover:text-white font-bold">Registrate</button>

        <div class="ml-3 relative">
          <div>
          <button class="h-8 px-5 text-white font-bold transition-colors duration-150 bg-yellow-400 rounded-lg focus:shadow-outline hover:bg-yellow-500">Inicia sesión</button>
          </div>
        </div>
      </div>
      </nav>
    );
  }
}

export default NavBar;
