import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa"; // Icono de edición
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/Dashboard.css"; // Archivo de estilos

const HistoriasClinicasTable = () => {
    const [historias, setHistorias] = useState([]);
    const [veterinarios, setVeterinarios] = useState([]); // Lista de veterinarios
    const [editHistoria, setEditHistoria] = useState(null);
    const [formData, setFormData] = useState({});
    const [error, setError] = useState("");

    // Cargar historias clínicas desde la API
    useEffect(() => {
        fetchHistoriasClinicas();
        fetchVeterinarios();
    }, []);

    const fetchHistoriasClinicas = async () => {
        try {
            const response = await axios.get("https://backend-veterinaria-ph2u.onrender.com/api/historias_clinicas");
            setHistorias(response.data);
        } catch (error) {
            console.error("Error al obtener historias clínicas:", error);
            setError("No se pudieron cargar las historias clínicas.");
        }
    };

    const fetchVeterinarios = async () => {
        try {
            const response = await axios.get("https://backend-veterinaria-ph2u.onrender.com/api/veterinarios");
            setVeterinarios(response.data);
        } catch (error) {
            console.error("Error al obtener veterinarios:", error);
        }
    };

    // Activar modo edición
    const handleEditClick = (historia) => {
        setEditHistoria(historia.id);
        setFormData(historia);
    };

    // Guardar cambios
    const handleSave = async () => {
        try {
            await axios.put(`https://backend-veterinaria-ph2u.onrender.com/api/historias_clinicas/${editHistoria}`, formData);
            toast.success("Historia clínica actualizada exitosamente");
            setEditHistoria(null);
            fetchHistoriasClinicas(); // Recargar datos
        } catch (error) {
            console.error("Error al actualizar la historia clínica:", error);
            toast.error("Error al actualizar la historia clínica.");
        }
    };

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="table-responsive">
            <h2 className="text-center mt-3">Historias Clínicas</h2>
            {error && <p className="text-danger text-center">{error}</p>}
            <table className="table table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Mascota ID</th>
                        <th>Fecha</th>
                        <th>Vacuna Tipo</th>
                        <th>Vacuna Fecha</th>
                        <th>Desparasitación Producto</th>
                        <th>Desparasitación Fecha</th>
                        <th>Estado Reproductivo</th>
                        <th>Alimentación</th>
                        <th>Hábitat</th>
                        <th>Alergias</th>
                        <th>Cirugías</th>
                        <th>Antecedentes</th>
                        <th>Enfermedades Anteriores</th>
                        <th>Observaciones</th>
                        <th>Veterinario</th>
                        <th className="text-center">Acción</th> {/* Nueva columna centrada */}
                    </tr>
                </thead>
                <tbody>
                    {historias.length > 0 ? (
                        historias.map((historia) => (
                            <tr key={historia.id}>
                                <td>{historia.id}</td>
                                <td>{editHistoria === historia.id ? (
                                    <input type="number" name="mascota_id" value={formData.mascota_id} onChange={handleChange} />
                                ) : (
                                    historia.mascota_id
                                )}</td>
                                <td>{editHistoria === historia.id ? (
                                    <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} />
                                ) : (
                                    historia.fecha
                                )}</td>
                                <td>{editHistoria === historia.id ? (
                                    <input type="text" name="vacunacion_tipo" value={formData.vacunacion_tipo || ''} onChange={handleChange} />
                                ) : (
                                    historia.vacunacion_tipo
                                )}</td>
                                <td>{editHistoria === historia.id ? (
                                    <input type="date" name="vacunacion_fecha" value={formData.vacunacion_fecha || ''} onChange={handleChange} />
                                ) : (
                                    historia.vacunacion_fecha
                                )}</td>
                                <td>{editHistoria === historia.id ? (
                                    <input type="text" name="desparasitacion_producto" value={formData.desparasitacion_producto || ''} onChange={handleChange} />
                                ) : (
                                    historia.desparasitacion_producto
                                )}</td>
                                <td>{editHistoria === historia.id ? (
                                    <input type="date" name="desparasitacion_fecha" value={formData.desparasitacion_fecha || ''} onChange={handleChange} />
                                ) : (
                                    historia.desparasitacion_fecha
                                )}</td>
                                <td>{editHistoria === historia.id ? (
                                    <select name="estado_reproductivo" value={formData.estado_reproductivo} onChange={handleChange}>
                                        <option value="Entero">Entero</option>
                                        <option value="Castrado">Castrado</option>
                                        <option value="Gestación">Gestación</option>
                                        <option value="Lactancia">Lactancia</option>
                                    </select>
                                ) : (
                                    historia.estado_reproductivo
                                )}</td>
                                <td>{editHistoria === historia.id ? (
                                    <select name="alimentacion" value={formData.alimentacion} onChange={handleChange}>
                                        <option value="Balanceada">Balanceada</option>
                                        <option value="Casera">Casera</option>
                                        <option value="Mixta">Mixta</option>
                                    </select>
                                ) : (
                                    historia.alimentacion
                                )}</td>
                                <td>{historia.habitat}</td>
                                <td>{historia.alergias}</td>
                                <td>{historia.cirugias}</td>
                                <td>{historia.antecedentes}</td>
                                <td>{historia.EnfermedadesAnteriores}</td>
                                <td>{historia.observaciones}</td>
                                <td>{editHistoria === historia.id ? (
                                    <select name="veterinario_id" value={formData.veterinario_id} onChange={handleChange}>
                                        <option value="">Seleccione un veterinario</option>
                                        {veterinarios.map((vet) => (
                                            <option key={vet.id} value={vet.id}>{vet.nombre}</option>
                                        ))}
                                    </select>
                                ) : (
                                    veterinarios.find(vet => vet.id === historia.veterinario_id)?.nombre || "Sin asignar"
                                )}</td>
                                <td className="text-center">
                                    {editHistoria === historia.id ? (
                                        <button className="btn btn-success btn-sm" onClick={handleSave}>Guardar</button>
                                    ) : (
                                        <button className="btn btn-warning btn-sm" onClick={() => handleEditClick(historia)}>
                                            <FaEdit />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="17" className="text-center">No hay historias clínicas registradas.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default HistoriasClinicasTable;
