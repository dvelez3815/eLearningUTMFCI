import React, { Component } from "react";
import Swal from "sweetalert2";
import "./Alert.css";

const ErrorData = {
    title: "Oops..",
    type: "error",
    text: "Wrong answer!",
    confirmButtonText: "Ok",
    showCancelButton: true,
    cancelButtonText: "Try again",
    closeOnConfirm: false,
    closeOnCancel: true   
};
  
const SuccessData = {
    title: "Success",
    type: "success",
    text: "Your work has been saved.",
    footer: ""
  };


export const mostrarAlertaError= ()=>{
    Swal.fire({
        ...ErrorData
    }).then((result) => {
        if (result.value) {
            console.log("You clicked the confirm button!");
            window.location = "/";
        } else {
            console.log("You clicked the cancel button!");
        }
    });
}

export const mostrarAlertaExito= ()=>{
    Swal.fire({
        ...SuccessData
    });
}
