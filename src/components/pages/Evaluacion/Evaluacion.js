import './Evaluacion.css';

import React from "react";
import NavComponent from "../../NavComponent";
import Footer from "../../Footer";

import logo from "../../../assets/resource/Logo_Provicional.png";
import recurso_evaluacion from "../../../assets/resource/recurso_evaluacion.png";
import { Link } from "react-router-dom";

const Evaluacion = () => {
  return (
    <div>
      <NavComponent logo={logo} activado={2} />

      <div className="flex flex-col my-10  space-y-3">
        <div>
          <h2 className="text-green-600 text-3xl sm:text-4xl font-bold ">
            Know your current level of English
          </h2>
        </div>
        <div>
          <button className="cursor-not-allowed h-10 px-5 capitalize text-white font-bold transition-colors duration-150 bg-yellow-400 rounded-lg focus:shadow-outline hover:bg-yellow-500">
            GENERAL TEST (coming soon)
          </button>
        </div>
        <div>

          <div className="container mx-auto justify-center ">
            <div className="h-48 flex flex-wrap justify-center content-start">
              <div className="py-10 p-5  sm:w-5/12">
                <h3 className="text-left text-2xl sm:text-3xl font-sans font-bold text-green-400">
                  Assess knowledge by book
                </h3>
                <div className="space-y-4  pt-4 ">
                  <div className="flex space-x-4 ...">
                    <div className="text-left flex-1 py-2 ...">
                      Book 1 (Module 1 - Module 2)
                    </div>
                    <div className="flex-1  py-2 ...">
                      <button className="h-8 mx-2 px-5 text-gray-700 transition-colors duration-150 border border-gray-300  rounded-lg focus:shadow-outline hover:bg-gray-300 hover:text-white font-bold">
                        <Link to={`/pruebas/libro/` + 1}>start</Link>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 pt-4">
                  <div className="flex space-x-4 ...">
                    <div className="text-left flex-1 py-2 ...">
                      Book 2 (Module 3 - Module 4)
                    </div>
                    <div className="flex-1  py-2 ...">
                      <button className=" cursor-not-allowed h-8 mx-2 px-5 text-gray-400 transition-colors duration-150 border border-gray-300  rounded-lg focus:shadow-outline hover:bg-gray-300 hover:text-white font-bold">
                        disabled
                      </button>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 pt-4">
                  <div className="flex space-x-4 ...">
                    <div className="text-left flex-1 py-2 ...">
                      Book 3 (Module 5 - Module 6)
                    </div>
                    <div className="flex-1  py-2 ...">
                      <button className=" cursor-not-allowed h-8 mx-2 px-5 text-gray-400 transition-colors duration-150 border border-gray-300  rounded-lg focus:shadow-outline hover:bg-gray-300 hover:text-white font-bold">
                        disabled
                      </button>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 pt-4">
                  <div className="flex space-x-4 ...">
                    <div className="text-left flex-1 py-2 ...">
                      Book 4 (Module 7 - Module 8)
                    </div>
                    <div className="flex-1  py-2 ...">
                      <button className="cursor-not-allowed h-8 mx-2 px-5 text-gray-400 transition-colors duration-150 border border-gray-300  rounded-lg focus:shadow-outline hover:bg-gray-300 hover:text-white font-bold">
                        disabled
                      </button>
                    </div>
                  </div>
                </div>
                <div className=" space-y-4 pt-4">
                  <div className="flex space-x-4 ...">
                    <div className="text-left flex-1 py-2 ...">
                      Book 5 (Module 9 - Module 10)
                    </div>
                    <div className="flex-1  py-2 ...">
                      <button className="cursor-not-allowed h-8 mx-2 px-5 text-gray-400 transition-colors duration-150 border border-gray-300  rounded-lg focus:shadow-outline hover:bg-gray-300 hover:text-white font-bold">
                        disabled
                      </button>
                    </div>
                  </div>
                </div>

              </div>
              <div className="items-center justify-center min-h-screen p-3 ">
                <div className="py-10 col-span-12">
                  <div className="overflow-auto lg:overflow-visible ">
                    <table className="table text-gray-900 border-separate space-y-2 text-sm">
                      <thead className="bg-gray-800 text-gray-100">
                        <tr>
                          <th className="p-3"></th>
                          <th className="p-3 text-left">Category</th>
                          <th className="p-3 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-gray-200">
                          <td className="p-3">
                            <div className="flex align-items-center">
                              <img className="rounded-full h-12 w-12  object-cover" src="https://images.unsplash.com/photo-1613588718956-c2e80305bf61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80" alt="unsplash image"/>
                            </div>
                          </td>
                          <td className="p-3 text-left">
                            between 50 to 60 hits
                          </td>
                          <td className="p-3">
                            <span className="bg-green-400 text-gray-50 rounded-md px-2 sm:p-1">Excellent</span>
                          </td>
                        </tr>
                        <tr className="bg-gray-200">
                          <td className="p-3">
                            <div cclassNamelass="flex align-items-center">
                              <img className="rounded-full h-12 w-12   object-cover" src="https://images.unsplash.com/photo-1423784346385-c1d4dac9893a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="unsplash image"/>

                            </div>
                          </td>
                          <td className="p-3 text-left">
                          between 30 to 49 hits
                          </td>
                          <td className="p-3">
                            <span className="bg-yellow-500 text-gray-50 rounded-md px-2 sm:p-1">you're doing well</span>
                          </td>
                        </tr>
                        <tr className="bg-gray-200">
                          <td className="p-3">
                            <div className="flex align-items-center">
                              <img className="rounded-full h-12 w-12   object-cover" src="https://images.unsplash.com/photo-1600856209923-34372e319a5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2135&q=80" alt="unsplash image"/>
                            </div>
                          </td>
                          <td className="p-3 text-left">
                          less than 30 hits
                          </td>
                          <td className="p-3">
                            <span className="bg-red-500  text-gray-50  rounded-md px-2 sm:p-1">keep practicing</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    
    </div>
    
    
  );
  
};


export default Evaluacion;
