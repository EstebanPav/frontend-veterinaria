import React from 'react';

const EstadoReproductivo = ({ formData, setFormData }) => {
    const handleChange = (e, field) => {
        setFormData({
            ...formData,
            estadoReproductivo: {
                ...formData.estadoReproductivo,
                [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
            },
        });
    };

    return (
        <section>
            <h2>Estado Reproductivo</h2>
            <div className="form-group">
                <label>Estado:</label>
                <select
                    className="form-control"
                    value={formData.estadoReproductivo.estado}
                    onChange={(e) => handleChange(e, 'estado')}
                >
                    <option value="">Seleccione</option>
                    <option value="Entero">Entero</option>
                    <option value="Castrado">Castrado</option>
                </select>
            </div>
            <div className="form-group">
                <label>Gestación:</label>
                <input
                    type="checkbox"
                    checked={formData.estadoReproductivo.gestacion}
                    onChange={(e) => handleChange(e, 'gestacion')}
                />
            </div>
            <div className="form-group">
                <label>Lactancia:</label>
                <input
                    type="checkbox"
                    checked={formData.estadoReproductivo.lactancia}
                    onChange={(e) => handleChange(e, 'lactancia')}
                />
            </div>
        </section>
    );
};

export default EstadoReproductivo;
