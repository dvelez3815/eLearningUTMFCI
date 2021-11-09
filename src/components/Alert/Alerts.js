import Swal from "sweetalert2";
import "./Alert.css";

const ErrorData = {
    title: "Oops..",
    type: "error",
    text: "Wrong answer!",
    confirmButtonText: "Ok",

};
  
const SuccessData = {
    title: "Great",
    type: "success",
    text: "Excelent!.",
  };


export const mostrarAlertaError= (respuesta)=>{
    let cadena = "";
    if(Array.isArray(respuesta)){
        respuesta.forEach((item)=>{
            cadena+= (item + " <br/>")
        })
    }

    Swal.fire(
        {
            title: "Oops..",
            type: "error",
            html: Array.isArray(respuesta)?"<p style='color:green; font-weight: bold;'>Correct Answer: </p>"+cadena:"<p style='color:green; font-weight: bold;'>Correct Answer: </p>"+respuesta,
            customClass: 'swal-wide',
            confirmButtonText: "Ok",
        },
    ).then((result) => {
        if (result.value) {
            
            // window.location = "/modulo/1/grammar/2";
        } else {
            
        }
    });
}

export const finPrueba= (aciertos, total)=>{
    Swal.fire(
        {
            title: "Resultado",
            type: "success",
            text: "You have answered " + aciertos+ " questions correctly out of "+total,
            confirmButtonText: "Ok",
        },
    ).then((result) => {
        if (result.value) {
            ////console.log('.')
            window.location = "/evaluacion";
        } else {
            
        }
    });
}


export const mostrarAlertaExito= ()=>{
    Swal.fire({
        ...SuccessData
    }).then((result) => {
        if (result.value) {
            
            // window.location = "/modulo/1/grammar/3";
        } else {
            
        }
    });
}


export const mostrarAlertaExitoFin= ()=>{
    Swal.fire({
        ...SuccessData
    }).then((result) => {
        if (result.value) {
            
            window.location = "/dashboard";
        } else {
            
        }
    });
}

export const mostrarImagen = (img) =>{
Swal.fire({
    imageUrl: img, 
    imageAlt: "Text img", 
    showCloseButton: true
})
}

export const mostrarAlertaSalir= ()=>{
    Swal.fire(
        {
            title: "Are you sure?",
            type: "error",
            text: "You are almost to exit, you will loose all your progress.",
            confirmButtonText: "Ok",
            showCancelButton: true,
        }
    ).then((result) => {
        if (result.value) {
            
            window.location = "/dashboard";
        } else {
            
        }
    });
}
