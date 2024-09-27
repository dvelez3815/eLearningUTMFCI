import React, { useState } from "react";

import logo from "../../assets/resource/LOGO_SIMPLE_BG.png";
import { Link } from 'react-router-dom';
const NavBar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-50 shadow-md rounded">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>

              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>

              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img className="h-8 w-auto" src={logo} alt="ILM logo" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="rounded-md bg-green-500 px-3 py-2 text-sm font-medium text-white"
                  aria-current="page"
                >
                  Inicio
                </Link>
                <Link
                  to="/preguntas"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-green-200 hover:text-gray-800"
                >
                  Preguntas Frecuentes
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3">
              <div>
                <Link
                  to="/signin"
                  className="px-2  py-5 lg:py-2.5 lg:h-10 text-greenutm font-bold text-sm leading-normal uppercase rounded  hover:bg-gray-100  focus:bg-gray-200  focus:outline-none focus:ring-0 active:bg-yellow-800  transition duration-150 ease-in-out"
                >
                  Inicia Sesión
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <Link
            to="/"
            className="block rounded-md bg-green-500 px-3 py-2 text-base font-medium text-white"
            aria-current="page"
          >
            Inicio
          </Link>
          <Link
            to="/preguntas"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-green-200 hover:text-gray-800"
          >
            Preguntas Frecuentes
          </Link>
        </div>
      </div>
    </nav>
  );

  /*  return (
     <nav class="bg-gray-50 shadow-md rounded" role="navigation">
       <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
         <div class="relative flex h-16 items-center justify-between">
           <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
             <button type="button" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
               <span class="absolute -inset-0.5"></span>
               <span class="sr-only">Open main menu</span>
 
               <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
               </svg>
 
               <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
               </svg>
             </button>
           </div>
           <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
             <div class="flex flex-shrink-0 items-center">
               <img class="h-8 w-auto" src={logo} alt="ILM logo" />
             </div>
             <div class="hidden sm:ml-6 sm:block">
               <div class="flex space-x-4">
                 <a href="#!" class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" aria-current="page">Inicio</a>
                 <a href="#!" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Preguntas Frecuentes</a>
                 <a href="#!" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Projects</a>
                 <a href="#!" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Calendar</a>
               </div>
             </div>
           </div>
           <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
 
 
             <div class="relative ml-3">
               <div>
                 <Link
                   to="/signin"
                   className="px-2  py-5 lg:py-2.5 lg:h-10 text-greenutm font-bold text-sm leading-normal uppercase rounded  hover:bg-gray-100  focus:bg-gray-200  focus:outline-none focus:ring-0 active:bg-yellow-800  transition duration-150 ease-in-out"
                 >
                   Inicia Sesión
                 </Link>
               </div>
 
             </div>
           </div>
         </div>
       </div>
 
       <div class="sm:hidden" id="mobile-menu">
         <div class="space-y-1 px-2 pb-3 pt-2">
           <a href="#!" class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">Inicio</a>
           <a href="#!" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Preguntas Frecuentes</a>
           <a href="#!" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Projects</a>
           <a href="#!" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Calendar</a>
         </div>
       </div>
     </nav>
   ); */
}

export default NavBar;
