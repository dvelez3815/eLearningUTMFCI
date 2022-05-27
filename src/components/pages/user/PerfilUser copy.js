
import React, { useState, useEffect } from "react";
import logo from "../../../assets/resource/Logo_Provicional.png";
import loading from "../../../assets/resource/loading.svg"
import NavComponent from "../../NavComponent";
import axios from "axios";

import {
  mostrarAlertaConfimacion,
  mostrarExitoEditar,
  Confirmacion,
} from "../../Alert/Alerts";

import Cookie from "universal-cookie";
const cookies = new Cookie();
let valorProgress = cookies.get("progreso")
const USER = JSON.parse(localStorage.getItem("user"));

var options = { year: 'numeric', month: 'long', day: 'numeric' };

const PerfilUser = () => {
  useEffect(async () => {
    if (!cookies.get("_id")) {
      window.location.href = "./signin";
    }
    getProgress()
  }, []);

  const [form, setForm] = useState({
    username: USER.name,
    lastname: USER.lastname,
  });
  const [cargando, setCargando] = useState(false);
  const [cargando2, setCargando2] = useState(false);
  const [progresoU, setProgresoU] = useState([]);
  const [isVisibleDato, setIsVisibleDato] = useState("hidden");
  const [colorButton, setcolorButton] = useState("bg-blue-400 hover:bg-blue-300");
  const [dato, setDato] = useState("");
  const rank = []


  const getProgress = async () => {
    setCargando2(true)
    let responseTask = null
    try {
        responseTask = await fetch(`${process.env.REACT_APP_API_URL}/task/task/date`, {
            method: "GET",
            headers: {
            token: process.env.REACT_APP_SECRET_TOKEN,
            },
        }) 
    } catch (e) {
        //mostrarExitoEditar("Error", "No se encontró conexión con el servidor", "error")
        alert('error')
        setDato('No se pudieron cargar los datos, recargue la página')
        setCargando(false);
        return
    }
    let _task = await responseTask.json()
    let task =  (_task.data).length

    let responseProg = null
    try {
      responseProg = await fetch(`${process.env.REACT_APP_API_URL}/user/`, {
            method: "GET",
            headers: {
            token: process.env.REACT_APP_SECRET_TOKEN,
            },
        }) 
    } catch (e) {
        //mostrarExitoEditar("Error", "No se encontró conexión con el servidor", "error")
        alert('error')
        setDato('No se pudieron cargar los datos, recargue la página')
        setCargando(false);
        return
    }
    let _progress = await responseProg.json()
    let _users = JSON.parse(_progress.user)
    
    let indice = -1
    try {
      const _userData =_users.map((e) => {
          indice ++
          let cant_resu = 0
          let resueltas = e.progress.tasks_id
          if(resueltas){
                  cant_resu=resueltas.length
              }
 
          let cant_task=task
          let calculo = (cant_resu * 100) / cant_task 
          let porcentaje = parseFloat(calculo.toFixed(2)) 

          return {
              _id: e._id,
              name: e.name.toUpperCase(),
              progreso: porcentaje
          }
      })
      let id = []
      let ranting = []
      for (let i = 0; i < _userData.length; i++) {
        id.push(_userData[i].progreso)
    }
      function comparar(a,b){return b - a}
      let id_ordenado = id.sort(comparar)
      setProgresoU(await _userData)
      rank.push([(_userData.filter(e => e.progreso === id_ordenado[0]))[0].name, (_userData.filter(e => e.progreso === id_ordenado[0]))[0].progreso]) 
      rank.push([(_userData.filter(e => e.progreso === id_ordenado[1]))[0].name, (_userData.filter(e => e.progreso === id_ordenado[1]))[0].progreso]) 
      rank.push([(_userData.filter(e => e.progreso === id_ordenado[2]))[0].name, (_userData.filter(e => e.progreso === id_ordenado[2]))[0].progreso]) 

      console.log('id',rank)    
      console.log(_userData)
      setCargando2(false)

  } catch (error) {
      
  }
  
}

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  const activar = () =>{
    if(isVisibleDato === 'hidden'){
      setIsVisibleDato('')
      setcolorButton("bg-red-400 hover:bg-red-300")
    }else{
      setIsVisibleDato('hidden')
      setcolorButton("bg-blue-400 hover:bg-blue-300")
    }
  }

  const handleSubmit = async (event) => {
    let roldAdd =  mostrarAlertaConfimacion('EDITAR','Su nombre y apellido se modificará')
  if ((await roldAdd).value) {
    event.preventDefault();
    //check if inputs are undefined
    if (form.username === undefined || form.lastname === undefined  ){
      alert("Por favor llene todos los campos");
      return true;
    }
    let updateUser = null
    setCargando(true);
      try {
          updateUser = await fetch(`${process.env.REACT_APP_API_URL}/user/update/data`, {
              method: "POST",
              /* headers: {
              },*/
              headers: {
                  token: process.env.REACT_APP_SECRET_TOKEN,
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  _id: USER._id,
                  name:form.username.toUpperCase(),
                  lastname:form.lastname.toUpperCase(),
                  option: "NOMBRE"
              })
          })
      } catch (e) {
        console.log('err',e)
          mostrarExitoEditar("Error", "No se encontró conexión con el servidor", "error")
          return
      }
      const _updateUser = await updateUser.json();
      console.log('err',_updateUser)
      if(_updateUser.msg === "ERROR"){
        setDato("Hubo un error al conectar con el servidor");
        setIsVisibleDato("");
        setCargando(false);
        setInterval(() => {
          setDato("");
          setIsVisibleDato("hidden");
        }, 20000);

      } else {
        const itemStr = localStorage.getItem('user')
        const itemData = JSON.parse(itemStr)

        itemData.name = form.username.toUpperCase()
        itemData.lastname = form.lastname.toUpperCase()

        const nuevoItemStr = JSON.stringify(itemData)
        localStorage.setItem('user', nuevoItemStr)

        console.log('val',USER)
        setCargando(false);
        Confirmacion("Exito", "Se ha actualizado con éxito", "success")
        window.location.href = "/profile";
        return
      }

  } else {
      return
  }
  
    }

    return (
        <div className="bg-gray-50 pb-10 h-full">
            <NavComponent logo={logo} activado={1} />
            <div className="mx-auto ">
              
                <div className="w-full lg:w-8/12 mx-auto px-4">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-8">
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
                        <div className="mx-auto inline-flex flex">
                          
                          <div>
                          <h3 className=" text-xl mx-auto capitalize font-semibold leading-normal  text-gray-700 ">
                          {USER.name + ' ' + (USER.lastname === 'null'?'':USER.lastname)}
                          </h3>
                          </div>
                          <div className="pl-4">
                          <button type="button" onClick={activar} className={colorButton+"text-white  text-center inline-flex items-center justify-center w-10 h-10  shadow-lg rounded-full"}>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                            </button>
                          </div>
                          
                        </div>
                        
                        
                        <div className={isVisibleDato + " rounded-md shadow-inner shadow-md bg-gray-100 p-8 pb-8 sm:w-1/2 mx-auto"} >
                          <input type="hidden" name="remember" value="true" />
                          <div className="rounded-md shadow-sm -space-y-px">
                            <div className="flex pb-2">
                              <label htmlFor="email-address" className="pt-2 pr-2">
                                Nombres
                              </label>
                              <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                value={form.username}
                                onChange={handleChange}
                                className="appearance-none  rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                                placeholder="Nombres"                        
                              />
                            </div>
                            <div className="flex pb-2">
                              <label htmlFor="email-address" className="pt-2 pr-2">
                                Apellidos
                              </label>
                              <input
                                id="lastname"
                                name="lastname"
                                type="text"
                                autoComplete="lastname"
                                required
                                value={form.lastname}
                                onChange={handleChange}
                                className="appearance-none  rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                                placeholder="Apellidos"
                              />
                            </div>
                          
                          </div>
                          {cargando && <div className="flex items-center justify-center"><img src={loading} width={50} alt="cargando"></img></div>}
                          <div>
                            <button
                              type="submit"
                              disabled={cargando}
                              onClick={handleSubmit}
                              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                            >
                              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                              </svg>
                              </span>
                              Actualizar
                            </button>
                          </div>
                        </div>
                        <div className="text-sm leading-normal mt-0 mb-2 pt-2 text-gray-500 ">
                          {USER.mail }

                        </div>
                        <div className="text-sm leading-normal mt-0 mb-2 text-gray-600 ">
                          Se unió el { new Date(USER.creado).toLocaleDateString("es-ES", options)}

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
                      {cargando2 ?
                       <div className="flex items-center justify-center"><img src={loading} width={50} alt="cargando"></img></div>                                            
                        :
                        <div className="md:flex  justify-center">
                          <div className="w-full lg:w-9/12 px-4">
                                  <h2 className="font-bold text-left">
                                    Logros
                                  </h2>
                                  <div className=" border rounded-lg py-4">
                                    <div className="px-3 pb-4">
                                    <div className="bg-blue-500  text-white font-bold uppercase text-base h-20  rounded-lg shadow-md outline-none  mr-1 mb-1 ease-linear " type="button">
                                        <i className="fas fa-heart"></i>
                                      </div>
                                      <h3 className="text-sm leading-snug">
                                        Completar una lección
                                      </h3>
                                    </div>
                                    <div className="px-3 pb-4">
                                    <div className="bg-blue-500 text-white font-bold uppercase text-base h-20  rounded-lg shadow-md outline-none  mr-1 mb-1 ease-linear " type="button">
                                        <i className="fas fa-heart"></i>
                                      </div>
                                      <h3 className="text-sm leading-snug">
                                        Completar un libro
                                      </h3>
                                    </div>
                                    <div className="px-3 ">
                                      <div className="bg-blue-500 text-white font-bold uppercase text-base h-20  rounded-lg shadow-md outline-none  mr-1 mb-1 ease-linear " type="button">
                                        <i className="fas fa-heart"></i>
                                      </div>
                                      <h3 className="text-sm leading-snug">
                                        Completar todos los libros
                                      </h3>
                                    </div>
                                  </div>
                          </div>
                          <div className="md:pt-0 pt-5 w-full lg:w-9/12 px-4">
                                  <h2 className="font-bold text-left">
                                    Rating
                                  </h2>
                                  <div className="overflow-auto border rounded-lg lg:overflow-visible ">
                                    <table className="table px-3 text-gray-900 border-separate space-y-2 text-sm">
                                      <thead className="bg-gray-800 text-gray-100">
                                        <tr>
                                          <th className="py-1 md:px-10 px-8"></th>
                                          <th className=" py-1 w-full text-left">Nombre</th>
                                          <th className=" py-1  px-5 text-center">Progreso</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr className="bg-gray-200">
                                          <td className="py-1 pl-3">
                                            <div className="flex align-items-center">
                                              <img className="rounded-full h-12 w-12  object-cover" src="https://images.unsplash.com/photo-1613588718956-c2e80305bf61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80" alt="unsplash"/>
                                            </div>
                                          </td>
                                          <td className="py-1 pl-3 text-xs text-left">
                                          {rank[0][0]}
                                          </td>
                                          <td className="py-1">
                                            <span className="bg-green-400 text-gray-50 rounded-md px-2 sm:p-1">{rank[0][1]}%</span>
                                          </td>
                                        </tr>
                                        <tr className="bg-gray-200">
                                          <td className="py-1 pl-3">
                                            <div className="flex align-items-center">
                                              <img className="rounded-full h-12 w-12   object-cover" src="https://images.unsplash.com/photo-1423784346385-c1d4dac9893a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="unsplash"/>

                                            </div>
                                          </td>
                                          <td className="py-1 pl-3 text-xs text-left">
                                          {rank[1][0]}
                                          </td>
                                          <td className="py-1">
                                            <span className="bg-yellow-500 text-gray-50 rounded-md px-2 sm:p-1">{rank[1][1]}%</span>
                                          </td>
                                        </tr>
                                        <tr className="bg-gray-200">
                                          <td className="py-1 pl-3">
                                            <div className="flex align-items-center ">
                                            <img className="rounded-full h-12 w-12   object-cover" src="https://images.unsplash.com/photo-1423784346385-c1d4dac9893a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="unsplash"/>
                                            </div>
                                          </td>
                                          <td className="py-1 pl-3 text-left text-xs">
                                          {rank[2][0]}
                                          </td>
                                          <td className="py-1">
                                            <span className="bg-red-500  text-gray-50  rounded-md px-2 sm:p-1">{rank[2][1]}%</span>
                                          </td>
                                        </tr>
                                        <tr className="">
                                          <td className="">
                                            <div className="flex align-items-center">
                                              <span className="  text-center font-bold pl-10">...</span>
                                            </div>
                                          </td>
                                          <td className=" font-bold  text-center">
                                          ...
                                          </td>
                                          <td className="">
                                            <span className="  font-bold  rounded-md px-2 sm:p-1">...</span>
                                          </td>
                                        </tr>
                                        <tr className="bg-gray-200">
                                          <td className="py-1 pl-3">
                                            <div className="flex align-items-center ">
                                            <img className="rounded-full h-12 w-12   object-cover" src="https://images.unsplash.com/photo-1423784346385-c1d4dac9893a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="unsplash"/>
                                            </div>
                                          </td>
                                          <td className="py-1 pl-3 text-left text-xs">
                                          {USER.name} (Tú) 
                                          </td>
                                          <td className="py-1">
                                            <span className="bg-blue-500  text-gray-50  rounded-md px-2 sm:p-1">{valorProgress}%</span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                          </div>
                        </div>
                      }
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            
        </div>
    )
}

export default PerfilUser;