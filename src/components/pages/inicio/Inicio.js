import React from "react";
import  NavComponent from "../../NavComponent";
import logo from "../../../assets/resource/Logo_Provicional.png";
import EModule from "../../EModules/EModule";
import StarIcon from '@material-ui/icons/Star';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import { useState } from "react";


export const Inicio = () => {
  const [progresoTotal, setprogresoTotal] = useState(0)
  const [progesoModulo, setProgesoModulo] = useState(0)

  let data = {
    Unidad: {
      modulo: [
        {
          nombre: "Module 1",
          progreso: 10,
          actividades: [
            {
              nombre: "Grammar",
              progreso: 2,
              total: 8,
              ruta: "http://localhost:3000/modulo/1/grammar/1",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },
            {
              nombre: "Vocabulary",
              progreso: 2,
              total: 8,
              ruta: "http://localhost:3000/modulo/1/writting/1",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },
            {
              nombre: "Writting",
              progreso: 2,
              total: 8,
              ruta: "",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },            
            {
              nombre: "Reading",
              progreso: 2,
              total: 8,
              ruta: "",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },            

          ]
        },

        {
          nombre: "Module 1",
          progreso: 100,
          actividades: [
            {
              nombre: "Grammar",
              progreso: 2,
              total: 8,
              ruta: "http://localhost:3000/modulo/1/grammar/1",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },
            {
              nombre: "Vocabulary",
              progreso: 2,
              total: 8,
              ruta: "",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },
            {
              nombre: "Writting",
              progreso: 2,
              total: 8,
              ruta: "",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },            
            {
              nombre: "Reading",
              progreso: 2,
              total: 8,
              ruta: "",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },            

          ]
        },

        {
          nombre: "Module 1",
          progreso: 60,
          actividades: [
            {
              nombre: "Grammar",
              progreso: 2,
              total: 8,
              ruta: "http://localhost:3000/modulo/1/grammar/1",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },
            {
              nombre: "Vocabulary",
              progreso: 2,
              total: 8,
              ruta: "",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },
            {
              nombre: "Writting",
              progreso: 2,
              total: 8,
              ruta: "",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },            
            {
              nombre: "Reading",
              progreso: 2,
              total: 8,
              ruta: "",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },            

          ]
        },

        {
          nombre: "Module 1",
          progreso: 60,
          actividades: [
            {
              nombre: "Grammar",
              progreso: 2,
              total: 8,
              ruta: "http://localhost:3000/modulo/1/grammar/1",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },
            {
              nombre: "Vocabulary",
              progreso: 2,
              total: 8,
              ruta: "",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },
            {
              nombre: "Writting",
              progreso: 2,
              total: 8,
              ruta: "",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },            
            {
              nombre: "Reading",
              progreso: 2,
              total: 8,
              ruta: "",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },            

          ]
        },

        {
          nombre: "Module 1",
          progreso: 60,
          actividades: [
            {
              nombre: "Grammar",
              progreso: 2,
              total: 8,
              ruta: "http://localhost:3000/modulo/1/grammar/1",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },
            {
              nombre: "Vocabulary",
              progreso: 2,
              total: 8,
              ruta: "",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },
            {
              nombre: "Writting",
              progreso: 2,
              total: 8,
              ruta: "",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },            
            {
              nombre: "Reading",
              progreso: 2,
              total: 8,
              ruta: "",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },            

          ]
        },

        {
          nombre: "Module 1",
          progreso: 60,
          actividades: [
            {
              nombre: "Grammar",
              progreso: 2,
              total: 8,
              ruta: "http://localhost:3000/modulo/1/grammar/1",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },
            {
              nombre: "Vocabulary",
              progreso: 2,
              total: 8,
              ruta: "",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },
            {
              nombre: "Writting",
              progreso: 2,
              total: 8,
              ruta: "",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },            
            {
              nombre: "Reading",
              progreso: 2,
              total: 8,
              ruta: "",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },            

          ]
        },

        {
          nombre: "Module 1",
          progreso: 60,
          actividades: [
            {
              nombre: "Grammar",
              progreso: 2,
              total: 8,
              ruta: "http://localhost:3000/modulo/1/grammar/1",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },
            {
              nombre: "Vocabulary",
              progreso: 2,
              total: 8,
              ruta: "",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },
            {
              nombre: "Writting",
              progreso: 2,
              total: 8,
              ruta: "",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },            
            {
              nombre: "Reading",
              progreso: 2,
              total: 8,
              ruta: "",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },            

          ]
        },

        {
          nombre: "Module 1",
          progreso: 60,
          actividades: [
            {
              nombre: "Grammar",
              progreso: 2,
              total: 8,
              ruta: "http://localhost:3000/modulo/1/grammar/1",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },
            {
              nombre: "Vocabulary",
              progreso: 2,
              total: 8,
              ruta: "",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },
            {
              nombre: "Writting",
              progreso: 2,
              total: 8,
              ruta: "",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },            
            {
              nombre: "Reading",
              progreso: 2,
              total: 8,
              ruta: "",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },            

          ]
        },

        {
          nombre: "Module 1",
          progreso: 60,
          actividades: [
            {
              nombre: "Grammar",
              progreso: 2,
              total: 8,
              ruta: "http://localhost:3000/modulo/1/grammar/1",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },
            {
              nombre: "Vocabulary",
              progreso: 2,
              total: 8,
              ruta: "",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },
            {
              nombre: "Writting",
              progreso: 2,
              total: 8,
              ruta: "",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },            
            {
              nombre: "Reading",
              progreso: 2,
              total: 8,
              ruta: "",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },            

          ]
        },

        {
          nombre: "Module 1",
          progreso: 60,
          actividades: [
            {
              nombre: "Grammar",
              progreso: 2,
              total: 8,
              ruta: "http://localhost:3000/modulo/1/grammar/1",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },
            {
              nombre: "Vocabulary",
              progreso: 2,
              total: 8,
              ruta: "",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },
            {
              nombre: "Writting",
              progreso: 2,
              total: 8,
              ruta: "",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },            
            {
              nombre: "Reading",
              progreso: 2,
              total: 8,
              ruta: "",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },            

          ]
        },
        {
          nombre: "Module 1",
          progreso: 60,
          actividades: [
            {
              nombre: "Grammar",
              progreso: 2,
              total: 8,
              ruta: "http://localhost:3000/modulo/1/grammar/1",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },
            {
              nombre: "Vocabulary",
              progreso: 2,
              total: 8,
              ruta: "",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },
            {
              nombre: "Writting",
              progreso: 2,
              total: 8,
              ruta: "",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },            
            {
              nombre: "Reading",
              progreso: 2,
              total: 8,
              ruta: "",
              imagen: "https://image.flaticon.com/icons/svg/1077/1077891.svg",
            },            

          ]
        },


      ]

    }
  }
  

  return (
    <div>
      <NavComponent logo={logo} />
      <div className="grid grid-cols-6">
        <div className="col-span-6 md:col-span-4">
          {data.Unidad.modulo.map((modulo, index) => (
            <EModule
              key={index}
              nombre={modulo.nombre}
              percent={modulo.progreso}
              actividades={modulo.actividades}
              progresoModulo={progesoModulo}
              progresoTotal={progresoTotal}
              setProgesoModulo={setProgesoModulo}
              setprogresoTotal={setprogresoTotal}
              actividades={modulo.actividades}
            />
          ))}
        </div>
        <div className="md:col-span-2">
          {/* progreso libros */}
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
                  {/*  <svg xmlns="http://www.w3.org/2000/svg" className="h-6" fill="white" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                   </svg> */}
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
       {/* progreso modulo */}
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
          <EModule percent={100} />
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