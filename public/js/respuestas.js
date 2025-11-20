// Estructura de categorías y preguntas
const categorias = {
    'inv': {
        nombre: 'Inventario',
        icono: 'fas fa-database',
        preguntas: [
            '¿Qué volumen y tipo de datos existen actualmente en el servidor de archivos?',
            '¿Cómo está estructurada la información en el servidor de archivos?',
            '¿Existe contenido obsoleto o duplicado que no debería migrarse?',
            '¿Qué metadatos o clasificaciones manejan actualmente para los archivos?',
            '¿Tienen identificadas dependencias o vínculos entre archivos?'
        ]
    },
    'usu': {
        nombre: 'Usuarios',
        icono: 'fas fa-users',
        preguntas: [
            '¿Quiénes serán los principales usuarios o grupos de usuarios de SharePoint Online?',
            '¿Cómo colaboran actualmente los usuarios con los archivos?',
            '¿Cuál es el nivel de familiaridad de los usuarios con Microsoft 365?',
            '¿Existen usuarios externos con quienes se comparten archivos?',
            '¿Han identificado "campeones" o líderes internos?'
        ]
    },
    'req': {
        nombre: 'Requisitos Técnicos',
        icono: 'fas fa-cogs',
        preguntas: [
            '¿Qué limitaciones o consideraciones técnicas existen en el entorno actual?',
            '¿Es necesario mantener la estructura de permisos actual (NTFS)?',
            '¿Existen integraciones técnicas o scripts vinculados al servidor de archivos?',
            '¿Qué sistemas operativos y dispositivos utilizan los usuarios?',
            '¿Requieren migrar el historial de versiones de documentos?'
        ]
    },
    'gob': {
        nombre: 'Gobernanza',
        icono: 'fas fa-shield-alt',
        preguntas: [
            '¿Cuentan con un modelo de gobernanza actual?',
            '¿Quién será responsable de administrar la plataforma?',
            '¿Cómo se definirá la estructura de sitios y bibliotecas en SharePoint?',
            '¿Qué políticas se implementarán para el ciclo de vida de los documentos?',
            '¿Cómo controlarán la creación de nuevos sitios o grupos?'
        ]
    },
    'ado': {
        nombre: 'Adopción y Éxito',
        icono: 'fas fa-rocket',
        preguntas: [
            '¿Tienen una estrategia de capacitación y comunicación?',
            '¿Cómo medirán el éxito de la adopción?',
            '¿Han identificado casos de uso prioritarios o "victorias rápidas"?',
            '¿Existe un plan de soporte post-implementación?',
            '¿Cómo se recogerá y utilizará la retroalimentación de los usuarios?'
        ]
    },
    'ia': {
        nombre: 'Inteligencia Artificial',
        icono: 'fas fa-brain',
        preguntas: [
            '¿Qué uso de Inteligencia Artificial prevén?',
            '¿Necesitan extraer información o análisis avanzados de los documentos?',
            '¿Consideran útil que la plataforma sugiera contenido o personas relevantes?',
            '¿Tienen interés en herramientas como Microsoft 365 Copilot?',
            '¿Esperan automatización inteligente en la clasificación de documentos?'
        ]
    },
    'auto': {
        nombre: 'Automatización y Power Platform',
        icono: 'fas fa-robot',
        preguntas: [
            '¿Qué procesos manuales podrían automatizarse?',
            '¿Requieren desarrollar aplicaciones o formularios personalizados?',
            '¿Necesitan mejores reportes o visualizaciones de los datos?',
            '¿Utilizan actualmente macros, scripts u otras automatizaciones?',
            '¿Cómo planean aprovechar la integración con Microsoft 365?'
        ]
    },
    'cult': {
        nombre: 'Cultura Digital y Gestión del Cambio',
        icono: 'fas fa-chart-line',
        preguntas: [
            '¿Cómo describirían la disposición de la organización hacia nuevas herramientas digitales?',
            '¿Qué lecciones han aprendido de iniciativas previas?',
            '¿Cuentan con un plan o equipo dedicado para la gestión del cambio?',
            '¿Cómo involucrará la dirección de la empresa a los empleados?',
            '¿Cómo recopilarán y abordarán las inquietudes de los empleados?'
        ]
    },
    'seg': {
        nombre: 'Seguridad y Cumplimiento',
        icono: 'fas fa-lock',
        preguntas: [
            '¿Qué controles de seguridad necesitan aplicar (Zero Trust)?',
            '¿Manejan datos confidenciales que requieran clasificación?',
            '¿Qué políticas de Prevención de Pérdida de Datos (DLP) deben establecerse?',
            '¿Cuáles son los requisitos de retención o eliminación de documentos?',
            '¿Cómo supervisarán y responderán a incidentes de seguridad?'
        ]
    },
    'int': {
        nombre: 'Integraciones con Sistemas Core',
        icono: 'fas fa-plug',
        preguntas: [
            '¿Qué sistemas empresariales clave interactúan con los archivos?',
            '¿Necesitan que SharePoint se integre con esos sistemas?',
            '¿Cómo gestionan el intercambio de información actualmente?',
            '¿Existen oportunidades para optimizar procesos?',
            '¿Qué tipo de acceso a datos de sistemas core necesitarán los usuarios?'
        ]
    },
    'exp': {
        nombre: 'Experiencia del Usuario y Colaboración',
        icono: 'fas fa-handshake',
        preguntas: [
            '¿Cómo espera la organización que los empleados accedan a los documentos?',
            '¿Utilizarán Microsoft Teams u otras herramientas?',
            '¿Hay consideraciones de accesibilidad?',
            '¿Qué mejoras esperan en la búsqueda y localización de información?',
            '¿Cómo facilitarán la colaboración con clientes o socios externos?'
        ]
    },
    'gom': {
        nombre: 'Gobernanza Moderna',
        icono: 'fas fa-balance-scale',
        preguntas: [
            '¿Cómo planean utilizar Microsoft Purview?',
            '¿Existe un esquema de clasificación de la información?',
            '¿Qué políticas establecerán para la creación y nomenclatura de sitios?',
            '¿Cómo se asegurará el alineamiento con normativas?',
            '¿Quién será responsable de la gobernanza?'
        ]
    }
};

