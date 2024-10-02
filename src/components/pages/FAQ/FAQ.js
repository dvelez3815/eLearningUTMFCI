import React from 'react';
import NavBar from '../../NavBar/NavBar';
import logo_UTM from "../../../assets/resource/LOGO_SIMPLE_BG.png";
import DOMPurify from 'dompurify';
const FAQ = () => {
    const faqs = [
        {
            question: '¿Qué es el Examen de Acreditación de las Suficiencias de Inglés?',
            answer: 'El Examen de Acreditación de las Suficiencias de Inglés (EASI) es un test con el que puedes avanzar varios niveles de las Suficiencias de Inglés.',
        },
        {
            question: '¿Qué pasa si ya tengo varios niveles aprobados con el anterior proceso de las Suficiencia de Inglés?',
            answer: 'Esos niveles aprobados si son válidos. Para poder aprobar los niveles que aún tienen pendientes tendrá que hacer las actividades en el Simulador y agendar la fecha del examen para poder acreditarlos.',
        },
        {
            question: '¿Qué tengo que hacer para rendir el EASI?',
            answer: 'Sigue los pasos que se presentan en este video tutorial',
            resource: `<video id="media" height="300" controls><source src="/assets/TUTORIAL.mp4" type="video/mp4">Tu navegador no soporta videos.</video>`
        },
        {
            question: '¿Cuántos puntos tengo que obtener para aprobar las Suficiencias de Inglés con el examen EASI?',
            answer: 'Revisa las tabla que se adjunta para que conozcas los puntajes que se requieren para aprobar los niveles de las Suficiencias de Inglés.',
            resource: `<div class="overflow-x-auto dark:bg-neutral-700">
                    <table class="text-left text-sm whitespace-nowrap">
                        <thead class="uppercase tracking-wider border-b-2 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800">
                            <tr>
                                <th scope="col" class="px-6 py-4">
                                    Suficiencia de Inglés
                                </th>
                                <th scope="col" class="px-6 py-4">
                                    Ponderación
                                </th>
                            </tr>
                        </thead>

                        <tbody>

                            <tr class="border-b dark:border-neutral-600">
                                <th scope="row" class="px-6 py-4">
                                    Suficiencia de Inglés I
                                </th>
                                <td class="px-6 py-4">1 - 9 Ptos</td>
                            </tr>

                            <tr class="border-b dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800">
                                <th scope="row" class="px-6 py-4">
                                Suficiencia de Inglés II
                                </th>
                                <td class="px-6 py-4">10 - 19 Ptos</td>
                            </tr>

                            <tr class="border-b dark:border-neutral-600">
                                <th scope="row" class="px-6 py-4">
                                Suficiencia de Inglés III
                                </th>
                                <td class="px-6 py-4">20 - 29 Ptos</td>
                            </tr>

                            <tr class="border-b dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800">
                                <th scope="row" class="px-6 py-4">
                                Suficiencia de Inglés IV
                                </th>
                                <td class="px-6 py-4">30 - 39 Ptos</td>
                            </tr>

                            <tr class="border-b dark:border-neutral-600">
                                <th scope="row" class="px-6 py-4">
                                Suficiencia de Inglés V
                                </th>
                                <td class="px-6 py-4">40 - 100 Ptos</td>
                            </tr>

                        </tbody>

                    </table>

                </div>`
        },
        {
            question: '¿En qué modalidad se tomará el examen EASI?',
            answer: 'El examen se tomará en modalidad presencial. Recuerda que en el Simulador podrás escoger las fechas, hora, y la sede donde deseas tomar el examen EASI. Vale recalcar que las sedes serán Portoviejo, Bahía de Caráquez, Chone y Quito.',
        },
        {
            question: '¿Qué pasaría si no alcanzo el puntaje requerido para aprobar el examen EASI?',
            answer: '¡No hay problema! En caso de ocurrir esto se te asignará una nueva fecha para rendir el examen.',
        },
        {
            question: '¿En qué momento de mis estudios universitarios puedo empezar las actividades en el Simulador y presentarme a rendir el examen EASI?',
            answer: 'Es recomendable que realices las actividades en el Simulador antes de culminar tu carrera universitaria. Recuerda que la Suficiencia de Inglés es un requisito para graduarte.',
        },
        {
            question: '¿Qué tienes que hacer para antes de rendir el examen EASI?',
            answer: 'Para rendir el examen EASI, es obligatorio realizar las actividades en el Simulador.',
        },
        {
            question: '¿Qué es el Simulador?',
            answer: 'Es una plataforma en la que puedes acceder con tu usuario y contraseña UTM para practicar las destrezas lingüísticas del idioma inglés.   El Simulador te ayudará a prepararte para el Examen de Acreditación de las Suficiencias de Inglés (EASI).',
        },
        {
            question: '¿Quiénes puede hacer el Simulador?',
            answer: 'El simulador lo pueden hacer todos los estudiantes de la UTM para que puedan practicar y posterior a esto agendar el examen EASI. ',
        },
        {
            question: '¿Puedo presentarme a dar el examen EASI sin haber finalizado el Simulador?',
            answer: 'No, recuerda que el Simulador es un requisito para dar el examen EASI.',
        },
        {
            question: 'En caso de presentarse problemas técnicos con el Simulador ¿dónde puedo enviar la incidencia? ',
            answer: 'En el caso de haber algún problema técnico con el Simulador, puedes enviar un correo a ilm@utm.edu.ec adjuntando las capturas de pantallas de los ejercicios donde se presentan los problemas. ',
        },
        {
            question: '¿Con que navegadores puedo abrir el Simulador?',
            answer: 'El Simulador lo pueden abrir con los navegadores Google Chrome o Mozilla Firefox. El Simulador no es compatible con Safari y con las Macbook en general.',
        },
        {
            question: '¿Puedo hacer las actividades del Simulador desde mi teléfono móvil?',
            answer: 'Se recomienda realizar las actividades del Simulador desde un PC. ',
        },
        {
            question: '¿Qué pasa si ya domino el idioma inglés y deseo presentarme a dar un examen de exoneración?',
            answer: 'Si este es tu caso, comunícate a correo ilm@utm.edu.ec para que te expliquen los pasos a seguir. ',
        },
        {
            question: '¿Puedo homologar los niveles de las Suficiencias de Inglés? ',
            answer: 'Si, para realizar este proceso te puedes comunicar al correo ilm@utm.edu.ec para que te expliquen los pasos a seguir.',
        },
        {
            question: '¿Qué pasará con los estudiantes con necesidades educativas especiales y que no puedan rendir el examen de manera presencial?',
            answer: 'Todos los estudiantes reportados por la Unidad de Inclusión, Equidad Social y Género se les asignará un docente para que realicen las actividades enviadas por ellos para que puedan acreditar los niveles de las Suficiencias de Inglés.',
        },

    ];

    return (
        <div className="h-screen flex flex-col relative">
            <NavBar />
            <div className="max-w-3xl mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Preguntas Frecuentes</h1>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-gray-100 rounded-lg p-4 shadow-md transition hover:shadow-lg">
                            <h2 className="font-semibold text-lg text-gray-700">{faq.question}</h2>
                            <p className="mt-2 text-gray-600">{faq.answer}</p>
                            {faq.resource &&
                                <div className="flex justify-center items-center" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(faq.resource) }}></div>
                            }
                        </div>
                    ))}
                    <p className="mt-2 text-gray-600"> Cualquier otra inquietud que tenga sobre el proceso del examen EASI que no esté explicado en esta sección puedes comunicarte al correo <strong>ilm@utm.edu.ec</strong></p>
                </div>
            </div>
            <div className="absolute -bottom-24 hidden lg:block md:block -left-40 p-4 opacity-30">
                <img src={logo_UTM} alt="Marca de agua" className="h-96" />
            </div>
        </div>
    );
};

export default FAQ;
