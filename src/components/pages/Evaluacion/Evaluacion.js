import './Evaluacion.css';

import React, { createRef, useEffect } from "react";
import NavComponent from "../../NavComponent";

import logo from "../../../assets/resource/Logo_Provicional.png";
import CollectionsBookmarkIcon from "@material-ui/icons/CollectionsBookmark";
import { Link } from "react-router-dom";

import Cookies from "universal-cookie";
import axios from 'axios';

const cookies = new Cookies();

const Evaluacion = () => {
  useEffect(async () => {
    if (!cookies.get("_id")) {
      window.location.href = "./signin";
    }


  }, []);


  

  return (
    <div>
      <NavComponent logo={logo} activado={2} />

      <div className="flex flex-col my-10  space-y-3">
        <div>
          <h2 className="p-2 text-green-600 text-3xl sm:text-4xl font-bold ">
            Know your current level of English
          </h2>
        </div>
        <div>
        <Link to={`/pruebas/prueba-general/`}> 
          <button className="h-10 px-5 capitalize text-white font-bold transition-colors duration-150 bg-yellow-400 rounded-lg focus:shadow-outline hover:bg-yellow-500">
            GENERAL TEST
          </button>
        </Link>
        </div>
        <div>

          <div className="container mx-auto justify-center  ">
            <div className="h-48 flex flex-wrap justify-center content-start">
            <div className="py-10 p-5  md:w-5/12">
              <h3 className="text-left text-2xl sm:text-3xl font-sans font-bold text-green-400">
                  Assess knowledge by book
              </h3>
              <div className="grid grid-cols-2 gap-4 py-4">
              <Link to={`/pruebas/libro/` + 1}>
                <div className="border-4 border-gray-200 p-5 rounded-lg focus:shadow-outline hover:bg-yellow-200">                 
                    <div className="flex justify-center items-start rounded-2xl" id="estrella">
                                {<CollectionsBookmarkIcon color="action" fontSize="medium" /> }
                    </div> 
                    <div className="px-1 py-1 ">
                                BOOK 1
                    </div>                  
                  </div>
                </Link>
                <Link to={`/pruebas/libro/` + 2}>
                  <div className="border-4 border-gray-200 p-5 rounded-lg focus:shadow-outline hover:bg-yellow-200">                  
                    <div className="flex justify-center items-start rounded-2xl" id="estrella">
                                {<CollectionsBookmarkIcon color="action" fontSize="medium" /> }
                    </div> 
                    <div className="px-1 py-1 ">
                                BOOK 2
                    </div>
                  </div>
                </Link>
                <Link to={`/pruebas/libro/` + 3}>
                  <div className="border-4 border-gray-200 p-5 rounded-lg focus:shadow-outline hover:bg-yellow-200">
                    <div className="flex justify-center items-start rounded-2xl" id="estrella">
                                {<CollectionsBookmarkIcon color="action" fontSize="medium" /> }
                    </div> 
                    <div className="px-1 py-1 ">
                                BOOK 3
                    </div>
                  </div>
                </Link>
                <Link to={`/pruebas/libro/` + 4}>
                  <div className="border-4 border-gray-200 p-5 rounded-lg focus:shadow-outline hover:bg-yellow-200">
                 
                    <div className="flex justify-center items-start rounded-2xl" id="estrella">
                                {<CollectionsBookmarkIcon color="action" fontSize="medium" /> }
                    </div> 
                    <div className="px-1 py-1 ">
                                BOOK 4
                    </div>
                  
                  </div>
                </Link>
                <Link to={`/pruebas/libro/` + 5}>
                  <div className="border-4 border-gray-200 p-5 rounded-lg focus:shadow-outline hover:bg-yellow-200">     
                    <div className="flex justify-center items-start rounded-2xl" id="estrella">
                                {<CollectionsBookmarkIcon color="action" fontSize="medium" /> }
                    </div> 
                    <div className="px-1 py-1 ">
                                BOOK 5
                    </div>
                  </div>
                </Link>
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
                              <img className="rounded-full h-12 w-12  object-cover" src="https://images.unsplash.com/photo-1613588718956-c2e80305bf61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80" alt="unsplash"/>
                            </div>
                          </td>
                          <td className="p-3 text-left">
                          more than 25 correct
                          </td>
                          <td className="p-3">
                            <span className="bg-green-400 text-gray-50 rounded-md px-2 sm:p-1">Excellent</span>
                          </td>
                        </tr>
                        <tr className="bg-gray-200">
                          <td className="p-3">
                            <div className="flex align-items-center">
                              <img className="rounded-full h-12 w-12   object-cover" src="https://images.unsplash.com/photo-1423784346385-c1d4dac9893a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="unsplash"/>

                            </div>
                          </td>
                          <td className="p-3 text-left">
                          between 10 to 24 correct
                          </td>
                          <td className="p-3">
                            <span className="bg-yellow-500 text-gray-50 rounded-md px-2 sm:p-1">you're doing well</span>
                          </td>
                        </tr>
                        <tr className="bg-gray-200">
                          <td className="p-3">
                            <div className="flex align-items-center">
                              <img className="rounded-full h-12 w-12   object-cover" src="https://images.unsplash.com/photo-1600856209923-34372e319a5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2135&q=80" alt="unsplash"/>
                            </div>
                          </td>
                          <td className="p-3 text-left">
                          less than 10 correct
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
