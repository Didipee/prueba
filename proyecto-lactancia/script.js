// Esperamos a que el documento cargue completamente
document.addEventListener('DOMContentLoaded', function() {
    
    // Obtenemos el botón
    const btnCalcular = document.getElementById('btnCalcular');

    // Añadimos el evento "click" al botón
    if (btnCalcular) {
        btnCalcular.addEventListener('click', calcularVencimiento);
    }
});

function calcularVencimiento() {
    // 1. Obtener valores del formulario
    const horaInput = document.getElementById('extractionTime').value;
    const ubicacion = document.getElementById('storageLocation').value;
    
    // Referencias a elementos donde mostraremos el resultado
    const cajaResultado = document.getElementById('resultadoBox');
    const textoHora = document.getElementById('horaVencimiento');
    const textoDetalle = document.getElementById('mensajeDetalle');

    // Validación simple
    if (!horaInput) {
        alert("Por favor ingresa la hora de extracción.");
        return;
    }

    // 2. Crear fecha base con la hora ingresada
    const fechaActual = new Date();
    const [horas, minutos] = horaInput.split(':');
    let fechaVencimiento = new Date();
    
    // Configuramos la fecha de hoy con la hora que puso la usuaria
    fechaVencimiento.setHours(parseInt(horas), parseInt(minutos), 0);

    // Lógica de cálculo basada en las guías de salud
    let duracionTexto = "";

    if (ubicacion === 'mesa') {
        // Dura 4 horas a temperatura ambiente
        fechaVencimiento.setHours(fechaVencimiento.getHours() + 4);
        duracionTexto = "Dura aprox. 4 horas a temperatura ambiente (si no hace mucho calor).";
    
    } else if (ubicacion === 'refri') {
        // Dura 4 días en refrigeradora
        fechaVencimiento.setDate(fechaVencimiento.getDate() + 4);
        duracionTexto = "Dura hasta 4 días en el fondo de la refrigeradora.";
    
    } else if (ubicacion === 'conge') {
        // Dura 3 meses congelada
        fechaVencimiento.setMonth(fechaVencimiento.getMonth() + 3);
        duracionTexto = "Dura hasta 3 meses congelada.";
    }

    // 3. Formatear la salida para Perú (es-PE)
    const opcionesHora = { hour: '2-digit', minute: '2-digit', hour12: true };
    const opcionesFecha = { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', hour12: true };
    
    // Si es congelador o refri, mostramos la fecha completa. Si es mesa, solo la hora.
    if (ubicacion === 'conge' || ubicacion === 'refri') {
        textoHora.innerText = fechaVencimiento.toLocaleDateString('es-PE', opcionesFecha);
    } else {
        textoHora.innerText = fechaVencimiento.toLocaleTimeString('es-PE', opcionesHora);
    }

    textoDetalle.innerText = duracionTexto;
    
    // 4. Mostrar la caja de resultado con efecto
    cajaResultado.style.display = 'block';
}