import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../Styles/EditarHistoriaClinica.css"; // Archivo CSS mejorado
import Sidebar from "../components/Sidebar"; // ✅ Sidebar integrado
import {FaArrowLeft } from 'react-icons/fa';

const EditarHistoriaClinica = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [historiaClinica, setHistoriaClinica] = useState(null);
    const [veterinarios, setVeterinarios] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resHistoria = await axios.get(`https://backend-veterinaria-ph2u.onrender.com/api/historia_clinica_detalle/${id}`);
                setHistoriaClinica(resHistoria.data);

                const resVeterinarios = await axios.get("https://backend-veterinaria-ph2u.onrender.com/api/veterinarios");
                setVeterinarios(resVeterinarios.data);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        setHistoriaClinica({ ...historiaClinica, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://backend-veterinaria-ph2u.onrender.com/api/historia_clinica/${id}`, historiaClinica);
            alert("✅ Historia clínica actualizada correctamente.");
            navigate(`/ver-historia-clinica/${historiaClinica.mascota_id}`);
        } catch (error) {
            console.error("Error al actualizar la historia clínica:", error);
            alert("❌ Error al actualizar la historia clínica.");
        }
    };

    if (!historiaClinica) return <p>Cargando...</p>;

    return (
         <div className="dashboard-container">
                   {/* 📌 Sidebar correctamente integrado */}
      <Sidebar />
        
        <div className="editar-historia-container">
            {/* 📌 Botón para retroceder */}
                            <button className="back-button" onClick={() => navigate(-1)}>
                                <FaArrowLeft /> Volver
                            </button>
            <h2>✏️ Editar Historia Clínica</h2>
            <form onSubmit={handleSubmit} className="editar-form">
                <div className="form-group">
                    <label>📅 Fecha:</label>
                    <input type="date" name="fecha" value={historiaClinica.fecha} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>💉 Vacuna Tipo:</label>
                    <input type="text" name="vacunacion_tipo" value={historiaClinica.vacunacion_tipo} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>📅 Vacuna Fecha:</label>
                    <input type="date" name="vacunacion_fecha" value={historiaClinica.vacunacion_fecha} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>🦠 Desparasitación Producto:</label>
                    <input type="text" name="desparasitacion_producto" value={historiaClinica.desparasitacion_producto} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>📅 Desparasitación Fecha:</label>
                    <input type="date" name="desparasitacion_fecha" value={historiaClinica.desparasitacion_fecha} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>🔬 Estado Reproductivo:</label>
                    <select name="estado_reproductivo" value={historiaClinica.estado_reproductivo} onChange={handleChange}>
                        <option value="Entero">Entero</option>
                        <option value="Castrado">Castrado</option>
                        <option value="Gestación">Gestación</option>
                        <option value="Lactancia">Lactancia</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>🍖 Alimentación:</label>
                    <select name="alimentacion" value={historiaClinica.alimentacion} onChange={handleChange}>
                        <option value="Balanceada">Balanceada</option>
                        <option value="Casera">Casera</option>
                        <option value="Mixta">Mixta</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>🏠 Hábitat:</label>
                    <select name="habitat" value={historiaClinica.habitat} onChange={handleChange}>
                        <option value="Urbana">Urbana</option>
                        <option value="Rural">Rural</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>⚠️ Alergias:</label>
                    <textarea name="alergias" value={historiaClinica.alergias} onChange={handleChange}></textarea>
                </div>

                <div className="form-group">
                    <label>🔪 Cirugías:</label>
                    <textarea name="cirugias" value={historiaClinica.cirugias} onChange={handleChange}></textarea>
                </div>

                <div className="form-group">
                    <label>📋 Antecedentes:</label>
                    <textarea name="antecedentes" value={historiaClinica.antecedentes} onChange={handleChange}></textarea>
                </div>

                <div className="form-group">
                    <label>🩺 Enfermedades Previas:</label>
                    <textarea name="EnfermedadesAnteriores" value={historiaClinica.EnfermedadesAnteriores} onChange={handleChange}></textarea>
                </div>

                <div className="form-group">
                    <label>📝 Observaciones:</label>
                    <textarea name="observaciones" value={historiaClinica.observaciones} onChange={handleChange}></textarea>
                </div>

                <div className="form-group">
                    <label>👨‍⚕️ Veterinario:</label>
                    <select name="veterinario_id" value={historiaClinica.veterinario_id} onChange={handleChange}>
                        {veterinarios.map((vet) => (
                            <option key={vet.id} value={vet.id}>{vet.nombre}</option>
                        ))}
                    </select>
                </div>

                <div className="button-group">
                    <button type="submit" className="btn-save">💾 Guardar Cambios</button>
                    <button type="button" className="cancel-button" onClick={() => navigate(`/ver-historia-clinica/${historiaClinica.mascota_id}`)}>❌ Cancelar</button>


                </div>
            </form>
        </div>
        </div>
    );
};

export default EditarHistoriaClinica;
