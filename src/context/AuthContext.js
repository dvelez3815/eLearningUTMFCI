import React, { createContext, useEffect, useState } from "react";
import {getUser} from '../api/User.js'
export const AuthContext = createContext();

/* export const useAuth = () => {
  return useContext(AuthContext);
}; */

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userData) => {
    const {token} = userData
    const filteredUser =filtrarDatosUsuario(userData);
    localStorage.setItem("user", JSON.stringify(filteredUser));
    localStorage.setItem("token", token);
    setUser(filteredUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };
  const filtrarDatosUsuario = (userData)=>{
    const {
      _id,
      name,
      lastname,
      mail,
      rol,
      progress = null,
      status,
    } = userData;
    return { _id, name, lastname, mail, rol, progress, status};
  }
 

  const setProgress = (porcentaje)=>{
    login({
      ...user, 
      progress: porcentaje
    })
  }

  useEffect(() => {
    // Comprobar si el usuario está autenticado al cargar la aplicación
    const storedUser = localStorage.getItem("user") || null;
    const token_user = localStorage.getItem("token") || null;
    if (!storedUser || !token_user) {
      setLoading(false);
      logout();
      return;
    }
    
    const _user = JSON.parse(storedUser);
    getUser(_user._id).then((result) => {
      const filteredUser = filtrarDatosUsuario(result);
      localStorage.setItem("user", JSON.stringify(filteredUser));
      setUser(filteredUser);
      setLoading(false);
      setIsAuthenticated(true);
    }); 

  }, []);

  const isAdmin = () => {
    return user && user.role === "Administrador";
  };

  const isTeacher = () => {
    return user && user.role === "Docente";
  };

  const value = {
    user,
    loading,
    isAuthenticated, 
    login,
    logout,
    isAdmin,
    isTeacher,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
