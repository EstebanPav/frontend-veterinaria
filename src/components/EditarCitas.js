import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes } from "date-fns";
import es from "date-fns/locale/es"; // 📌 Configuración en español
import Sidebar from "../components/Sidebar";
import "../Styles/EditarCita.css";
import {FaArrowLeft } from "react-icons/fa"; // 🔹 Agregado FaArrowLeft para el botón de retroceso


const EditarCita = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [motivo, setMotivo] = useState("");
    const [veterinarioId, setVeterinarioId] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    
    const [mascota, setMascota] = useState(null);
    const [veterinarios, setVeterinarios] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resCita = await axios.get(`https://backend-veterinaria-ph2u.onrender.com/api/ver_cita/${id}`);
                const cita = resCita.data;

                setSelectedDate(new Date(cita.fecha_hora));
                setMotivo(cita.motivo);
                setVeterinarioId(cita.veterinario_id);
                
                const resMascota = await axios.get(`https://backend-veterinaria-ph2u.onrender.com/api/mascotas/${cita.mascota_id}`);
                setMascota(resMascota.data);

                const resVeterinarios = await axios.get("https://backend-veterinaria-ph2u.onrender.com/api/veterinarios_cita");
                setVeterinarios(resVeterinarios.data);
                
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
                setMessage("❌ Error al cargar los datos de la cita.");
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            await axios.put(`https://backend-veterinaria-ph2u.onrender.com/api/editar_cita/${id}`, {
                fecha_hora: selectedDate.toISOString().slice(0, 19).replace("T", " "),
                motivo,
                veterinario_id: veterinarioId,
            });
            setMessage("✅ Cita actualizada correctamente.");
            
            setTimeout(() => {
                navigate("/ver-citas");
                window.location.reload();
            }, 1500);
        } catch (error) {
            console.error("Error al actualizar la cita:", error);
            setMessage("❌ Error al actualizar la cita.");
        }
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="editar-cita-content">
                <h2 className="editar-cita-title">📅 Editar Cita Clínica</h2>
                {/* 📌 Botón para retroceder */}
                <button className="back-button" onClick={() => navigate(-1)}>
                      <FaArrowLeft /> Volver
                    </button>

                {loading ? (
                    <p className="loading-message">Cargando datos...</p>
                ) : (
                    <form onSubmit={handleSubmit} className="editar-cita-form">
                        <label>📅 Fecha y Hora:</label>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            showTimeSelect
                            dateFormat="yyyy-MM-dd HH:mm"
                            timeFormat="HH:mm"
                            minDate={new Date()} // 📌 No permite fechas pasadas
                            minTime={setMinutes(setHours(new Date(), 8), 0)} // 📌 Desde las 08:00 AM
                            maxTime={setMinutes(setHours(new Date(), 18), 0)} // 📌 Hasta las 06:00 PM
                            locale={es} // 📌 Configura en español
                            className="date-picker"
                        />

                        <label>📝 Motivo:</label>
                        <textarea 
                            value={motivo} 
                            onChange={(e) => setMotivo(e.target.value)}
                        ></textarea>

                        <label>🐶 Mascota:</label>
                        <input type="text" value={mascota ? mascota.mascota_nombre : "Cargando..."} disabled />

                        <label>👤 Propietario:</label>
                        <input type="text" value={mascota ? mascota.propietario_nombre : "Cargando..."} disabled />

                        <label>👨‍⚕️ Veterinario:</label>
                        <select value={veterinarioId} onChange={(e) => setVeterinarioId(e.target.value)}>
                            <option value="">Seleccione un veterinario</option>
                            {veterinarios.map((v) => (
                                <option key={v.id} value={v.id}>{v.nombre}</option>
                            ))}
                        </select>

                        <button type="submit" className="btn-guardar">💾 Guardar Cambios</button>
                        <button type="button" className="btn-cancelar" onClick={() => navigate("/ver-citas")}>❌ Cancelar</button>
                    </form>
                )}

                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default EditarCita;
