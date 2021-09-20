import React, { createRef, useEffect } from "react";
import NavComponent from "../../NavComponent";
import logo from "../../../assets/resource/Logo_Provicional.png";
import EModule from "../../EModules/EModule";
import StarIcon from "@material-ui/icons/Star";
import CollectionsBookmarkIcon from "@material-ui/icons/CollectionsBookmark";
import { useState } from "react";

import Cookies from "universal-cookie";
import { ModuleProgress } from "../../ModuleProgress";
import Activity from "../../Activities/Activity";

import grammarimg from "../../../assets/icons/Grammar.png";
import readingimg from "../../../assets/icons/Reading.png";
import vocabularyimg from "../../../assets/icons/Vocabulary.png";
import writingimg from "../../../assets/icons/Writing.png";
import { api_url } from "../../../api.config";
const cookies = new Cookies();

export const Inicio = () => {
  const [progresoTotal, setprogresoTotal] = useState(0);
  const [progesoModulo, setProgesoModulo] = useState(0);
  let userid = cookies.get("_id");

  const [userProgress, setuserProgress] = useState([]);

  //get user progress from api
  const getData = async () => {
    const response = await fetch(`${api_url}/user_progress/${userid}`, {
      method: "POST",
    });
    const data = await response.json();

    return data;
  };

  useEffect(() => {
    let llenarInfo = async () => {
      let userInfo = await getData();
      for (let i = 0; i < userInfo.length - 1; i++) {
        for (let j = 0; j < userInfo.length - i - 1; j++) {
          if (
            parseInt(
              "" + userInfo[j].book_info.module + userInfo[j].book_info.unit
            ) >
            parseInt(
              "" +
                userInfo[j + 1].book_info.module +
                userInfo[j + 1].book_info.unit
            )
          ) {
            let aux = userInfo[j];
            userInfo[j] = userInfo[j + 1];
            userInfo[j + 1] = aux;
          }
        }
      }

      setuserProgress(await userInfo);
      console.log(userInfo);
    };

    llenarInfo();
  }, []);

  useEffect(async () => {
    if (!cookies.get("_id")) {
      window.location.href = "./signin";
    }
    if (cookies.get("status") !== "Active") {
      const user_response = await fetch(`${api_url}/user/${userid}`, {
        method: "GET",
      });
      const user_json = await user_response.json();
      console.log(user_json);
      if (user_json.status == "Active") {
        cookies.set("status", user_json.status, { path: "/" });
      } else {
        window.location.href = "./PendingAccount";
      }
    }
  }, []);

  return (
    <div>
      <NavComponent logo={logo} />
      <div className="grid grid-cols-6">
        <div className="col-span-6 md:col-span-4">
          {userProgress.map((modulo, index) => {
            if ((index + 1) % 2 === 0) {
              return (
                <div>
                  <ModuleProgress
                    moduleName={"Unidad: " + modulo.book_info.unit}
                    percent={parseInt(
                      ((modulo.writing.user_progress +
                        modulo.reading.user_progress +
                        modulo.grammar.user_progress +
                        modulo.vocabulary.user_progress) /
                        (modulo.writing.total_task +
                          modulo.reading.total_task +
                          modulo.grammar.total_task +
                          modulo.vocabulary.total_task)) *
                        100
                    )}
                  ></ModuleProgress>

                  <Activity
                    moduleName={`Modulo: ${modulo.book_info.module}`}
                    ruta={`/modulo/${modulo.book_info.module}/writing/${modulo.book_info.unit}/${modulo.writing.task_id}`}
                    taskid={modulo.writing.task_id}
                    percent={parseInt(
                      (modulo.writing.user_progress /
                        modulo.writing.total_task) *
                        100
                    )}
                    name={"writing"}
                    img={writingimg}
                  />

                  <Activity
                    moduleName={`Modulo: ${modulo.book_info.module}`}
                    ruta={`/modulo/${modulo.book_info.module}/vocabulary/${modulo.book_info.unit}/${modulo.vocabulary.task_id}`}
                    taskid={modulo.vocabulary.task_id}
                    percent={parseInt(
                      (modulo.reading.user_progress /
                        modulo.reading.total_task) *
                        100
                    )}
                    name={"vocabulary"}
                    img={vocabularyimg}
                  />

                  <Activity
                    moduleName={`Modulo: ${modulo.book_info.module}`}
                    ruta={`/modulo/${modulo.book_info.module}/reading/${modulo.book_info.unit}/${modulo.reading.task_id}`}
                    taskid={modulo.reading.task_id}
                    percent={parseInt(
                      (modulo.reading.user_progress /
                        modulo.reading.total_task) *
                        100
                    )}
                    name={"reading"}
                    img={readingimg}
                  />

                  <Activity
                    moduleName={`Modulo: ${modulo.book_info.module}`}
                    ruta={`/modulo/${modulo.book_info.module}/grammar/${modulo.book_info.unit}/${modulo.grammar.task_id}`}
                    taskid={modulo.grammar.task_id}
                    percent={parseInt(
                      (modulo.grammar.user_progress /
                        modulo.grammar.total_task) *
                        100
                    )}
                    name={"grammar"}
                    img={grammarimg}
                  />

                </div>
              );
            } else {
              return (
                <div>
                
                  <h2 className="text-2xl text-left text-green-600 mt-5 mx-10 font-bold">{`Módulo ${modulo.book_info.module}`}</h2>
                  <ModuleProgress
                    moduleName={"Unidad: " + modulo.book_info.unit}
                    percent={parseInt(
                      ((modulo.writing.user_progress +
                        modulo.reading.user_progress +
                        modulo.grammar.user_progress +
                        modulo.vocabulary.user_progress) /
                        (modulo.writing.total_task +
                          modulo.reading.total_task +
                          modulo.grammar.total_task +
                          modulo.vocabulary.total_task)) *
                        100
                    )}
                  ></ModuleProgress>

                  <Activity
                    moduleName={`Modulo: ${modulo.book_info.module}`}
                    ruta={`/modulo/${modulo.book_info.module}/writing/${modulo.book_info.unit}/${modulo.writing.task_id}`}
                    taskid={modulo.writing.task_id}
                    percent={parseInt(
                      (modulo.writing.user_progress /
                        modulo.writing.total_task) *
                        100
                    )}
                    name={"writing"}
                    img={writingimg}
                  />

                  <Activity
                    moduleName={`Modulo: ${modulo.book_info.module}`}
                    ruta={`/modulo/${modulo.book_info.module}/vocabulary/${modulo.book_info.unit}/${modulo.vocabulary.task_id}`}
                    taskid={modulo.vocabulary.task_id}
                    percent={parseInt(
                      (modulo.reading.user_progress /
                        modulo.reading.total_task) *
                        100
                    )}
                    name={"vocabulary"}
                    img={vocabularyimg}
                  />

                  <Activity
                    moduleName={`Modulo: ${modulo.book_info.module}`}
                    ruta={`/modulo/${modulo.book_info.module}/reading/${modulo.book_info.unit}/${modulo.reading.task_id}`}
                    taskid={modulo.reading.task_id}
                    percent={parseInt(
                      (modulo.reading.user_progress /
                        modulo.reading.total_task) *
                        100
                    )}
                    name={"reading"}
                    img={readingimg}
                  />

                  <Activity
                    moduleName={`Modulo: ${modulo.book_info.module}`}
                    ruta={`/modulo/${modulo.book_info.module}/grammar/${modulo.book_info.unit}/${modulo.grammar.task_id}`}
                    taskid={modulo.grammar.task_id}
                    percent={parseInt(
                      (modulo.grammar.user_progress /
                        modulo.grammar.total_task) *
                        100
                    )}
                    name={"grammar"}
                    img={grammarimg}
                  />
                </div>
              );
            }
          })}
        </div>

        {/* BARRA LATERAL */}
        {/*         
        <div className="md:col-span-2">
          <div className="py-5  hidden md:block">
         <div className="border rounded-2xl flex flex-col w-4/6 text-left p-2">
           <div className="flex flex-col-2">
             <div className="text-left">
             <h2 className="font-semibold text-xl m-2">Progreso total del curso </h2>
             </div>
             <div className="text-right">
             <h2 className=" font-semibold text-xl m-2 text-yellow-300 ">{progresoTotal}% </h2>
             </div>
           </div>
           <div className="flex p-2 gap-4 flex-col md:flex-row">
               <div className="flex justify-center items-start rounded-2xl" id="estrella">
                 <StarIcon color="action" fontSize="large"/>
               </div>
               <div className="flex flex-col " id="info">
                   <div><h2 className="text-gray-700 text-lg">Libros completados </h2></div>
                   <div className="overflow-hidden text-xs flex rounded bg-amber-200 h-4 border">
                       <div style={{width: `80%`}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-400"></div>
                   </div>
                   <div><span><p>3/4</p></span></div>
               </div>
           </div>
         </div>
       </div>
       <div className="py-5  hidden md:block">
      <div className="border rounded-2xl flex flex-col w-4/6 text-left p-2">
      <div className="flex flex-col-2">
             <div className="text-left">
             <h2 className="font-semibold text-xl m-2">Progreso por módulos </h2>
             </div>
             <div className="text-right">
             <h2 className=" font-semibold text-xl m-2 text-yellow-300 ">{progesoModulo}% </h2>
             </div>
           </div>
        
           <div className="flex p-2 gap-4 flex-col md:flex-row">
               <div className="flex justify-center items-start rounded-2xl" id="estrella">
                 <CollectionsBookmarkIcon color="action" fontSize="large"/>
                  
               </div>
               <div className="flex flex-col " id="info">
                   <div><h2 className="text-gray-700 text-lg">Libros completados </h2></div>
                   <div className="overflow-hidden text-xs flex rounded bg-amber-200 h-4 border">
                       <div style={{width: `80%`}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-400"></div>
                   </div>
                   <div><span><p>45%</p></span></div>
               </div>
           </div>
      
      </div>
    </div>
        </div>
      
       */}
      </div>
    </div>
  );
};

