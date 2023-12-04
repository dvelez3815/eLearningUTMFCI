import React from "react";
import EyeIcon from "@heroicons/react/outline/EyeIcon";
import EyeOffIcon from "@heroicons/react/outline/EyeOffIcon";

const Input = (props) => {

  const _type = props.type === "password" ? (props.mostrarPassword ? "text" : "password") : props.type;
  return (
    <>
      <label
        htmlFor={props.id}
        className={props.labelClassName ? props.labelClassName : "form-label text-left block mb-2 text-gray-700"}
      >
        {props.label}
      </label>
      <input
        id={props.id}
        name={props.name}
        type={_type}
        {...props.register}
        required
        className={props.inputClassName ? props.inputClassName : "form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"}
      />
      {props.name === "password" && (
        <div
          className="icon_button absolute text-gray-700 right-4 top-10 cursor-pointer"
          onClick={props.togglePassword}
        >
          {props.mostrarPassword ? (
            <EyeIcon className="h-6 font-extralight" />
          ) : (
            <EyeOffIcon className="h-6 font-extralight" />
          )}
        </div>
      )}

      {props.errors[props.name]?.message && <span className={props.errorClassName ? props.errorClassName : "text-red-500 text-left block text-sm"}>{props.errors[props.name]?.message}</span>}
    </>
  )
}

export default Input;