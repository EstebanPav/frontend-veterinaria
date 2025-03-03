import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PropietariosTable = () => {
    const [propietarios, setPropietarios] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({});

    useEffect(() => {
        fetchPropietarios();
    }, []);

    const fetchPropietarios = async () => {
        try {
            const response = await axios.get('https://backend-veterinaria-ph2u.onrender.com/api/propietarios');
            setPropietarios(response.data);
        } catch (error) {
            toast.error('Error al cargar propietarios');
        }
    };

    const handleEditChange = (e) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };

    const handleEdit = (rowData) => {
        setEditingId(rowData.id);
        setEditFormData({ ...rowData });
    };

    const handleSaveEdit = async () => {
        try {
            await axios.put(`https://backend-veterinaria-ph2u.onrender.com/api/propietarios/${editingId}`, editFormData);
            toast.success('Propietario actualizado correctamente');
            setEditingId(null);
            fetchPropietarios();
        } catch (error) {
            toast.error('Error al actualizar el propietario');
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditFormData({});
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar este propietario?')) return;
        try {
            await axios.delete(`https://backend-veterinaria-ph2u.onrender.com/api/propietarios/${id}`);
            toast.success('Propietario eliminado correctamente');
            fetchPropietarios();
        } catch (error) {
            toast.error('No puede eliminar a un propietario con mascota registrada');
        }
    };

    return (
        <div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Dirección</th>
                        <th>Ciudad</th>
                        <th>Provincia</th>
                        <th>Cédula</th>
                        <th>Celular</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {propietarios.map((item) => (
                        <tr key={item.id}>
                            {editingId === item.id ? (
                                <>
                                    <td>{item.id}</td>
                                    <td><input type="text" name="nombre" value={editFormData.nombre} onChange={handleEditChange} /></td>
                                    <td><input type="text" name="direccion" value={editFormData.direccion} onChange={handleEditChange} /></td>
                                    <td><input type="text" name="ciudad" value={editFormData.ciudad} onChange={handleEditChange} /></td>
                                    <td><input type="text" name="provincia" value={editFormData.provincia} onChange={handleEditChange} /></td>
                                    <td><input type="text" name="cedula" value={editFormData.cedula} onChange={handleEditChange} /></td>
                                    <td><input type="text" name="celular" value={editFormData.celular} onChange={handleEditChange} /></td>
                                    <td>
                                        <button className="btn btn-success" onClick={handleSaveEdit}>Guardar</button>
                                        <button className="btn btn-secondary" onClick={handleCancelEdit}>Cancelar</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{item.id}</td>
                                    <td>{item.nombre}</td>
                                    <td>{item.direccion}</td>
                                    <td>{item.ciudad}</td>
                                    <td>{item.provincia}</td>
                                    <td>{item.cedula}</td>
                                    <td>{item.celular}</td>
                                    <td>
                                        <button className="btn btn-warning me-2" onClick={() => handleEdit(item)}><FaEdit /></button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(item.id)}><FaTrash /></button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PropietariosTable;
