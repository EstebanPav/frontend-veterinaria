import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  // 📌 Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token"); // 🔹 Eliminar token de sesión
    navigate("/login"); // 🔹 Redirigir al login
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/registrar-propietario">Registrar Propietario</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/registrar-mascota">Registrar Mascota</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/registrar-historia/:mascotaId">Registrar Historia</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/registrar-examen-clinico">Registrar Examen Clínico</Link>
            </li>
            {/* 📌 Nueva opción para salir */}
            <li className="nav-item">
              <button className="nav-link btn btn-danger text-white" onClick={handleLogout}>
                Salir
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
