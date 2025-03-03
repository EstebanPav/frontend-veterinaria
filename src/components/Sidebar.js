import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPaw, FaClinicMedical, FaCalendarAlt } from "react-icons/fa";
import "../Styles/Sidebar.css"; // Asegúrate de que este archivo existe y tiene estilos correctos

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <nav className="sidebar">
      <ul>
        <li onClick={() => navigate("/home")}>
          <FaClinicMedical /> Información Clínica
        </li>
        <li onClick={() => navigate("/ver-mascotas")}> {/* ✅ Corrige esta ruta */}
          <FaPaw /> Mascotas
        </li>
        <li onClick={() => navigate("/ver-citas")}>
          <FaCalendarAlt /> Calendario
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
