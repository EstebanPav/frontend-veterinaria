import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaSearch, FaArrowLeft } from "react-icons/fa"; // 🔹 Agregado FaArrowLeft para el botón de retroceso
import "../Styles/VerPropietarios.css"; // Enlazar el CSS
import Sidebar from "../components/Sidebar"; // ✅ Sidebar integrado

const VerPropietario = () => {
  const { id } = useParams(); // Obtener el ID de la mascota desde la URL
  const navigate = useNavigate();
  const [propietarios, setPropietarios] = useState([]);
  const [filteredPropietarios, setFilteredPropietarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPropietarioByMascota = async () => {
      try {
        const response = await axios.get(`https://backend-veterinaria-ph2u.onrender.com/api/mascotas/${id}`);
        const mascota = response.data;

        if (mascota && mascota.propietario_id) {
          const propietarioResponse = await axios.get(`https://backend-veterinaria-ph2u.onrender.com/api/propietarios/${mascota.propietario_id}`);
          setPropietarios([propietarioResponse.data]);
          setFilteredPropietarios([propietarioResponse.data]);
        } else {
          setError("❌ No se encontró un propietario para esta mascota.");
        }
      } catch (error) {
        console.error("Error al obtener el propietario:", error);
        setError("❌ No se pudo cargar la información del propietario.");
      }
    };

    fetchPropietarioByMascota();
  }, [id]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === "") {
      setFilteredPropietarios(propietarios);
    } else {
      const filtered = propietarios.filter((propietario) =>
        Object.values(propietario).some(
          (field) => field && field.toString().toLowerCase().includes(value)
        )
      );
      setFilteredPropietarios(filtered);
    }
  };

  return (
    <div className="propietario-container">
      <Sidebar />

      <div className="ver-propietario-content">
        {/* 📌 Botón para retroceder */}
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Volver
        </button>

        <h2>🏠 Ver Dueño de Mascota</h2>

        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="🔍 Buscar propietario..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        {filteredPropietarios.length > 0 && (
          <div className="tabla-container">
            <h3>📌 Detalles del Dueño de Mascota</h3>
            <table className="propietario-table">
              <thead>
                <tr>
                  <th>⚙️ Acciones</th> {/* ✅ Botón Editar al inicio */}
                  <th>📛 Nombre</th>
                  <th>📍 Dirección</th>
                  <th>🏙 Ciudad</th>
                  <th>🌍 Provincia</th>
                  <th>📜 Cédula</th>
                  <th>📞 Celular</th>
                </tr>
              </thead>
              <tbody>
                {filteredPropietarios.map((propietario) => (
                  <tr key={propietario.id}>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => navigate(`/editar-propietario/${propietario.id}`)}
                      >
                        ✏️ 
                      </button>
                    </td>
                    <td>{propietario.nombre}</td>
                    <td>{propietario.direccion || "No disponible"}</td>
                    <td>{propietario.ciudad || "No disponible"}</td>
                    <td>{propietario.provincia || "No disponible"}</td>
                    <td>{propietario.cedula || "No disponible"}</td>
                    <td>{propietario.celular || "No disponible"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerPropietario;
