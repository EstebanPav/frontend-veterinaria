import React, { useState } from "react";
import api from "../api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../components/Sidebar"; // 🔹 Importamos Sidebar
import "../Styles/RegistrarPropietario.css"; // 📌 Importamos el nuevo CSS

const RegistrarPropietario = () => {

  const [propietario, setPropietario] = useState({
    nombre: "",
    direccion: "",
    ciudad: "",
    provincia: "",
    cedula: "",
    celular: "",
  });

  const handleChange = (e, field) => {
    setPropietario({ ...propietario, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !propietario.nombre ||
      !propietario.direccion ||
      !propietario.ciudad ||
      !propietario.provincia ||
      !propietario.cedula ||
      !propietario.celular
    ) {
      toast.error("Todos los campos son obligatorios", {
        position: "top-right",
      });
      return;
    }

    try {
      await api.post("/propietarios", propietario);
      toast.success("Registro de propietario exitoso", {
        position: "top-right",
      });

      setPropietario({
        nombre: "",
        direccion: "",
        ciudad: "",
        provincia: "",
        cedula: "",
        celular: "",
      });
    } catch (error) {
      console.error("Error al registrar el propietario:", error);
      toast.error("Error al registrar el propietario. Intente de nuevo.", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="dashboard-container">
        <Sidebar /> {/* 📌 Usamos el nuevo Sidebar */}
      {/* 📌 Contenedor del formulario */}
      <div className="registro-container">
        <div className="registro-card">
          <h2>Registrar Nuevo Dueño de Mascota</h2>
          <form className="registro-form" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  value={propietario.nombre}
                  onChange={(e) => handleChange(e, "nombre")}
                  required
                />
              </div>
              <div className="col-md-6 form-group">
                <label>Dirección:</label>
                <input
                  type="text"
                  value={propietario.direccion}
                  onChange={(e) => handleChange(e, "direccion")}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 form-group">
                <label>Ciudad:</label>
                <input
                  type="text"
                  value={propietario.ciudad}
                  onChange={(e) => handleChange(e, "ciudad")}
                  required
                />
              </div>
              <div className="col-md-4 form-group">
                <label>Provincia:</label>
                <input
                  type="text"
                  value={propietario.provincia}
                  onChange={(e) => handleChange(e, "provincia")}
                  required
                />
              </div>
              <div className="col-md-4 form-group">
                <label>Cédula:</label>
                <input
                  type="text"
                  value={propietario.cedula}
                  onChange={(e) => handleChange(e, "cedula")}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 form-group">
                <label>Celular:</label>
                <input
                  type="text"
                  value={propietario.celular}
                  onChange={(e) => handleChange(e, "celular")}
                  required
                />
              </div>
            </div>

            <button type="submit">Registrar Dueño de Masctoa</button>
          </form>
        </div>
      </div>

      {/* Notificación Toast */}
      <ToastContainer
        autoClose={3000}
        hideProgressBar={false}
        position="top-right"
      />
    </div>
  );
};

export default RegistrarPropietario;
