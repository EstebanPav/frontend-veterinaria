import React from "react";

const ExamenesClinicosTable = ({ examenes }) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Mascota</th>
                        <th>Fecha</th>
                        <th>Actitud</th>
                        <th>Condición Corporal</th>
                        <th>Hidratación</th>
                        <th>Observaciones</th>
                        <th>Mucosa Conjuntiva</th>
                        <th>Obs. Conjuntiva</th>
                        <th>Mucosa Oral</th>
                        <th>Obs. Oral</th>
                        <th>Mucosa Vulvar/Prepucial</th>
                        <th>Obs. Vulvar/Prepucial</th>
                        <th>Mucosa Rectal</th>
                        <th>Obs. Rectal</th>
                        <th>Mucosa Ojos</th>
                        <th>Obs. Ojos</th>
                        <th>Mucosa Oídos</th>
                        <th>Obs. Oídos</th>
                        <th>Mucosa Nódulos</th>
                        <th>Obs. Nódulos</th>
                        <th>Piel Anexos</th>
                        <th>Obs. Piel Anexos</th>
                        <th>Locomoción</th>
                        <th>Obs. Locomoción</th>
                        <th>Músculo</th>
                        <th>Obs. Músculo</th>
                        <th>Nervioso</th>
                        <th>Obs. Nervioso</th>
                        <th>Cardiovascular</th>
                        <th>Obs. Cardiovascular</th>
                        <th>Respiratorio</th>
                        <th>Obs. Respiratorio</th>
                        <th>Digestivo</th>
                        <th>Obs. Digestivo</th>
                        <th>Genitourinario</th>
                        <th>Obs. Genitourinario</th>
                    </tr>
                </thead>
                <tbody>
                    {examenes.length > 0 ? (
                        examenes.map((examen) => (
                            <tr key={examen.id}>
                                <td>{examen.id}</td>
                                <td>{examen.mascota_id}</td>
                                <td>{examen.fecha}</td>
                                <td>{examen.actitud}</td>
                                <td>{examen.condicion_corporal}</td>
                                <td>{examen.hidratacion}</td>
                                <td>{examen.observaciones}</td>
                                <td>{examen.mucosa_conjuntiva}</td>
                                <td>{examen.mucosa_conjuntiva_observaciones}</td>
                                <td>{examen.mucosa_oral}</td>
                                <td>{examen.mucosa_oral_observaciones}</td>
                                <td>{examen.mucosa_vulvar_prepu}</td>
                                <td>{examen.mucosa_vulvar_prepu_observaciones}</td>
                                <td>{examen.mucosa_rectal}</td>
                                <td>{examen.mucosa_rectal_observaciones}</td>
                                <td>{examen.mucosa_ojos}</td>
                                <td>{examen.mucosa_ojos_observaciones}</td>
                                <td>{examen.mucosa_oidos}</td>
                                <td>{examen.mucosa_oidos_observaciones}</td>
                                <td>{examen.mucosa_nodulos}</td>
                                <td>{examen.mucosa_nodulos_observaciones}</td>
                                <td>{examen.mucosa_piel_anexos}</td>
                                <td>{examen.mucosa_piel_anexos_observaciones}</td>
                                <td>{examen.locomocion_estado}</td>
                                <td>{examen.locomocion_observaciones}</td>
                                <td>{examen.musculo_estado}</td>
                                <td>{examen.musculo_observaciones}</td>
                                <td>{examen.nervioso_estado}</td>
                                <td>{examen.nervioso_observaciones}</td>
                                <td>{examen.cardiovascular_estado}</td>
                                <td>{examen.cardiovascular_observaciones}</td>
                                <td>{examen.respiratorio_estado}</td>
                                <td>{examen.respiratorio_observaciones}</td>
                                <td>{examen.digestivo_estado}</td>
                                <td>{examen.digestivo_observaciones}</td>
                                <td>{examen.genitourinario_estado}</td>
                                <td>{examen.genitourinario_observaciones}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="38" className="text-center">No hay exámenes clínicos registrados.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ExamenesClinicosTable;
