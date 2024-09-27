import React from 'react';
import NavBar from '../../NavBar/NavBar';
import logo_UTM from "../../../assets/resource/LOGO_SIMPLE_BG.png";
const FAQ = () => {
    const faqs = [
        {
            question: '¿Cuál es el horario de atención?',
            answer: 'Nuestro horario de atención es de lunes a viernes de 9:00 AM a 5:00 PM.',
        },
        {
            question: '¿Cómo puedo contactar al soporte?',
            answer: 'Puedes contactar al soporte a través del correo soporte@example.com o llamando al (123) 456-7890.',
        },
        {
            question: '¿Ofrecen garantía en sus productos?',
            answer: 'Sí, ofrecemos una garantía de 1 año en todos nuestros productos.',
        },
        {
            question: '¿Puedo devolver un producto?',
            answer: 'Sí, puedes devolver un producto dentro de los 30 días posteriores a la compra, siempre y cuando esté en su estado original.',
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
                        </div>
                    ))}
                </div>
            </div>
            <div className="absolute -bottom-24 hidden lg:block md:block -left-40 p-4 opacity-30">
                <img src={logo_UTM} alt="Marca de agua" className="h-96" />
            </div>
        </div>
    );
};

export default FAQ;
