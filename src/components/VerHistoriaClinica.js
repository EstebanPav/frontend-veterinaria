import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../Styles/VerHistoriasClinicas.css";
import { FaSearch, FaArrowLeft } from 'react-icons/fa';
import Sidebar from "../components/Sidebar"; // ✅ Sidebar integrado

const VerHistoriaClinica = () => {
    const { id } = useParams(); // Obtener el ID de la mascota desde la URL
    const [historiasClinicas, setHistoriasClinicas] = useState([]);
    const [filteredHistorias, setFilteredHistorias] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    // 🔹 Estado para la paginación
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // 🔹 Número de registros por página

    useEffect(() => {
        const fetchHistoriasClinicas = async () => {
            try {
                const response = await axios.get(`https://backend-veterinaria-ph2u.onrender.com/api/historia_clinica/${id}`);
                setHistoriasClinicas(response.data);
                setFilteredHistorias(response.data);
            } catch (error) {
                console.error("Error al obtener las historias clínicas:", error);
            }
        };

        fetchHistoriasClinicas();
    }, [id]);

    // 🔹 Filtrar historias clínicas según el término de búsqueda
    useEffect(() => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const results = historiasClinicas.filter((historia) =>
            Object.values(historia).some(
                (value) => value && value.toString().toLowerCase().includes(lowerCaseSearchTerm)
            )
        );
        setFilteredHistorias(results);
        setCurrentPage(1); // 🔹 Reiniciar a la primera página al buscar
    }, [searchTerm, historiasClinicas]);

    // 🔹 Función para eliminar una historia clínica
    const handleEliminarHistoria = async (historiaId) => {
        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar esta historia clínica?");
        if (!confirmacion) return;

        try {
            const response = await axios.delete(`https://backend-veterinaria-ph2u.onrender.com/api/historia_clinica/${historiaId}`);
            if (response.status === 200) {
                alert("✅ Historia clínica eliminada correctamente.");
                setHistoriasClinicas(historiasClinicas.filter(historia => historia.historia_id !== historiaId));
                setFilteredHistorias(filteredHistorias.filter(historia => historia.historia_id !== historiaId));
            } else {
                alert("❌ No se pudo eliminar la historia clínica.");
            }
        } catch (error) {
            console.error("❌ Error al eliminar la historia clínica:", error);
            alert("❌ No se pudo eliminar la historia clínica.");
        }
    };

    // 🔹 Calcular qué elementos mostrar en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredHistorias.slice(indexOfFirstItem, indexOfLastItem);

    // 🔹 Funciones para cambiar de página
    const nextPage = () => {
        if (currentPage < Math.ceil(filteredHistorias.length / itemsPerPage)) {
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
                {/* 📌 Botón para retroceder */}
                <button className="back-button" onClick={() => navigate(-1)}>
                    <FaArrowLeft /> Volver
                </button>

                <h2>📜 Historial Clínico</h2>

                {/* 🔍 Barra de búsqueda */}
                <div className="search-container">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="🔍 Buscar en cualquier campo..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {filteredHistorias.length > 0 && (
                    <div className="tabla-container">
                        <table className="historia-table">
                            <thead>
                                <tr>
                                    <th>⚙️ Acciones</th> {/* ✅ Mueve los botones al inicio */}
                                    <th>📅 Fecha</th>
                                    <th>💉 Vacuna</th>
                                    <th>📅 Vacuna Fecha</th>
                                    <th>🦠 Desparasitación</th>
                                    <th>📅 Desparasitación Fecha</th>
                                    <th>🔬 Estado</th>
                                    <th>🍖 Alimentación</th>
                                    <th>🏠 Hábitat</th>
                                    <th>⚠️ Alergias</th>
                                    <th>🔪 Cirugías</th>
                                    <th>📋 Antecedentes</th>
                                    <th>🩺 Enfermedades</th>
                                    <th>📝 Observaciones</th>
                                    <th>👨‍⚕️ Veterinario</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((historia) => (
                                    <tr key={historia.historia_id}>
                                        <td>
                                            <button
                                                className="btn btn-warning"
                                                onClick={() => navigate(`/editar-historia-clinica/${historia.historia_id}`)}
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleEliminarHistoria(historia.historia_id)}
                                            >
                                                🗑
                                            </button>
                                        </td>
                                        <td>{historia.fecha}</td>
                                        <td>{historia.vacunacion_tipo}</td>
                                        <td>{historia.vacunacion_fecha}</td>
                                        <td>{historia.desparasitacion_producto}</td>
                                        <td>{historia.desparasitacion_fecha}</td>
                                        <td>{historia.estado_reproductivo}</td>
                                        <td>{historia.alimentacion}</td>
                                        <td>{historia.habitat}</td>
                                        <td>{historia.alergias}</td>
                                        <td>{historia.cirugias}</td>
                                        <td>{historia.antecedentes}</td>
                                        <td>{historia.EnfermedadesAnteriores}</td>
                                        <td>{historia.observaciones}</td>
                                        <td>{historia.veterinario}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* 📌 Controles de paginación */}
                        <div className="pagination">
                            <div className="pagination-buttons">
                                {/* Botón Anterior */}
                                <button
                                    onClick={prevPage}
                                    disabled={currentPage === 1}
                                    className="pagination-btn"
                                >
                                    ⬅️ Anterior
                                </button>

                                {/* Botón Siguiente */}
                                <button
                                    onClick={nextPage}
                                    disabled={currentPage >= Math.ceil(filteredHistorias.length / itemsPerPage)}
                                    className="pagination-btn"
                                >
                                    Siguiente ➡️
                                </button>
                            </div>

                            {/* 📌 Números de página dinámicos */}
                            <div className="pagination-numbers">
                                {Array.from({ length: Math.ceil(filteredHistorias.length / itemsPerPage) }, (_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => setCurrentPage(index + 1)}
                                        className={`pagination-number ${currentPage === index + 1 ? "active" : ""}`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerHistoriaClinica;
