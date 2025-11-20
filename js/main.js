// Función para generar UUID
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Mostrar alertas
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    const form = document.getElementById('migracionForm');
    form.parentNode.insertBefore(alertDiv, form);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
    
    // Scroll to alert
    alertDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Calcular progreso del formulario
function calcularProgreso() {
    const form = document.getElementById('migracionForm');
    const campos = form.querySelectorAll('input[required], textarea');
    const camposCompletados = Array.from(campos).filter(campo => campo.value.trim() !== '');
    
    const porcentaje = Math.round((camposCompletados.length / campos.length) * 100);
    
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    progressFill.style.width = `${porcentaje}%`;
    progressText.textContent = `${porcentaje}% completado`;
    
    return porcentaje;
}

// Recolectar todas las respuestas del formulario
function recolectarRespuestas() {
    const form = document.getElementById('migracionForm');
    const formData = new FormData(form);
    const respuestas = {};
    
    for (let [key, value] of formData.entries()) {
        respuestas[key] = value;
    }
    
    return respuestas;
}

// Guardar borrador en localStorage
function guardarBorrador() {
    try {
        const respuestas = recolectarRespuestas();
        localStorage.setItem('borrador_sharepoint', JSON.stringify(respuestas));
        localStorage.setItem('borrador_fecha', new Date().toISOString());
        showAlert('Borrador guardado correctamente', 'success');
        return true;
    } catch (error) {
        console.error('Error al guardar borrador:', error);
        showAlert('Error al guardar el borrador', 'error');
        return false;
    }
}

// Cargar borrador desde localStorage
function cargarBorrador() {
    try {
        const borrador = localStorage.getItem('borrador_sharepoint');
        if (borrador) {
            const respuestas = JSON.parse(borrador);
            const form = document.getElementById('migracionForm');
            
            for (let [key, value] of Object.entries(respuestas)) {
                const campo = form.elements[key];
                if (campo) {
                    campo.value = value;
                }
            }
            
            const fecha = localStorage.getItem('borrador_fecha');
            if (fecha) {
                const fechaBorrador = new Date(fecha);
                showAlert(`Borrador cargado del ${fechaBorrador.toLocaleString('es-ES')}`, 'info');
            }
            
            calcularProgreso();
        }
    } catch (error) {
        console.error('Error al cargar borrador:', error);
    }
}

// Validar formulario
function validarFormulario() {
    const empresa = document.getElementById('empresa').value.trim();
    const contacto = document.getElementById('contacto').value.trim();
    const email = document.getElementById('email').value.trim();
    
    if (!empresa || !contacto || !email) {
        showAlert('Por favor, complete todos los campos obligatorios (Información de Contacto)', 'warning');
        return false;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAlert('Por favor, ingrese un email válido', 'warning');
        return false;
    }
    
    return true;
}

// Enviar formulario a la API
async function enviarFormulario(event) {
    event.preventDefault();
    
    if (!validarFormulario()) {
        return;
    }
    
    const btnEnviar = document.getElementById('enviarBtn');
    const btnOriginalText = btnEnviar.innerHTML;
    
    try {
        // Deshabilitar botón y mostrar loading
        btnEnviar.disabled = true;
        btnEnviar.innerHTML = '<span class="loading"></span> Enviando...';
        
        const respuestas = recolectarRespuestas();
        const empresa = document.getElementById('empresa').value;
        const contacto = document.getElementById('contacto').value;
        const email = document.getElementById('email').value;
        
        const data = {
            id: generateUUID(),
            fecha_envio: new Date().toISOString(),
            empresa: empresa,
            contacto: contacto,
            email: email,
            respuestas: JSON.stringify(respuestas),
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
        
        // Limpiar borrador
        localStorage.removeItem('borrador_sharepoint');
        localStorage.removeItem('borrador_fecha');
        
        // Mostrar mensaje de éxito
        document.getElementById('migracionForm').style.display = 'none';
        document.querySelector('.progress-bar').style.display = 'none';
        document.querySelector('.progress-text').style.display = 'none';
        document.getElementById('mensajeExito').style.display = 'block';
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
    } catch (error) {
        console.error('Error:', error);
        showAlert('Error al enviar el formulario. Por favor, intente nuevamente.', 'error');
        btnEnviar.disabled = false;
        btnEnviar.innerHTML = btnOriginalText;
    }
}

// Auto-guardar cada 2 minutos
let autoGuardadoInterval;

function iniciarAutoGuardado() {
    autoGuardadoInterval = setInterval(() => {
        const progreso = calcularProgreso();
        if (progreso > 0 && progreso < 100) {
            guardarBorrador();
        }
    }, 120000); // 2 minutos
}

// Detener auto-guardado
function detenerAutoGuardado() {
    if (autoGuardadoInterval) {
        clearInterval(autoGuardadoInterval);
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Cargar borrador si existe
    cargarBorrador();
    
    // Calcular progreso inicial
    calcularProgreso();
    
    // Actualizar progreso al escribir
    const campos = document.querySelectorAll('input, textarea');
    campos.forEach(campo => {
        campo.addEventListener('input', calcularProgreso);
    });
    
    // Botón guardar borrador
    document.getElementById('guardarBorradorBtn').addEventListener('click', guardarBorrador);
    
    // Enviar formulario
    document.getElementById('migracionForm').addEventListener('submit', enviarFormulario);
    
    // Iniciar auto-guardado
    iniciarAutoGuardado();
    
    // Detener auto-guardado al salir
    window.addEventListener('beforeunload', function(e) {
        const progreso = calcularProgreso();
        if (progreso > 0 && progreso < 100) {
            guardarBorrador();
            e.preventDefault();
            e.returnValue = '';
        }
    });
    
    // Smooth scroll para mejorar UX
    document.querySelectorAll('.section-title').forEach(title => {
        title.style.cursor = 'pointer';
        title.addEventListener('click', function() {
            this.parentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
});

// Limpiar recursos al salir
window.addEventListener('unload', detenerAutoGuardado);