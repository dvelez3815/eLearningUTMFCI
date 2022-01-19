import React, { createRef, useEffect } from "react";
import NavComponent from "../../NavComponent";
import logo from "../../../assets/resource/Logo_Provicional.png";
import CollectionsBookmarkIcon from "@material-ui/icons/CollectionsBookmark";
import { useState } from "react";

import "./inicio.css";

import Cookies from "universal-cookie";

import grammarimg from "../../../assets/icons/Grammar.png";
import readingimg from "../../../assets/icons/Reading.png";
import vocabularyimg from "../../../assets/icons/Vocabulary.png";
import writingimg from "../../../assets/icons/Writing.png";
import loading from "../../../assets/resource/loading.svg";
import shortid from "shortid";
import Progreso from "./Progreso";
const cookies = new Cookies();

export const Inicio = () => {
  let userid = cookies.get("_id");

  const [userProgress, setuserProgress] = useState([]);
  const [libros, setlibros] = useState("");
  const [cargando, setcargando] = useState(true);
  let libroActual = 1;
  let totalLibro = 2;
  let htmlObject;

  //get user progress from api
  const getData = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/user_progress/${userid}`, {
      method: "POST",
      headers: {
        'token': cookies.get("token"),
      },
    });
    const data = await response.json();
    return data;
  };
  

  useEffect(async () => {
    if (!cookies.get("_id")) {
      window.location.href = "./signin";
    }
    /* if (cookies.get("status") !== "Active") {
      const user_response = await fetch(`${process.env.REACT_APP_API_URL}/user/${userid}`, {
        method: "GET",
        headers: {
          'token': cookies.get("token"),
        },                
      });
      const user_json = await user_response.json();

      if (user_json.status == "Active") {
        cookies.set("status", user_json.status, { path: "/" });
      } else {
        window.location.href = "./PendingAccount";
      } 
    }*/
  }, []);


  useEffect(() => {
    let llenarInfo = async () => {
      let userInfo = await getData();
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
            modulos.push(modulo);
          }
          
          mergeBooks.libros['libro'+libroActual] = modulos;
          
          //console.log(librox);
          libroActual++;
        }
        

      let $libroswrapper = document.createElement("div"),
        $libros = document.createElement("div"),
        $modulos = document.createElement("div");

      mergeBooks.libros.map((libro, index) => {
        let $libro = document.createElement("div"),
        $titulo = document.createElement("h2");

        $titulo.innerHTML = "TITULO";
        $libro.appendChild($titulo);
        // $libro.setAttribute("class", "libro");
        // $libro.setAttribute("id", "libro" + (index + 1));
        // $modulo.setAttribute("class", "modulo");
        // $modulo.setAttribute("id", "modulo" + (index + 1));
        
        // $libro.appendChild($modulo);
        // $libros.appendChild($libro);
        libro.map((modulo, index) => {
          let $modulo = document.createElement("div"),
            $titulo = document.createElement("h3");
          $titulo.innerHTML = modulo.book_info.module + "." + modulo.book_info.unit;
          $modulo.appendChild($titulo);
          $libro.appendChild($modulo);
        });
        
        $libroswrapper.appendChild($libro);
      });


      setlibros($libroswrapper);
      console.log(mergeBooks);
      setuserProgress(await mergeBooks);
      setcargando(false);
    };

    llenarInfo();
  }, []);

  return (
    <div>
      <NavComponent logo={logo} activado={1} />
      {cargando?<div className="cargando"><img src={loading}></img></div>:
  <div className="grid grid-cols-12 ">
    <div className="xl:col-span-9 col-span-12 justify-center">
      {userProgress.libros &&
      
        <div>asdasd
          <h2>importal</h2>
        </div>
      }
      {/* {libros &&  
                <div dangerouslySetInnerHTML={{__html: libros.innerHTML}}></div>

      } */}
   
    {/* {userProgress && userProgress.map((modulo, index) => {


      if ((index + 1) % 2 === 0) {
        return (
          <div key={shortid.generate()}>
          <Progreso key={shortid.generate()} modulo = {modulo} writingimg = {writingimg} vocabularyimg = {vocabularyimg} readingimg = {readingimg} grammarimg = {grammarimg}/>
          </div>
        )
      } else {
        return (
          <div key={shortid.generate()}>
            <h2  key={shortid.generate()} className="text-2xl text-left text-green-600 mt-5 mx-10 font-bold">{`Module ${modulo.book_info.module}`}</h2>
            <Progreso key={shortid.generate()} modulo = {modulo} writingimg = {writingimg} vocabularyimg = {vocabularyimg} readingimg = {readingimg} grammarimg = {grammarimg}/>            
          </div>
        );
      }
    })} */}
    
  </div>

  {/* BARRA LATERAL */}

  <div className="hidden xl:block md:col-span-3  w-auto fixed inset-y-30 right-10 ">
    <div className="py-5 flex flex-wrap flex-col justify-center">
      <div className="border shadow rounded-2xl py-5  hidden md:block p-4">
        <div>
          <div className="flex flex-col-2">
            <div className="text-left">
              <h2 className="font-semibold text-base m-2">Content</h2>
            </div>
      
          </div>
          <div className="flex p-2 gap-4 flex-col md:flex-row">
            <div
              className="flex justify-center items-start rounded-2xl"
              id="estrella"
            >
              {/* <CollectionsBookmarkIcon color="action" fontSize="large" /> */}
            </div>
            <div className="flex flex-col " id="info">
              <div>
                <h2 className="text-gray-700 text-lg text-left">
                  <ol>
                    <li className="text-sm hover:text-green-500 py-1">
                      {" "}
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        //href=""
                      >
                        Book 1 (Module 1 - Module 2)
                      </a>{" "}
                    </li>
                    <li className="text-sm hover:text-green-500 py-1">
                      {" "}
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        //href=""
                      >
                        Book 2 (Module 3 - Module 4)
                      </a>{" "}
                    </li>
                    <li className="text-sm hover:text-green-500 py-1">
                      {" "}
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        //href=""
                      >
                        Book 3 (Module 5 - Module 6)
                      </a>{" "}
                    </li>
                    <li className="text-sm hover:text-green-500 py-1">
                      {" "}
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        //href=""
                      >
                        Book 4 (Module 7 - Module 8)
                      </a>{" "}
                    </li>
                    <li className="text-sm hover:text-green-500 py-1">
                      {" "}
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        //href=""
                      >
                        Book 5 (Module 9 - Module 10)
                      </a>{" "}
                    </li>
                  </ol>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
                      
    </div>
    <div className="py-2 flex flex-wrap flex-col justify-center">
      <div className="border shadow rounded-2xl py-2  hidden md:block p-4">
        <div>
          <div className="flex flex-col-2">
            <div className="text-left">
              <h2 className="font-semibold text-base m-2">Digital Resources</h2>
            </div>
      
          </div>
          <div className="flex p-2 gap-4 flex-col md:flex-row">
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
                    <li className=" text-sm hover:text-green-500 py-1">
                      {" "}
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://drive.google.com/file/d/1pwa9ffmEMoHOJBa98KDNpONhp92DtoL6/view?usp=sharing"
                      >
                       { <CollectionsBookmarkIcon color="action" fontSize="large" /> } Download Book 1
                      </a>{" "}
                    </li>
                    <li className="text-sm hover:text-green-500 py-1">
                      {" "}
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://drive.google.com/file/d/1zSL78FugkafrXulTG9Wb3CcHwouNr62y/view?usp=sharing"
                      >
                        { <CollectionsBookmarkIcon color="action" fontSize="large" /> } Download Book 2 
                      </a>{" "}
                    </li>
                    <li className="text-sm hover:text-green-500 py-1">
                      {" "}
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://drive.google.com/file/d/1kVydGHFB5M59yMLyAQVM6w0YnN-uf4zJ/view?usp=sharing"
                      >
                        { <CollectionsBookmarkIcon color="action" fontSize="large" /> } Download Book 3 
                      </a>{" "}
                    </li>
                    <li className="text-sm hover:text-green-500 py-1">
                      {" "}
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://drive.google.com/file/d/1Q8COVdO2dGtjDt6mrdb4I1HuqB3w_yxb/view?usp=sharing"
                      >
                        { <CollectionsBookmarkIcon color="action" fontSize="large" /> } Download Book 4 
                      </a>{" "}
                    </li>
                    <li className="text-sm hover:text-green-500 py-1">
                      {" "}
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://drive.google.com/file/d/158WHHjUUYaFvTJaxBK5-SbDS-Fxz1BAy/view?usp=sharing"
                      >
                        { <CollectionsBookmarkIcon color="action" fontSize="large" /> } Download Book 5 
                      </a>{" "}
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