let respuestasGlobal = [];
let modalActual = null;

// Cargar respuestas desde la API
async function cargarRespuestas() {
    try {
        // Construir URL con parámetros según el tipo de usuario
        let url = '/api/tables/respuestas_sharepoint?';
        
        if (typeof isAdmin === 'function' && isAdmin()) {
            url += 'admin=true';
        } else if (typeof getCurrentUserEmail === 'function') {
            const email = getCurrentUserEmail();
            if (email) {
                url += `email=${encodeURIComponent(email)}`;
            }
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Error al cargar respuestas');
        }
        
        const result = await response.json();
        let allResponses = result.data || [];
        
        // Ya vienen filtradas desde el backend, no necesitamos filtrar aquí
        respuestasGlobal = allResponses;
        
        mostrarRespuestas(respuestasGlobal);
        
    } catch (error) {
        console.error('Error al cargar respuestas:', error);
        const container = document.getElementById('respuestasContainer');
        container.innerHTML = `
            <div class="alert alert-error">
                <i class="fas fa-exclamation-circle"></i>
                <span>Error al cargar las respuestas. Por favor, recargue la página.</span>
            </div>
        `;
    }
}

// Mostrar respuestas en la interfaz
function mostrarRespuestas(respuestas) {
    const container = document.getElementById('respuestasContainer');
    const noResults = document.getElementById('noResults');
    
    if (!respuestas || respuestas.length === 0) {
        container.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    // Ordenar por fecha más reciente
    respuestas.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    
    container.innerHTML = respuestas.map(respuesta => {
        const fecha = new Date(respuesta.created_at);
        const respuestasObj = JSON.parse(respuesta.respuestas || '{}');
        
        // Contar respuestas completadas
        const totalPreguntas = Object.keys(respuestasObj).filter(k => k !== 'empresa' && k !== 'contacto' && k !== 'email').length;
        const respuestasCompletadas = Object.values(respuestasObj).filter(v => v && v.trim() !== '').length - 3; // Restar campos de contacto
        
        return `
            <div class="respuesta-card" data-id="${respuesta.id}">
                <div class="respuesta-header">
                    <div class="respuesta-info">
                        <div class="empresa-nombre">${respuesta.empresa}</div>
                        <div class="contacto-info">
                            <div><i class="fas fa-user"></i>${respuesta.contacto}</div>
                            <div><i class="fas fa-envelope"></i>${respuesta.email}</div>
                        </div>
                    </div>
                    <div class="fecha-envio">
                        <i class="fas fa-calendar-alt"></i> ${fecha.toLocaleDateString('es-ES', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </div>
                </div>
                
                <div class="respuesta-preview">
                    <div class="preview-stat">
                        <div class="preview-stat-label">Respuestas Completadas</div>
                        <div class="preview-stat-value">${Math.max(0, respuestasCompletadas)} / ${totalPreguntas - 3}</div>
                    </div>
                    <div class="preview-stat">
                        <div class="preview-stat-label">Progreso</div>
                        <div class="preview-stat-value">${Math.round((Math.max(0, respuestasCompletadas) / (totalPreguntas - 3)) * 100)}%</div>
                    </div>
                </div>
                
                <div class="respuesta-actions">
                    <button class="btn-small btn-view" onclick="verDetalle('${respuesta.id}')">
                        <i class="fas fa-eye"></i> Ver Detalle
                    </button>
                    ${isAdmin() ? `<button class="btn-small btn-delete" onclick="eliminarRespuesta('${respuesta.id}')">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// Ver detalle de una respuesta
function verDetalle(id) {
    const respuesta = respuestasGlobal.find(r => r.id === id);
    if (!respuesta) return;
    
    const respuestasObj = JSON.parse(respuesta.respuestas || '{}');
    const fecha = new Date(respuesta.created_at);
    
    // Crear modal
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'modalDetalle';
    
    // Generar contenido por categorías
    let contenidoCategorias = '';
    for (let [prefijo, categoria] of Object.entries(categorias)) {
        let preguntasHTML = '';
        
        categoria.preguntas.forEach((pregunta, index) => {
            const key = `${prefijo}_${index + 1}`;
            const respuestaTexto = respuestasObj[key] || '';
            
            preguntasHTML += `
                <div class="detalle-question">
                    <div class="detalle-question-label">${pregunta}</div>
                    <div class="detalle-question-answer ${!respuestaTexto.trim() ? 'empty' : ''}">
                        ${respuestaTexto.trim() || 'Sin respuesta'}
                    </div>
                </div>
            `;
        });
        
        contenidoCategorias += `
            <div class="detalle-section">
                <h3 class="detalle-section-title">
                    <i class="${categoria.icono}"></i>
                    ${categoria.nombre}
                </h3>
                ${preguntasHTML}
            </div>
        `;
    }
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <div>
                    <h2>${respuesta.empresa}</h2>
                    <div style="margin-top: 10px; opacity: 0.9;">
                        <i class="fas fa-user"></i> ${respuesta.contacto} • 
                        <i class="fas fa-envelope"></i> ${respuesta.email} • 
                        <i class="fas fa-calendar-alt"></i> ${fecha.toLocaleDateString('es-ES', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric'
                        })}
                    </div>
                </div>
                <button class="modal-close" onclick="cerrarModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                ${contenidoCategorias}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modalActual = modal;
    
    // Cerrar modal al hacer clic fuera
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            cerrarModal();
        }
    });
    
    // Cerrar modal con ESC
    document.addEventListener('keydown', handleEscKey);
}

