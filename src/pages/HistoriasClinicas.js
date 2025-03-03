import React, { useEffect, useState } from 'react';
import api from '../api';

const HistoriasClinicas = () => {
    const [historias, setHistorias] = useState([]);

    useEffect(() => {
        api.get('/historias-clinicas')
            .then((response) => {
                setHistorias(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener las historias clínicas:', error);
            });
    }, []);

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Historias Clínicas</h1>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nombre de la Mascota</th>
                        <th>Fecha</th>
                        <th>Diagnóstico</th>
                        <th>Tratamiento</th>
                        <th>Veterinario</th>
                    </tr>
                </thead>
                <tbody>
                    {historias.map((historia) => (
                        <tr key={historia.id}>
                            <td>{historia.id}</td>
                            <td>{historia.mascota_id}</td>
                            <td>{historia.fecha}</td>
                            <td>{historia.diagnostico}</td>
                            <td>{historia.tratamiento}</td>
                            <td>{historia.veterinario_id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HistoriasClinicas;
