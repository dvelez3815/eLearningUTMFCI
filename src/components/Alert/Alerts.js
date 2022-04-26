import Swal from "sweetalert2";
import "./Alert.css";

  
const SuccessData = {
    title: "Great",
    type: "success",
    text: "Excelent!.",
  };

//export const Guardar
export const mostrarContenido= (tema,objetivo,explicacion)=>{
    let topic = tema.toLowerCase()
    let obje = objetivo.toLowerCase()
    let exp = explicacion.toLowerCase()
    if(tema.length === 0 || tema==='null'){
        topic = 'There is no topic for this lesson'
    }
    if(objetivo.length === 0 || objetivo==='null'){
        obje = 'There is no objective for this lesson'
    }
    if(explicacion.length === 0 || explicacion==='null'){
        exp = 'There is no explanation for this lesson'
    }
    Swal.fire(
        {
            title: "LESSON INFORMATION ",
            type: "success",
            //html: Array.isArray(respuesta)?"<p style='color:green; font-weight: bold;'>Correct Answer: </p>"+cadena:"<p style='color:green; font-weight: bold;'>Correct Answer: </p>"+respuesta,
            html: "<p style='color:red; font-weight: bold;'>Topic</p>"+topic+"<p> - </p> <p style='color:green; font-weight: bold;'>Objetive</p>"+obje+"<p> - </p> <p style='color:orange; font-weight: bold;'>Explication </p>"+exp,
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

export const mostrarAlertaSalirEva= ()=>{
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
            window.location = "/evaluacion";
        } else {
            
        }
    });
}
