import React, { useState, useContext } from "react";
import logo from "../../../assets/resource/Logo_Provicional.png";
import loading from "../../../assets/resource/loading.svg";
import social from "../../../assets/resource/social.svg";
import tw from "../../../assets/icons/twitter.svg";
import fb from "../../../assets/icons/facebook.svg";
import ig from "../../../assets/icons/instagram.svg";

import NavComponent from "../../NavComponent";

import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

var options = { year: "numeric", month: "long", day: "numeric" };

export const PerfilUser = () => {
  const { user } = useContext(AuthContext);

  const cargando = useState(false)[0];

  return (
    <div className="bg-gray-50 pb-10 h-full">
      {user && <NavComponent user={user} logo={logo} activado={1} />}
      <div className="mx-auto ">
        <div className="w-full lg:w-8/12 mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-8">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                  <div className="pt-10 h-28 w-28">
                    <img
                      alt="..."
                      src={require("../../../assets/resource/user.png").default}
                      className="shadow-xl rounded-full h-auto align-middle border-none  "
                    />
                  </div>
                </div>
              </div>

              <div className="text-center mt-12 pt-5">
                <div className="mx-auto inline-flex">
                  <div>
                    <h3 className=" text-xl mx-auto capitalize font-semibold leading-normal  text-gray-700 ">
                      {user.name +
                        " " +
                        (user.lastname === "null" ? "" : user.lastname)}
                    </h3>
                  </div>
                </div>
                <div className="text-sm leading-normal mt-0 mb-2 pt-2 text-gray-500 ">
                  {user.mail}
                </div>
                <div className="text-sm leading-normal mt-0 mb-2 text-gray-600 ">
                  Se unió el
                  {new Date(user.createdAt).toLocaleDateString(
                    "es-ES",
                    options
                  )}
                </div>
              </div>

              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                {cargando ? (
                  <div className="flex items-center justify-center">
                    <img src={loading} width={50} alt="cargando"></img>
                  </div>
                ) : (
                  <div className="md:flex  justify-center">
                    <div className="md:pt-0 w-full lg:w-9/12 px-4">
                      <h2 className="font-bold text-left">Tú Progreso</h2>
                      <div className="overflow-auto py-4 border rounded-lg lg:overflow-visible ">
                        <div className=" h-22  py-1">
                          <div className="">
                            <span
                              className={
                                user.progress < 54
                                  ? "  pb-5  text-gray-700 pl-2 text-center"
                                  : "pb-2 text-white pl-2 text-center"
                              }
                            >
                              {user.progress}%
                            </span>
                          </div>

                          <div className="flex px-4">
                            <div></div>
                            <div className="overflow-hidden w-full h-6 mb-4 text-xs flex rounded bg-amber-200  border-4 border-gray-200">
                              {user.progress < 25 ? (
                                <div
                                  style={{ width: `${user.progress}%` }}
                                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-400"
                                >
                                  {" "}
                                </div>
                              ) : user.progress < 50 ? (
                                <div
                                  style={{ width: `${user.progress}%` }}
                                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-300"
                                >
                                  {" "}
                                </div>
                              ) : user.progress < 70 ? (
                                <div
                                  style={{ width: `${user.progress}%` }}
                                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-400"
                                >
                                  {" "}
                                </div>
                              ) : user.progress < 85 ? (
                                <div
                                  style={{ width: `${user.progress}%` }}
                                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-400"
                                ></div>
                              ) : (
                                <div
                                  style={{ width: `${user.progress}%` }}
                                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600"
                                ></div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <h2 className="hidden md:block font-bold pt-5 text-left">
                        Síguenos
                      </h2>
                      <div className="hidden md:block overflow-auto py-4 border rounded-lg lg:overflow-visible ">
                        <div className="mt-4 lg:mb-0 mb-4">
                          <Link
                            to="https://www.utm.edu.ec/"
                            target="_blank"
                            className="bg-white border text-green-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                            type="button"
                          >
                            <div
                              className={
                                "text-white mx-auto p-3 text-center inline-flex items-center justify-center mb-5 shadow-lg rounded-full "
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-black"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </Link>
                          <Link
                            to="https://www.facebook.com/utmmanabi/"
                            target="_blank"
                            className="bg-white border text-blue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                            type="button"
                          >
                            <div
                              className={
                                "text-white mx-auto p-3 text-center inline-flex items-center justify-center mb-5 shadow-lg rounded-full "
                              }
                            >
                              <div className="flex items-center  justify-center">
                                <img src={fb} width={20} alt="cargando"></img>
                              </div>
                            </div>
                          </Link>
                          <Link
                            to="https://www.instagram.com/utmmanabii/"
                            target="_blank"
                            className="bg-white border text-yellow-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                            type="button"
                          >
                            <div
                              className={
                                "text-white mx-auto p-3 text-center inline-flex items-center justify-center mb-5 shadow-lg rounded-full "
                              }
                            >
                              <div className="flex items-center  justify-center">
                                <img src={ig} width={20} alt="cargando"></img>
                              </div>
                            </div>
                          </Link>
                          <Link
                            to="https://twitter.com/UTMManabi"
                            target="_blank"
                            className="bg-white border text-blue-200 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                            type="button"
                          >
                            <div
                              className={
                                "text-white mx-auto p-3 text-center inline-flex items-center justify-center mb-5 shadow-lg rounded-full "
                              }
                            >
                              <div className="flex items-center  justify-center">
                                <img src={tw} width={20} alt="cargando"></img>
                              </div>
                            </div>
                          </Link>
                        </div>
                        <div className="flex items-center pt-5 justify-center">
                          <img src={social} width={200} alt="cargando"></img>
                        </div>
                      </div>
                    </div>
                    <div className="w-full lg:w-9/12 md:mt-0 mt-4 px-4">
                      <h2 className="font-bold text-left">Logros</h2>
                      <div className=" border rounded-lg py-4">
                        <div className="px-3 pb-4">
                          <div
                            className="  text-white font-bold uppercase text-base h-20 pt-2 rounded-lg shadow-md outline-none  mr-1 mb-1 ease-linear "
                            type="button"
                          >
                            <div
                              className={
                                user.progress !== "0"
                                  ? "text-white mx-auto p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-5 shadow-lg rounded-full bg-yellow-500"
                                  : "text-white mx-auto p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-5 shadow-lg rounded-full bg-gray-300"
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-60 w-60"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                <path
                                  fillRule="evenodd"
                                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>
                          <h3
                            className={
                              user.progress === "0"
                                ? "text-sm text-gray-300 leading-snug"
                                : "text-sm leading-snug  "
                            }
                          >
                            Primer Lección
                          </h3>
                        </div>
                        <div className="px-3 pb-4">
                          <div
                            className="  text-white font-bold uppercase text-base h-20 pt-2 rounded-lg shadow-md outline-none  mr-1 mb-1 ease-linear "
                            type="button"
                          >
                            <div
                              className={
                                user.progress < 50
                                  ? "text-white mx-auto p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-5 shadow-lg rounded-full bg-gray-300"
                                  : "text-white mx-auto p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-5 shadow-lg rounded-full bg-blue-600"
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-60 w-60"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                                  clipRule="evenodd"
                                />
                                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                              </svg>
                            </div>
                          </div>
                          <h3
                            className={
                              user.progress < 50
                                ? "text-sm text-gray-300 leading-snug"
                                : "text-sm leading-snug"
                            }
                          >
                            A Medio Camino
                          </h3>
                        </div>
                        <div className="px-3 ">
                          <div
                            className="  text-white font-bold uppercase text-base h-20 pt-2 rounded-lg shadow-md outline-none  mr-1 mb-1 ease-linear "
                            type="button"
                          >
                            <div
                              className={
                                user.progress < 100
                                  ? "text-white mx-auto p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-5 shadow-lg rounded-full bg-gray-300"
                                  : "text-white mx-auto p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-5 shadow-lg rounded-full bg-green-600"
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-60 w-60"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                              </svg>
                            </div>
                          </div>
                          <h3
                            className={
                              user.progress < 100
                                ? "text-sm text-gray-300 leading-snug"
                                : "text-sm leading-snug"
                            }
                          >
                            Autoaprendizaje Completado
                          </h3>
                        </div>
                      </div>
                      <h2 className=" md:hidden font-bold pt-5 text-left">
                        Síguenos
                      </h2>
                      <div className=" md:hidden overflow-auto py-4 border rounded-lg lg:overflow-visible ">
                        <div className="mt-4 lg:mb-0 mb-4">
                          <a
                            rel="noreferrer"
                            href="https://www.utm.edu.ec/"
                            target="_blank"
                            className="bg-white border text-green-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                            type="button"
                          >
                            <div
                              className={
                                "text-white mx-auto p-3 text-center inline-flex items-center justify-center mb-5 shadow-lg rounded-full "
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-black"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </a>
                          <a
                            rel="noreferrer"
                            href="https://www.facebook.com/utmmanabi/"
                            target="_blank"
                            className="bg-white border text-blue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                            type="button"
                          >
                            <div
                              className={
                                "text-white mx-auto p-3 text-center inline-flex items-center justify-center mb-5 shadow-lg rounded-full "
                              }
                            >
                              <div className="flex items-center  justify-center">
                                <img src={fb} width={20} alt="cargando"></img>
                              </div>
                            </div>
                          </a>
                          <a
                            rel="noreferrer"
                            href="https://www.instagram.com/utmmanabii/"
                            target="_blank"
                            className="bg-white border text-yellow-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                            type="button"
                          >
                            <div
                              className={
                                "text-white mx-auto p-3 text-center inline-flex items-center justify-center mb-5 shadow-lg rounded-full "
                              }
                            >
                              <div className="flex items-center  justify-center">
                                <img src={ig} width={20} alt="cargando"></img>
                              </div>
                            </div>
                          </a>
                          <a
                            rel="noreferrer"
                            href="https://twitter.com/UTMManabi"
                            target="_blank"
                            className="bg-white border text-blue-200 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                            type="button"
                          >
                            <div
                              className={
                                "text-white mx-auto p-3 text-center inline-flex items-center justify-center mb-5 shadow-lg rounded-full "
                              }
                            >
                              <div className="flex items-center  justify-center">
                                <img src={tw} width={20} alt="cargando"></img>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div className="flex items-center pt-5 justify-center">
                          <img src={social} width={200} alt="cargando"></img>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilUser;
