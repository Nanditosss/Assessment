# Assessment Microsoft 365

## 📋 Descripción del Proyecto

Aplicación web interactiva diseñada para evaluar de forma integral el entorno Microsoft 365 de una organización. El assessment está dividido en **6 secciones independientes** con 63 preguntas que cubren todos los aspectos fundamentales de la plataforma, desde inventario y usuarios hasta gobernanza moderna, IA y automatización.

## 🎨 Diseño y Estilo

### Tipografía
- **Principal:** Raleway (Google Fonts)
- **Alternativa:** Verdana

### Paleta de Colores

**Colores Principales:**
- 🤍 Blanco (Transparencia): `#FFFFFF`
- 🔷 Turquesa (Mar): `#00A89C`
- ⬛ Negro enriquecido (Tecnología): `#0E1111`

**Colores Secundarios:**
- 🌲 Verde oscuro (Especialistas): `#00302C`
- 💎 Aguamarina (Transparencia): `#7CB6B2`
- ⚪ Gris (Neutralidad): `#CFCECE`

## ✨ Características Principales

### Estructura Segmentada
- **6 secciones independientes** para mejor experiencia de usuario
- **Navegación fluida** entre secciones con indicadores de progreso
- **Auto-guardado por sección** cada 2 minutos
- **Recuperación automática** de borradores por sección
- **Barra de progreso individual** en cada sección

### Gestión de Datos
- **Almacenamiento local** de borradores por sección
- **Consolidación automática** de todas las respuestas
- **Página de confirmación** con resumen antes de enviar
- **Validación de campos obligatorios**

### Experiencia de Usuario
- **Diseño moderno** con gradientes y animaciones suaves
- **Navegación por pasos** visualmente intuitiva
- **Iconos Font Awesome** para cada categoría
- **Totalmente responsivo** (móvil, tablet, desktop)
- **Accesibilidad optimizada** con focus visible y ARIA

## 🗂️ Estructura del Proyecto

```
.
├── index.html                 # Página de bienvenida con navegación
├── seccion1.html             # Información de Contacto + Inventario (8 preguntas)
├── seccion2.html             # Usuarios + Requisitos Técnicos (10 preguntas)
├── seccion3.html             # Gobernanza + Adopción (10 preguntas)
├── seccion4.html             # IA + Automatización (10 preguntas)
├── seccion5.html             # Cultura Digital + Seguridad (10 preguntas)
├── seccion6.html             # Integraciones + UX + Gobernanza Moderna (15 preguntas)
├── confirmacion.html         # Revisión y envío final
├── respuestas.html           # Visualización de respuestas enviadas
├── css/
│   ├── style.css            # Estilos principales con nueva paleta
│   └── respuestas.css       # Estilos para página de respuestas
├── js/
│   ├── seccion.js           # Lógica común para todas las secciones
│   ├── confirmacion.js      # Lógica de confirmación y envío
│   ├── respuestas.js        # Visualización de respuestas
│   └── main.js              # Funciones auxiliares (legacy)
└── README.md                # Documentación del proyecto
```

## 📊 Secciones del Cuestionario

### Sección 1: Inicio e Inventario (8 preguntas)
**Tiempo estimado:** ~10 minutos

- ✅ Información de contacto (empresa, contacto, email)
- 📦 Volumen y tipos de datos
- 🗂️ Estructura de información actual
- 🗑️ Contenido obsoleto o duplicado
- 🏷️ Metadatos y clasificaciones
- 🔗 Dependencias entre archivos

**Propósito:** Dimensionar el alcance de la migración y planificar la estructura en SharePoint.

### Sección 2: Usuarios y Requisitos Técnicos (10 preguntas)
**Tiempo estimado:** ~12 minutos

**Usuarios (5 preguntas):**
- 👥 Grupos de usuarios principales
- 🤝 Prácticas de colaboración actuales
- 📱 Familiaridad con Microsoft 365
- 🌐 Usuarios externos
- 🏆 Campeones de la plataforma

**Requisitos Técnicos (5 preguntas):**
- ⚙️ Limitaciones técnicas
- 🔐 Estructura de permisos
- 🔌 Integraciones y scripts existentes
- 💻 Sistemas operativos y dispositivos
- 📝 Historial de versiones