export default Inicio;
/* 
export const Inicio = () => {
  return (
    <div>
      <NavComponent logo={logo} />
      <div className="grid grid-cols-6">
        <div className="col-span-6 md:col-span-4">
                percent={parseInt(((modulo.writing.user_progress+modulo.reading.user_progress+modulo.grammar.user_progress+modulo.vocabulary.user_progress)/(modulo.writing.total_task+modulo.reading.total_task+modulo.grammar.total_task+modulo.vocabulary.total_task))*100)}
        </div>
        <div className="md:col-span-2">
          <ProgresoLibros />
          <ProgresoModulos />
        </div>
      </div>
    </div>
  );
};


const ProgresoLibros = () => {
    return(
        <div className="py-5 px-2 hidden md:block">
          <div className="border rounded-2xl flex flex-col text-left p-2">
              <h2 className="font-semibold text-xl m-2">Progreso total del curso <span>{this.state.porcientoCurso}</span></h2>
            <div className="flex p-2 gap-4 flex-col md:flex-row">
                <div className="flex justify-center items-start rounded-2xl" id="estrella">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6" fill="white" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                </div>
                <div className="flex flex-col " id="info">
                    <div><h2 className="text-gray-700">Libros completados</h2></div>
                    <div className="overflow-hidden text-xs flex rounded bg-amber-200 h-4 border">
                        <div style={{width: `80%`}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-400"></div>
                    </div>
                    <div><span><p>3/4</p></span></div>
                </div>
            </div>
          </div>
        </div>
    )
}

const ProgresoModulos = () => {
  return(
    <div className="py-5 px-2 hidden md:block">
      <div className="border rounded-2xl flex flex-col justify-center items-center">
        <div className="mb-4">
          <h2>Progreso por módulos</h2>
        </div>
        <div className="flex justify-center gap-4">
            <div className="flex flex-col" id="info">
                <div><h2>Libros completados</h2></div>
                <div className="overflow-hidden text-xs flex rounded bg-amber-200 h-4 border">
                    <div style={{width: `80%`}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-400"></div>
                </div>
            </div>
           <div className="flex flex-col-reverse">
             <p className="text-xs sm:text-sm">45%</p>
           </div>
        </div>
      </div>
    </div>
)  
} */
