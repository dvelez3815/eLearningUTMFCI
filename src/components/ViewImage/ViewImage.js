
import React, { useEffect, useState } from "react";
const Viewimage = ({ img }) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const obtenerImagen = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/question/image/${img}`);
        if (response.ok) {
          setImageSrc(`${process.env.REACT_APP_API_URL}/question/image/${img}`);
        } else {
          console.error('Error al obtener la imagen');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };
    obtenerImagen();
  }, [img]);


  return (
    <div className="m-auto my-6">
      {imageSrc ?
        <img src={imageSrc} alt="Descripción de la imagen" /> :
        <p>Loading Image...</p>
      }
    </div>
  );
}

export default Viewimage;