**Propósito:** Identificar stakeholders clave y desafíos técnicos de la migración.

### Sección 3: Gobernanza y Adopción (10 preguntas)
**Tiempo estimado:** ~12 minutos

**Gobernanza (5 preguntas):**
- 📋 Modelo de gobernanza actual
- 👔 Responsables de administración
- 🏗️ Estructura de sitios y bibliotecas
- ⏱️ Políticas de ciclo de vida
- 🚫 Control de creación de sitios

**Adopción y Éxito (5 preguntas):**
- 📚 Estrategia de capacitación
- 📊 Métricas de éxito
- 🎯 Casos de uso prioritarios
- 🆘 Plan de soporte post-implementación
- 💬 Retroalimentación de usuarios

**Propósito:** Establecer políticas claras y asegurar adopción exitosa.

### Sección 4: IA y Automatización (10 preguntas)
**Tiempo estimado:** ~12 minutos

**Inteligencia Artificial (5 preguntas):**
- 🤖 Uso previsto de IA
- 🔍 Análisis avanzado de documentos
- 💡 Búsqueda inteligente
- 🧠 Microsoft 365 Copilot
- 🏷️ Automatización inteligente

**Power Platform (5 preguntas):**
- ⚡ Procesos a automatizar
- 📱 Aplicaciones personalizadas
- 📈 Reportes y dashboards
- 🔧 Macros y scripts actuales
- 🔄 Integraciones con M365

**Propósito:** Identificar oportunidades de mejorar la productividad con IA y automatización.

### Sección 5: Cultura Digital y Seguridad (10 preguntas)
**Tiempo estimado:** ~12 minutos

**Cultura Digital (5 preguntas):**
- 🌟 Disposición al cambio
- 📖 Lecciones aprendidas
- 👥 Equipo de gestión del cambio
- 🎤 Involucramiento de la dirección
- 📢 Recopilación de feedback

**Seguridad y Cumplimiento (5 preguntas):**
- 🛡️ Controles Zero Trust
- 🔒 Datos confidenciales y etiquetas
- 🚨 Políticas DLP
- 📅 Requisitos de retención
- 👁️ Supervisión de incidentes

**Propósito:** Asegurar gestión efectiva del cambio y protección de datos.

### Sección 6: Integraciones, Experiencia y Gobernanza Moderna (15 preguntas)
**Tiempo estimado:** ~15 minutos

**Integraciones (5 preguntas):**
- 🖥️ Sistemas empresariales clave
- 🔗 Necesidades de integración
- 🔄 Flujos de intercambio actuales
- ⚡ Oportunidades de optimización
- 📊 Acceso a datos externos

**Experiencia del Usuario (5 preguntas):**
- 📲 Modalidades de acceso
- 💼 Uso de Microsoft Teams
- ♿ Consideraciones de accesibilidad
- 🔎 Mejoras en búsqueda
- 🤝 Colaboración externa

**Gobernanza Moderna (5 preguntas):**
- 🔐 Uso de Microsoft Purview
- 📑 Esquema de clasificación
- 📝 Políticas de nomenclatura
- ⚖️ Alineamiento normativo
- 👨‍💼 Responsables de gobernanza

**Propósito:** Maximizar el valor de SharePoint con integraciones y experiencia óptima.

## 🔌 API y Almacenamiento de Datos

### Tabla: `respuestas_sharepoint`

**Campos:**
- `id` (text): ID único de la respuesta
- `fecha_envio` (datetime): Fecha y hora del envío
- `empresa` (text): Nombre de la empresa
- `contacto` (text): Nombre del contacto
- `email` (text): Email del contacto
- `respuestas` (rich_text): JSON con todas las respuestas consolidadas
- `completado` (bool): Estado de completitud

### Endpoints RESTful

```javascript
// Listar respuestas
GET /tables/respuestas_sharepoint?page=1&limit=100

// Crear nueva respuesta
POST /tables/respuestas_sharepoint
Content-Type: application/json

// Eliminar respuesta
DELETE /tables/respuestas_sharepoint/{id}
```

## 🚀 Funcionalidades Implementadas

