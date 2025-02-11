import React, { createRef, useContext } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";

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
                      props.activado === 0
                        ? " flex  text-yellow-400 uppercase   dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        : "flex  text-white uppercase  hover:text-yellow-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    }
                    to="/dashboard"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mx-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                    Learning
                  </Link>
                  <Link
                    className={
                      props.activado === 0
                        ? "flex  text-yellow-400  uppercase   dark:hover:text-white  py-2 rounded-md text-sm font-medium"
                        : "flex  text-white uppercase  hover:text-yellow-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    }
                    to="/evaluacion"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mx-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                      <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                    </svg>
                    Evaluation
                  </Link>
                  <Link
                    className={
                      props.activado === 0
                        ? "flex  text-yellow-400  uppercase   dark:hover:text-white  py-2 rounded-md text-sm font-medium"
                        : "flex  text-white uppercase  hover:text-yellow-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    }
                    to="/registerExam"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-1" fill="currentColor" viewBox="0 0 448 512"><path d="M96 32l0 32L48 64C21.5 64 0 85.5 0 112l0 48 448 0 0-48c0-26.5-21.5-48-48-48l-48 0 0-32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 32L160 64l0-32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192L0 192 0 464c0 26.5 21.5 48 48 48l352 0c26.5 0 48-21.5 48-48l0-272z" /></svg>
                    Schedule Exam
                  </Link>
                  <Link
                    className={
                      props.activado === 0
                        ? "flex  text-yellow-400  uppercase   dark:hover:text-white  py-2 rounded-md text-sm font-medium"
                        : "flex  text-white uppercase  hover:text-yellow-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    }
                    to="/preguntas"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-1"
                      fill="currentColor" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" /></svg>
                    Frequent questions
                  </Link>
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
            <div className=" flex justify-center ">
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
              to="/registerExam"
              className="text-gray-100 hover:text-yellow-500 dark:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Schedule exam
            </Link>
            <Link
              to="/preguntas"
              className="text-gray-100 hover:text-yellow-500 dark:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Frequent questions
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default NavComponent;
