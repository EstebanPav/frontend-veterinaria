import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaEdit,
  FaTrash,
  FaArrowLeft,
  FaUser,
  FaFileMedical,
  FaNotesMedical,
  FaCalendarAlt,
} from "react-icons/fa";
import axios from "axios";
import "../Styles/MascotaDetallesPage.css";
import Sidebar from "../components/Sidebar"; // Asegúrate de que Sidebar esté disponible

const MascotaDetallesPage = () => {
  const { id } = useParams(); // Obtiene el ID de la mascota desde la URL
  const [mascota, setMascota] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMascota = async () => {
      try {
        const response = await axios.get(
          `https://backend-veterinaria-ph2u.onrender.com/api/mascotas/${id}`
        );
        setMascota(response.data);
      } catch (error) {
        console.error("❌ Error al obtener la mascota:", error);
      }
    };

    fetchMascota();
  }, [id]);

  if (!mascota) {
    return <p>⏳ Cargando información de la mascota...</p>;
  }

  // Función para eliminar mascota
  const handleEliminarMascota = async () => {
    const confirmacion = window.confirm(
      "¿Estás seguro de eliminar esta mascota?"
    );
    if (!confirmacion) return;

    try {
      await axios.delete(
        `https://backend-veterinaria-ph2u.onrender.com/eliminar/mascotas/${mascota.mascota_id}`
      );
      alert("✅ Mascota eliminada correctamente.");
      navigate("/ver-mascotas"); // Redirige a la lista después de eliminar
    } catch (error) {
      console.error("❌ Error al eliminar la mascota", error);
      alert("❌ No se pudo eliminar la mascota.");
    }
  };

  return (
    <div className="dashboard-container">
    <Sidebar />
    <div className="details-content">
      <button className="back-button" onClick={() => navigate("/ver-mascotas")}>
        <FaArrowLeft /> Volver a la lista
      </button>

      <h2>🐾 Detalles de la Mascota</h2>
      <div className="mascota-details">
        <p><strong>ID:</strong> {mascota.mascota_id}</p>
        <p><strong>Nombre:</strong> {mascota.mascota_nombre}</p>
        <p><strong>Especie:</strong> {mascota.especie}</p>
        <p><strong>Raza:</strong> {mascota.raza}</p>
        <p><strong>Sexo:</strong> {mascota.sexo}</p>
        <p><strong>Color:</strong> {mascota.color}</p>
        <p><strong>Fecha de Nacimiento:</strong> {mascota.fecha_nacimiento}</p>
        <p><strong>Edad:</strong> {mascota.edad} años</p>
        <p><strong>Propietario:</strong> {mascota.propietario_nombre || "No asignado"}</p>
      </div>

        {/* 📌 Botones de edición y eliminación */}
        <div className="edit-delete-buttons">
          <button
            className="edit-button"
            onClick={() => navigate(`/editar-mascota/${mascota.mascota_id}`)}
          >
            <FaEdit /> Editar
          </button>
          <button className="delete-button" onClick={handleEliminarMascota}>
            <FaTrash /> Eliminar
          </button>
        </div>

        {/* 📌 Botones adicionales ahora están debajo de Editar y Eliminar */}
        <div className="extra-buttons">
          <button
            className="view-owner-btn"
            onClick={() => navigate(`/ver-propietario/${mascota.mascota_id}`)}
          >
            <FaUser /> Ver Dueño de Mascota
          </button>

          <button
            className="view-history-btn"
            onClick={() => navigate(`/ver-historia-clinica/${mascota.mascota_id}`)}
          >
            <FaFileMedical /> Ver Historia Clínica
          </button>

          <button
            className="view-exam-btn"
            onClick={() => navigate(`/ver-examen-clinico/${mascota.mascota_id}`)}
          >
            <FaNotesMedical /> Ver Exámenes Clínicos
          </button>
          <button
            className="view-calendar-btn"
            onClick={() => navigate(`/registrar-cita/${mascota.mascota_id}`)}
          >
            <FaCalendarAlt /> Agendar Cita
          </button>
        </div>
      </div>
    </div>
  );
};

export default MascotaDetallesPage;
