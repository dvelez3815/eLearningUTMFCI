import React, {useEffect } from "react";
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
import { obtenerProgresoAccion } from "../../../redux/ProgressDucks";

const USER = JSON.parse(localStorage.getItem("user"));

export const Inicio = () => {
  let userid = []
  let pro = 10
  userid = USER._id
  
  const [userProgress, setuserProgress] = useState([]);
  const [valorProgress, setvalorProgress] = useState([]);

  const [cargando, setcargando] = useState(true);
  const [libros, setlibros] = useState([]);
 /*  const [progreso,setProgreso] = useState([]); */
  const [task,setTask] = useState([]);
  const [controlN, setControln] = useState(true);

  const [bandera, setBandera] = useState(false);
  const dispatch = useDispatch();
  const progreso = useSelector((store)=> store.progreso.array);
  let libroActual = 1;
  let totalLibro = 5;
  //get user progress from api
  const getData = async () => {
    
    dispatch(obtenerProgresoAccion(userid));


    const taksresponse = await fetch(`${process.env.REACT_APP_API_URL}/task/`, {
      method: "GET",
      headers: {
        token: process.env.REACT_APP_SECRET_TOKEN,
      },
    })

    const dataT = await taksresponse.json();
    
    setTask(await dataT)
    setControln(false)
    setBandera(true)
    
    
  };


 
  
  useEffect(async () => {
    await getData();
    let llenarInfo = async () => {
      let userInfo = progreso
      //let task = tasku

      //console.log(userInfo)
      if (userInfo.name === "JsonWebTokenError") {
        window.location.href = "./signin";
      }

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

      let mergeBooks = { libros: [] };
      while (libroActual <= totalLibro) {
        let librox = userInfo.filter(book => book.book_info.book === libroActual);
        let contador = 1;
        //total de modulos
        let startedmodulo = librox[0].book_info.module;
        let contador2 = startedmodulo
        let modulos = [];
        while (contador <= 2) {
          let modulo = librox.filter(book => book.book_info.module === contador2);
          contador2++;
          contador++;

          let userprogress = (modulo[0].writing.user_progress + modulo[0].grammar.user_progress + modulo[0].reading.user_progress + modulo[0].vocabulary.user_progress);
          let total_task = (modulo[0].writing.total_task + modulo[0].grammar.total_task + modulo[0].reading.total_task + modulo[0].vocabulary.total_task);
          let progress = (userprogress / total_task) * 100;

          let userprogress2 = (modulo[1].writing.user_progress + modulo[1].grammar.user_progress + modulo[1].reading.user_progress + modulo[1].vocabulary.user_progress);
          let total_task2 = (modulo[1].writing.total_task + modulo[1].grammar.total_task + modulo[1].reading.total_task + modulo[1].vocabulary.total_task);
          let progress2 = (userprogress2 / total_task2) * 100;


          let totalmoduleprogress = (progress + progress2) / 2;


          modulos.push({ modulo, totalmoduleprogress });
        }
        mergeBooks.libros.push(modulos)
        libroActual++;
      }

      let contadormodulos = 0;
      mergeBooks.libros.forEach((libro, index) => {
        let totaluserprogress = 0;
        let totaltask = 0;
        let totalmoduleprogress = 0;
        libro.forEach(modulo => {
          modulo.modulo.forEach(unit => {
            totaluserprogress = totaluserprogress + (unit.grammar.user_progress + unit.reading.user_progress + unit.vocabulary.user_progress + unit.writing.user_progress);
            totaltask = totaltask + (unit.grammar.total_task + unit.reading.total_task + unit.vocabulary.total_task + unit.writing.total_task);
          });
        });
        mergeBooks.libros[index] = { userprogress: totaluserprogress, totaltask: totaltask, modulos: mergeBooks.libros[index] }
      });



      mergeBooks.libros.forEach((book, index) => {
        let lastbook_is_aproved = true;
        if (index !== 0) {
          let modulo1 = mergeBooks.libros[index - 1].modulos[0].totalmoduleprogress;
          let modulo2 = mergeBooks.libros[index - 1].modulos[1].totalmoduleprogress;
          let totalmoduleprogress = (modulo1 + modulo2) / 2;

          if (totalmoduleprogress !== 100) {
            lastbook_is_aproved = false;
          }

        }
        libros.push(<Libro modulos={book.modulos} lecciones={task.res} key={shortid.generate()} lastbook_is_aproved={lastbook_is_aproved} libroactual={(index + 1)} />)

      });

      let cantTask = 0
      let cantTaskUser = 0
      for (let i = 0; i < (mergeBooks.libros).length; i++) {
        cantTask = cantTask + parseFloat(mergeBooks.libros[i].totaltask)
        cantTaskUser = cantTaskUser + parseFloat(mergeBooks.libros[i].userprogress)
        console.log('cant libro user', parseFloat(mergeBooks.libros[i].userprogress)
        )
      }

      let calculo = (cantTaskUser * 100) / cantTask
      console.log('cant task', cantTaskUser)
      let porcentaje = parseFloat(calculo.toFixed(2))

      setvalorProgress(porcentaje)
      setuserProgress(await mergeBooks);
      setcargando(false);

    };
    if (cargando) {
      llenarInfo();

    }

    if (!cargando) {
      if (valorProgress === 0) {
        Bienvenida()
      }
    }

  }, [])



  return (
    <div className="">  
      { USER ?
              <NavComponent USER={USER} logo={logo} activado={1} />
            :
        <div></div>
            }
      {cargando?<div className="pt-20"><img src={loading}></img></div>:
  <div className="grid grid-cols-12 ">
    <div className="xl:col-span-9 col-span-12 justify-center sm:px-10">

      {libros}
       
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
                <span className={valorProgress<54?"absolute 2xl:right-36 right-32 font-bold text-gray-700 pl-2 text-center" :"absolute bottom-4 right-32 font-bold text-white pl-2 text-center" }>{valorProgress}%</span>
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
                    <a  rel="noopener noreferrer" href="#libro1">
                      <li className="container mx-auto px-20 rounded-lg border-2 border-gray-200 text-center text-xs hover:text-green-500 py-1">
                        {" "}
                        <div className="flex items-stretch">
                          <div className="flex justify-center items-start rounded-2xl" id="estrella">
                            {<CollectionsBookmarkIcon color="action" fontSize="small" /> }
                          </div> 
                          <div className="px-1 py-1 ">
                            BOOK 1
                          </div>
                        </div>
                      </li>
                    </a>{" "}
                  </div>
                  <div className="py-1 ">
                    <a  rel="noopener noreferrer" href="#libro2">
                      <li className="container mx-auto px-20 p-3 rounded-lg border-2 border-gray-200 text-center text-xs hover:text-green-500 py-1">
                        {" "}
                        <div className="flex items-stretch">
                          <div className="flex justify-center items-start rounded-2xl" id="estrella">
                            {<CollectionsBookmarkIcon color="action" fontSize="small"  /> }
                          </div> 
                          <div className="px-1 py-1">
                          BOOK 2
                          </div>
                        </div>
                      </li>
                    </a>{" "}
                  </div>
                  <div className="py-1 ">
                    <a  rel="noopener noreferrer" href="#libro3">
                      <li className="container mx-auto px-20 p-3 rounded-lg border-2 border-gray-200 text-center text-xs hover:text-green-500 py-1">
                        {" "}
                        <div className="flex items-stretch">
                          <div className="flex justify-center items-start rounded-2xl" id="estrella">
                            {<CollectionsBookmarkIcon color="action" fontSize="small" /> }
                          </div> 
                          <div className="px-1 py-1">
                          BOOK 3
                          </div>
                        </div>
                      </li>
                    </a>{" "}
                  </div>
                  <div className="py-1 ">
                    <a  rel="noopener noreferrer" href="#libro4">
                      <li className="container mx-auto px-20 p-3 rounded-lg border-2 border-gray-200 text-center text-xs hover:text-green-500 py-1">
                        {" "}
                        <div className="flex items-stretch">
                          <div className="flex justify-center items-start rounded-2xl" id="estrella">
                            {<CollectionsBookmarkIcon color="action" fontSize="small" /> }
                          </div> 
                          <div className="px-1 py-1">
                          BOOK 4
                          </div>
                        </div>
                      </li>
                    </a>{" "}
                  </div>
                  <div className="py-1 ">
                    <a  rel="noopener noreferrer" href="#libro5">
                      <li className="container mx-auto px-20 p-3 rounded-lg border-2 border-gray-200 text-center text-xs hover:text-green-500 py-1">
                        {" "}
                        <div className="flex items-stretch">
                          <div className="flex justify-center items-start rounded-2xl" id="estrella">
                            {<CollectionsBookmarkIcon color="action" fontSize="small" /> }
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
        libros.length === 0?
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
