import React, { useEffect } from "react";
import NavComponent from "../../NavComponent";
import logo from "../../../assets/resource/Logo_Provicional.png";
import CollectionsBookmarkIcon from "@material-ui/icons/CollectionsBookmark";
import { useState } from "react";
import {
  Bienvenida,
} from "../../Alert/Alerts";
import "./inicio.css";
import Footer from "../../Footer";
import loading from "../../../assets/resource/loading.svg";
import shortid from "shortid";
import Libro from "../../Libros/Libro";
import { useDispatch, useSelector } from "react-redux";
import { obtenerProgresoAccion, selectAllProgress } from "../../../redux/ProgressDucks";
import { obtenerTaskAccion, selectAllTask } from "../../../redux/TaskDucks";
import { llenarInfo } from "../../../helpers/indexFuntions";

const USER = JSON.parse(localStorage.getItem("user"));

export const Inicio = () => {

  const setuserProgress = useState([])[1];
  const [valorProgress, setvalorProgress] = useState([]);
  const [cargando, setcargando] = useState(true);
  const [libros, setlibros] = useState([]);

  const dispatch = useDispatch();
 
  const task = useSelector(selectAllTask);
  const taskStatus = useSelector((store) => store.task.status);

  const progress = useSelector(selectAllProgress);
  const progressStatus = useSelector((store) => store.progress.status);


  useEffect(() => {
    if (!USER?._id) {
      window.location.href = "./signin";
    }
    if (taskStatus === 'idle') {
      dispatch(obtenerTaskAccion())
    }
    if (progressStatus === 'idle') {
      dispatch(obtenerProgresoAccion(USER._id))
    }
    if (taskStatus === 'succeeded' && progressStatus === 'succeeded') {
      setcargando(false)
      let {libros, mergeBooks, porcentaje} = llenarInfo(progress, task);
      setlibros(libros);
      setuserProgress(mergeBooks);
      setvalorProgress(porcentaje);
    }
   
  }, [taskStatus, progressStatus, dispatch, progress, task, setuserProgress])

  return (
    <div className="">
      {USER ?
        <NavComponent USER={USER} logo={logo} activado={1} />
        :
        <div></div>
      }
      {cargando? <div className="pt-20"><img src={loading} alt="cargando"></img></div> :
        <div className="grid grid-cols-12 ">
          <div className="xl:col-span-9 col-span-12 justify-center sm:px-10">
            {libros.map((libro) => (
              <Libro modulos={libro.modulos} lecciones={libro.lecciones} key={libro.key} lastbook_is_aproved={libro.lastbook_is_aproved} libroactual={libro.libroactual} />
            ))}
          </div>
          {/* BARRA LATERAL */}

          <div className="hidden xl:block md:col-span-3  w-auto fixed inset-y-30 right-20 2xl:right-28">
            <div className="flex flex-wrap py-7 flex-col justify-center">
              <div className="border shadow rounded-2xl h-22  hidden md:block py-1">
                <div className="">
                  <div className="text-center contend-center justify-center ">
                    <h2 className="font-semibold text-base p-2   ">Total Progress</h2>
                  </div>
                </div>

                <div className="flex px-4">
                  <div>

                  </div>
                  <div className="overflow-hidden w-full h-6 mb-4 text-xs flex rounded bg-amber-200  border-4 border-gray-200">

                    {
                      valorProgress < 25
                        ? <div style={{ width: `${valorProgress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-400"> </div>
                        : valorProgress < 50
                          ? <div style={{ width: `${valorProgress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-300"> </div>
                          : valorProgress < 70
                            ? <div style={{ width: `${valorProgress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-400"> </div>
                            : valorProgress < 85
                              ?
                              <div style={{ width: `${valorProgress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-400"></div>
                              : <div style={{ width: `${valorProgress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600"></div>

                    }
                    <span className={valorProgress < 54 ? "absolute 2xl:right-36 right-32 font-bold text-gray-700 pl-2 text-center" : "absolute bottom-4 right-32 font-bold text-white pl-2 text-center"}>{valorProgress}%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap flex-col justify-center">
              <div className="container mx-auto px-5 2xl:px-12  border shadow rounded-2xl   hidden md:block p-">
                <div>
                  <div className="">
                    <div className="text-center contend-center justify-center ">
                      <h2 className="font-semibold text-base p-2   ">Navegation</h2>
                    </div>
                  </div>
                  <div className="flex p-2 gap-4 flex-col md:flex-row">
                    <div className="flex flex-col " id="info">
                      <div>
                        <h2 className="text-gray-700 text-lg text-left">
                          <ol>
                            <div className="py-1 ">
                              <a rel="noopener noreferrer" href="#libro1">
                                <li className="container mx-auto px-20 rounded-lg border-2 border-gray-200 text-center text-xs hover:text-green-500 py-1">
                                  {" "}
                                  <div className="flex items-stretch">
                                    <div className="flex justify-center items-start rounded-2xl" id="estrella">
                                      {<CollectionsBookmarkIcon color="action" fontSize="small" />}
                                    </div>
                                    <div className="px-1 py-1 ">
                                      BOOK 1
                                    </div>
                                  </div>
                                </li>
                              </a>{" "}
                            </div>
                            <div className="py-1 ">
                              <a rel="noopener noreferrer" href="#libro2">
                                <li className="container mx-auto px-20 p-3 rounded-lg border-2 border-gray-200 text-center text-xs hover:text-green-500 py-1">
                                  {" "}
                                  <div className="flex items-stretch">
                                    <div className="flex justify-center items-start rounded-2xl" id="estrella">
                                      {<CollectionsBookmarkIcon color="action" fontSize="small" />}
                                    </div>
                                    <div className="px-1 py-1">
                                      BOOK 2
                                    </div>
                                  </div>
                                </li>
                              </a>{" "}
                            </div>
                            <div className="py-1 ">
                              <a rel="noopener noreferrer" href="#libro3">
                                <li className="container mx-auto px-20 p-3 rounded-lg border-2 border-gray-200 text-center text-xs hover:text-green-500 py-1">
                                  {" "}
                                  <div className="flex items-stretch">
                                    <div className="flex justify-center items-start rounded-2xl" id="estrella">
                                      {<CollectionsBookmarkIcon color="action" fontSize="small" />}
                                    </div>
                                    <div className="px-1 py-1">
                                      BOOK 3
                                    </div>
                                  </div>
                                </li>
                              </a>{" "}
                            </div>
                            <div className="py-1 ">
                              <a rel="noopener noreferrer" href="#libro4">
                                <li className="container mx-auto px-20 p-3 rounded-lg border-2 border-gray-200 text-center text-xs hover:text-green-500 py-1">
                                  {" "}
                                  <div className="flex items-stretch">
                                    <div className="flex justify-center items-start rounded-2xl" id="estrella">
                                      {<CollectionsBookmarkIcon color="action" fontSize="small" />}
                                    </div>
                                    <div className="px-1 py-1">
                                      BOOK 4
                                    </div>
                                  </div>
                                </li>
                              </a>{" "}
                            </div>
                            <div className="py-1 ">
                              <a rel="noopener noreferrer" href="#libro5">
                                <li className="container mx-auto px-20 p-3 rounded-lg border-2 border-gray-200 text-center text-xs hover:text-green-500 py-1">
                                  {" "}
                                  <div className="flex items-stretch">
                                    <div className="flex justify-center items-start rounded-2xl" id="estrella">
                                      {<CollectionsBookmarkIcon color="action" fontSize="small" />}
                                    </div>
                                    <div className="px-1 py-1">
                                      BOOK 5
                                    </div>
                                  </div>
                                </li>
                              </a>{" "}
                            </div>
                          </ol>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      }
      {
        libros.length === 0 ?
          <div className='pt-5'>
          </div>
          :
          <div className='pt-10'>
            <Footer />
          </div>
      }
    </div>
  );
};


export default Inicio;
