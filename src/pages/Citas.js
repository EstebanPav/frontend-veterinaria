import React, { useEffect, useState } from 'react';
import api from '../api';

const Citas = () => {
    const [citas, setCitas] = useState([]);

    useEffect(() => {
        api.get('/citas')
            .then((response) => {
                setCitas(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener las citas:', error);
            });
    }, []);

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Citas Médicas</h1>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nombre de la Mascota</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Motivo</th>
                        <th>Veterinario</th>
                    </tr>
                </thead>
                <tbody>
                    {citas.map((cita) => (
                        <tr key={cita.id}>
                            <td>{cita.id}</td>
                            <td>{cita.mascota_id}</td>
                            <td>{cita.fecha}</td>
                            <td>{cita.hora}</td>
                            <td>{cita.motivo}</td>
                            <td>{cita.veterinario_id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Citas;
