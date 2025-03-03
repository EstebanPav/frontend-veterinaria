import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Importar react-toastify
import api from "../api";
import Sidebar from "../components/Sidebar"; // 🔹 Importamos Sidebar
import "../Styles/RegistrarMascota.css";

const RegistrarMascota = () => {
  // 🔹 Función para navegar a Home.js con la pestaña seleccionada

  const navigate = useNavigate();
  const [mascota, setMascota] = useState({
    nombre: "",
    especie: "Perro",
    raza: "",
    sexo: "Macho",
    color: "",
    fecha_nacimiento: "",
    edad: "",
    procedencia: "Urbana",
    chip: "",
    propietario_id: "",
  });

  const [propietarios, setPropietarios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar propietarios al montar el componente
  useEffect(() => {
    const fetchPropietarios = async () => {
      try {
        const response = await api.get("/propietariosHistorial");
        setPropietarios(response.data);
      } catch (err) {
        console.error("Error al recuperar los propietarios:", err);
        toast.error("Error al cargar los propietarios");
      } finally {
        setLoading(false);
      }
    };
    fetchPropietarios();
  }, []);

  const handleChange = (e) => {
    setMascota({ ...mascota, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (
      !mascota.nombre ||
      !mascota.especie ||
      !mascota.sexo ||
      !mascota.color ||
      !mascota.propietario_id
    ) {
      toast.error("Por favor, completa todos los campos obligatorios.");
      return;
    }

    try {
      const response = await api.post("/mascotas", mascota);
      toast.success("Mascota registrada exitosamente");

      setMascota({
        nombre: "",
        especie: "Perro",
        raza: "",
        sexo: "Macho",
        color: "",
        fecha_nacimiento: "",
        edad: "",
        procedencia: "Urbana",
        chip: "",
        propietario_id: "",
      });

      // Redirigir después de 2 segundos al historial de la mascota registrada
      setTimeout(() => {
        navigate(`/registrar-historia/${response.data.mascotaId}`);
      }, 2000);
    } catch (err) {
      console.error(
        "Error al registrar la mascota:",
        err.response?.data || err.message
      );
      toast.error("Error al registrar la mascota.");
    }
  };

  if (loading) return <p className="text-center">Cargando propietarios...</p>;

  return (
    <div className="dashboard-container">
      <Sidebar /> {/* 📌 Usamos el nuevo Sidebar */}

      <div className="container mt-5">
      <h2 className="form-title">Registrar Mascota</h2>
        <div className="card shadow-lg p-4">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Nombre */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Nombre:</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={mascota.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Propietario */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Propietario:</label>
                <select
                  className="form-control"
                  name="propietario_id"
                  value={mascota.propietario_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione un propietario</option>
                  {propietarios.map((prop) => (
                    <option key={prop.id} value={prop.id}>
                      {prop.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row">
              {/* Especie y Sexo */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Especie:</label>
                <select
                  className="form-control"
                  name="especie"
                  value={mascota.especie}
                  onChange={handleChange}
                >
                  <option value="Perro">Perro</option>
                  <option value="Gato">Gato</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Sexo:</label>
                <select
                  className="form-control"
                  name="sexo"
                  value={mascota.sexo}
                  onChange={handleChange}>
                  <option value="Macho">Macho</option>
                  <option value="Hembra">Hembra</option>
                </select>
              </div>
            </div>

            <div className="row">
              {/* Raza y Color */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Raza:</label>
                <input
                  type="text"
                  className="form-control"
                  name="raza"
                  value={mascota.raza}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Color:</label>
                <input
                  type="text"
                  className="form-control"
                  name="color"
                  value={mascota.color}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row">
              {/* Fecha de Nacimiento y Edad */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Fecha de Nacimiento:</label>
                <input
                  type="date"
                  className="form-control"
                  name="fecha_nacimiento"
                  value={mascota.fecha_nacimiento}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Edad:</label>
                <input
                  type="number"
                  className="form-control"
                  name="edad"
                  value={mascota.edad}
                  onChange={handleChange}
                  min="0"
                />
              </div>
            </div>

            <div className="row">
              {/* Procedencia y Chip */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Procedencia:</label>
                <select
                  className="form-control"
                  name="procedencia"
                  value={mascota.procedencia}
                  onChange={handleChange}
                >
                  <option value="Urbana">Urbana</option>
                  <option value="Rural">Rural</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Chip:</label>
                <input
                  type="text"
                  className="form-control"
                  name="chip"
                  value={mascota.chip}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-3">
              Registrar Mascota
            </button>
          </form>
        </div>

        {/* Toast Notifications */}
        <ToastContainer
          autoClose={3000}
          hideProgressBar={false}
          position="top-right"
        />
      </div>
    </div>
  );
};

export default RegistrarMascota;
