import React, { createRef, useEffect } from "react";
import NavComponent from "../../NavComponent";
import logo from "../../../assets/resource/Logo_Provicional.png";
import CollectionsBookmarkIcon from "@material-ui/icons/CollectionsBookmark";
import { useState } from "react";
import LibroDescargar from "../../../assets/icons/book-arrow-down.png";


import "./inicio.css";

import Cookies from "universal-cookie";
import Progreso from "./Progreso";
import loading from "../../../assets/resource/loading.svg";
import shortid from "shortid";
import Libro from "../../Libros/Libro";
const cookies = new Cookies();

export const Inicio = () => {
  let userid = cookies.get("_id");

  const [userProgress, setuserProgress] = useState([]);
  const [cargando, setcargando] = useState(true);
  const [libros, setlibros] = useState([]);
  const [task,setTask] = useState([]);

  let libroActual = 1;
  let totalLibro = 5;
  //get user progress from api
  const getData = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/progress/${userid}`, {
      method: "POST",
      headers: {
        'token': process.env.REACT_APP_SECRET_TOKEN
      },
    });
    const data = await response.json();
    return data;
  };

  const getTask = async() => {
    
    const taksresponse = await fetch(`${process.env.REACT_APP_API_URL}/task/`, {
      method: "GET",
      headers: {
        token: process.env.REACT_APP_SECRET_TOKEN,
      },
    })

    const data = await taksresponse.json();
    //mostrarContenido(topic,objetivo, explicacion)
    return data;
  }
  

  useEffect(async () => {
    if (!cookies.get("_id")) {
      window.location.href = "./signin";
    }
     if (cookies.get("status") !== "Active") {
      const user_response = await fetch(`${process.env.REACT_APP_API_URL}/user/${userid}`, {
        method: "GET",
        headers: {
          'token': process.env.REACT_APP_SECRET_TOKEN,
        },                
      });
      const user_json = await user_response.json();
      console.log('user',user_json)
      if (user_json.status === "Active") {
        cookies.set("status", user_json.status, { path: "/" });
      } else {
        window.location.href = "./PendingAccount";
      } 
    }
  }, []);


  useEffect(() => {
    let llenarInfo = async () => {
      let userInfo = await getData();
      let task = await getTask();
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

        let mergeBooks = {libros: []};
        while(libroActual <= totalLibro){
          let librox = userInfo.filter(book => book.book_info.book === libroActual);
          let contador = 1;
          //total de modulos
          let startedmodulo = librox[0].book_info.module;
          let contador2 = startedmodulo
          let modulos = [];
          while(contador <= 2){
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


            modulos.push({modulo, totalmoduleprogress});
          }
          mergeBooks.libros.push(modulos)
          libroActual++;
        }

        let contadormodulos = 0;
        mergeBooks.libros.forEach((libro,index) => {
          let totaluserprogress = 0;
          let totaltask = 0;
          let totalmoduleprogress = 0;
          libro.forEach(modulo => {
            modulo.modulo.forEach(unit => {
              totaluserprogress = totaluserprogress + (unit.grammar.user_progress + unit.reading.user_progress + unit.vocabulary.user_progress + unit.writing.user_progress);
              totaltask = totaltask + (unit.grammar.total_task + unit.reading.total_task + unit.vocabulary.total_task + unit.writing.total_task);
            });
          });
          mergeBooks.libros[index] = {userprogress: totaluserprogress, totaltask: totaltask, modulos: mergeBooks.libros[index]}
        });
        

        
        mergeBooks.libros.forEach((book,index) => {
          let lastbook_is_aproved = true;
          if(index!==0){
            let modulo1 = mergeBooks.libros[index-1].modulos[0].totalmoduleprogress;
            let modulo2= mergeBooks.libros[index-1].modulos[1].totalmoduleprogress;
            let totalmoduleprogress = (modulo1 + modulo2) / 2;

            if(totalmoduleprogress!==100){
              lastbook_is_aproved = false;
            }            
          }
          libros.push(<Libro modulos={book.modulos} lecciones={task.res} key={shortid.generate()} lastbook_is_aproved={lastbook_is_aproved} libroactual={(index+1)}/>)       

         });
        setuserProgress(await mergeBooks);
      setcargando(false);
    };
  
    llenarInfo();
    
  }, []);

  return (
    <div className="">
      <NavComponent logo={logo} activado={1} />
      {cargando?<div className="cargando"><img src={loading}></img></div>:
  <div className="grid grid-cols-12 ">
    <div className="xl:col-span-9 col-span-12 justify-center">
      {libros}
       
  </div>

  {/* BARRA LATERAL */}

  <div className="hidden xl:block md:col-span-3  w-auto fixed inset-y-30 right-8 ">
    <div className="py-7 flex flex-wrap flex-col justify-center">
      <div className="container mx-auto px-5  border shadow rounded-2xl   hidden md:block p-">
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
    <div className="flex flex-wrap flex-col justify-center">
      <div className="border shadow rounded-2xl  hidden md:block py-1">
        <div>
          <div className="">
            <div className="text-center p-1">
              <h2 className="font-semibold text-base ">Digital Resources</h2>
            </div>
          </div>
          <div className=" flex p-2 gap-4 flex-col md:flex-row">
            <div
              className="flex justify-center items-start rounded-2xl"
              id="estrella"
            >
              {/* <CollectionsBookmarkIcon color="action" fontSize="large" /> */}
            </div>
            <div className="flex flex-col  " id="info">
              
              <div>
                <h2 className=" text-gray-700 text-lg text-center">
                  <ol>
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
      <div className='relative py-20'>
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