import React, {createRef } from "react";
import { Fragment } from "react";
import {Menu, Transition } from "@headlessui/react";
import Cookie from "universal-cookie";

import user from "../assets/resource/user.png";
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
    window.location.href = "./signin";
  }
  render() {
    return (
      <div>
        <nav className="bg-white dark:bg-gray-800  shadow ">
          <div className="max-w-7xl mx-auto ">
            <div className="flex items-center justify-between h-16">
              <div className=" flex items-center">
                <a className="flex-shrink-0" href="/">
                  <img
                    className=""
                    width="125px"
                    src={this.props.logo}
                    alt="Workflow"
                  />
                </a>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <a
                      className={this.props.activado===1?"text-gray-800   hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium":"text-gray-300 dark:text-white  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"}
                      href="/dashboard"
                    >
                      Learning
                    </a>
                    <a
                      className={this.props.activado===2?"text-gray-800 uppercase hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium":"text-gray-300 dark:text-white  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"}
                      href="/evaluacion"
                    >
                      Evaluation
                    </a>
                    <a
                      className={this.props.activado===3?"text-gray-800 uppercase hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium":"text-gray-300 dark:text-white  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"}
                      href="/evaluacion"
                    >
                      Resource
                    </a>
                  </div>
                </div>
              </div>
              <div className="block">
                <div className="ml-4 flex items-center md:ml-6"></div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <button
                  className="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
                  id="hamburger"
                  ref={this.hamburgerBtn}
                  onClick={this.handleHamburgerButton}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="h-8 w-8"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
                  </svg>
                </button>
              </div>
              <div className="-mr-2 flex ">
                <h2 className="text-xl font-semibold py-1 text-gray-800">
                  {cookies.get('name') + ' ' + cookies.get('lastname')}
                </h2>
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className=" flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 "
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
                          <a
                            href="#"
                            className={this.classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            className={this.classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            <button onClick={this.logout}>Logout</button>
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <div
              className="px-2 pt-2 pb-3 space-y-1 sm:px-3 hidden"
              ref={this.hamburgerItems}
            >
              <a
                className="text-gray-800 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                href="/#"
              >
                APRENDIZAJE
              </a>
              <a
                className="text-gray-300 hover:text-gray-800 dark:text-white block px-3 py-2 rounded-md text-base font-medium"
                href="/#"
              >
                EVALUACIÓN
              </a>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
export default NavComponent;
