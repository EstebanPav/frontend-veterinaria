import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es"; 
import axios from "axios";
import Sidebar from "../components/Sidebar"; // ✅ Sidebar integrado
import { useNavigate } from 'react-router-dom';
import "../Styles/VerCitas.css";
import CitaDetalles from "../components/CitaDetalles"; // 📌 Importamos la card

const VerCitas = () => {
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [citaSeleccionada, setCitaSeleccionada] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchCitas = async () => {
            try {
                const response = await axios.get("https://backend-veterinaria-ph2u.onrender.com/api/ver_citas");
                const citasFormateadas = response.data.map((cita) => ({
                    id: cita.id,
                    title: `🐾 ${cita.motivo} - ${cita.mascota}`,
                    start: cita.fecha_hora,
                    extendedProps: {
                        propietario: cita.propietario,
                        veterinario: cita.veterinario,
                        mascota: cita.mascota,
                        propietario_celular: cita.propietario_celular,
                    },
                }));

                setCitas(citasFormateadas);
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener las citas:", error);
                setError("❌ Error al cargar las citas.");
                setLoading(false);
            }
        };
        fetchCitas();
    }, []);

    // 📌 Función para borrar cita
    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar esta cita?")) {
            try {
                await axios.delete(`https://backend-veterinaria-ph2u.onrender.com/api/citas/${id}`);
                setCitas(citas.filter((cita) => cita.id !== id)); // 🔹 Elimina del estado
                setCitaSeleccionada(null);
                alert("✅ Cita eliminada correctamente.");
            } catch (error) {
                console.error("Error al eliminar la cita:", error);
                alert("❌ Error al eliminar la cita.");
            }
        }
    };

    // 📌 Función para editar cita (Redirige a un formulario de edición)
    const handleEdit = (id) => {
        navigate(`/editar-cita/${id}`);
    };

    return (
        <div className="dashboard-container">
            {/* 📌 Sidebar */}
            {/* 📌 Sidebar correctamente integrado */}
      <Sidebar />
            <div className="ver-citas-container">
                <h2>📅 Calendario de Citas</h2>

                {loading ? (
                    <p>Cargando citas...</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : citas.length === 0 ? (
                    <p>No hay citas registradas.</p>
                ) : (
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay",
                        }}
                        locale={esLocale}
                        events={citas}
                        eventClick={(info) => {
                            setCitaSeleccionada(info.event);
                        }}
                    />
                )}
            </div>

            {/* 📌 Mostrar Card de Detalles de la Cita */}
            <CitaDetalles
                cita={citaSeleccionada}
                onClose={() => setCitaSeleccionada(null)}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default VerCitas;