### ✅ Navegación y Progreso
- Página de bienvenida con tarjetas de secciones
- Navegación por pasos con indicadores visuales
- Barra de progreso individual por sección
- Botones de navegación anterior/siguiente
- Enlaces directos entre secciones

### ✅ Persistencia de Datos
- Auto-guardado cada 2 minutos por sección
- Guardado manual de borradores
- Almacenamiento local por sección independiente
- Recuperación automática al recargar
- Consolidación automática en confirmación

### ✅ Validación y Envío
- Página de confirmación con resumen completo
- Validación de campos obligatorios
- Validación de formato de email
- Vista previa del progreso por sección
- Advertencia si hay secciones incompletas

### ✅ Visualización de Respuestas
- Lista de cuestionarios enviados
- Búsqueda en tiempo real
- Vista detallada modal organizada por categorías
- Estadísticas de completitud
- Eliminación de respuestas

## 📱 Páginas del Proyecto

### 1. index.html - Página de Bienvenida
**Ruta:** `/index.html`

Página principal con:
- Introducción al cuestionario
- 6 tarjetas de navegación a secciones
- Información de tiempo estimado
- Detección de progreso guardado

### 2. seccion1.html - Inicio e Inventario
**Ruta:** `/seccion1.html`

Información de contacto (obligatoria) + 5 preguntas de inventario.

### 3. seccion2.html - Usuarios y Requisitos
**Ruta:** `/seccion2.html`

5 preguntas sobre usuarios + 5 sobre requisitos técnicos.

### 4. seccion3.html - Gobernanza y Adopción
**Ruta:** `/seccion3.html`

5 preguntas de gobernanza + 5 de adopción y éxito.

### 5. seccion4.html - IA y Automatización
**Ruta:** `/seccion4.html`

5 preguntas de IA + 5 de Power Platform y automatización.

### 6. seccion5.html - Cultura y Seguridad
**Ruta:** `/seccion5.html`

5 preguntas de cultura digital + 5 de seguridad y cumplimiento.

### 7. seccion6.html - Integraciones y Experiencia
**Ruta:** `/seccion6.html`

5 preguntas de integraciones + 5 de UX + 5 de gobernanza moderna.

### 8. confirmacion.html - Revisión y Envío
**Ruta:** `/confirmacion.html`

Página de confirmación con:
- Resumen de progreso por sección
- Estadísticas globales
- Enlaces para editar secciones
- Botón de envío final

### 9. respuestas.html - Visualización
**Ruta:** `/respuestas.html`

Gestión de respuestas enviadas con búsqueda y visualización detallada.

## 🎯 Flujo de Usuario

1. **Inicio** → Usuario accede a `index.html`
2. **Navegación** → Selecciona sección para comenzar
3. **Completar** → Responde preguntas (auto-guardado activo)
4. **Avanzar** → Usa "Guardar y Continuar" para siguiente sección
5. **Revisar** → Llega a `confirmacion.html` después de sección 6
6. **Confirmar** → Revisa resumen y estadísticas
7. **Enviar** → Envía cuestionario completo
8. **Éxito** → Ve mensaje de confirmación

## 💡 Características Especiales

### Auto-guardado Inteligente
- Guarda automáticamente cada 2 minutos
- Indicador visual de guardado
- Por sección independiente
- No interfiere con la experiencia del usuario

### Navegación Flexible
- Puede saltar entre secciones
- Progreso se mantiene por sección
- Advertencia antes de salir sin guardar
- Recuperación automática de sesión

### Consolidación de Datos
- Todas las secciones se unen al enviar
- Validación cruzada de datos
- Resumen completo en confirmación
- JSON estructurado para análisis

## 🔧 Configuración y Uso

### Completar el Cuestionario

1. Acceda a `index.html`
2. Lea la introducción y seleccione "Sección 1"
3. Complete la información de contacto (obligatoria)
4. Responda las preguntas de inventario
5. Use "Guardar y Continuar" para avanzar
6. Repita para cada sección (2-6)
7. Revise el resumen en la página de confirmación
8. Haga clic en "Enviar Cuestionario"

### Ver Respuestas

1. Acceda a `respuestas.html`
2. Use el buscador para filtrar
3. Haga clic en "Ver Detalle" para respuesta completa
4. Elimine respuestas si es necesario

