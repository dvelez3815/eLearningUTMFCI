
import React, { useEffect, useState } from "react";
const Viewimage = ({ img }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const obtenerImagen = async () => {
      try {
        const imageResponse = await fetch(
          `https://www.googleapis.com/drive/v3/files/${img}?alt=media&key=${API_KEY}`
        );

        if (!imageResponse.ok) throw new Error("Error al cargar la imagen");

        setImageSrc(imageResponse.url);
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };
    obtenerImagen();
  }, [img]);


  return (
    <div className="m-auto my-6">
      {imageSrc ?
        <img src={imageSrc} alt="Descripción de la imagen" className="h-60" /> :
        <p>Loading Image...</p>
      }
    </div>
  );
}

export default Viewimage;
