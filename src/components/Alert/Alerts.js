import Swal from "sweetalert2";
import "./Alert.css";

import celebration from "../../assets/resource/winners.svg";
const SuccessData = {
  title: "Great",
  type: "success",
  text: "Excelent!.",
};

//export const Guardar
export const mostrarContenido = (tema, objetivo, explicacion, link) => {
  let topic = tema.toLowerCase();
  let obje = objetivo.toLowerCase();
  let exp = explicacion.toLowerCase();
  if (tema.length === 0 || tema === "null") {
    topic = "There is not topic for this lesson";
  }
  if (objetivo.length === 0 || objetivo === "null") {
    obje = "There is not objective for this lesson";
  }
  if (explicacion.length === 0 || explicacion === "null") {
    exp = "There is not explanation for this lesson";
  }
  Swal.fire({
    title: "LESSON INFORMATION ",
    type: "success",
    //html: Array.isArray(respuesta)?"<p style='color:green; font-weight: bold;'>Correct Answer: </p>"+cadena:"<p style='color:green; font-weight: bold;'>Correct Answer: </p>"+respuesta,
    html:
      "<p style='color:red; font-weight: bold;'>Topic</p>" +
      topic +
      "<p> - </p> <p style='color:green; font-weight: bold;'>Objetive</p>" +
      obje +
      "<p> - </p> <p style='color:orange; font-weight: bold;'>Explication </p>" +
      exp,
    customClass: "swal-wide",
    confirmButtonText: "Ok",
    showCloseButton: true,
    focusConfirm: false,
  }).then((result) => {
    if (result.value) {
      // window.location = "/modulo/1/grammar/2";
    } else {
    }
  });
};

export const mostrarAlertaError = (respuesta) => {
  let cadena = "";
  if (Array.isArray(respuesta)) {
    respuesta.forEach((item) => {
      cadena += item + " <br/>";
    });
  }

  Swal.fire({
    title: "INCORRECT",
    icon: "error",
    html: Array.isArray(respuesta)
      ? "<p style='color:green; font-weight: bold;'>Correct Answer: </p>" +
        cadena
      : "<p style='color:green; font-weight: bold;'>Correct Answer: </p>" +
        respuesta,
    customClass: "swal-wide",
    confirmButtonText: "Ok",
  }).then((result) => {
    if (result.value) {
      // window.location = "/modulo/1/grammar/2";
    } else {
    }
  });
};

export const mostrarAlertaErrorCuenta = async () => {
  var value = await Swal.fire({
    title: "Advertencia",
    type: "error",
    html: "<p>¿Está seguro de cancelar el registro del usuario?  </p>",
    customClass: "swal-wide",
    confirmButtonText: "Continuar",
    showCancelButton: true,
  });
  return value;
};

export const Bienvenida = async () => {
  Swal.fire({
    title: "BIENVENIDO",
    html: '<h1 className="text-gray-700 font-semibold text-xs  px-8 md:text-sm">Para comenzar seleccione una de las actividades   <p style="color:green">| Writing - Vocabulary - Reading - Grammar |</p> disponibles en el book 1 y resuelva sus lecciones </h1>',
    footer:
      '<a target ="_blank" className="font-bold" style = "font-weight: bold"; href="https://drive.google.com/file/d/1vWAa7jxiih-TWB3PB1BnwiAbo9q5iGYT/view?usp=sharing">Ver video introductorio</a>',
    icon: "info",
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
  });
};

export const Finalizacion = () => {
  let a = document.createElement("a");
  a.target = "_blank";
  a.href =
    "https://forms.gle/diRM2YXULT25QE5F9";
  Swal.fire({
    title: "<strong>Congratulations!</strong>",
    width: 700,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    confirmButtonText: '<i class="fa fa-thumbs-up"></i> Inscribirse al examen',
    cancelButtonText: '<i class="fa fa-thumbs-down">Cerrar</i>',
    cancelButtonAriaLabel: "Thumbs down",
    focusConfirm: false,
    html: `
   <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <img src="${celebration}" alt="Example Image" class="w-full h-auto rounded-lg">
            </div>
            <div class="flex flex-col justify-center">
                <h2 class="text-2xl font-bold mb-4">Has completado con éxito el simulador</h2>
                <p class="text-gray-700 mb-2">¡Estás listo para el examen! Por favor, te solicitamos que te inscribas para rendir el examen en el formulario a continuación. <strong>El formulario debes completarlo con tu correo institucional</strong></p> 
                <p class="text-gray-700">¡Éxitos en la prueba! Si no te sientes seguro aún para rendirla, vuelve a practicar con el simulador.</p>
            </div>
    </div>
   `,
  }).then((result) => {
    if (result.isConfirmed) {
      a.click();
    }
  });
};

