import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {setHours, setMinutes } from "date-fns";
import es from "date-fns/locale/es"; // 📌 Importamos el idioma español
import axios from "axios";
import "../Styles/Calendario.css";
import Sidebar from "../components/Sidebar";
import {FaArrowLeft } from "react-icons/fa"; // 🔹 Agregado FaArrowLeft para el botón de retroceso


const Calendario = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [motivo, setMotivo] = useState("");
    const [veterinarioId, setVeterinarioId] = useState("");
    const [mascota, setMascota] = useState(null);
    const [veterinarios, setVeterinarios] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchMascota = async () => {
            try {
                const response = await axios.get(`https://backend-veterinaria-ph2u.onrender.com/api/mascotas/${id}`);
                setMascota(response.data);
            } catch (error) {
                console.error("❌ Error al obtener la mascota:", error);
            }
        };

        if (id) {
            fetchMascota();
        }
    }, [id]);

    useEffect(() => {
        const fetchVeterinarios = async () => {
            try {
                const response = await axios.get("https://backend-veterinaria-ph2u.onrender.com/api/veterinarios_cita");
                setVeterinarios(response.data);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
                setMessage("❌ Error al cargar los datos.");
            }
        };
        fetchVeterinarios();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!selectedDate || !motivo.trim() || !veterinarioId) {
            setMessage("❌ Todos los campos son obligatorios.");
            return;
        }

        try {
            await axios.post("https://backend-veterinaria-ph2u.onrender.com/api/citas", {
                fecha_hora: selectedDate.toISOString().slice(0, 19).replace("T", " "),
                motivo,
                propietario_id: mascota.propietario_id,
                veterinario_id: veterinarioId,
                mascota_id: mascota.mascota_id,
            });

            setMessage("✅ Cita registrada correctamente.");
            setMotivo("");
            setVeterinarioId("");
            setSelectedDate(new Date());
        } catch (error) {
            console.error("Error al registrar la cita:", error);
            setMessage("❌ Error al registrar la cita.");
        }
    };

    return (

        
        <div className="dashboard-container">
            <Sidebar />
            <div className="calendario-container">
                {/* 📌 Botón para retroceder */}
                <button className="back-button" onClick={() => navigate(-1)}>
                      <FaArrowLeft /> Volver
                    </button>
                <h2>📅 Agendar una Cita</h2>

                <form onSubmit={handleSubmit} className="formulario-cita">
                    <label>Fecha y Hora de la cita:</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        showTimeSelect
                        dateFormat="yyyy-MM-dd HH:mm"
                        timeFormat="HH:mm"
                        minDate={new Date()} // 📌 No permite fechas pasadas
                        minTime={setMinutes(setHours(new Date(), 8), 0)} // 📌 Desde las 08:00 AM
                        maxTime={setMinutes(setHours(new Date(), 18), 0)} // 📌 Hasta las 06:00 PM
                        locale={es} // 📌 Calendario en español
                        className="date-picker"
                    />

                    <label>Motivo de la cita:</label>
                    <input 
                        type="text"
                        value={motivo}
                        onChange={(e) => setMotivo(e.target.value)}
                        required
                        placeholder="Ejemplo: Vacunación, Consulta, etc."
                    />

                    <label>Propietario:</label>
                    <input type="text" value={mascota ? mascota.propietario_nombre : "Cargando..."} disabled />

                    <label>Mascota:</label>
                    <input type="text" value={mascota ? mascota.mascota_nombre : "Cargando..."} disabled />

                    <label>Selecciona el Veterinario:</label>
                    <select value={veterinarioId} onChange={(e) => setVeterinarioId(e.target.value)} required>
                        <option value="">Seleccione...</option>
                        {veterinarios.map((vet) => (
                            <option key={vet.id} value={vet.id}>{vet.nombre} ({vet.celular || "Sin teléfono"})</option>
                        ))}
                    </select>

                    <button type="submit">Guardar Cita</button>
                    <button type="button" onClick={() => navigate("/ver-citas")}>
                        📅 Ver Citas
                    </button>
                </form>

                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default Calendario;
