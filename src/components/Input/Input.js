import React from "react";

const Input = (props) => {

    return (
        <div className="form-group mb-2">
                        <label
                          htmlFor={props.id}
                          className="form-label text-left block mb-2 text-gray-700"
                        >
                          CI o Pasaporte:
                        </label>
                        <input
                          id={props.id}
                          name={props.name}
                          type={props.type}
                          autoComplete={props.id}
                          required
                          {...register(props.name)}
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        />
                         {errors[props.name]?.message && <span className="text-red-500 text-left block text-sm ">{errors[props.name]?.message}</span>}
                      </div>
    )
}

export default Input;