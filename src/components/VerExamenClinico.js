import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../Styles/VerExamenClinico.css";
import Sidebar from "../components/Sidebar"; // ✅ Sidebar integrado

const VerExamenClinico = () => {
  const { id } = useParams(); // 📌 Obtiene el ID de la mascota desde la URL
  const [examenesClinicos, setExamenesClinicos] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const itemsPerPage = 5; // Número de elementos por página

  useEffect(() => {
    const fetchExamenesClinicos = async () => {
      try {
        const response = await axios.get(`https://backend-veterinaria-ph2u.onrender.com/api/examen_clinico/${id}`);
        setExamenesClinicos(response.data);
      } catch (error) {
        console.error("Error al obtener los exámenes clínicos:", error);
      }
    };

    fetchExamenesClinicos();
  }, [id]);

  // 🔹 Función para eliminar un examen clínico
  const handleEliminarExamenClinico = async (examenId) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este examen clínico?");
    if (!confirmacion) return;

    try {
      const response = await axios.delete(`https://backend-veterinaria-ph2u.onrender.com/api/examen_clinico/${examenId}`);
      if (response.status === 200) {
        alert("✅ Examen clínico eliminado correctamente.");
        setExamenesClinicos(examenesClinicos.filter(examen => examen.id !== examenId));
      } else {
        alert("❌ No se pudo eliminar el examen clínico.");
      }
    } catch (error) {
      console.error("❌ Error al eliminar el examen clínico:", error);
      alert("❌ No se pudo eliminar el examen clínico.");
    }
  };

  // 🔹 Calcular qué elementos mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = examenesClinicos.slice(indexOfFirstItem, indexOfLastItem);

  // 🔹 Funciones para cambiar de página
  const nextPage = () => {
    if (currentPage < Math.ceil(examenesClinicos.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="dashboard-container">
      {/* 📌 Sidebar correctamente integrado */}
      <Sidebar />

      <div className="historia-container">
        {/* 📌 Botón de Volver */}
        <button className="btn-volver" onClick={() => navigate(-1)}>
          ⬅️ Volver
        </button>

        <h2>🩺 Exámenes Clínicos de la Mascota</h2>

        {examenesClinicos.length > 0 ? (
          <div className="tabla-container">
            <table className="historia-table">
              <thead>
                <tr>
                  <th>⚙️ Acciones</th> {/* ✅ Mueve los botones al inicio */}
                  <th>📅 Fecha</th>
                  <th>🩺 Actitud</th>
                  <th>🏋️ Condición Corporal</th>
                  <th>💧 Hidratación</th>
                  <th>📝 Observaciones</th>
                  <th>👀 Mucosa Conjuntiva</th>
                  <th>👀 Mucosa Conjuntiva - Observaciones</th>
                  <th>🦷 Mucosa Oral</th>
                  <th>🦷 Mucosa Oral - Observaciones </th>
                  <th>⚕️ Mucosa Vulvar/Prepucio</th>
                  <th>⚕️ Mucosa Vulvar/Prepucio - Observaciones</th>
                  <th>📌 Mucosa Rectal</th>
                  <th>📌 Mucosa Rectal - Observaciones</th>
                  <th>👀 Mucosa Ojos</th>
                  <th>👀 Mucosa Ojos - Observaciones</th>
                  <th>👂 Mucosa Oídos</th>
                  <th>👂 Mucosa Oídos - Observaciones</th>
                  <th>🔬 Mucosa Nódulos</th>
                  <th>🔬 Mucosa Nódulos Observaciones</th>
                  <th>🩹 Piel y Anexos</th>
                  <th>🩹 Piel y Anexos Observaciones</th>
                  <th>🏃 Estado de Locomoción</th>
                  <th>🏃 Estado de Locomoción Observaciones</th>
                  <th>💪 Sist Muscular</th>
                  <th>💪 Sist Muscular Observaciones</th>
                  <th>🧠 Sist Nervioso</th>
                  <th>🧠 Sist Nervioso Observaciones</th>
                  <th>❤️ Sist Cardiovascular</th>
                  <th>❤️ Sist Cardiovascular Observaciones</th>
                  <th>🌬️ Sist Respiratorio</th>
                  <th>🌬️ Sist Respiratorio Observaciones</th>
                  <th>🍽️ Sist Digestivo</th>
                  <th>🍽️ Sist Digestivo Observaciones</th>
                  <th>🚻 Sist Genitourinario</th>
                  <th>🚻 Sist Genitourinario Observaciones</th>
                </tr>
              </thead>
              <tbody>
                {examenesClinicos.map((examen) => (
                  <tr key={examen.id}>
                    <td>
                      <button className="btn btn-warning" onClick={() => navigate(`/editar-examen-clinico/${examen.id}`)}>
                        ✏️
                      </button>
                      <button className="btn btn-danger" onClick={() => handleEliminarExamenClinico(examen.id)}>
                        🗑
                      </button>
                    </td>
                    <td>{examen.fecha}</td>
                    <td>{examen.actitud}</td>
                    <td>{examen.condicion_corporal}</td>
                    <td>{examen.hidratacion}</td>
                    <td>{examen.observaciones}</td>
                    <td>{examen.mucosa_conjuntiva}</td>
                    <td>{examen.mucosa_conjuntiva_observaciones}</td>
                    <td>{examen.mucosa_oral}</td>
                    <td>{examen.mucosa_oral_observaciones}</td>
                    <td>{examen.mucosa_vulvar_prepu}</td>
                    <td>{examen.mucosa_vulvar_prepu_observaciones}</td>
                    <td>{examen.mucosa_rectal}</td>
                    <td>{examen.mucosa_rectal_observaciones}</td>
                    <td>{examen.mucosa_ojos}</td>
                    <td>{examen.mucosa_ojos_observaciones}</td>
                    <td>{examen.mucosa_oidos}</td>
                    <td>{examen.mucosa_oidos_observaciones}</td>
                    <td>{examen.mucosa_nodulos}</td>
                    <td>{examen.mucosa_nodulos_observaciones}</td>
                    <td>{examen.mucosa_piel_anexos}</td>
                    <td>{examen.mucosa_piel_anexos_observaciones}</td>
                    <td>{examen.locomocion_estado}</td>
                    <td>{examen.locomocion_observaciones}</td>
                    <td>{examen.musculo_estado}</td>
                    <td>{examen.musculo_observaciones}</td>
                    <td>{examen.nervioso_estado}</td>
                    <td>{examen.nervioso_observaciones}</td>
                    <td>{examen.cardiovascular_estado}</td>
                    <td>{examen.cardiovascular_observaciones}</td>
                    <td>{examen.respiratorio_estado}</td>
                    <td>{examen.respiratorio_observaciones}</td>
                    <td>{examen.digestivo_estado}</td>
                    <td>{examen.digestivo_observaciones}</td>
                    <td>{examen.genitourinario_estado}</td>
                    <td>{examen.genitourinario_observaciones}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No hay exámenes clínicos registrados.</p>
        )}
      </div>
    </div>
  );
};

export default VerExamenClinico;
