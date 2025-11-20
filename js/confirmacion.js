// JavaScript para la página de confirmación

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Cargar resumen de todas las secciones
function cargarResumen() {
    let todasRespuestas = {};
    let seccionesCompletas = 0;
    let totalPreguntas = 0;
    let preguntasRespondidas = 0;

    // Consolidar respuestas de todas las secciones
    for (let i = 1; i <= 6; i++) {
        const borrador = localStorage.getItem(`borrador_seccion${i}`);
        if (borrador) {
            try {
                const respuestas = JSON.parse(borrador);
                Object.assign(todasRespuestas, respuestas);
                
                // Contar respuestas completadas en esta sección
                const respuestasSeccion = Object.entries(respuestas).filter(([key, value]) => 
                    value && value.trim() !== '' && !['empresa', 'contacto', 'email'].includes(key)
                );
                
                const preguntasSeccion = Object.keys(respuestas).filter(key => 
                    !['empresa', 'contacto', 'email'].includes(key)
                ).length;
                
                preguntasRespondidas += respuestasSeccion.length;
                totalPreguntas += preguntasSeccion;
                
                if (respuestasSeccion.length === preguntasSeccion && preguntasSeccion > 0) {
                    seccionesCompletas++;
                }
                
                // Actualizar resumen de la sección
                const resumenElemento = document.getElementById(`resumen-s${i}`);
                if (resumenElemento) {
                    const porcentaje = preguntasSeccion > 0 ? Math.round((respuestasSeccion.length / preguntasSeccion) * 100) : 0;
                    resumenElemento.innerHTML = `
                        <strong>${respuestasSeccion.length}/${preguntasSeccion}</strong> preguntas respondidas (${porcentaje}%)
                        ${porcentaje === 100 ? '<span style="color: var(--turquesa);"> ✓ Completo</span>' : '<span style="color: #ffc107;"> ⚠ Incompleto</span>'}
                    `;
                }
            } catch (error) {
                console.error(`Error al cargar sección ${i}:`, error);
            }
        } else {
            const resumenElemento = document.getElementById(`resumen-s${i}`);
            if (resumenElemento) {
                resumenElemento.innerHTML = '<span style="color: #dc3545;">Sin respuestas guardadas</span>';
            }
        }
    }

    // Actualizar resumen general
    const resumenContainer = document.getElementById('resumenContainer');
    if (resumenContainer) {
        const porcentajeTotal = totalPreguntas > 0 ? Math.round((preguntasRespondidas / totalPreguntas) * 100) : 0;
        
        resumenContainer.innerHTML = `
            <i class="fas fa-chart-pie"></i>
            <div>
                <strong>Progreso General:</strong> ${preguntasRespondidas}/${totalPreguntas} preguntas respondidas (${porcentajeTotal}%)
                <br>
                <strong>Secciones Completas:</strong> ${seccionesCompletas}/6
                ${seccionesCompletas < 6 ? '<br><span style="color: #856404;">⚠ Recomendamos completar todas las secciones antes de enviar</span>' : ''}
            </div>
        `;
    }

    return {
        respuestas: todasRespuestas,
        completo: seccionesCompletas === 6,
        porcentaje: totalPreguntas > 0 ? Math.round((preguntasRespondidas / totalPreguntas) * 100) : 0
    };
}

// Validar que haya datos mínimos
function validarDatos(respuestas) {
    if (!respuestas.empresa || !respuestas.contacto || !respuestas.email) {
        return {
            valido: false,
            mensaje: 'Faltan los datos de contacto (Sección 1). Por favor, complete la Sección 1 antes de enviar.'
        };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(respuestas.email)) {
        return {
            valido: false,
            mensaje: 'El email proporcionado no es válido. Por favor, verifique el email en la Sección 1.'
        };
    }

    return { valido: true };
}

// Mostrar alerta
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
        <div>${message}</div>
    `;
    
    const container = document.querySelector('.welcome-container');
    if (container) {
        container.insertBefore(alertDiv, container.firstChild);
        setTimeout(() => alertDiv.remove(), 5000);
        alertDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Enviar formulario
async function enviarFormulario() {
    const resumen = cargarResumen();
    
    // Validar datos
    const validacion = validarDatos(resumen.respuestas);
    if (!validacion.valido) {
        showAlert(validacion.mensaje, 'error');
        return;
    }

    // Confirmar envío
    if (resumen.porcentaje < 100) {
        const confirmar = confirm(
            `Su cuestionario está ${resumen.porcentaje}% completo. ` +
            `¿Desea enviarlo de todas formas? Las secciones incompletas quedarán con respuestas vacías.`
        );
        if (!confirmar) return;
    }

    const btnEnviar = document.getElementById('enviarFinalBtn');
    const btnOriginalText = btnEnviar.innerHTML;
    
    try {
        // Deshabilitar botón
        btnEnviar.disabled = true;
        btnEnviar.innerHTML = '<span class="loading"></span> Enviando...';
        
        const data = {
            id: generateUUID(),
            fecha_envio: new Date().toISOString(),
            empresa: resumen.respuestas.empresa,
            contacto: resumen.respuestas.contacto,
            email: resumen.respuestas.email,
            respuestas: JSON.stringify(resumen.respuestas),
            completado: true
        };
        
        const response = await fetch('tables/respuestas_sharepoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error('Error al enviar el formulario');
        }
        
        const result = await response.json();
        console.log('Formulario enviado:', result);
        
        // Guardar email en sesión para acceso posterior
        if (typeof setCurrentUserEmail === 'function') {
            setCurrentUserEmail(resumen.respuestas.email);
        }
        
        // Limpiar todos los borradores
        for (let i = 1; i <= 6; i++) {
            localStorage.removeItem(`borrador_seccion${i}`);
            localStorage.removeItem(`borrador_seccion${i}_fecha`);
        }
        
        // Mostrar mensaje de éxito
        document.querySelector('.welcome-container').style.display = 'none';
        document.getElementById('mensajeExito').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
    } catch (error) {
        console.error('Error:', error);
        showAlert('Error al enviar el cuestionario. Por favor, intente nuevamente.', 'error');
        btnEnviar.disabled = false;
        btnEnviar.innerHTML = btnOriginalText;
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Cargar resumen
    cargarResumen();
    
    // Botón enviar
    const btnEnviar = document.getElementById('enviarFinalBtn');
    if (btnEnviar) {
        btnEnviar.addEventListener('click', enviarFormulario);
    }
});