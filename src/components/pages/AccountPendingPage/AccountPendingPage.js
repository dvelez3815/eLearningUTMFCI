import React from "react";
import NavBar from "../../NavBar/NavBar";
import img1 from "../../../assets/resource/pendingAccount.svg";
import { Link } from "react-router-dom";
class AccountPendingPage extends React.Component {
  render() {
    return (
      <div>
        <NavBar ocultar="invisible"></NavBar>
        <div className="container mx-auto w-screen ">
          <div className="min-h-full flex-col flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div>
              <img src={img1} width="400" alt="cuanta pendiente"></img>
            </div>
            <div>
              <h3 className="text-xl p-2 font-semibold italic mt-3">
                Opps, parece que aún no has verificado tu cuenta
              </h3>
              <h3 className="text-lg p-2 text-gray-500 font-normal">
                Revisa tu correo electrónico y 
                <span  className="text-green-600">
                  <Link to="/dashboard"> Regresa aquí</Link>
                </span>
              </h3>
            </div>
            <div className='py-4'>
              <h3 className="text-xl p-2 font-semibold italic mt-3">
              </h3>
              <h3 className="text-lg p-2 text-gray-500 font-normal">
                <span  className="text-green-600">
                  <Link to="/"> Volver al Inicio</Link>
                </span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountPendingPage;
