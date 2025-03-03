import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../Styles/EditarMascota.css";
import { FaArrowLeft } from "react-icons/fa";

const EditarMascota = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mascota, setMascota] = useState(null);
  const [propietarios, setPropietarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("📡 Obteniendo datos de la mascota con ID:", id);

        if (!id || isNaN(Number(id))) {
          console.error("⚠️ ID de mascota no válido:", id);
          return;
        }

        // 🔹 Obtener los datos de la mascota correctamente
        const resMascota = await axios.get(`https://backend-veterinaria-ph2u.onrender.com/api/mascotas/${id}`);
        const resPropietarios = await axios.get("https://backend-veterinaria-ph2u.onrender.com/api/propietarios");

        if (!resMascota.data.nombre) {
          console.warn("⚠️ Nombre de la mascota no encontrado en la API.");
        }

        setMascota(resMascota.data);
        setPropietarios(resPropietarios.data);
      } catch (error) {
        console.error("❌ Error al cargar los datos:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setMascota({ ...mascota, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 🔹 Solo enviamos los campos editables (sin el nombre)
      const { nombre, ...datosActualizados } = mascota;
      
      await axios.put(`https://backend-veterinaria-ph2u.onrender.com/api/editar-mascotas/${id}`, datosActualizados);
      alert("✅ Mascota actualizada correctamente");
      navigate(`/detalle-mascota/${id}`);
    } catch (error) {
      console.error("❌ Error al actualizar", error);
    }
  };

  if (!mascota) return <p>⏳ Cargando información de la mascota...</p>;

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="edit-container">
        <button className="back-button" onClick={() => navigate(`/detalle-mascota/${id}`)}>
          <FaArrowLeft /> Volver
        </button>
        <h2 className="edit-title">Editar Mascota</h2>
        <form className="edit-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Especie:</label>
            {/* <input type="text" name="especie" value={mascota.especie || ""} onChange={handleChange} required /> */}
            <select name="especie" value={mascota.especie || ""} onChange={handleChange} required>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
            </select>
          </div>

          <div className="form-group">
            <label>Raza:</label>
            <input type="text" name="raza" value={mascota.raza || ""} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Sexo:</label>
            <select name="sexo" value={mascota.sexo || ""} onChange={handleChange} required>
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
          </div>

          <div className="form-group">
            <label>Color:</label>
            <input type="text" name="color" value={mascota.color || ""} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Fecha de Nacimiento:</label>
            <input
              type="date"
              name="fecha_nacimiento"
              value={mascota.fecha_nacimiento ? mascota.fecha_nacimiento.split("T")[0] : ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Edad:</label>
            <input type="number" name="edad" value={mascota.edad || ""} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Propietario:</label>
            <select name="propietario_id" value={mascota.propietario_id || ""} onChange={handleChange} required>
              {propietarios.map((prop) => (
                <option key={prop.id} value={prop.id}>
                  {prop.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="button-group">
            <button type="submit" className="save-button">Guardar Cambios</button>
            <button type="button" className="cancel-button" onClick={() => navigate(`/detalle-mascota/${id}`)}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarMascota;
