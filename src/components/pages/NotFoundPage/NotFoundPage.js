import React from "react";
import NavBar from "../../NavBar/NavBar";
import img1 from "../../../assets/resource/notFound.svg";
import { Link } from "react-router-dom";
class NotFoundPage extends React.Component {
  render() {
    return (
      <div>
        <NavBar ocultar="invisible"></NavBar>
        <div className="container mx-auto w-screen ">
          <div className="min-h-full flex-col flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div>
              <img src={img1} width="400"></img>
            </div>
            <div>
              <h3 className="text-xl p-2 font-semibold italic mt-3">
                Opps, parece que estas en medio de la nada
              </h3>
              <h3 className="text-lg p-2 text-gray-500 font-normal">
                Déjame guiarte de
                <span  className="text-green-600">
                  <Link to="/dashboard"> regreso a casa</Link>
                </span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFoundPage;
