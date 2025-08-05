import React, { useContext } from 'react';
import NavBar from '../../NavBar/NavBar';
import logo_UTM from "../../../assets/resource/LOGO_SIMPLE_BG.png";
import DOMPurify from 'dompurify';
import { AuthContext } from "../../../context/AuthContext";
import NavComponent from '../../NavComponent';
import logo from "../../../assets/resource/Logo_Provicional.png";
const FAQ = () => {
    const { user } = useContext(AuthContext);
    const faqs = [
        {
            question: "¿Qué es el EASI?",
            answer: "El Examen de Acreditación de las Suficiencias de Inglés (EASI) es una evaluación que permite acreditar varios niveles del requisito de suficiencia en inglés, según el reglamento académico vigente."
        },
        {
            question: "¿Cómo puedo rendir el examen EASI?",
            answer: "Debes seguir los pasos indicados en el video tutorial disponible en el siguiente enlace: ",
            resource: `<video id="media" height="300" controls><source src="/assets/TUTORIAL.mp4" type="video/mp4">Tu navegador no soporta videos.</video>`
        },
        {
            question: "¿Qué ocurre si ya aprobé algunos niveles con el proceso anterior?",
            answer: "Los niveles previamente aprobados siguen siendo válidos. Para acreditar los niveles restantes, deberás completar las actividades en el Simulador y agendar la fecha del examen correspondiente."
        },
        {
            question: "¿Cuál es el puntaje mínimo para aprobar los niveles de suficiencia?",
            answer: "Consulta las tablas adjuntas para conocer los puntajes requeridos por nivel.",
            resource: 
            `<div class="overflow-x-auto rounded-lg shadow-md dark:bg-neutral-800">
                <table class="min-w-full divide-y divide-neutral-300 dark:divide-neutral-600 text-sm text-left">
                    <thead class="bg-green-100 dark:bg-green-600 text-neutral-800 dark:text-white uppercase tracking-wider">
                    <tr>
                        <th scope="col" class="px-6 py-4 font-semibold">Suficiencia de Inglés</th>
                        <th scope="col" class="px-6 py-4 font-semibold">Ponderación</th>
                    </tr>
                    </thead>
                    <tbody class="divide-y divide-neutral-200 dark:divide-neutral-700">
                    <tr class="hover:bg-yellow-50 dark:hover:bg-yellow-700 transition">
                        <th scope="row" class="px-6 py-4 font-medium text-neutral-700 dark:text-white">Suficiencia de Inglés I</th>
                        <td class="px-6 py-4 text-neutral-600 dark:text-neutral-300">10 - 19 Ptos</td>
                    </tr>
                    <tr class="hover:bg-yellow-50 dark:hover:bg-yellow-700 transition">
                        <th scope="row" class="px-6 py-4 font-medium text-neutral-700 dark:text-white">Suficiencia de Inglés II</th>
                        <td class="px-6 py-4 text-neutral-600 dark:text-neutral-300">20 - 29 Ptos</td>
                    </tr>
                    <tr class="hover:bg-yellow-50 dark:hover:bg-yellow-700 transition">
                        <th scope="row" class="px-6 py-4 font-medium text-neutral-700 dark:text-white">Suficiencia de Inglés III</th>
                        <td class="px-6 py-4 text-neutral-600 dark:text-neutral-300">30 - 39 Ptos</td>
                    </tr>
                    <tr class="hover:bg-yellow-50 dark:hover:bg-yellow-700 transition">
                        <th scope="row" class="px-6 py-4 font-medium text-neutral-700 dark:text-white">Suficiencia de Inglés IV</th>
                        <td class="px-6 py-4 text-neutral-600 dark:text-neutral-300">40 - 49 Ptos</td>
                    </tr>
                    <tr class="hover:bg-yellow-50 dark:hover:bg-yellow-700 transition">
                        <th scope="row" class="px-6 py-4 font-medium text-neutral-700 dark:text-white">Suficiencia de Inglés V</th>
                        <td class="px-6 py-4 text-neutral-600 dark:text-neutral-300">50 - 100 Ptos</td>
                    </tr>
                    </tbody>
                </table>
            </div>`
        },
        {
            question: "¿En qué modalidad se aplica el examen EASI?",
            answer: "El examen se realiza de manera presencial. Puedes seleccionar la fecha, hora y sede a través del Simulador. Las sedes disponibles son: Portoviejo, Bahía de Caráquez, Chone y Quito."
        },
        {
            question: "¿Qué sucede si no alcanzo el puntaje necesario?",
            answer: "No te preocupes. Si no apruebas, se te asignará una nueva fecha para rendir el examen nuevamente."
        },
        {
            question: "¿Qué hago si estoy por egresar y no hay fechas cercanas disponibles?",
            answer: "Puedes acercarte a la Dirección del Instituto de Lenguas Modernas o escribir al correo ilm@utm.edu.ec para solicitar una fecha prioritaria."
        },
        {
            question: "¿Cuándo puedo comenzar las actividades en el Simulador y rendir el examen?",
            answer: "Se recomienda iniciar las actividades en el Simulador antes de finalizar tu carrera, ya que la suficiencia en inglés es un requisito de titulación."
        },
        {
            question: "¿Qué debo hacer antes de rendir el examen EASI?",
            answer: "Es obligatorio completar todas las actividades del Simulador antes de presentar el examen."
        },
        {
            question: "¿Qué es el Simulador?",
            answer: "Es una plataforma virtual donde puedes practicar tus habilidades lingüísticas en inglés. Accede con tu usuario y contraseña institucional (UTM). El Simulador te prepara para el examen EASI."
        },
        {
            question: "¿Quiénes pueden usar el Simulador?",
            answer: "Todos los estudiantes de la UTM pueden acceder al Simulador para practicar y agendar el examen."
        },
        {
            question: "¿Puedo rendir el examen sin haber finalizado el Simulador?",
            answer: "No. Completar el Simulador es un requisito indispensable para presentar el examen EASI."
        },
        {
            question: "¿Qué hago si tengo problemas técnicos con el Simulador?",
            answer: "Envía un correo a ilm@utm.edu.ec con capturas de pantalla que evidencien el problema."
        },
        {
            question: "¿Puedo realizar las actividades del Simulador desde mi celular?",
            answer: "No es lo más recomendable. Para disfrutar de una experiencia óptima en nuestra plataforma, recomendamos el uso de dispositivos con pantallas grandes, como laptops, computadoras de escritorio o tablets. Esto permite visualizar mejor los contenidos y facilita la navegación por las distintas funcionalidades."
        },
        {
            question: "¿Qué hago si ya domino el inglés y quiero rendir un examen de exoneración?",
            answer: "Puedes enviar un oficio firmado al correo ilm@utm.edu.ec solicitando el examen de exoneración. Se adjunta el formato correspondiente.",
            resource: `
                <a
                    href="/assets/oficio_exoneracion_ingles.docx"
                    download
                    class="mb-2 px-6 py-2.5 bg-yellow-500 text-white inline-flex items-center font-bold text-xs leading-normal uppercase rounded shadow-md hover:bg-yellow-500 hover:shadow-md focus:bg-yellow-600 focus:outline-none focus:ring-0 active:bg-yellow-800 transition duration-150 ease-in-out"
                    >
                    <svg
                        class="w-5 h-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                        fill="currentColor"
                    >
                        <path d="M352 96C352 78.3 337.7 64 320 64C302.3 64 288 78.3 288 96L288 306.7L246.6 265.3C234.1 252.8 213.8 252.8 201.3 265.3C188.8 277.8 188.8 298.1 201.3 310.6L297.3 406.6C309.8 419.1 330.1 419.1 342.6 406.6L438.6 310.6C451.1 298.1 451.1 277.8 438.6 265.3C426.1 252.8 405.8 252.8 393.3 265.3L352 306.7L352 96zM160 384C124.7 384 96 412.7 96 448L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 448C544 412.7 515.3 384 480 384L433.1 384L376.5 440.6C345.3 471.8 294.6 471.8 263.4 440.6L206.9 384L160 384zM464 440C477.3 440 488 450.7 488 464C488 477.3 477.3 488 464 488C450.7 488 440 477.3 440 464C440 450.7 450.7 440 464 440z"/>
                    </svg>
                    Descargar formato
                </a>
            `
        },
        {
            question: "¿Cómo puedo homologar los niveles de suficiencia en inglés?",
            answer: "Si has cursado inglés en otra universidad/instituto universitario o cuentas con certificaciones internacionales, puedes solicitar la homologación escribiendo a ilm@utm.edu.ec. Debes adjuntar:",
            resource: `
            <div class="flex flex-col space-y-4 max-w-md"> 
            
                <ol class="list-decimal pl-6 space-y-2 text-sm text-gray-600">
                    <li class="bg-yellow-100 text-left p-2 rounded-md shadow-sm hover:bg-yellow-200 transition">
                        Oficio firmado solicitando la homologación.
                    </li>
                    <li class="bg-yellow-100 text-left p-2 rounded-md shadow-sm hover:bg-yellow-200 transition">
                        Certificado académico emitido por la institución donde cursaste inglés, firmado por las autoridades correspondientes.
                    </li>
                    <li class="bg-yellow-100 p-2 text-left rounded-md shadow-sm hover:bg-yellow-200 transition">
                        Certificados internacionales válidos (IELTS, PET, FCE, CAE, MET, TOEFL, entre otros). Una vez recibida la documentación, se analizará y se te notificará por correo electrónico.
                    </li>
                </ol>
                <a
                    href="/assets/Oficio_Homologacion_Ingles.docx"
                    download
                    class="mb-2 w-max self-center px-6 py-2.5 bg-yellow-500 text-white inline-flex items-center font-bold text-xs leading-normal uppercase rounded shadow-md hover:bg-yellow-500 hover:shadow-md focus:bg-yellow-600 focus:outline-none focus:ring-0 active:bg-yellow-800 transition duration-150 ease-in-out"
                    >
                    <svg
                        class="w-5 h-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                        fill="currentColor"
                    >
                        <path d="M352 96C352 78.3 337.7 64 320 64C302.3 64 288 78.3 288 96L288 306.7L246.6 265.3C234.1 252.8 213.8 252.8 201.3 265.3C188.8 277.8 188.8 298.1 201.3 310.6L297.3 406.6C309.8 419.1 330.1 419.1 342.6 406.6L438.6 310.6C451.1 298.1 451.1 277.8 438.6 265.3C426.1 252.8 405.8 252.8 393.3 265.3L352 306.7L352 96zM160 384C124.7 384 96 412.7 96 448L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 448C544 412.7 515.3 384 480 384L433.1 384L376.5 440.6C345.3 471.8 294.6 471.8 263.4 440.6L206.9 384L160 384zM464 440C477.3 440 488 450.7 488 464C488 477.3 477.3 488 464 488C450.7 488 440 477.3 440 464C440 450.7 450.7 440 464 440z"/>
                    </svg>
                    Descargar formato
                </a>
            </div>
            `
        },
        {
            question: "¿Qué pasa si tengo necesidades educativas especiales y no puedo rendir el examen presencial?¿Qué pasa si tengo necesidades educativas especiales y no puedo rendir el examen presencial?",
            answer: `
            Los estudiantes reportados por la Unidad de Inclusión, Equidad Social y Género recibirán apoyo personalizado. Se les asignará un docente que les facilitará actividades adaptadas para acreditar los niveles de suficiencia.
            Todos los estudiantes reportados por la Unidad de Inclusión, Equidad Social y Género serán matriculados en un aula virtual para que puedan realizar las actividades de la Suficiencia de Inglés y así poder acreditarlas.`
        }
    ]


    return (
        <div class="h-screen flex flex-col relative">
            {user ? <NavComponent user={user} logo={logo} activado={1} /> :
                <NavBar />}
            <div class="max-w-3xl mx-auto py-8 px-4">
                <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Preguntas Frecuentes</h1>
                <div class="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} class="bg-gray-100 rounded-lg p-4 shadow-md transition hover:shadow-lg">
                            <h2 class="font-semibold text-lg text-gray-700">{faq.question}</h2>
                            <p class="mt-2 text-gray-600">{faq.answer}</p>
                            {faq.resource &&
                                <div class="flex justify-center items-center" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(faq.resource) }}></div>
                            }
                        </div>
                    ))}
                    <p class="mt-2 text-gray-600"> Cualquier otra inquietud que tenga sobre el proceso del examen EASI que no esté explicado en esta sección puedes comunicarte al correo <strong>ilm@utm.edu.ec</strong></p>
                </div>
            </div>
            <div class="absolute -bottom-24 hidden lg:block md:block -left-40 p-4 opacity-30">
                <img src={logo_UTM} alt="Marca de agua" class="h-96" />
            </div>
        </div>
    );
};

export default FAQ;
