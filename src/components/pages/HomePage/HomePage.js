import React from "react";

import Circulo from "../../../assets/resource/Semi_Circulo.png";
import Chica from "../../../assets/resource/CHICA.png";
import Chica_mb from "../../../assets/resource/CHICA_mb.png";
import LogoProvicional from "../../../assets/resource/Logo_Provicional.png";
import Logo_ing from "../../../assets/resource/LOGO_ILM_HORIZONTAL.png";
import { Link } from "react-router-dom"



class HomePage extends React.Component {
  render() {

    return (
      /* Este es el Navbar */
      <div className=" overflow-x-hidden ">
        <div className=" mx-auto z-20  flex px-5 h-auto items-center">
          <div className=" md:ml-10 mr-10">
            <a href='https://www.utm.edu.ec/' target='_blank' rel="noreferrer" >
              <img className=" md:h-20 lg:h-20 sm:h-20" src={LogoProvicional} alt="logo" />
            </a>
          </div>
          <div className=" flex flex-grow justify-end md:mr-20">
            <div className=" my-2 pl-2">
              <div></div>
              <a href='https://www.utm.edu.ec/idiomas' target='_blank' rel="noreferrer" >
                <img className=" md:h-20 lg:h-20 sm:h-20" src={Logo_ing} alt="logo" />
              </a>
            </div>
          </div>

        </div>

        {/* Aqui inicia la parte central de la pagina  */}
        <div className=" text-center    ">
          <div className=" text-center  justify-center 
                items-center  pt-20 ">
            <div className="  mx-auto  mx-1 ">
              <div className=" text-center">
                <h3 className="lg:text-4xl md:text-3xl   text-2xl font-sans font-bold text-green-500">
                  Aprende Inglés con los <br /> contenidos más relevantes
                </h3>
                <h3 className="lg:text-lg md:text-lg text-base  font-sans text-gray-500 pt-2 p-3">
                  Comprometidos con tu formación acádemica
                </h3>
                <Link to="/signin">
                  <div className="pt-4 px-2 ">
                    <button className=" inline-flex items-center justify-center px-10 py-2  bg-yellow-400 hover:bg-yellow-500 text-white rounded-full font-semibold text-xs   uppercase tracking-widest ">
                      Inicie sesión
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          {/* Aqui inicia las imagenes */}
          <div
            className="absolute   xl:bottom-0  xl:right-0 lg:bottom-0  lg:right-0 md:bottom-0  md:right-0 
          sm:bottom-0  sm:right-0 -bottom-20  right-0  z-20"
          >
            <div className=" hidden sm:block flex xl:max-w-xl lg:max-w-xl  sm:mr-0 sm:mb-0 md:mr-0 md:mb-0 lg:mr-0 lg:mb-0 mb-10 pr-20 md:max-w-md sm:max-w-xs md:h-auto">
              <img className="md:h-1/2 md:w-10/12 md:w-auto " src={Chica} alt=" chica" />
            </div>
            <div className=" xs:hidden  ">
              <img className="w-8/12 " src={Chica_mb} alt=" chica" />
            </div>
          </div>
          <div className="absolute bottom-0  left-0 z-10">
            <div className=" flex xl:max-w-xl  lg:max-w-xl md:max-w-md sm:max-w-xs   h-auto">
              <img className="h-1/4 w-auto hidden sm:block" src={Circulo} alt=" circulo" />
            </div>
          </div>
        </div>
        <div className='relative py-20'>
        </div>
      </div>

    );

  }
}

export default HomePage;



