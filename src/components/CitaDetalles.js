import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NotificarCita from "./NotificarCita";
import axios from "axios";

const CitaDetalles = ({ cita, onClose, onDelete }) => {
  const navigate = useNavigate();
  const [citaDetalles, setCitaDetalles] = useState(null);
  const [showNotificar, setShowNotificar] = useState(false);

  useEffect(() => {
    const fetchCitaDetalles = async () => {
      if (!cita) return; // 🛑 Si no hay cita, no hacer la petición

      try {
        const response = await axios.get(`https://backend-veterinaria-ph2u.onrender.com/api/ver_cita/${cita.id}`);
        setCitaDetalles(response.data);
      } catch (error) {
        console.error("Error al obtener la cita:", error);
      }
    };

    fetchCitaDetalles();
  }, [cita]);

  // ✅ Evita errores si `cita` es `null` o no tiene datos
  if (!cita || !citaDetalles) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>📅 Detalles de la Cita</h2>

        <p><strong>📝 Motivo:</strong> {cita.title ? cita.title.split(" - ")[0] : "No disponible"}</p>
        <p><strong> 📅 Fecha: </strong> {cita.extendedProps?.fecha_hora || citaDetalles.fecha_hora || "No disponible"}</p>
        <p><strong>🐶 Mascota:</strong> {cita.extendedProps?.mascota || citaDetalles.mascota || "No disponible"}</p>
        <p><strong>👤 Propietario:</strong> {cita.extendedProps?.propietario || citaDetalles.propietario || "No disponible"}</p>
        <p><strong>📞 Contacto:</strong> {cita.extendedProps?.propietario_celular || citaDetalles.propietario_celular || "No disponible"}</p>
        <p><strong>👨‍⚕️ Veterinario:</strong> {cita.extendedProps?.veterinario || citaDetalles.veterinario || "No disponible"}</p>

        {/* 📌 Botones de acción */}
        <div className="modal-buttons">
          <button onClick={() => navigate(`/editar-cita/${cita.id}`)}>✏️ Editar</button>
          <button className="delete-btn" onClick={() => onDelete(cita.id)}>🗑 Borrar</button>
          <button className="close-btn" onClick={onClose}>❌ Cerrar</button>
          <button className="notify-btn" onClick={() => setShowNotificar(true)}>📢 Notificar</button>
        </div>
      </div>

      {/* 📌 Modal de Notificación */}
      {showNotificar && (
        <NotificarCita
          cita={citaDetalles}
          onClose={() => setShowNotificar(false)}
        />
      )}
    </div>
  );
};

export default CitaDetalles;
