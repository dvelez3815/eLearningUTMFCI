import React, { useState, useEffect } from 'react';

const ViewAudio = ({ audio }) => {
    const [audioSrc, setAudioSrc] = useState(null);

    useEffect(() => {
        const obtenerAudio = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/question/audio/${audio}`);
                if (response.ok) {
                    // Establece la URL para reproducir el audio
                    setAudioSrc(`${process.env.REACT_APP_API_URL}/question/audio/${audio}`);
                } else {
                    console.error('Error al obtener el audio');
                }
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
