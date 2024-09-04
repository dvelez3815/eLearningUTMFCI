import React, { useEffect, useState } from "react";

import LogoProvicional from "../../../assets/resource/Logo_Provicional.png";
import Logo_ing from "../../../assets/resource/LOGO_ILM_HORIZONTAL.png";
import moment from "moment";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { set, useForm } from "react-hook-form";
import { getUserByCedula } from "../../../api/User";
import { getPorgressByMail } from "../../../api/Progress";
import { mostrarExitoEditar } from "../../Alert/Alerts";
import { createExamenUsuario, deleteExamenUsuario, getExamenUsuario, getExams } from "../../../api/Exams";
import 'moment/locale/es';
import Loading from "../../Loading/Loading";

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
    const [user, setUser] = useState({});
    const [examenes, setExamenes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [sedeSelected, setSedeSelected] = useState('');
    const [fechaSelected, setFechaSelected] = useState('');

    const [sedes, setSedes] = useState([]);
    const [fechas, setFechas] = useState([]);
    const [horarios, setHorarios] = useState([]);
    const [enviando, setEnviando] = useState(false);
    moment.locale('es-us')

    const onSubmit = async (form) => {
        setEnviando(true)
        const user_examen = {
            id_user: user._id,
            id_examen: form.horario
        }

        try {
            const examen_user = await getExamenUsuario(user._id);
            if (examen_user) {
                const delete_examen_user = await deleteExamenUsuario(user._id, examen_user.id_examen);
                if (!delete_examen_user) throw new Error("ExamError: No se pudo actualizar el examen");
            }
            const examen_user_response = await createExamenUsuario(user_examen)
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
            if (error.message.startsWith("ExamError")) {
                mostrarExitoEditar(
                    "Error",
                    "No se pudo actualizar el examen",
                    "error"
                );
                return;
            }
        } finally {
            setEnviando(false)
        }
    }
    const verificar_cedula = async () => {
        setUser({})
        try {
            setEnviando(true)
            const _user = await getUserByCedula(cedula);
            if (!_user) throw new Error("UserError: No existe usuario");
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
                    "No se pudo eliminar el examen",
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
        } finally {
            setEnviando(false)
        }
    }

    const getExam = async () => {
        const _examenes = await getExams();
        setExamenes((exam) => [..._examenes])
        const _sedes = new Set(_examenes.map((examen) => examen.lugar))
        setSedes((sede) => [..._sedes])
    }
    const changeSede = (event) => {
        setFechas((fecha) => [])
        setHorarios((horario) => [])
        setSedeSelected(event.target.value)
        const _fechas = examenes.filter((examen) => examen.lugar === event.target.value).sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        const _fechas_filtered = new Set(_fechas.map((fecha) => fecha.fecha))
        setFechas((fechas) => [..._fechas_filtered])
    }

    const changeFecha = (event) => {
        setHorarios((horario) => [])
        setFechaSelected(event.target.value)
        const _horarios = examenes.filter((examen) => examen.lugar === sedeSelected && examen.fecha === event.target.value).sort()
        setHorarios((horario) => [..._horarios])
    }


    useEffect(() => {
        getExam()
        setCargando(false)
    }, [])
    return (
        <div className=" overflow-x-hidden ">
            <div className=" mx-auto z-20  flex p-5 h-auto items-center">
                <div className=" md:ml-10 ">
                    <a href='https://www.utm.edu.ec/' target='_blank' rel="noreferrer" >
                        <img className=" md:h-20 lg:h-20 sm:h-20 h-16" src={LogoProvicional} alt="logo" />
                    </a>
                </div>
                <div className=" flex flex-grow justify-end md:mr-20">
                    <div className=" md:ml-10 ">
                        <a href='https://www.utm.edu.ec/idiomas' target='_blank' rel="noreferrer" >
                            <img className=" md:h-20 lg:h-20 sm:h-20 h-16" src={Logo_ing} alt="logo" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6  mx-auto max-w-4xl">
                <div className="flex flex-col items-center align-center bg-greenutm">
                    <div className="text-center ">
                        <h2 className="text-white  md:text-3xl text-2xl  font-bold p-4 rounded-t-lg">Registro al Examen de Suficiencia de Inglés</h2>
                    </div>
                </div>
                <div className="flex flex-col items-center my-2 bg-green-100">
                    <div className="bg-green-100 p-6 rounded-lg mb-6">
                        <h2 className=" md:text-2xl text-lg font-semibold text-center mb-4">¡Bienvenido al proceso de inscripción para el examen de exoneración de Suficiencia de Inglés! </h2>
                        <h2 className="text-md text-justify text-gray-800">
                            A continuación, encontrarás un formulario que debes completar para inscribirte al examen. Por favor, asegúrate de llenar todos los campos con información precisa y actualizada. Las fechas y horas del examen, así como los lugares disponibles, están preestablecidos y se muestran en los campos correspondientes.
                        </h2>
                        <h3 className="text-md text-justify text-gray-900 font-bold">Si desea cambiar la fecha de su examen, por favor, envíe el formulario otra vez con su información.</h3>
                        {sedeSelected === "PORTOVIEJO" &&
                            <p className="text-md  text-justify font-semibold text-gray-900">El examen será evaluado en el laboratorio del Instituto de Lenguas Modernas ubicado en los bajos de la Facultad de Ciencias Básicas (tercera puerta de la UTM) </p>
                        }
                    </div>
                </div>

                <div className="flex flex-col items-center">

                    <div className="p-6 rounded-lg">
                        <form className="space-y-4" id="frm-registro" onSubmit={handleSubmit(onSubmit)}>
                            <input
                                type="hidden"
                                {...register('validPresionado')}
                            />

                            <div>
                                <h4 className="md:text-lg text-md font-semibold mb-2 text-left">Cédula de Identidad o Documento de Identidad:</h4>
                                <div className="flex space-x-2">
                                    <input name="cedula" type="text" {...register("cedula")} placeholder="Número de documento" onChange={(event) => setCedula(() => event.target.value)} defaultValue={cedula} className="w-full p-2 border border-gray-300 rounded-lg" />
                                    <button type="button" onClick={verificar_cedula} disabled={enviando} className="bg-yellowutm p-2 px-4  text-white rounded hover:bg-yellow-400 border border-yellow-400">Buscar</button>
                                </div>
                                {errors.cedula && (
                                    <p className="text-red-500 text-sm text-left">{errors.cedula.message}</p>
                                )}
                                {errors.validPresionado && (
                                    <p className="text-red-500 text-sm text-left">{errors.validPresionado.message}</p>
                                )}

                            </div>
                            <div className="grid grid-cols-2 gap-4 text-left">
                                <div>
                                    <h4 className="md:text-lg text-md font-semibold mb-2">Apellidos:</h4>
                                    <input name="lastname" type="text" id="lastname" placeholder="Apellidos" disabled defaultValue={user.lastname} className="w-full p-2 border border-gray-300 rounded-lg" />
                                </div>
                                <div>
                                    <h4 className="md:text-lg text-md font-semibold mb-2">Nombres:</h4>
                                    <input name="name" type="text" id="name" placeholder="Nombres" disabled defaultValue={user.name} className="w-full p-2 border border-gray-300 rounded-lg" />
                                </div>
                            </div>
                            <div>
                                <h4 className="md:text-lg text-md font-semibold mb-2 text-left">Dirección de correo electrónico:</h4>
                                <input id="mail" name="mail" type="email" placeholder="usuario@utm.edu.ec" disabled defaultValue={user.mail} className="w-full p-2 border border-gray-300 rounded-lg" />
                            </div>
                            {cargando ? <div>Cargando</div> :
                                <>
                                    <div >
                                        <h4 className="md:text-lg text-md text-left font-semibold mb-2">Lugar:</h4>
                                        <select id="tipo_sex" onChange={changeSede} defaultValue={sedeSelected} className="w-full p-2 border border-gray-300 rounded-lg" name="lugar">
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
                                    <div >
                                        <h4 className="md:text-lg text-md text-left font-semibold mb-2">Fecha:</h4>
                                        <select id="tipo_sex" onChange={changeFecha} defaultValue={fechaSelected} className="w-full p-2 border border-gray-300 rounded-lg" name="lugar">
                                            <option value="">Seleccionar</option>
                                            {
                                                fechas.map((fecha) => {
                                                    return (
                                                        <option key={fecha} value={fecha}>{moment(fecha).format('dddd MMMM Do YYYY')}</option>

                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="flex flex-col">
                                        <h4 className="md:text-lg text-md font-semibold mb-2 text-left">Hora:</h4>
                                        {
                                            horarios.length !== 0 ? horarios.map((horario) => {
                                                const [horas, minutos, segundos] = horario.hora.split(':');
                                                const hora_formated = new Date();
                                                hora_formated.setHours(parseInt(horas, 10));
                                                hora_formated.setMinutes(parseInt(minutos, 10));
                                                hora_formated.setSeconds(parseInt(segundos, 10));
                                                return (
                                                    <div className="flex items-left mb-2" key={horario._id}>
                                                        <input id={horario.fecha} name="fecha" type="radio" value={horario._id} className="mr-2"   {...register("horario")} />
                                                        <label htmlFor={horario.fecha} className="text-gray-700">{hora_formated.toLocaleTimeString('en-US', {
                                                            hour: 'numeric',
                                                            minute: 'numeric',
                                                            hour12: true,
                                                        })}</label>
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
                            <div className="hidden my-4"></div>
                            {enviando && <Loading />}
                            <div className="space-x-2">
                                <button type="submit" disabled={enviando} className="bg-green-500 text-white py-2 px-4 rounded-lg">Enviar</button>
                                <button type="button" className="bg-red-500 text-white py-2 px-4 rounded-lg" onClick={() => window.location = "/"}>Cerrar</button>

                            </div>
                        </form>
                    </div>

                </div>

            </div>
        </div >
    )
}

export default RegisterExam;
