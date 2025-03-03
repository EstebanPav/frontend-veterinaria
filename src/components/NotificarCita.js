import React from "react";

const NotificarCita = ({ cita, onClose }) => {
  if (!cita) return null; // Si no hay datos de la cita, no mostrar nada

  // 📌 Convertir número de teléfono a formato WhatsApp (+593)
  const formatearNumero = (numero) => {
    if (!numero) return "";
    return `+593${numero.slice(-9)}`; // Tomar los últimos 9 dígitos y agregar +593
  };

  // 📌 Números para WhatsApp
  const numeroVeterinario = formatearNumero(cita.veterinario_celular);
  const numeroPropietario = formatearNumero(cita.propietario_celular);

  // 📌 Mensaje personalizado
  const mensaje = `👋 *Hola!*
Se le recuerda que tiene una cita veterinaria el *${cita.fecha_hora}* 
para su mascota *${cita.mascota}*. 
Motivo: *${cita.motivo}*.
Por favor, estar puntual. 🕒🐶`.replace(/\n/g, "%0A");

  // 📌 Función para abrir WhatsApp Web y enviar mensaje
  const handleEnviarWhatsApp = () => {
    const urlWhatsApp = `https://web.whatsapp.com/send?phone=${numeroPropietario}&text=${mensaje}`;
    console.log("📩 Enviando WhatsApp:", urlWhatsApp); // Debug para ver la URL
    window.open(urlWhatsApp, "_blank"); // 🚀 Abrir en nueva pestaña
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>📩 Notificar Cita</h2>
        <p><strong>📲 Veterinario (Envia):</strong> {numeroVeterinario}</p>
        <p><strong>📞 Propietario (Recibe):</strong> {numeroPropietario}</p>
        <p><strong>📝 Mensaje:</strong></p>
        <textarea value={mensaje.replace(/%0A/g, "\n")} readOnly rows="5" />

        {/* 📌 Botones de acción */}
        <div className="modal-buttons">
          <button className="send-btn" onClick={handleEnviarWhatsApp}>📩 Enviar Notificación</button>
          <button className="close-btn" onClick={onClose}>❌ Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default NotificarCita;