// Manejar tecla ESC
function handleEscKey(e) {
    if (e.key === 'Escape') {
        cerrarModal();
    }
}

// Cerrar modal
function cerrarModal() {
    if (modalActual) {
        modalActual.remove();
        modalActual = null;
        document.removeEventListener('keydown', handleEscKey);
    }
}

// Eliminar respuesta
async function eliminarRespuesta(id) {
    if (!confirm('¿Está seguro de que desea eliminar esta respuesta? Esta acción no se puede deshacer.')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/tables/respuestas_sharepoint/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Error al eliminar');
        }
        
        // Actualizar lista
        respuestasGlobal = respuestasGlobal.filter(r => r.id !== id);
        mostrarRespuestas(respuestasGlobal);
        
        // Mostrar alerta de éxito
        const container = document.getElementById('respuestasContainer');
        const alert = document.createElement('div');
        alert.className = 'alert alert-success';
        alert.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>Respuesta eliminada correctamente</span>
        `;
        container.parentNode.insertBefore(alert, container);
        
        setTimeout(() => alert.remove(), 3000);
        
    } catch (error) {
        console.error('Error al eliminar:', error);
        alert('Error al eliminar la respuesta. Por favor, intente nuevamente.');
    }
}

// Buscar respuestas
function buscarRespuestas(termino) {
    if (!termino.trim()) {
        mostrarRespuestas(respuestasGlobal);
        return;
    }
    
    const terminoLower = termino.toLowerCase();
    const filtradas = respuestasGlobal.filter(r => {
        return r.empresa.toLowerCase().includes(terminoLower) ||
               r.contacto.toLowerCase().includes(terminoLower) ||
               r.email.toLowerCase().includes(terminoLower);
    });
    
    mostrarRespuestas(filtradas);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Verificar acceso antes de cargar respuestas
    if (!checkAccessToResponses()) {
        return;
    }
    
    // Mostrar información del usuario
    displayUserInfo();
    
    cargarRespuestas();
    
    // Búsqueda en tiempo real
    const searchInput = document.getElementById('searchInput');
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            buscarRespuestas(this.value);
        }, 300);
    });
});

// ==========================================
// FUNCIONES DE EXPORTACIÓN
// ==========================================

// Exportar a CSV
function exportarCSV() {
    if (!respuestasGlobal || respuestasGlobal.length === 0) {
        alert('No hay respuestas para exportar');
        return;
    }
    
    console.log('Exportando a CSV...');
    
    // Encabezados
    const headers = [
        'ID',
        'Fecha de Envío',
        'Empresa',
        'Contacto',
        'Email',
        'Completado',
        ...Object.keys(categorias).flatMap(catKey => {
            const cat = categorias[catKey];
            return cat.preguntas.map((_, idx) => `${cat.nombre} - P${idx + 1}`);
        })
    ];
    
    // Crear filas
    const rows = respuestasGlobal.map(respuesta => {
        const respuestasObj = typeof respuesta.respuestas === 'string' 
            ? JSON.parse(respuesta.respuestas) 
            : respuesta.respuestas;
        
        const row = [
            respuesta.id || '',
            respuesta.fecha_envio || '',
            respuesta.empresa || '',
            respuesta.contacto || '',
            respuesta.email || '',
            respuesta.completado ? 'Sí' : 'No'
        ];
        
        // Añadir todas las respuestas
        Object.keys(categorias).forEach(catKey => {
            const cat = categorias[catKey];
            cat.preguntas.forEach((_, idx) => {
                const fieldName = `${catKey}_${idx + 1}`;
                const valor = respuestasObj[fieldName] || '';
                // Escapar comillas y saltos de línea para CSV
                const valorEscapado = String(valor)
                    .replace(/"/g, '""')
                    .replace(/\n/g, ' ')
                    .replace(/\r/g, '');
                row.push(`"${valorEscapado}"`);
            });
        });
        
        return row;
    });
    
    // Construir CSV
    const csvContent = [
        headers.map(h => `"${h}"`).join(','),
        ...rows.map(row => row.join(','))
    ].join('\n');
    
    // Descargar
    descargarArchivo(csvContent, 'respuestas-assessment-m365.csv', 'text/csv;charset=utf-8;');
    
    console.log('CSV exportado exitosamente');
}

// Exportar a Excel (formato TSV compatible)
function exportarExcel() {
    if (!respuestasGlobal || respuestasGlobal.length === 0) {
        alert('No hay respuestas para exportar');
        return;
    }
    
    console.log('Exportando a Excel...');
    
    // Crear tabla HTML para Excel
    let html = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">';
    html += '<head><meta charset="utf-8"><meta name="ProgId" content="Excel.Sheet"></head>';
    html += '<body><table>';
    
    // Encabezados
    html += '<tr style="font-weight:bold; background-color:#00A89C; color:white;">';
    html += '<th>ID</th>';
    html += '<th>Fecha de Envío</th>';
    html += '<th>Empresa</th>';
    html += '<th>Contacto</th>';
    html += '<th>Email</th>';
    html += '<th>Completado</th>';
    
    Object.keys(categorias).forEach(catKey => {
        const cat = categorias[catKey];
        cat.preguntas.forEach((pregunta, idx) => {
            html += `<th>${cat.nombre} - P${idx + 1}</th>`;
        });
    });
    
    html += '</tr>';
    
    // Filas de datos
    respuestasGlobal.forEach(respuesta => {
        const respuestasObj = typeof respuesta.respuestas === 'string' 
            ? JSON.parse(respuesta.respuestas) 
            : respuesta.respuestas;
        
        html += '<tr>';
        html += `<td>${respuesta.id || ''}</td>`;
        html += `<td>${respuesta.fecha_envio || ''}</td>`;
        html += `<td>${respuesta.empresa || ''}</td>`;
        html += `<td>${respuesta.contacto || ''}</td>`;
        html += `<td>${respuesta.email || ''}</td>`;
        html += `<td>${respuesta.completado ? 'Sí' : 'No'}</td>`;
        
        Object.keys(categorias).forEach(catKey => {
            const cat = categorias[catKey];
            cat.preguntas.forEach((_, idx) => {
                const fieldName = `${catKey}_${idx + 1}`;
                const valor = respuestasObj[fieldName] || '';
                const valorEscapado = String(valor)
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;');
                html += `<td>${valorEscapado}</td>`;
            });
        });
        
        html += '</tr>';
    });
    
    html += '</table></body></html>';
    
    // Descargar
    descargarArchivo(html, 'respuestas-assessment-m365.xls', 'application/vnd.ms-excel');
    
    console.log('Excel exportado exitosamente');
}

// Exportar a JSON
function exportarJSON() {
    if (!respuestasGlobal || respuestasGlobal.length === 0) {
        alert('No hay respuestas para exportar');
        return;
    }
    
    console.log('Exportando a JSON...');
    
    // Formatear datos
    const datos = respuestasGlobal.map(respuesta => {
        const respuestasObj = typeof respuesta.respuestas === 'string' 
            ? JSON.parse(respuesta.respuestas) 
            : respuesta.respuestas;
        
        return {
            id: respuesta.id,
            fecha_envio: respuesta.fecha_envio,
            empresa: respuesta.empresa,
            contacto: respuesta.contacto,
            email: respuesta.email,
            completado: respuesta.completado,
            respuestas: respuestasObj,
            metadata: {
                created_at: respuesta.created_at,
                updated_at: respuesta.updated_at
            }
        };
    });
    
    const jsonContent = JSON.stringify(datos, null, 2);
    
    // Descargar
    descargarArchivo(jsonContent, 'respuestas-assessment-m365.json', 'application/json');
    
    console.log('JSON exportado exitosamente');
}

// Función auxiliar para descargar archivos
function descargarArchivo(contenido, nombreArchivo, tipoMIME) {
    const blob = new Blob([contenido], { type: tipoMIME });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = nombreArchivo;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    
    // Limpiar
    setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }, 100);
}

// Exponer funciones globalmente para los botones
window.verDetalle = verDetalle;
window.cerrarModal = cerrarModal;
window.eliminarRespuesta = eliminarRespuesta;
window.exportarCSV = exportarCSV;
window.exportarExcel = exportarExcel;
window.exportarJSON = exportarJSON;