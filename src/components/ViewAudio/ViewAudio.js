import React, { useState, useEffect } from 'react';
import {getAudioOfQuestion} from "../../api/Questions"
const ViewAudio = ({ audio }) => {
    const [audioSrc, setAudioSrc] = useState(null);

    useEffect(() => {
        const obtenerAudio = async () => {
            try {
                const audioResponse = await getAudioOfQuestion(audio);

                if (!audioResponse) throw new Error("Error al cargar el audrio");
                const blob = await audioResponse.blob(); // Convertimos la respuesta en Blob
                const audioUrl = URL.createObjectURL(blob);

                setAudioSrc(audioUrl);

            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        };

        obtenerAudio();
    }, [audio]);

    return (
        <div className='text-center m-auto flex justify-center items-center'>
            {audioSrc ? (
                <audio controls>
                    <source src={audioSrc} type="audio/mp3" />
                    Tu navegador no soporta la reproducción de audio.
                </audio>
            ) : (
                <p>Cargando audio...</p>
            )}
        </div>
    );
};

export default ViewAudio;