export const mostrarAlertaDrive = async () => {
  let a = document.createElement("a");
  a.target = "_blank";
  a.href =
    "https://drive.google.com/drive/folders/1VpsHlAYQ021jdXfa06nX_wChrxjce7kn";

  Swal.fire({
    title: "<strong>AVISO </strong>",
    icon: "info",
    html: "Accederá a un repositorio en <b> Google Drive</b> ",
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: '<i class="fa fa-thumbs-up"></i> Continuar',
    confirmButtonAriaLabel: "Thumbs up, great!",
    cancelButtonText: '<i class="fa fa-thumbs-down">Cerrar</i>',
    cancelButtonAriaLabel: "Thumbs down",
  }).then((result) => {
    if (result.isConfirmed) {
      //window.location.href = "https://drive.google.com/drive/folders/1VpsHlAYQ021jdXfa06nX_wChrxjce7kn";
      a.click();
    }
  });
};

export const AlertaLeccion = async (respuesta) => {
  var value = Swal.fire({
    icon: "warning",
    title: "Oops...",
    text: respuesta,
  });
  return value;
};
export const Alertaskip = async (respuesta) => {
  let cadena = "";
  if (Array.isArray(respuesta)) {
    respuesta.forEach((item) => {
      cadena += item + " <br/>";
    });
  }
  Swal.fire(
    "SKIP",
    Array.isArray(respuesta)
      ? "<p style='color:green; font-weight: bold;'>Correct Answer: </p>" +
          cadena
      : "<p style='color:green; font-weight: bold;'>Correct Answer: </p>" +
          respuesta,
    "question"
  );
};

export const finPrueba = (aciertos, total) => {
  Swal.fire({
    title: "Resultado",
    type: "success",
    text:
      "You have answered " + aciertos + " questions correctly out of " + total,
    confirmButtonText: "Ok",
  }).then((result) => {
    if (result.value) {
      ////console.log('.')
      window.location = "/evaluacion";
    } else {
    }
  });
};

export const mostrarAlertaExito = () => {
  Swal.fire({
    icon: "success",
    ...SuccessData,
  }).then((result) => {
    if (result.value) {
      // window.location = "/modulo/1/grammar/3";
    } else {
    }
  });
};

export const mostrarAlertaExitoFin = (txt) => {
  Swal.fire({
    title: "Lesson Completed !",
    icon: "success",
    type: "success",
    text: txt,
  }).then((result) => {});
};

export const mostrarImagen = (img) => {
  Swal.fire({
    title: "¡Alerta con imagen!",
    html: `<iframe src="https://drive.google.com/file/d/${img}/preview" width="640" height="480" allow="autoplay"></iframe>`,
    confirmButtonText: "Cerrar",
  });
};

export const mostrarAlertaLogin = () => {
  Swal.fire({
    title: "Inicio de sesión",
    type: "warning",
    text: "Actualmente existe una sesión guardada. Deseas continuar?",
    confirmButtonText: "Continuar",
    showCancelButton: true,
  }).then((result) => {
    if (result.value) {
      window.location = "/dashboard";
    } else {
      localStorage.removeItem("user");
      window.location = "/signin";
    }
  });
};

export const mostrarAlertaSalir = () => {
  Swal.fire({
    title: "Are you sure?",
    type: "error",
    text: "You are almost to exit, you will loose all your progress.",
    confirmButtonText: "Ok",
    showCancelButton: true,
  }).then((result) => {
    if (result.value) {
      window.location = "/dashboard";
    }
  });
};
export const mostrarAlertaConfimacion = async (_title, _text) => {
  let result = await Swal.fire({
    title: _title,
    type: "success",
    text: _text,
    confirmButtonText: "Continuar",
    showCancelButton: true,
  });
  return result;
};

export const Confirmacion = async (_title, _text) => {
  Swal.fire({
    icon: "success",
    title: _title,
    text: _text,
    showConfirmButton: false,
    timer: 5000,
  });
};

export const mostrarExitoEditar = async (titulo, text, icon) => {
  var result_data = await Swal.fire({
    title: titulo,
    text: text,
    icon: icon,
    showConfirmButton: true,
  });
  return result_data;
};

export const mostrarAlertaSalirEva = () => {
  Swal.fire({
    title: "Are you sure?",
    type: "error",
    text: "You are almost to exit, you will loose all your progress.",
    confirmButtonText: "Ok",
    showCancelButton: true,
  }).then((result) => {
    if (result.value) {
      window.location = "/evaluacion";
    }
  });
};
