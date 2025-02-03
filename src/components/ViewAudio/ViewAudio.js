import React, { useState, useEffect } from 'react';

const ViewAudio = ({ audio }) => {
    const [audioSrc, setAudioSrc] = useState(null);
    const API_KEY = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        const obtenerAudio = async () => {
            try {
                const audioResponse = await fetch(
                    `https://www.googleapis.com/drive/v3/files/${audio}?alt=media&key=${API_KEY}`
                );

                if (!audioResponse.ok) throw new Error("Error al cargar el audrio");

                setAudioSrc(audioResponse.url);

            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        };

        obtenerAudio();
    }, [audio, API_KEY]);

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
