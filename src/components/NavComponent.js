import React, { createRef, useContext } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { mostrarAlertaDrive } from "./Alert/Alerts";

import user_img from "../assets/resource/user.png";
import logobn from "../assets/resource/Logo_Provicional_bn.png";
import { AuthContext } from "../context/AuthContext";
const NavComponent = (props) => {
  const { logout } = useContext(AuthContext);
  const hamburgerBtn = createRef();
  const hamburgerItems = createRef();

  const handleHamburgerButton = () => {
    hamburgerItems.current.classList.toggle("hidden");
  };
  

  return (
    <div className="">
      <nav className="relative w-full   bg-green-800  dark:bg-gray-800  shadow  ">
        <div className="mx-auto  ">
          <div className="flex items-center  2xl:px-40 md:px-20 px-5 justify-between h-16">
            <div className=" flex items-center">
              <Link className="flex-shrink-0" to="/">
                <img className="" width="125px" src={logobn} alt="Workflow" />
              </Link>
              <div className="hidden md:block">
                <div className=" ml-10 flex items-baseline space-x-4">
                  <Link
                    className={
                      props.activado === 1
                        ? " flex  text-yellow-400 uppercase   dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        : "flex  text-white uppercase  hover:text-yellow-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    }
                    to="/dashboard"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                    Learning
                  </Link>
                  <Link
                    className={
                      props.activado === 2
                        ? "flex  text-yellow-400  uppercase   dark:hover:text-white  py-2 rounded-md text-sm font-medium"
                        : "flex  text-white uppercase  hover:text-yellow-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    }
                    to="/evaluacion"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                      <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                    </svg>
                    Evaluation
                  </Link>
                  <button
                    onClick={mostrarAlertaDrive}
                    className={
                      props.activado === 3
                        ? "flex  text-yellow-400  uppercase   dark:hover:text-white  py-2 rounded-md text-sm font-medium"
                        : "flex  text-white uppercase  hover:text-yellow-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Resources
                  </button>
                </div>
              </div>
            </div>
            <div></div>

            <div className="md:hidden">
              <button
                className="text-gray-100 dark:text-white hover:text-yellow-500 inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
                id="hamburger"
                ref={hamburgerBtn}
                onClick={handleHamburgerButton}
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
            <div className="p-2 my-auto flex justify-center ">
              <h2 className="hidden lg:block uppercase text-xs md:text-base lg:text-base sm:text-base  pt-1 text-white">
                {props.user.name +
                  " " +
                  (props.user.lastname === "null" ? "" : props.user.lastname)}
              </h2>
              <Menu as="div" className="ml-3 relative">
                <div>
                  <Menu.Button className=" flex text-sm rounded-full focus:outline-none ring-4 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-white">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="md:h-8 lg:h-8 sm:h-8 md:w-8 lg:w-8 sm:w-8 h-12 w-12 "
                      src={user_img}
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
                              src={user_img}
                              alt=""
                            />
                            <h2 className="uppercase text-sm md:text-base lg:text-base sm:text-base  pt-1 p-2 text-gray-600">
                              {props.user.name +
                                " " +
                                (props.user.lastname === "null"
                                  ? ""
                                  : props.user.lastname)}
                            </h2>
                          </div>
                          <div
                            className={
                              "bg-white w-full text-base z-50 float-left pb-2 list-none text-left rounded shadow-lg min-w-48"
                            }
                          >
                            <Link
                              to="/profile"
                              className={
                                "text-sm hover:bg-gray-200 py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                              }
                            >
                              Perfil
                            </Link>
                            {/*<Link
                                  to="#proximamente"
                                  className={
                                    "text-sm hover:bg-gray-200 py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                                  }

                                >
                                  Ayuda
                                </Link>
                                  */}
                            <div className="h-0 my-2 border border-solid border-blueGray-100" />
                            <Link
                              to="/signin"
                              onClick={() => logout()}
                              className={
                                "text-sm py-2 hover:bg-gray-200 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                              }
                            >
                              Cerrar sesión
                            </Link>
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
            ref={hamburgerItems}
          >
            <Link
              className="text-gray-100 hover:text-yellow-500 dark:hover:text-yellow block px-3 py-2 rounded-md text-base font-medium"
              to="/dashboard"
            >
              Learning
            </Link>
            <Link
              className="text-gray-100 hover:text-yellow-500 dark:text-white block px-3 py-2 rounded-md text-base font-medium"
              to="/evaluacion"
            >
              Evaluation
            </Link>
            <Link
              onClick={mostrarAlertaDrive}
              to="#!"
              className="text-gray-100 hover:text-yellow-500 dark:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Resources
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default NavComponent;
