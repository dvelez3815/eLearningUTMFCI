import React, { createRef, useEffect } from "react";

import Circulo from "../../../assets/resource/Semi_Circulo.png";
import Chica from "../../../assets/resource/CHICA.png";
import LogoProvicional from "../../../assets/resource/Logo_Provicional.png";
import LogoFCI from "../../../assets/resource/escudo_fci.png";
import {Link} from  "react-router-dom"

import Cookies from "universal-cookie";
const cookies = new Cookies();



class HomePage extends React.Component {
  
   

  render() {
    
    
  return (
    /* Este es el Navbar */
    <div className=" overflow-x-hidden ">
      <div className="relative z-20  flex flex-row px-5 h-auto items-center">
        <div className=" flex-grow mr-40 ">
          <a href='https://www.utm.edu.ec/' target ='_blank' >
          <img className=" md:h-20 lg:h-20 sm:h-20" src={LogoProvicional} alt="logo" />
          </a>
        </div>
        <div className=" flex-grow  ">
          <div className=" flex justify-end flex-wrap my-2">
            <div></div>
            <img className=" md:h-20 lg:h-20 sm:h-20" src={LogoFCI} alt="logo" />
          </div>
        </div>
      </div>

      {/* Aqui inicia la parte central de la pagina  */}
      <div className="static  ">
        <div className=" absolute z-30  top-1/2 left-1/2   lg:-mt-40  lg:-ml-56  md:-mt-40   md:-ml-48  sm:-mt-40   sm:-ml-48  -mt-40   -ml-40">
          <div className=" flex flex-wrap  mx-1 ">
            <div className=" text-center">
              <h3 className="lg:text-4xl md:text-3xl   text-2xl font-sans font-bold text-green-500">
                Aprende Inglés con los <br /> contenidos más relevantes
              </h3>
              <h3 className="lg:text-lg md:text-lg text-base  font-sans text-gray-500 pt-2 p-3">
                Comprometidos con tu formación acádemica
              </h3>
              <Link to="/dashboard">
                <div className="pt-4 px-2 xl:py-0  lg:py-0 md:py-0 py-1">
                    <button className=" inline-flex items-center justify-center px-10 py-2  bg-yellow-400 hover:bg-yellow-500 text-white rounded-full font-semibold text-xs   uppercase tracking-widest ">
                      Ingresar
                    </button>
                </div>
              </Link>
              <div className="pt-4">
                {/*  si se ubica la etiqueta " a " o link dentro del button no hace efecto al menos que le des click a las letras esto se evita
                ubicandola afuera */}
                
                  { 
                    cookies.get("_id") ?
                    <div>
                      <h3 className="lg:text-sm md:text-sm text-base  font-sans text-gray-500 ">
                        Actualmente tiene un cuenta logueada
                      </h3>
                              
                    </div>
                    :

                      <div className="px-2 xl:py-0  lg:py-0 md:py-0 py-1">
                        <Link to="/signup">
                        <button className=" inline-flex items-center justify-center px-4 py-2  bg-gray-400 hover:bg-gray-300 text-white  rounded-full font-semibold text-xs   uppercase tracking-widest ">
                          Crear una cuenta
                        </button>
                        </Link>
                      </div>
                  }
                  
                
              </div>
            </div>
          </div>
        </div>
        {/* Aqui inicia las imagenes */}
        <div
          className="absolute   xl:bottom-0  xl:right-0 lg:bottom-0  lg:right-0 md:bottom-0  md:right-0 
           sm:bottom-0  sm:right-0 -bottom-20  right-0  z-20"
        >
          <div className=" flex xl:max-w-xl lg:max-w-xl  sm:mr-0 sm:mb-0 md:mr-0 md:mb-0 lg:mr-0 lg:mb-0 mr-20 mb-20 md:max-w-md sm:max-w-xs h-auto">
            <img className="md:h-1/2 md:w-10/12 md:w-auto " src={Chica} alt=" chica" />
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



