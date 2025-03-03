import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Home from './pages/Home';
import RegistrarPropietario from './pages/RegistrarPropietario';
import RegistrarMascota from './pages/RegistrarMascota';
import RegistrarHistoriaClinica from './pages/RegistrarHistoriaClinica';
import RegistrarExamenClinico from './pages/RegistrarExamenClinicos';
import Navbar from './components/Navbar';
import MascotasTable from "./pages/MascotasTable"; // ✅ Tabla de mascotas
import EditarMascota from "./components/EditarMascota";
import Calendario from "./components/Calendario";
import VerCitas from "./components/VerCitas";
import EditarCita from "./components/EditarCitas";
import NotificarCita from './components/NotificarCita';
import VerPropietario from "./components/VerPropietario";
import VerHistoriaClinica from "./components/VerHistoriaClinica";
import EditarHistoriaClinica from "./components/EditarHistoriaClinica";
import EditarExamenClinico from './components/EditarExamenClinico';
import VerExamenClinico from "./components/VerExamenClinico";
import EditarDueñoMascota from "./components/EditarDueñoMascota";
import MascotaDetallesPage from "./pages/MascotaDetallesPage"; // ✅ Nueva página de detalles

// 📌 Middleware para proteger rutas privadas
const PrivateRoute = ({ element }) => {
    const token = localStorage.getItem("token");
    return token ? element : <Navigate to="/login" />;
};

const App = () => {
    return (
        <Router>
            <Navbar />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="colored"
            />

            <Routes>
                {/* Login */}
                <Route path="/login" element={<Login />} />

                {/* Rutas privadas con Sidebar */}
                <Route path="/home" element={<PrivateRoute element={<Home />} />} />
                <Route path="/registrar-propietario" element={<PrivateRoute element={<RegistrarPropietario />} />} />
                <Route path="/registrar-mascota" element={<PrivateRoute element={<RegistrarMascota />} />} />
                <Route path="/registrar-historia/:mascotaId" element={<PrivateRoute element={<RegistrarHistoriaClinica />} />} />
                <Route path="/ver-mascotas" element={<PrivateRoute element={<MascotasTable />} />} />  {/* ✅ Nueva Ruta */}
                <Route path="/detalle-mascota/:id" element={<PrivateRoute element={<MascotaDetallesPage />} />} />  {/* ✅ Página de detalles */}
                <Route path="/registrar-examen-clinico" element={<PrivateRoute element={<RegistrarExamenClinico />} />} />
                <Route path="/ver-citas" element={<PrivateRoute element={<VerCitas />} />} />
                <Route path="/editar-cita/:id" element={<PrivateRoute element={<EditarCita />} />} />
                <Route path="/registrar-cita/:id" element={<PrivateRoute element={<Calendario />} />} />
                <Route path="/editar-mascota/:id" element={<PrivateRoute element={<EditarMascota />} />} />
                <Route path="/notificar-cita/:id" element={<PrivateRoute element={<NotificarCita />} />} />
                <Route path="/ver-propietario/:id" element={<PrivateRoute element={<VerPropietario />} />} />
                <Route path="/editar-propietario/:id" element={<PrivateRoute element={<EditarDueñoMascota />} />} />
                <Route path="/ver-historia-clinica/:id" element={<PrivateRoute element={<VerHistoriaClinica />} />} />
                <Route path="/ver-examen-clinico/:id" element={<PrivateRoute element={<VerExamenClinico />} />} />

                <Route path="/editar-historia-clinica/:id" element={<PrivateRoute element={<EditarHistoriaClinica />} />} />
                <Route path="/editar-examen-clinico/:id" element={<PrivateRoute element={<EditarExamenClinico />} />} />

                {/* Redirigir a /login si no está autenticado */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
