
import React, { useState, useEffect } from "react";
import logo from "../../../assets/resource/Logo_Provicional.png";

import NavComponent from "../../NavComponent";


//import Profile  from "profile.js";
import Cookie from "universal-cookie";
const cookies = new Cookie();
let valorProgress = cookies.get("progreso")
const PerfilUser = () => {
  useEffect(async () => {
    if (!cookies.get("_id")) {
      window.location.href = "./signin";
    }


  }, []);

    return (
        <div className="bg-gray-50 pb-36 h-full">
            <NavComponent logo={logo} activado={1} />
            <div className="mx-auto ">
              
                <div className="w-full lg:w-8/12 mx-auto px-4">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                    <div className="px-6">
                      <div className="flex flex-wrap justify-center">
                        <div className="w-full px-4 flex justify-center">
                          <div className="pt-10 h-28 w-28">
                            
                            <img
                              alt="..."
                              src={require("../../../assets/resource/user.png").default}
                              className="shadow-xl rounded-full h-auto align-middle border-none  "
                            />
                          </div>
                        </div>

                      </div>
                      <div className="text-center mt-12 pt-5">
                        <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                        {cookies.get('name') + ' ' + (cookies.get('lastname') === 'null'?'':cookies.get('lastname'))}

                        </h3>
                        <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400  uppercase">
                          {cookies.get('mail') }

                        </div>
                        {/*
                        <div className="mb-2 text-blueGray-600 mt-10">
                            <div className="bg-white  my-2 hover:bg-yellow-300 border-2 border-yellow-300 text-gray-800 font-bold  rounded">
                              <a className="block h-full py-2 px-4 text-sm "
                                href='#' >
                                EDITAR NOMBRE
                              </a>
                            </div>
                        </div>
                      */}
                      </div>
                      
                      <div className="flex md:w-6/12 mx-auto flex-wrap py-7 flex-col justify-center">
                        <div className="border shadow rounded-2xl h-22  py-1">
                            <div className="">
                                <div className="text-center contend-center justify-center ">
                                  <h2 className="font-semibold text-base p-2   ">Total Progress</h2>
                                </div>
                                <span className={valorProgress<54?"  pb-5  text-gray-700 pl-2 text-center" :"pb-2 text-white pl-2 text-center" }>{valorProgress}%</span>

                            </div>

                            <div className="flex px-4">
                              <div>

                              </div>
                              <div className="overflow-hidden w-full h-6 mb-4 text-xs flex rounded bg-amber-200  border-4 border-gray-200">

                                  {
                                    valorProgress<25
                                    ?<div style={{width: `${valorProgress}%`}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-400"> </div>
                                    :valorProgress<50
                                    ?<div style={{width: `${valorProgress}%`}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-300"> </div>
                                    :valorProgress<70
                                    ?<div style={{width: `${valorProgress}%`}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-400"> </div>
                                    :valorProgress<85
                                    ?
                                    <div style={{width: `${valorProgress}%`}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-400"></div>
                                    :<div style={{width: `${valorProgress}%`}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600"></div>

                                  }
                              </div>
                            </div>
                            

                        </div>           
                      </div>
                      <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                        <div className="flex flex-wrap justify-center">
                          <div className="w-full lg:w-9/12 px-4">

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            
        </div>
    )
}

export default PerfilUser;