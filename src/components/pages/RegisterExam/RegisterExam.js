import React, { useState } from "react";

import LogoProvicional from "../../../assets/resource/Logo_Provicional.png";
import Logo_ing from "../../../assets/resource/Logo_ing.png";
import { Link } from "react-router-dom"
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useForm } from "react-hook-form";
import { getUserByCedula } from "../../../api/User";
import { getPorgressByMail } from "../../../api/Progress";
import { mostrarExitoEditar } from "../../Alert/Alerts";

const RegisterExam = () => {


    /*  const formSchema = Yup.object().shape({
         mail: Yup.string().email('El correo no es valido').required('Campo requerido'),
         password: Yup.string()
             .required('La contraseña es obligatoria')
     })
     const formOptions = { resolver: yupResolver(formSchema) } */
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [cedula, setCedula] = useState('');
    const [user, setUser] = useState({})
    const [disable, setDisable]= useState(true)

    const onSubmit = async (form) => {
        console.log(form)
    }
    const verificar_cedula = async () => {
        //verificar si el usuario existe en el la base de datos
        setUser({})
        try {
            const _user = await getUserByCedula(cedula);
            if (!_user) throw new Error("UserError: No existe usuario");
            const porcentaje = await getPorgressByMail(_user.mail)
            if (!porcentaje) throw new Error("ProgressError: El usuario no tiene progreso");
            if (porcentaje < 100) throw new Error("PorcentajeError: El usuario no ha completado el simulador");
            console.log(_user, porcentaje)
            setUser({
                name: _user.name,
                lastname: _user.lastname,
                mail: _user.mail
            })
        } catch (error) {
            if (error.message === "Failed to fetch") {
                mostrarExitoEditar(
                    "Error",
                    "No se encontró el conexión con el servidor",
                    "error"
                );
                return;
            }

            if (error.message.startsWith("UserError")) {
                mostrarExitoEditar(
                    "Error",
                    "No se encontró el usuario",
                    "error"
                );
                return;
            }
            if (error.message.startsWith("ProgressError")) {
                mostrarExitoEditar(
                    "Error",
                    "El usuario no tiene progreso",
                    "error"
                );
                return;
            }
            if (error.message.startsWith("PorcentajeError")) {
                mostrarExitoEditar(
                    "Advertencia",
                    "El usuario no ha completado el simulador",
                    "warning"
                );
                return;
            }



        }




    }



    return (
        <div className=" overflow-x-hidden ">
            <div className=" mx-auto z-20  flex px-5 h-auto items-center">
                <div className=" md:ml-10 ">
                    <Link to='https://www.utm.edu.ec/' target='_blank' rel="noreferrer" >
                        <img className=" md:h-20 lg:h-20 sm:h-20 h-16" src={LogoProvicional} alt="logo" />
                    </Link>
                </div>
                <div className=" flex flex-grow justify-end md:mr-20">
                    <div className=" md:ml-10 ">
                        <img className=" md:h-20 lg:h-20 sm:h-20 h-16" src={Logo_ing} alt="logo" />
                    </div>
                </div>
            </div>

            <div class="bg-white shadow-lg rounded-lg p-6  mx-auto max-w-4xl">
                <div class="flex flex-col items-center align-center bg-greenutm">
                    <div class="text-center ">
                        <h2 class="text-white  md:text-3xl text-2xl  font-bold p-4 rounded-t-lg">Registro al Examen de Suficiencia de Inglés</h2>
                    </div>
                </div>
                <div class="flex flex-col items-center my-2 bg-green-100">
                    <div class="bg-green-100 p-6 rounded-lg mb-6">
                        <h2 class=" md:text-2xl text-lg font-semibold text-center mb-4">¡Bienvenido al proceso de inscripción para el examen de exoneración de Suficiencia de Inglés! </h2>
                        <h2 class="text-md text-justify text-gray-800">
                            A continuación, encontrarás un formulario que debes completar para inscribirte al examen. Por favor, asegúrate de llenar todos los campos con información precisa y actualizada. Las fechas y horas del examen, así como los lugares disponibles, están preestablecidos y se muestran en los campos correspondientes
                        </h2>
                    </div>
                </div>

                <div class="flex flex-col items-center">

                    <div class="p-6 rounded-lg">
                        <form class="space-y-4" id="frm-registro" onSubmit={handleSubmit(onSubmit)}>

                            <div>
                                <h4 class="md:text-lg text-md font-semibold mb-2 text-left">Cédula de Identidad o Documento de Identidad:</h4>
                                <div class="flex space-x-2">
                                    <input name="cedula" type="text" placeholder="Número de documento" onChange={(event) => setCedula(() => event.target.value)} defaultValue={cedula} class="w-full p-2 border border-gray-300 rounded-lg" />
                                    <button type="button" onClick={verificar_cedula} class=" bg-yellowutm p-2 px-4  text-white rounded hover:bg-yellow-400 border border-yellow-400">Buscar</button>
                                </div>
                            </div>
                            <div class="grid grid-cols-2 gap-4 text-left">
                                <div>
                                    <h4 class="md:text-lg text-md font-semibold mb-2">Apellidos:</h4>
                                    <input name="lastname" type="text" id="lastname" placeholder="Apellidos" disabled defaultValue={user.lastname} class="w-full p-2 border border-gray-300 rounded-lg" />
                                </div>
                                <div>
                                    <h4 class="md:text-lg text-md font-semibold mb-2">Nombres:</h4>
                                    <input name="name" type="text" id="name" placeholder="Nombres" disabled defaultValue={user.name} class="w-full p-2 border border-gray-300 rounded-lg" />
                                </div>
                            </div>
                            <div>
                                <h4 class="md:text-lg text-md font-semibold mb-2 text-left">Dirección de correo electrónico:</h4>
                                <input id="mail" name="mail" type="email" placeholder="usuario@utm.edu.ec" disabled defaultValue={user.mail} class="w-full p-2 border border-gray-300 rounded-lg" />
                            </div>

                            <div class="hidden my-4"></div>
                            <button type="submit" class="bg-green-500 text-white py-2 px-4 rounded-lg">Enviar</button>
                            <div class="ui error message"></div>
                        </form>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default RegisterExam;