## 📄 Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Diseño moderno con variables CSS, gradientes y animaciones
- **JavaScript ES6+**: Lógica modular y reutilizable
- **Google Fonts**: Tipografía Raleway
- **Font Awesome 6**: Iconografía profesional
- **RESTful API**: Almacenamiento y gestión de datos
- **LocalStorage**: Persistencia de borradores

## 🎯 Próximos Pasos Recomendados

1. **Exportación de Datos**
   - Exportar respuestas a PDF
   - Exportar a Excel/CSV
   - Generación de informes por empresa

2. **Análisis Avanzado**
   - Dashboard con estadísticas
   - Gráficos de respuestas comunes
   - Comparación entre empresas
   - Identificación de tendencias

3. **Mejoras de Experiencia**
   - Estimador de tiempo dinámico
   - Sugerencias de respuesta
   - Plantillas prellenadas
   - Modo oscuro

4. **Integraciones**
   - Notificaciones por email
   - Integración con Microsoft Teams
   - Webhooks para automatización
   - API pública documentada

## 💾 Sistema de Guardado y Navegación

### Funcionamiento del Guardado

El sistema implementa un guardado inteligente con múltiples capas:

1. **Auto-guardado periódico** (cada 2 minutos)
   - Solo guarda si hay progreso (0% < progreso < 100%)
   - Almacena en localStorage del navegador
   - Indicador visual sutil durante el guardado

2. **Guardado antes de salir**
   - Event listener en `beforeunload`
   - Guarda automáticamente al cambiar de página o cerrar navegador

3. **Guardado manual**
   - **Botón "Guardar Borrador"**: Guarda sin validar campos requeridos
   - **Botón "Guardar y Continuar"**: Valida, guarda y navega

### Validación de Formularios

#### Campos Obligatorios (Solo Sección 1):
- ✅ Nombre de la Empresa (`required`)
- ✅ Nombre del Contacto (`required`)
- ✅ Email de Contacto (`required` + validación de formato)

#### Proceso de Validación:
1. Verifica campos con atributo `[required]`
2. Valida formato de email si está en Sección 1
3. Resalta campos inválidos con borde rojo
4. Muestra alerta con mensaje descriptivo
5. Hace scroll automático al primer campo inválido
6. Enfoca el campo para facilitar corrección

### Navegación Entre Secciones

#### Flujo Normal:
```
index.html → seccion1.html → seccion2.html → ... → seccion6.html → confirmacion.html
```

#### Características:
- **Indicadores visuales de progreso** (steps completados, activo, pendientes)
- **Navegación directa** haciendo click en los steps
- **Guardado automático** antes de cada cambio de sección
- **Recuperación de borrador** al volver a una sección

### Almacenamiento de Datos

#### LocalStorage (Borradores):
```javascript
localStorage['borrador_seccion1'] = {empresa, contacto, email, inv_1...inv_5}
localStorage['borrador_seccion2'] = {usu_1...usu_5, req_1...req_5}
...
localStorage['borrador_seccion6'] = {int_1...int_5, exp_1...exp_5, gom_1...gom_5}
```

#### Base de Datos (Envío final):
- Tabla: `respuestas_sharepoint`
- Consolidación de las 6 secciones en un único registro
- Campos del sistema: `id`, `created_at`, `updated_at`, `gs_project_id`, `gs_table_name`

### Debugging

El sistema incluye logs extensivos en consola para debugging:

```javascript
console.log('=== SECCION.JS: Inicializando ===');
console.log('Sección actual:', getCurrentSection());
console.log('recolectarRespuestas: X campos capturados');
console.log('guardarBorrador: Guardado exitoso (X bytes)');
console.log('guardarYContinuar ejecutado');
console.log('Validación exitosa, guardando...');
console.log('Navegando desde sección X');
```

Para ver los logs:
1. Abre las DevTools del navegador (F12)
2. Ve a la pestaña "Console"
3. Interactúa con el formulario
4. Observa los mensajes de debugging

## 🔐 Sistema de Seguridad y Acceso

### Autenticación de Dos Niveles

**Archivo:** `js/auth.js`

#### 1. Acceso de Cliente:
- Ingreso por **email**
- Ve solo sus propias respuestas
- No puede eliminar respuestas

