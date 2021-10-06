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
    Swal.fire(
        {
            title: "Oops..",
            type: "error",
            text: "Correct Answer: "+respuesta,
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
            title: "Total aciertos",
            type: "success",
            text: aciertos+"/"+total,
            confirmButtonText: "Ok",
        },
    ).then((result) => {
        if (result.value) {
            
            window.location = "/dashboard";
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
