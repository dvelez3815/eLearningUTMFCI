import React, {createRef } from "react";
import { Fragment } from "react";
import {Menu, Transition } from "@headlessui/react";
import Cookie from "universal-cookie";

import {
   mostrarAlertaDrive
   } from "./Alert/Alerts";

import user from "../assets/resource/user.png";
import logobn from "../assets/resource/Logo_Provicional_bn.png";
import { Button } from "@material-ui/core";

const cookies = new Cookie();

class NavComponent extends React.Component {
  constructor(props) {
    super(props);
    this.hamburgerBtn = createRef();
    this.hamburgerItems = createRef();

  }
  handleHamburgerButton = () => {
    this.hamburgerItems.current.classList.toggle("hidden");
  };
  classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  logout() {
    cookies.remove("_id", { path: "/" });
    cookies.remove("name", { path: "/" });
    cookies.remove("lastname", { path: "/" });
    cookies.remove("mail", { path: "/" });
    cookies.remove("status", { path: "/" });
    cookies.remove("progreso", { path: "/" });
    window.location.href = "./";
  }
  render() {
    return (
      <div className="">
        <nav className="relative w-full   bg-green-800  dark:bg-gray-800  shadow  ">
          <div className="mx-auto  ">
            <div className="flex items-center  2xl:px-40 md:px-20 px-5 justify-between h-16">
              <div className=" flex items-center">
                <a className="flex-shrink-0" href="/">
                  <img
                    className=""
                    width="125px"
                    src={logobn}
                    alt="Workflow"
                  />
                </a>
                <div className="hidden md:block">
                  <div className=" ml-10 flex items-baseline space-x-4">
                    <a
                      className={this.props.activado===1?" flex font-semibold text-yellow-400 uppercase   dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium":"flex font-semibold text-white uppercase  hover:text-yellow-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"}
                      href="/dashboard"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                      Learning
                    </a>
                    <a
                      className={this.props.activado===2?"flex font-semibold text-yellow-400  uppercase   dark:hover:text-white  py-2 rounded-md text-sm font-medium":"flex font-semibold text-white uppercase  hover:text-yellow-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"}
                      href="/evaluacion"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                      <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                    </svg>
                      Evaluation
                    </a>
                    <button onClick={mostrarAlertaDrive}
                      className={this.props.activado===3?"flex font-semibold text-yellow-400  uppercase   dark:hover:text-white  py-2 rounded-md text-sm font-medium":"flex font-semibold text-white uppercase  hover:text-yellow-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z" clip-rule="evenodd" />
                    </svg>
                     Resources
                    </button>
                  {/*
<Menu as="div" className=" ">
                        <div className=" rounded-lg ">
                          <Menu.Button className=" text-white dark:text-white  hover:text-blue-200 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            <p className="  ">
                              Resources
                            </p>
                            
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                      <Menu.Items className=" origin-top-right absolute mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">

                        <div className="mx-auto px-4 py-2 uppercase  flex">
                          <p className="text-sm text-center font-bold">Resources</p>
                        </div>
                        <div className=" text-center"> 
                        <div className=" flex px-2 text-gray-700 text-lg text-center">
                          <ol className="">
                            <li className=" text-sm hover:text-yellow-500 py-1">
                              {" "}
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://drive.google.com/file/d/1pwa9ffmEMoHOJBa98KDNpONhp92DtoL6/view?usp=sharing"
                              >
                                <div className="flex items-stretch">
                                  <div className="flex justify-center items-start rounded-2xl" id="estrella">
                                    <figure>
                                      <img src={LibroDescargar} alt="Descargar Libro" />
                                    </figure>                           
                                  </div> 
                                  <div className="px-1 ">
                                  Download book 1
                                  </div>
                                </div>
                              </a>{" "}
                            </li>
                            <li className="text-sm hover:text-yellow-500 py-1">
                              {" "}
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://drive.google.com/file/d/1zSL78FugkafrXulTG9Wb3CcHwouNr62y/view?usp=sharing"
                              >
                                  <div className="flex items-stretch">
                                  <div className="flex justify-center items-start rounded-2xl" id="estrella">
                                    <figure>
                                        <img src={LibroDescargar} alt="Descargar Libro" />
                                    </figure>                              
                                    </div> 
                                  <div className="px-1 ">
                                  Download book 2
                                  </div>
                                </div>                      </a>{" "}
                            </li>
                            <li className="text-sm hover:text-yellow-500 py-1">
                              {" "}
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://drive.google.com/file/d/1kVydGHFB5M59yMLyAQVM6w0YnN-uf4zJ/view?usp=sharing"
                              >
                                  <div className="flex items-stretch">
                                  <div className="flex justify-center items-start rounded-2xl" id="estrella">
                                    <figure>
                                        <img src={LibroDescargar} alt="Descargar Libro" />
                                    </figure>                            
                                  </div> 
                                  <div className="px-1 ">
                                  Download book 3
                                  </div>
                                </div>                      </a>{" "}
                            </li>
                            <li className="text-sm hover:text-yellow-500 py-1">
                              {" "}
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://drive.google.com/file/d/1Q8COVdO2dGtjDt6mrdb4I1HuqB3w_yxb/view?usp=sharing"
                              >
                                  <div className="flex items-stretch">
                                  <div className="flex justify-center items-start rounded-2xl" id="estrella">
                                    <figure>
                                        <img src={LibroDescargar} alt="Descargar Libro" />
                                    </figure>                            
                                  </div> 
                                  <div className="px-1 ">
                                  Download book 4
                                  </div>
                                </div>                      </a>{" "}
                            </li>
                            <li className="text-sm hover:text-yellow-500 py-1">
                              {" "}
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://drive.google.com/file/d/158WHHjUUYaFvTJaxBK5-SbDS-Fxz1BAy/view?usp=sharing"
                              >
                                  <div className="flex items-stretch">
                                  <div className="flex justify-center items-start rounded-2xl" id="estrella">
                                    <figure>
                                        <img src={LibroDescargar} alt="Descargar Libro" />
                                    </figure>                            
                                  </div> 
                                  <div className="px-1 ">
                                  Download  book 5
                                  </div>
                                </div>                      </a>{" "}
                            </li>
                          </ol>
                        </div>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                    */
                  }
                  </div>
                </div>
              </div>
              <div>

              </div>
              
              <div className="md:hidden">
                <button
                  className="text-gray-100 dark:text-white hover:text-yellow-500 inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
                  id="hamburger"
                  ref={this.hamburgerBtn}
                  onClick={this.handleHamburgerButton}
                >
                  <svg
                    width="10"
                    height="10"
                    fill="currentColor"
                    className="h-8 w-8"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
                  </svg>
                </button>
              </div>
              <div className="p-2 flex ">
                <h2 className="hidden lg:block uppercase text-xs md:text-base lg:text-base sm:text-base  pt-1 text-white">
                  
                  {cookies.get('name') + ' ' + (cookies.get('lastname') === 'null'?'':cookies.get('lastname'))}
                </h2>
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className=" flex text-sm rounded-full focus:outline-none ring-4 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="md:h-8 lg:h-8 sm:h-8 md:w-8 lg:w-8 sm:w-8 h-12 w-12 "
                        /* src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" */
                        src={user}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="z-50 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      
                      <Menu.Item>
                        {({ active }) => (
                          <div> 
                            <div className="py-2 ">
                              <img
                                className="md:h-20 lg:h-20 sm:h-20 md:w-20 lg:w-20 sm:w-20 h-14 w-14 "
                                /* src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" */
                                src={user}
                                alt=""
                              />
                              <h2 className="uppercase text-sm md:text-base lg:text-base sm:text-base  pt-1 p-2 text-gray-600">
                  
                                {cookies.get('name') + ' ' + (cookies.get('lastname') === 'null'?'':cookies.get('lastname'))}
                              </h2>
                            </div>
                            <div
                                className={
                                  "bg-white w-full text-base z-50 float-left pb-2 list-none text-left rounded shadow-lg min-w-48"
                                }
                              >
                                <a
                                  href="/profile"
                                  className={
                                    "text-sm hover:bg-gray-200 py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                                  }

                                >
                                  Perfil
                                </a>
                                <a
                                  href="#proximamente"
                                  className={
                                    "text-sm hover:bg-gray-200 py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                                  }

                                >
                                  Ayuda
                                </a>
                                <div className="h-0 my-2 border border-solid border-blueGray-100" />
                                <a
                                  onClick={this.logout}
                                  href="#pablo"
                                  className={
                                    "text-sm py-2 hover:bg-gray-200 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                                  }

                                >
                                  Cerrar sesión
                                </a>
                              </div>
                          </div>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <div className="lg:hidden ">
            <div
              className="px-2 pt-2  pb-3 space-y-1 sm:px-3 hidden"
              ref={this.hamburgerItems}
            >
              <a
                className="text-gray-100 hover:text-yellow-500 dark:hover:text-yellow block px-3 py-2 rounded-md text-base font-medium"
                href="/dashboard"
              >
                Learning
              </a>
              <a
                className="text-gray-100 hover:text-yellow-500 dark:text-white block px-3 py-2 rounded-md text-base font-medium"
                href="/evaluacion"
              >
                Evaluation
              </a>
              <a onClick={mostrarAlertaDrive}
                className="text-gray-100 hover:text-yellow-500 dark:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Resources
              </a>

            </div>
           
          </div>
        </nav>
      </div>
    );
  }
}
export default NavComponent;
