import React from "react";
import logo from "../../../assets/resource/Logo_Provicional.png";
import img1 from "../../../assets/resource/sign.svg";
import axios from "axios";
import Cookies from "universal-cookie";

const cookie = new Cookies();
class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitForm: false,
      username: "",
      lastname: "",
      mail: "",
      pass: "",
      dato: "",
      isVisibleDato: "hidden",
    };

    this.UpdatePass1 = this.UpdatePass1.bind(this);
    this.UpdatePass2 = this.UpdatePass2.bind(this);
    this.UpdateUser = this.UpdateUser.bind(this);
    this.UpdateMail = this.UpdateMail.bind(this);
    this.ButtonSubmit = this.ButtonSubmit.bind(this);
    this.UpdateLastname = this.UpdateLastname.bind(this);
  }
  UpdateUser(event) {
    this.setState({ username: event.target.value });
  }
  UpdateLastname(event) {
    this.setState({ lastname: event.target.value });
  }
  UpdateMail(event) {
    this.setState({ mail: event.target.value });
  }
  UpdatePass1(event) {
    this.setState({ pass: event.target.value });
  }
  UpdatePass2(event) {
    if (this.state.pass === event.target.value) {
      this.setState({ submitForm: true });
      this.setState({ dato: "" });
      this.setState({ isVisibleDato: "hidden" });
    } else {
      this.setState({ submitForm: false });
      this.setState({ dato: "Las contraseñas no son iguales" });
      this.setState({ isVisibleDato: "" });
      
    }
  }
  componentDidMount() {
    if (cookie.get("_id")) {
      window.location.href = "./dashboard";
    }
  }
  async ButtonSubmit(event) {
    event.preventDefault();
    this.setState({ dato: "" });
    this.setState({ isVisibleDato: "hidden" });
    axios
      .post("https://utminglesapp.herokuapp.com/signup", {
        name: this.state.username,
        lastname: this.state.lastname,
        mail: this.state.mail,
        password: this.state.pass,
      })
      .then((response) => {
        if (response.data.res === "USER EXITS") {
          this.setState({ dato: "El correo ya existe" });
          this.setState({ isVisibleDato: "" });
          setInterval(() => {
            this.setState({ dato: "" });
            this.setState({ isVisibleDato: "hidden" });
          }, 3000);
        } else {
          var user = response.data.res;
          cookie.set("_id", user._id, { path: "/" });
          cookie.set("name", user.name, { path: "/" });
          cookie.set("lastname", user.lastname, { path: "/" });
          cookie.set("mail", user.mail, { path: "/" });
          console.log("ha iniciado sesion");
          window.location.href = "./dashboard";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className=" ">
        <div className="flex h-screen ">
          <div className=" w-1/3 ">
            <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-md w-full space-y-2">
                <div>
                  <img
                    className="mx-auto h-12 w-auto"
                    src={logo}
                    alt="Workflow"
                  />
                  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Registrate en tu cuenta
                  </h2>
                  <p className="mt-2 text-center text-sm text-gray-600">
                    O
                    <a
                      href="/signin"
                      className="font-medium text-green-600 hover:text-green-500"
                    >
                      Inicia sesión
                    </a>
                  </p>
                </div>
                <div className={this.state.isVisibleDato}>
                  <h2 className="text-md text-red-500">{this.state.dato}</h2>
                </div>
                <form className=" space-y-4" action="#" method="POST">
                  <input type="hidden" name="remember" value="true" />
                  <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                      <label htmlFor="email-address" className="sr-only">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={this.state.username}
                        onChange={this.UpdateUser}
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                        placeholder="Nombres"
                      />
                    </div>
                    <div>
                      <label htmlFor="email-address" className="sr-only">
                        Lastname
                      </label>
                      <input
                        id="lastname"
                        name="lastname"
                        type="text"
                        autoComplete="lastname"
                        required
                        value={this.state.lastname}
                        onChange={this.UpdateLastname}
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                        placeholder="Apellidos"
                      />
                    </div>
                    <div>
                      <label htmlFor="email-address" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="email-address"
                        name="mail"
                        type="email"
                        pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}"
                        autoComplete="email"
                        required
                        onChange={this.UpdateMail}
                        value={this.state.mail}
                        className=" border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-yellow-500 focus:border-yellow-500  focus:z-10 sm:text-sm appearance-none rounded-none relative block w-full px-3 py-2 border rounded-t-md focus:outline-none "
                        placeholder="Correo electrónico"
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="sr-only">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        onChange={this.UpdatePass1}
                        value={this.state.pass}
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                        placeholder="Contraseña"
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="sr-only">
                        Password
                      </label>
                      <input
                        id="password2"
                        name="password2"
                        type="password"
                        autoComplete="current-password"
                        required
                        onChange={this.UpdatePass2}
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                        placeholder="Repetir contraseña"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-900"
                      >
                        Recuerdame
                      </label>
                    </div>

                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-medium text-green-600 hover:text-green-500"
                      >
                        Olvidaste tu contraseña?
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={!this.state.submitForm}
                      onClick={this.ButtonSubmit}
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 
                          focus:ring-yellow-400"
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <svg
                          className="h-5 w-5 text-yellow-600 group-hover:text-yellow-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      Registrar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="w-2/3 ">
            <div className="min-h-screen flex-col flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
              <div>
                <img src={img1} width="400"></img>
              </div>
              <div>
                <h3 className="text-lg p-2 font-semibold italic">
                  Aprender otro idioma es como convertirse en otra persona,
                  <br />
                  <span className="text-gray-500 font-normal italic">
                    Haruki Murakami
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpPage;
