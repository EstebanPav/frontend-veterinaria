import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/ClinicaInfo.css"; // Agregamos estilos personalizados

const ClinicaInfo = () => {
    const [clinica, setClinica] = useState(null);

    useEffect(() => {
        fetchClinicaInfo();
    }, []);

    const fetchClinicaInfo = async () => {
        try {
            const response = await axios.get("https://backend-veterinaria-ph2u.onrender.com/api/clinica"); // 🔹 Endpoint de la API
            setClinica(response.data);
        } catch (err) {
            console.error("Error al obtener la información de la clínica:", err);
        }
    };

    if (!clinica) return <p className="loading-message">Cargando información...</p>;

    return (
        <div className="clinica-container">
            <div className="clinica-card">
                <img src={clinica.logo_url} alt="Logo de la clínica" className="clinica-logo" />
                <h1>{clinica.nombre}</h1>
                <p><strong>📍 Dirección:</strong> {clinica.direccion}</p>
                <p><strong>📞 Teléfonos:</strong> {clinica.numeros_contacto}</p>
                <h3 className="clinica-eslogan">"{clinica.eslogan}"</h3>
            </div>
        </div>
    );
};

export default ClinicaInfo;
