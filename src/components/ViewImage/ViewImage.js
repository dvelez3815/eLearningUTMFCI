
import React, { useEffect, useState } from "react";
import { getImageOfQuestion } from "../../api/Questions"

const Viewimage = ({ img }) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const obtenerImagen = async () => {
      try {
        const imageResponse = await getImageOfQuestion(img);

        if (!imageResponse) throw new Error("Error al cargar la imagen");
        const blob = await imageResponse.blob(); // Convertimos la respuesta en Blob
        const imagenUrl = URL.createObjectURL(blob);

        setImageSrc(imagenUrl);
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
