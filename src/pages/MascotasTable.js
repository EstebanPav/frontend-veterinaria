import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import "../Styles/TablaMascota.css";
import { useNavigate } from "react-router-dom";
import MascotaDetalles from "./MascotaDetallesPage";
import Sidebar from "../components/Sidebar"; // ✅ Sidebar integrado

const MascotasTable = () => {
  const [mascotas, setMascotas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMascotas, setFilteredMascotas] = useState([]);
  const [selectedMascota, setSelectedMascota] = useState(null);
  const navigate = useNavigate();

  // 🔹 Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 🔹 Número de registros por página

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const response = await axios.get("https://backend-veterinaria-ph2u.onrender.com/api/mascotas");
        setMascotas(response.data);
        setFilteredMascotas(response.data);
      } catch (error) {
        console.error("Error al cargar las mascotas:", error);
      }
    };

    fetchMascotas();
  }, []);

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const results = mascotas.filter((mascota) =>
      Object.values(mascota).some(
        (value) =>
          value && value.toString().toLowerCase().includes(lowerCaseSearchTerm)
      )
    );
    setFilteredMascotas(results);
    setCurrentPage(1); // 🔹 Reiniciar a la primera página al buscar
  }, [searchTerm, mascotas]);

  const handleRowClick = (mascota) => {
    navigate(`/detalle-mascota/${mascota.id}`); // Redirigir a la página de detalles
  };

  // 🔹 Calcular el índice de los elementos a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMascotas.slice(indexOfFirstItem, indexOfLastItem);

  // 🔹 Calcular el número total de páginas
  const totalPages = Math.ceil(filteredMascotas.length / itemsPerPage);

  // 🔹 Funciones para cambiar de página
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="dashboard-container">
      {/* 📌 Sidebar correctamente integrado */}
      <Sidebar />

      {/* 📌 Contenedor de la tabla centrado */}
      <div className="table-content">
        <h2 className="table-title">🐾 Lista de Mascotas</h2>

        {/* 📌 Barra de búsqueda */}
        <div className="search-bar">
          <div className="search-input-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="🔍 Buscar en cualquier campo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* 📌 Tabla de Mascotas */}
        <div className="table-responsive">
          <table className="table table-hover table-bordered shadow-sm">
            <thead className="table-custom-header">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Especie</th>
                <th>Raza</th>
                <th>Sexo</th>
                <th>Color</th>
                <th>Fecha Nacimiento</th>
                <th>Edad</th>
                <th>Propietario</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((mascota) => (
                <tr
                  key={mascota.id}
                  onClick={() => handleRowClick(mascota)}
                  className="clickable-row"
                >
                  <td>{mascota.id}</td>
                  <td>{mascota.nombre}</td>
                  <td>{mascota.especie}</td>
                  <td>{mascota.raza}</td>
                  <td>{mascota.sexo}</td>
                  <td>{mascota.color}</td>
                  <td>{mascota.fecha_nacimiento}</td>
                  <td>{mascota.edad}</td>
                  <td>{mascota.propietario_nombre || "No asignado"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 📌 Controles de paginación con números de página */}
        <div className="pagination">
          <div className="pagination-buttons">
            <button onClick={prevPage} disabled={currentPage === 1} className="pagination-btn">
              ⬅️ Anterior
            </button>

            <button onClick={nextPage} disabled={currentPage === totalPages} className="pagination-btn">
              Siguiente ➡️
            </button>
          </div>

          {/* 🔹 Números de página aparecen debajo de los botones */}
          <div className="pagination-numbers">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => goToPage(i + 1)}
                className={`pagination-number ${currentPage === i + 1 ? "active" : ""}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* 📌 Modal para ver detalles de la mascota */}
        {selectedMascota && (
          <MascotaDetalles
            mascota={selectedMascota}
            onClose={() => setSelectedMascota(null)}
          />
        )}
      </div>
    </div>
  );
};

export default MascotasTable;
