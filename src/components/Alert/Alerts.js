import React, { Component } from "react";
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


export const mostrarAlertaError= ()=>{
    Swal.fire({
        ...ErrorData
    }).then((result) => {
        if (result.value) {
            
            // window.location = "/modulo/1/grammar/2";
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
