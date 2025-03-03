import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
//import "../Styles/EditarExamenClinico.css";
import Sidebar from "../components/Sidebar"; // ✅ Sidebar integrado
import {FaArrowLeft } from 'react-icons/fa';


const EditarExamenClinico = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [examenClinico, setExamenClinico] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resExamen = await axios.get(`https://backend-veterinaria-ph2u.onrender.com/api/examen_clinico_detalle/${id}`);
                setExamenClinico(resExamen.data);
            } catch (error) {
                console.error("Error al obtener el examen clínico:", error);
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        setExamenClinico({ ...examenClinico, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://backend-veterinaria-ph2u.onrender.com/api/examen_clinico/${id}`, examenClinico);
            alert("✅ Examen clínico actualizado correctamente.");
            navigate(`/ver-examen-clinico/${examenClinico.mascota_id}`);
        } catch (error) {
            console.error("Error al actualizar el examen clínico:", error);
            alert("❌ Error al actualizar el examen clínico.");
        }
    };

    if (!examenClinico) return <p>Cargando...</p>;

    return (
      <div className="dashboard-container">
            {/* 📌 Sidebar correctamente integrado */}
      <Sidebar />
        <div className="editar-examen-container">
            <h2>✏️ Editar Examen Clínico</h2>
            <form onSubmit={handleSubmit}>
              {/* 📌 Botón para retroceder */}
              <button className="back-button" onClick={() => navigate(-1)}>
                    <FaArrowLeft /> Volver
                </button>
                 {/* Fecha */}
                <label>📅 Fecha:</label>
                <input type="date" name="fecha" value={examenClinico.fecha} onChange={handleChange} required />
                <div className="form-group">
                {/* Actitud */}
                <label>🩺 Actitud:</label>
                <select name="actitud" value={examenClinico.actitud} onChange={handleChange} required>
                        <option value="Alterado">Alterado</option>
                        <option value="Nervioso">Nervioso</option>
                        <option value="Tranquilo">Tranquilo</option>
                    </select>
                </div>
                 {/* Condicion Corportal */}
                <label>🏋️‍♂️ Condición Corporal:</label>
                <select
            name="condicion_corporal"
            value={examenClinico.condicion_corporal}
            onChange={handleChange} required>
            <option value="">Seleccione condición</option>
            <option value="Caquéctico">Caquéctico</option>
            <option value="Delgado">Delgado</option>
            <option value="Normal">Normal</option>
            <option value="Obeso">Obeso</option>
            <option value="Sobrepeso">Sobrepeso</option>
          </select>

           {/* Hidratacion */}
                <label>💧 Hidratación:</label>
                <select
            name="hidratacion"
            value={examenClinico.hidratacion}
            onChange={handleChange}
            required>
            <option value="">Seleccione hidratación</option>
            <option value="Normal">Normal</option>
            <option value="D. 0-5%">D. 0-5%</option>
            <option value="D. 6-7%">D. 6-7%</option>
            <option value="D. 8-9%">D. 8-9%</option>
            <option value="D. +10%">D. +10%</option>
          </select>

            {/* Observaciones*/}
                <label>📝 Observaciones:</label>
                <textarea name="observaciones" value={examenClinico.observaciones} onChange={handleChange}></textarea>

            {/* Mucosa Conjuntiva */}
                <label>👀 Mucosa Conjuntiva </label>
                <select
            name="mucosa_conjuntiva"
            value={examenClinico.mucosa_conjuntiva}
            onChange={handleChange}
            required>
            <option value="">Seleccione el estado</option>
            <option value="Normal">Normal</option>
            <option value="Anormal">Anormal</option>
            </select>
            {/* Mucosa Conjuntiva Observaciones */}
            <label>👀 Mucosa Conjuntiva Observacioens </label>
                <textarea name="mucosa_conjuntiva_observaciones" value={examenClinico.mucosa_conjuntiva_observaciones} onChange={handleChange}></textarea>


            {/* Campos Mucosas */}
          <fieldset>
            <legend>Mucosas</legend>
            {[
              "conjuntiva",
              "oral",
              "vulvar_prepu",
              "rectal",
              "ojos",
              "oidos",
              "nodulos",
              "piel_anexos",
            ].map((campo) => (
              <div key={campo}>
                <label>{campo.replace("_", " ").toUpperCase()}:</label>
                <select
                  name={`mucosa_${campo}`}
                  value={examenClinico[`mucosa_${campo}`]}
                  onChange={handleChange}
                >
                  <option value="">Seleccione</option>
                  <option value="Normal">Normal</option>
                  <option value="Anormal">Anormal</option>
                </select>
                <textarea
                  placeholder={`Observaciones para ${campo}`}
                  name={`mucosa_${campo}_observaciones`}
                  value={examenClinico[`mucosa_${campo}_observaciones`]}
                  onChange={handleChange}
                ></textarea>
              </div>
            ))}
          </fieldset> 
          {/* Campos de Sistemas */}
          {[
            "locomocion",
            "musculo",
            "nervioso",
            "cardiovascular",
            "respiratorio",
            "digestivo",
            "genitourinario",
          ].map((sistema) => (
            <fieldset key={sistema}>
              <legend>{sistema.replace("_", " ").toUpperCase()}</legend>
              <label>Estado:</label>
              <select
                name={`${sistema}_estado`}
                value={examenClinico[`${sistema}_estado`]}
                onChange={handleChange}
              >
                <option value="">Seleccione</option>
                <option value="Normal">Normal</option>
                <option value="Anormal">Anormal</option>
              </select>
              <textarea
                name={`${sistema}_observaciones`}
                value={examenClinico[`${sistema}_observaciones`]}
                onChange={handleChange}
                placeholder={`Observaciones para ${sistema}`}
              ></textarea>
            </fieldset>
          ))}
                <button type="submit">💾 Guardar Cambios</button>
                <button type="button" className="cancel-button" onClick={() => navigate(`/ver-examen-clinico/${examenClinico.mascota_id}`)}>❌ Cancelar</button>

            </form>
        </div>
        </div>
    );
};

export default EditarExamenClinico;
