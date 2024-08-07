import React, { useEffect, useState } from "react";

import LogoProvicional from "../../../assets/resource/Logo_Provicional.png";
import Logo_ing from "../../../assets/resource/Logo_ing.png";
import moment from "moment";
import { Link } from "react-router-dom"
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { set, useForm } from "react-hook-form";
import { getUserByCedula } from "../../../api/User";
import { getPorgressByMail } from "../../../api/Progress";
import { mostrarExitoEditar } from "../../Alert/Alerts";
import { createExamenUsuario, getExamenUsuario, getExams } from "../../../api/Exams";
import 'moment/locale/es';

const RegisterExam = () => {


    const formSchema = Yup.object().shape({
        horario: Yup.string().required('Debe seleccionar un horario'),
        cedula: Yup.string().required('Es obligatorio ingresar y validar la cedula').matches(/^[0-9]+$/, 'La cedula solo puede contener números').min(10, 'La cedula debe tener 10 dígitos').max(10, 'La cedula debe tener 10 dígitos'),
        validPresionado: Yup.boolean().oneOf([true], 'Debes validar la cédula')

    })
    const formOptions = {
        resolver: yupResolver(formSchema),
        defaultValues: {
            validPresionado: false
        }
    }
    const { register, setValue, handleSubmit, formState: { errors } } = useForm(formOptions);
    const [cedula, setCedula] = useState('');
    const [user, setUser] = useState({})
    const [examenes, setExamenes] = useState([])
    const [cargando, setCargando] = useState(true)
    const [sedeSelected, setSedeSelected] = useState('')
    const [sedes, setSedes] = useState([])
    const [horarios, setHorarios] = useState([])
    moment.locale('es-us')

    const onSubmit = async (form) => {
        const user_examen = {
            id_user: user._id,
            id_examen: form.horario
        }

        try {
            const examen_user_response = await createExamenUsuario(user_examen)
            console.log(examen_user_response)
            if (!examen_user_response) throw new Error("ExamenUserError: No se pudo guardar el examen");
            mostrarExitoEditar(
                "Exito",
                "Se ha registrado su fecha de examen",
                "success"
            );
        } catch (error) {
            if (error.message === "Failed to fetch") {
                mostrarExitoEditar(
                    "Error",
                    "No se encontró el conexión con el servidor",
                    "error"
                );
                return;
            }

            if (error.message.startsWith("ExamenUserError")) {
                mostrarExitoEditar(
                    "Error",
                    "No se pudo guardar el examen",
                    "error"
                );
                return;
            }
        }
    }
    const verificar_cedula = async () => {
        setUser({})
        try {
            const _user = await getUserByCedula(cedula);
            if (!_user) throw new Error("UserError: No existe usuario");
            const examen_user = await getExamenUsuario(_user._id);
            if (examen_user) throw new Error("ExamError: El usuario ya tiene un examen registrado")
            const porcentaje = await getPorgressByMail(_user.mail)
            if (!porcentaje) throw new Error("ProgressError: El usuario no tiene progreso");
            if (porcentaje < 100) throw new Error("PorcentajeError: El usuario no ha completado el simulador");
            setUser({
                _id: _user._id,
                name: _user.name,
                lastname: _user.lastname,
                mail: _user.mail
            })
            setValue('validPresionado', true)
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
            if (error.message.startsWith("ExamError")) {
                mostrarExitoEditar(
                    "Error",
                    "El usuario ya tiene un examen registrado",
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

    const getExam = async () => {
        const _examenes = await getExams();
        setExamenes((exam) => [..._examenes])
        const _sedes = new Set(_examenes.map((examen) => examen.lugar))
        setSedes((sede) => [..._sedes])
    }
    const changeSede = (event) => {
        setSedeSelected(event.target.value)
        const _horarios = examenes.filter((examen) => examen.lugar === event.target.value)
        setHorarios((horario) => [..._horarios])
    }

    useEffect(() => {
        getExam()
        setCargando(false)
    }, [])
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
                            <input
                                type="hidden"
                                {...register('validPresionado')}
                            />

                            <div>
                                <h4 class="md:text-lg text-md font-semibold mb-2 text-left">Cédula de Identidad o Documento de Identidad:</h4>
                                <div class="flex space-x-2">
                                    <input name="cedula" type="text" {...register("cedula")} placeholder="Número de documento" onChange={(event) => setCedula(() => event.target.value)} defaultValue={cedula} class="w-full p-2 border border-gray-300 rounded-lg" />
                                    <button type="button" onClick={verificar_cedula} class=" bg-yellowutm p-2 px-4  text-white rounded hover:bg-yellow-400 border border-yellow-400">Buscar</button>
                                </div>
                                {errors.cedula && (
                                    <p className="text-red-500 text-sm text-left">{errors.cedula.message}</p>
                                )}
                                {errors.validPresionado && (
                                    <p className="text-red-500 text-sm text-left">{errors.validPresionado.message}</p>
                                )}

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
                            {cargando ? <div>Cargando</div> :
                                <>
                                    <div >
                                        <h4 class="md:text-lg text-md text-left font-semibold mb-2">Lugar:</h4>
                                        <select id="tipo_sex" onChange={changeSede} defaultValue={sedeSelected} class="w-full p-2 border border-gray-300 rounded-lg" name="lugar">
                                            <option value="">Seleccionar</option>
                                            {
                                                sedes.map((sede) => {
                                                    return (
                                                        <option key={sede} value={sede}>{sede}</option>

                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div class="flex flex-col">
                                        <h4 class="md:text-lg text-md font-semibold mb-2 text-left">Fecha y Hora:</h4>
                                        {
                                            horarios.length !== 0 ? horarios.map((horario) => {
                                                return (
                                                    <div class="flex items-left mb-2" key={horario._id}>
                                                        <input id={horario.fecha} name="fecha" type="radio" value={horario._id} class="mr-2"   {...register("horario")} />
                                                        <label htmlFor={horario.fecha} class="text-gray-700">{moment(horario.fecha).format('dddd MMMM Do YYYY')} - {horario.hora}</label>
                                                    </div>
                                                )
                                            }) : <div><h3 className="md:text-md text-sm mb-2 text-center">No hay horarios disponibles. Seleccione un lugar </h3></div>
                                        }
                                        {errors.horario && (
                                            <p className="text-red-500 text-sm text-left">{errors.horario.message}</p>
                                        )}
                                    </div>
                                </>
                            }
                            <div class="hidden my-4"></div>
                            <div className="space-x-2">
                            <button type="submit" class="bg-green-500 text-white py-2 px-4 rounded-lg">Enviar</button>
                            <button type="button" class="bg-red-500 text-white py-2 px-4 rounded-lg" onClick={ ()=> window.location="/"}>Cerrar</button>

                            </div>
                        </form>
                    </div>

                </div>

            </div>
        </div >
    )
}

export default RegisterExam;
