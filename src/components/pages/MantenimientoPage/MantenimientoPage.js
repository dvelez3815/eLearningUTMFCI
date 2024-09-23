import React from "react";

import fixion from '../../../assets/resource/fixion.svg'
const MantenimientoPage = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div  className="space-y-2  p-6 mx-4">
                <img src={fixion} width={250} alt="En mantenimiento" />
                <h1 className="text-3xl text-gray-800  font-semibold text-center">Sitio en Mantenimiento</h1>
                <p className="text-gray-500 text-center">Volveremos el <strong>Domingo 29 de Septiembre del 2024</strong></p>
                <p className="text-gray-500 text-center">Para consultas contacte al correo <a href="mailto:ilm@utm.edu.ec">ilm@utm.edu.ec</a></p>

            </div>
        </div>
    )
}

export default MantenimientoPage;