#### 2. Acceso de Administrador:
- Contraseña: `Unikal2025Admin!`
- Ve **todas** las respuestas
- Puede eliminar respuestas
- Email de admin: `admin@unikal.tech`

### Cambiar Contraseña de Administrador

Editar `js/auth.js`, línea 2:
```javascript
const ADMIN_PASSWORD = 'NuevaContraseñaSegura123!';
```

**Documentación completa:** Ver `SEGURIDAD.md`

## 📤 Sistema de Exportación

La aplicación incluye funcionalidad completa de exportación de respuestas en **3 formatos**:

### Formatos Disponibles:

1. **Excel (.xls)** - Formato recomendado para análisis
   - Tabla con encabezados en colores de marca
   - 69 columnas (6 metadata + 63 respuestas)
   - Compatible con Excel, Google Sheets, LibreOffice
   - Perfecto para análisis manual y reportes

2. **CSV (.csv)** - Formato universal
   - Texto plano delimitado por comas
   - UTF-8 con soporte para acentos
   - Compatible con Python, R, Power BI, bases de datos
   - Ideal para procesamiento técnico

3. **JSON (.json)** - Formato estructurado
   - Estructura jerárquica completa
   - Incluye metadata del sistema
   - Perfecto para desarrollo y APIs
   - Backup completo de datos

### Cómo Exportar:

1. Ve a **respuestas.html**
2. Inicia sesión (cliente o administrador)
3. Click en el botón del formato deseado:
   - 📊 **Exportar Excel** (verde)
   - 📄 **Exportar CSV** (blanco)
   - 🔧 **Exportar JSON** (gris)
4. El archivo se descarga automáticamente

### Seguridad:

- **Clientes**: Solo exportan sus propias respuestas
- **Administradores**: Exportan todas las respuestas
- Filtrado automático basado en autenticación

**Documentación completa**: Ver `EXPORTACION.md`

## 📚 Documentación Adicional

- **GUIA-USUARIO.md**: Guía paso a paso para usuarios finales
- **SEGURIDAD.md**: Documentación del sistema de seguridad y acceso
- **EXPORTACION.md**: Guía completa de exportación de datos
- **DEBUG-NAVEGACION.md**: Diagnóstico de problemas de navegación
- **DIAGNOSTICO-Y-MEJORAS.md**: Historial de mejoras implementadas
- **VERIFICACION-BBDD.md**: Verificación de base de datos
- **README.md**: Este archivo (documentación técnica del proyecto)

## 📊 Métricas del Proyecto

- **Total de preguntas:** 63
- **Secciones:** 6
- **Categorías:** 12
- **Campos de datos:** 7
- **Archivos HTML:** 11 (9 principales + 2 auxiliares)
- **Archivos JavaScript:** 5 (seccion.js, confirmacion.js, respuestas.js, auth.js, main.js)
- **Archivos CSS:** 2 (style.css, respuestas.css)
- **Documentación:** 7 archivos Markdown
- **Formatos de exportación:** 3 (Excel, CSV, JSON)

## ✅ Testing y Validación

### Tests Realizados:
- ✅ localStorage funcional en todos los navegadores modernos
- ✅ FormData captura correctamente todos los campos (inputs + textareas)
- ✅ Event listeners se añaden correctamente en DOMContentLoaded
- ✅ Validación de campos requeridos funciona
- ✅ Navegación entre secciones con guardado automático
- ✅ Auto-guardado periódico (cada 2 minutos)
- ✅ Guardado antes de salir (beforeunload)
- ✅ Recuperación de borradores al recargar
- ✅ Consolidación de todas las secciones en confirmación
- ✅ Sistema de autenticación de dos niveles
- ✅ Filtrado de respuestas por usuario/admin

### Archivos de Test:
- `test-guardado.html`: Test básico de localStorage
- `test-seccion-real.html`: Test completo con panel de debugging

---

**Versión:** 2.2.0 (Con exportación de datos)  
**Última actualización:** Enero 2025  
**Estado:** Producción  
**Diseño:** Paleta turquesa/aguamarina (UNIKAL.TECH) con tipografía Raleway  
**Nuevas funcionalidades:** Sistema de exportación en 3 formatos