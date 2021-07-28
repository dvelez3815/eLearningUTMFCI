import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import circulos from "../../assets/resource/Semi_Circulo.png";
import chica from "../../assets/resource/CHICA.png";
import {Link} from  "react-router-dom"
class HomePage extends React.Component {
  render() {
    return (
      <section className="Home h-screen">
        <div className="h-1/5">
          <NavBar></NavBar>
        </div>
        <div className="container  h-4/5">
          <div class="flex h-full w-screen items-end">
            <div class=" ">
              <img src={circulos} alt="circulos" width="700"></img>
            </div>
            <div class="py-52 text-center">
              <h3 class="text-4xl font-sans font-bold text-green-500">
                Aprende Inglés con los contenidos más relevantes
              </h3>
              <h3 class="text-lg  font-sans text-gray-500 pt-2">
                Comprometidos con tu formación acádemica
              </h3>
              <div class="pt-4">
                <button class=" w-1/2 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-full">
                  <Link to="/signup">Empieza</Link>
                </button>
              </div>
              <div class="pt-4">
                <button class=" w-1/2 bg-gray-400 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded-full">
                <Link to="/signin">Ya tengo una cuenta</Link>
                </button>
              </div>
            </div>
            <div class=" chica ">
              <img src={chica} alt="circulos" width="890"></img>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default HomePage;
