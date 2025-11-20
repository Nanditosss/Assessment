// JavaScript común para todas las secciones del cuestionario

// Función para generar UUID
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Obtener número de sección actual desde la URL
function getCurrentSection() {
    const path = window.location.pathname;
    const href = window.location.href;
    const match = path.match(/seccion(\d+)\.html/);
    const result = match ? parseInt(match[1]) : 1;
    
    // Solo log en debug mode (cuando no es la inicialización)
    if (window.debugMode) {
        console.log(`🔍 getCurrentSection():`);
        console.log(`   - Full URL: ${href}`);
        console.log(`   - Pathname: ${path}`);
        console.log(`   - Match: ${match}`);
        console.log(`   - Result: ${result}`);
    }
    
    return result;
}

// Mostrar alertas
function showAlert(message, type = 'info') {
    // Eliminar alertas previas
    const alertaPrevia = document.querySelector('.alert');
    if (alertaPrevia) {
        alertaPrevia.remove();
    }
    
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
        <div>${message}</div>
    `;
    
    const form = document.querySelector('form');
    if (form) {
        form.parentNode.insertBefore(alertDiv, form);
    }
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
    
    // Scroll to alert
    alertDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Calcular progreso del formulario
function calcularProgreso() {
    const form = document.querySelector('form');
    if (!form) return 0;
    
    const campos = form.querySelectorAll('input[required], textarea, input[type="text"], input[type="email"]');
    const camposCompletados = Array.from(campos).filter(campo => campo.value.trim() !== '');
    
    const porcentaje = campos.length > 0 ? Math.round((camposCompletados.length / campos.length) * 100) : 0;
    
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    if (progressFill && progressText) {
        progressFill.style.width = `${porcentaje}%`;
        progressText.textContent = `${porcentaje}% completado`;
    }
    
    return porcentaje;
}

// Actualizar estado de navegación
function actualizarNavegacion() {
    const currentSection = getCurrentSection();
    const steps = document.querySelectorAll('.step');
    
    steps.forEach((step, index) => {
        const stepNum = index + 1;
        step.classList.remove('active', 'completed');
        
        if (stepNum < currentSection) {
            step.classList.add('completed');
        } else if (stepNum === currentSection) {
            step.classList.add('active');
        }
    });
}

// Recolectar respuestas del formulario actual
function recolectarRespuestas() {
    const form = document.querySelector('form');
    if (!form) {
        console.error('recolectarRespuestas: Formulario no encontrado');
        return {};
    }
    
    const formData = new FormData(form);
    const respuestas = {};
    let count = 0;
    
    for (let [key, value] of formData.entries()) {
        respuestas[key] = value;
        count++;
    }
    
    console.log(`recolectarRespuestas: ${count} campos capturados`, respuestas);
    return respuestas;
}

// Guardar borrador de la sección actual
function guardarBorrador() {
    try {
        const seccion = getCurrentSection();
        console.log(`💾 guardarBorrador: Guardando sección ${seccion}`);
        console.log(`💾 URL actual: ${window.location.href}`);
        
        const respuestas = recolectarRespuestas();
        
        if (Object.keys(respuestas).length === 0) {
            console.warn('💾 guardarBorrador: No hay datos para guardar');
            showAlert('No hay datos para guardar', 'warning');
            return false;
        }
        
        const jsonString = JSON.stringify(respuestas);
        const key = `borrador_seccion${seccion}`;
        
        console.log(`💾 Guardando en localStorage: ${key}`);
        console.log(`💾 Datos a guardar: ${jsonString.substring(0, 100)}...`);
        
        localStorage.setItem(key, jsonString);
        localStorage.setItem(`borrador_seccion${seccion}_fecha`, new Date().toISOString());
        
        // Verificar que se guardó correctamente
        const verificacion = localStorage.getItem(key);
        if (verificacion === jsonString) {
            console.log(`💾 ✅ Guardado VERIFICADO en localStorage (${jsonString.length} bytes)`);
            showAlert(`✓ Borrador de la Sección ${seccion} guardado correctamente`, 'success');
            return true;
        } else {
            console.error(`💾 ❌ ERROR: Los datos guardados no coinciden!`);
            showAlert('Error: Los datos no se guardaron correctamente', 'error');
            return false;
        }
    } catch (error) {
        console.error('💾 ❌ Error al guardar borrador:', error);
        console.error('💾 Error stack:', error.stack);
        showAlert('Error al guardar el borrador', 'error');
        return false;
    }
}

// Cargar borrador de la sección actual
function cargarBorrador() {
    try {
        const seccion = getCurrentSection();
        const borrador = localStorage.getItem(`borrador_seccion${seccion}`);
        
        if (borrador) {
            const respuestas = JSON.parse(borrador);
            const form = document.querySelector('form');
            
            if (form) {
                for (let [key, value] of Object.entries(respuestas)) {
                    const campo = form.elements[key];
                    if (campo) {
                        campo.value = value;
                    }
                }
                
                const fecha = localStorage.getItem(`borrador_seccion${seccion}_fecha`);
                if (fecha) {
                    const fechaBorrador = new Date(fecha);
                    showAlert(`Borrador cargado del ${fechaBorrador.toLocaleString('es-ES')}`, 'info');
                }
                
                calcularProgreso();
            }
        }
    } catch (error) {
        console.error('Error al cargar borrador:', error);
    }
}

// Consolidar todas las secciones
function consolidarRespuestas() {
    const todasRespuestas = {};
    
    for (let i = 1; i <= 6; i++) {
        const borrador = localStorage.getItem(`borrador_seccion${i}`);
        if (borrador) {
            const respuestas = JSON.parse(borrador);
            Object.assign(todasRespuestas, respuestas);
        }
    }
    
    return todasRespuestas;
}

// Validar formulario
function validarFormulario() {
    const form = document.querySelector('form');
    if (!form) return false;
    
    const camposRequeridos = form.querySelectorAll('[required]');
    let valido = true;
    let primerCampoInvalido = null;
    
    camposRequeridos.forEach(campo => {
        if (!campo.value.trim()) {
            valido = false;
            campo.style.borderColor = '#dc3545';
            if (!primerCampoInvalido) primerCampoInvalido = campo;
        } else {
            campo.style.borderColor = '';
        }
    });
    
    // Validar email si estamos en sección 1
    const currentSection = getCurrentSection();
    if (currentSection === 1) {
        const email = document.getElementById('email');
        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                showAlert('Por favor, ingrese un email válido', 'warning');
                email.style.borderColor = '#dc3545';
                if (!primerCampoInvalido) primerCampoInvalido = email;
                return false;
            }
        }
    }
    
    if (!valido) {
        showAlert('Por favor, complete todos los campos obligatorios', 'warning');
        if (primerCampoInvalido) {
            primerCampoInvalido.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => primerCampoInvalido.focus(), 500);
        }
    }
    
    return valido;
}

// Guardar y continuar
async function guardarYContinuar(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation(); // Evitar que el evento se propague
    }
    
    // Activar debug mode
    window.debugMode = true;
    
    console.log('✅✅✅ guardarYContinuar ejecutado ✅✅✅');
    
    // Deshabilitar botón temporalmente para evitar clicks múltiples
    const submitBtn = document.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Guardando...';
    }
    
    if (!validarFormulario()) {
        console.log('❌ Validación fallida');
        // Rehabilitar botón
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-arrow-right"></i> Guardar y Continuar';
        }
        return false;
    }
    
    console.log('✅ Validación exitosa, guardando...');
    const guardadoExitoso = guardarBorrador();
    
    if (!guardadoExitoso) {
        console.log('❌ Error al guardar');
        // Rehabilitar botón
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-arrow-right"></i> Guardar y Continuar';
        }
        return false;
    }
    
    const currentSection = getCurrentSection();
    console.log('✅ GUARDAR Y CONTINUAR: Sección actual =', currentSection);
    console.log('✅ GUARDAR Y CONTINUAR: Tipo de currentSection =', typeof currentSection);
    console.log('✅ GUARDAR Y CONTINUAR: URL actual =', window.location.href);
    console.log('✅ GUARDAR Y CONTINUAR: Pathname =', window.location.pathname);
    
    if (currentSection < 6) {
        const nextSection = currentSection + 1;
        const nextUrl = `seccion${nextSection}.html`;
        console.log(`✅ GUARDAR Y CONTINUAR: Calculado nextSection = ${nextSection}`);
        console.log(`✅ GUARDAR Y CONTINUAR: URL destino = ${nextUrl}`);
        console.log(`✅ GUARDAR Y CONTINUAR: Navegando en 1 segundo...`);
        
        setTimeout(() => {
            console.log(`🚀🚀🚀 EJECUTANDO NAVEGACIÓN: → ${nextUrl} 🚀🚀🚀`);
            console.log(`🚀 Antes de navegar - currentSection: ${currentSection}, nextSection: ${nextSection}`);
            console.log(`🚀 Método: window.location.href (asignación directa)`);
            // Usar asignación directa de href en lugar de replace
            window.location.href = nextUrl;
        }, 1000);
    } else {
        // En la última sección, ir a confirmación
        console.log('✅ GUARDAR Y CONTINUAR: Es la última sección (6)');
        console.log('✅ GUARDAR Y CONTINUAR: Navegando a confirmacion.html');
        setTimeout(() => {
            console.log('🚀🚀🚀 EJECUTANDO NAVEGACIÓN: → confirmacion.html 🚀🚀🚀');
            window.location.replace('confirmacion.html');
        }, 1000);
    }
    
    return true;
}

// Navegar a sección anterior
function seccionAnterior(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    console.log('🔙🔙🔙 seccionAnterior() ejecutado 🔙🔙🔙');
    
    guardarBorrador();
    
    const currentSection = getCurrentSection();
    console.log(`🔙 Retrocediendo desde sección ${currentSection}`);
    console.log(`🔙 URL actual: ${window.location.href}`);
    
    if (currentSection > 1) {
        const prevUrl = `seccion${currentSection - 1}.html`;
        console.log(`🔙 Navegando a ${prevUrl}`);
        console.log(`🔙 Método: window.location.replace`);
        window.location.replace(prevUrl);
    } else {
        console.log('🔙 Navegando a index.html');
        window.location.replace('index.html');
    }
}

// Auto-guardar cada 2 minutos
let autoGuardadoInterval;

function iniciarAutoGuardado() {
    autoGuardadoInterval = setInterval(() => {
        const progreso = calcularProgreso();
        if (progreso > 0 && progreso < 100) {
            const seccion = getCurrentSection();
            const respuestas = recolectarRespuestas();
            localStorage.setItem(`borrador_seccion${seccion}`, JSON.stringify(respuestas));
            localStorage.setItem(`borrador_seccion${seccion}_fecha`, new Date().toISOString());
            
            // Mostrar indicador visual sutil
            const progressText = document.getElementById('progressText');
            if (progressText) {
                const originalText = progressText.textContent;
                progressText.textContent = '💾 Guardando...';
                progressText.style.color = 'var(--aguamarina)';
                setTimeout(() => {
                    progressText.textContent = originalText;
                    progressText.style.color = '';
                }, 1500);
            }
        }
    }, 120000); // 2 minutos
}

// Detener auto-guardado
function detenerAutoGuardado() {
    if (autoGuardadoInterval) {
        clearInterval(autoGuardadoInterval);
    }
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Activar modo debug para getCurrentSection
    window.debugMode = false;
    
    console.log('=== SECCION.JS: Inicializando ===');
    console.log('URL completa:', window.location.href);
    console.log('Pathname:', window.location.pathname);
    console.log('Sección detectada:', getCurrentSection());
    
    // Actualizar navegación
    actualizarNavegacion();
    
    // Cargar borrador si existe
    cargarBorrador();
    
    // Calcular progreso inicial
    calcularProgreso();
    
    // Actualizar progreso al escribir
    const campos = document.querySelectorAll('input, textarea, select');
    console.log(`Encontrados ${campos.length} campos de formulario`);
    campos.forEach(campo => {
        campo.addEventListener('input', calcularProgreso);
        campo.addEventListener('change', calcularProgreso);
    });
    
    // Botón guardar borrador
    const btnGuardar = document.getElementById('guardarBorradorBtn');
    if (btnGuardar) {
        btnGuardar.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Botón "Guardar Borrador" clickeado');
            
            // Feedback visual
            const originalHTML = btnGuardar.innerHTML;
            btnGuardar.disabled = true;
            btnGuardar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Guardando...';
            
            const resultado = guardarBorrador();
            
            setTimeout(() => {
                btnGuardar.disabled = false;
                if (resultado) {
                    btnGuardar.innerHTML = '<i class="fas fa-check"></i> ¡Guardado!';
                    setTimeout(() => {
                        btnGuardar.innerHTML = originalHTML;
                    }, 2000);
                } else {
                    btnGuardar.innerHTML = originalHTML;
                }
            }, 500);
        });
        console.log('Event listener añadido a botón Guardar Borrador');
    } else {
        console.warn('Botón Guardar Borrador no encontrado');
    }
    
    // Botón anterior
    const btnAnterior = document.getElementById('anteriorBtn');
    if (btnAnterior) {
        btnAnterior.addEventListener('click', seccionAnterior);
        console.log('Event listener añadido a botón Anterior');
    }
    
    // Formulario submit
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', guardarYContinuar);
        console.log('Event listener añadido al formulario (submit)');
    } else {
        console.error('Formulario no encontrado!');
    }
    
    // Iniciar auto-guardado
    iniciarAutoGuardado();
    console.log('Auto-guardado iniciado');
    
    // Advertencia antes de salir
    window.addEventListener('beforeunload', function(e) {
        const progreso = calcularProgreso();
        if (progreso > 0 && progreso < 100) {
            const seccion = getCurrentSection();
            const respuestas = recolectarRespuestas();
            localStorage.setItem(`borrador_seccion${seccion}`, JSON.stringify(respuestas));
            localStorage.setItem(`borrador_seccion${seccion}_fecha`, new Date().toISOString());
        }
    });
    
    // Navegación por pasos
    const steps = document.querySelectorAll('.step');
    console.log(`Configurando navegación para ${steps.length} steps`);
    steps.forEach((step, index) => {
        step.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetSection = index + 1;
            const currentSection = getCurrentSection();
            
            console.log(`🔢🔢🔢 CLICK EN STEP ${targetSection} 🔢🔢🔢`);
            console.log(`🔢 Sección actual: ${currentSection}`);
            console.log(`🔢 Target: ${targetSection}`);
            
            if (targetSection === currentSection) {
                console.log(`🔢 Ya estás en la sección ${targetSection}, no se navega`);
                return false;
            }
            
            console.log(`🔢 Navegando a: seccion${targetSection}.html`);
            guardarBorrador();
            
            // Usar replace para evitar problemas con el historial
            window.location.replace(`seccion${targetSection}.html`);
        });
    });
    
    console.log('=== SECCION.JS: Inicialización completa ===');
}); 

// Limpiar recursos al salir
window.addEventListener('unload', detenerAutoGuardado);