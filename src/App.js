import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
/* PAGES */
import Inicio from "./components/pages/inicio/Inicio.js";
import HomePage from "./components/pages/HomePage/HomePage";
import SigInPage from "./components/pages/SigInPage/SigInPage";
import NotFoundPage from "./components/pages/NotFoundPage/NotFoundPage";
import Grammar2 from "./components/pages/ejercicios/Grammar2";
import Evaluacion from "./components/pages/Evaluacion/Evaluacion";
import Pruebas from "./components/pages/Pruebas/Pruebas";
import Review from "./components/pages/Review/Review";
import PruebasGeneral from "./components/pages/Pruebas/PruebasGeneral";
import PerfilUser from "./components/pages/user/PerfilUser";
import RegisterExam from "./components/pages/RegisterExam/RegisterExam";

import PrivateRoute from "./routes/PrivateRoute";
import { AuthContext } from "./context/AuthContext";
import Loading from "./components/Loading/Loading";
import SessionExpired from "./components/SessionExpired/SessionExpired";
import { useContext, useEffect, useState } from "react";
import MantenimientoPage from "./components/pages/MantenimientoPage/MantenimientoPage.js";
import FAQ from "./components/pages/FAQ/FAQ.js";

function App() {
  const { loading, isAuthenticated, logout } = useContext(AuthContext);
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const [isMantenimiento, setIsMantenimiento] = useState(true)

  useEffect(() => {
    setIsMantenimiento(false)
    if (isMantenimiento) return;
    if (!isAuthenticated) return;

    let timer;
    let lastActivityTime = Date.now();

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const currentTime = Date.now();
        if (currentTime - lastActivityTime >= 3600000) {
          setIsSessionExpired(true);
          logout();
        } else {
          resetTimer();
        }
      }, 60000);
    };

    resetTimer();

    const events = ["mousemove", "keydown", "scroll"];

    const updateLastActivityTime = () => {
      lastActivityTime = Date.now();
    };

    events.forEach((event) => {
      window.addEventListener(event, updateLastActivityTime);
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, updateLastActivityTime);
      });
      clearTimeout(timer);
    };
  }, [isAuthenticated, isMantenimiento, logout]);

  if (isMantenimiento) return <MantenimientoPage />
  if (loading) return <Loading width="200" />;
  if (isSessionExpired) return <SessionExpired />;
  return (
    <div className="App h-full">
      {/* Rutas solo de pruebas para probar las vistas */}

      <Router>
        <Routes>
          {/* Rutas no protegidas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/preguntas" element={<FAQ />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/signin" element={<SigInPage />} />
          <Route path="/registerExam" element={<RegisterExam />} />

          {/* rutas protegidas */}
          <Route
            exact
            path="/dashboard"
            element={
              <PrivateRoute>
                <Inicio />
              </PrivateRoute>
            }
          />
          <Route
            path="/modulo/:pmodulo/grammar/:punidad/:id"
            element={
              <PrivateRoute>
                <Grammar2 />
              </PrivateRoute>
            }
          />
          <Route
            path="/modulo/:pmodulo/reading/:punidad/:id"
            element={
              <PrivateRoute>
                {" "}
                <Grammar2 />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/modulo/:pmodulo/vocabulary/:punidad/:id"
            element={
              <PrivateRoute>
                {" "}
                <Grammar2 />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/modulo/:pmodulo/listening/:punidad/:id"
            element={
              <PrivateRoute>
                {" "}
                <Grammar2 />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/modulo/:pmodulo/writing/:punidad/:id"
            element={
              <PrivateRoute>
                {" "}
                <Grammar2 />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/evaluacion"
            element={
              <PrivateRoute>
                {" "}
                <Evaluacion />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/pruebas/prueba-general"
            element={
              <PrivateRoute>
                <PruebasGeneral />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/pruebas/libro/:idlibro"
            element={
              <PrivateRoute>
                {" "}
                <Pruebas />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/review/:book/:module/:unit/:type"
            element={
              <PrivateRoute>
                <Review />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <PerfilUser />{" "}
              </PrivateRoute>
            }
          />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
