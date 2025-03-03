import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Dashboard.css';

import Sidebar from '../components/Sidebar'; // 🔹 Importamos el nuevo Sidebar
import MascotasTable from './MascotasTable';
import ClinicaInfo from '../components/ClinicaInfo';
import Calendario from '../components/Calendario';

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    const forceTab = urlParams.get("forceTab");

    const [activeTab, setActiveTab] = useState(forceTab ? tabFromUrl : "clinica");

    const [mascotas, setMascotas] = useState([]);
    const [clinica, setClinica] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (activeTab === "mascotas") {
            fetchMascotas();
        } else if (activeTab === "clinica") {
            fetchClinicaInfo();
        }
    }, [activeTab]);

    const fetchMascotas = async () => {
        try {
            setLoading(true);
            const response = await axios.get("https://backend-veterinaria-ph2u.onrender.com/api/mascotas");
            setMascotas(response.data || []);
            setError("");
        } catch (err) {
            console.error("Error al obtener las mascotas:", err);
            setError("No se pudieron cargar los datos.");
            setMascotas([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchClinicaInfo = async () => {
        try {
            setLoading(true);
            const response = await axios.get("https://backend-veterinaria-ph2u.onrender.com/api/clinica");
            setClinica(response.data);
            setError("");
        } catch (err) {
            console.error("Error al obtener la información de la clínica:", err);
            setError("No se pudo cargar la información de la clínica.");
            setClinica(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-container">
            <Sidebar /> {/* 📌 Usamos el nuevo componente Sidebar */}

            {/* 📌 Contenido Principal */}
            <div className="content">
                <h1 className="dashboard-title">
                    {activeTab === "clinica" ? "Información de la Clínica"
                        : activeTab === "mascotas" ? "Mascotas"
                            : "Calendario"}
                </h1>

                {loading && <p className="loading-message">Cargando datos...</p>}
                {error && <p className="error-message">{error}</p>}

                {activeTab === "clinica" && <ClinicaInfo clinica={clinica} />}
                {activeTab === "mascotas" && <MascotasTable mascotas={mascotas} onMascotaUpdated={fetchMascotas} />}
                {activeTab === "calendario" && <Calendario />}
            </div>
        </div>
    );
};

export default Home;
