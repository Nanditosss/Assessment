# Guía de Exportación de Respuestas - Assessment Microsoft 365

## 📤 Funcionalidad de Exportación

La aplicación permite exportar todas las respuestas del cuestionario en **3 formatos diferentes**: CSV, Excel y JSON.

---

## 🚀 Cómo Exportar

### Paso 1: Acceder a las Respuestas

1. Ve a **`respuestas.html`** o haz click en "Ver Respuestas Enviadas"
2. Inicia sesión:
   - **Como cliente**: Ingresa tu email (verás solo tus respuestas)
   - **Como administrador**: Usa contraseña `Unikal2025Admin!` (verás todas las respuestas)

### Paso 2: Exportar

En la barra superior verás **3 botones de exportación**:

- **📊 Exportar Excel** (botón verde) - Formato recomendado para análisis
- **📄 Exportar CSV** (botón blanco) - Compatible con cualquier herramienta
- **🔧 Exportar JSON** (botón gris) - Formato técnico con estructura completa

Simplemente haz click en el botón del formato que prefieras.

---

## 📊 Formatos de Exportación

### 1. Excel (.xls)

**Características:**
- ✅ Formato de tabla con encabezados
- ✅ Colores de marca (encabezados en turquesa #00A89C)
- ✅ Fácil de abrir en Microsoft Excel, Google Sheets, LibreOffice
- ✅ Cada columna es una pregunta
- ✅ Cada fila es una respuesta completa

**Estructura:**
```
| ID | Fecha | Empresa | Contacto | Email | Completado | Inventario-P1 | Inventario-P2 | ... | Gob.Moderna-P5 |
|----| ----- |---------|----------|-------|------------|---------------|---------------|-----|----------------|
| ... datos ... |
```

**Columnas (total: 69):**
- 6 columnas de metadata (ID, Fecha, Empresa, Contacto, Email, Completado)
- 63 columnas de respuestas (una por pregunta)

**Recomendado para:**
- 📊 Análisis de datos
- 📈 Crear gráficos y reportes
- 🔍 Filtrar y buscar respuestas
- 🤝 Compartir con stakeholders

**Cómo abrir:**
1. Haz click en "Exportar Excel"
2. Se descarga `respuestas-assessment-m365.xls`
3. Abre con Excel/Sheets
4. Ya puedes trabajar con los datos

---

### 2. CSV (.csv)

**Características:**
- ✅ Formato universal (compatible con TODO)
- ✅ Peso ligero
- ✅ Fácil de importar en bases de datos
- ✅ Compatible con Python, R, Power BI, Tableau, etc.
- ✅ Texto plano delimitado por comas

**Estructura:**
```csv
"ID","Fecha de Envío","Empresa","Contacto","Email","Completado","Inventario - P1","Inventario - P2",...
"uuid-123","2025-01-15T10:30:00","Empresa XYZ","Juan Pérez","juan@empresa.com","Sí","Respuesta 1","Respuesta 2",...
```

**Características técnicas:**
- Codificación: UTF-8 (soporta acentos y ñ)
- Delimitador: Coma (`,`)
- Comillas: Campos entrecomillados (`"`)
- Saltos de línea: Convertidos a espacios

**Recomendado para:**
- 🔧 Procesamiento técnico
- 🐍 Análisis con Python/Pandas
- 💾 Importar en bases de datos
- 📊 Power BI, Tableau, Looker
- 🔄 Migración de datos

**Cómo usar en Python:**
```python
import pandas as pd

# Leer CSV
df = pd.read_csv('respuestas-assessment-m365.csv')

# Análisis
print(df.head())
print(df['Empresa'].value_counts())
```

**Cómo usar en Excel:**
1. Abre Excel
2. Datos → Obtener datos → Desde archivo → Desde texto/CSV
3. Selecciona el archivo .csv
4. Verifica que la codificación sea UTF-8
5. Importar

---

### 3. JSON (.json)

**Características:**
- ✅ Formato estructurado jerárquico
- ✅ Incluye metadata completa
- ✅ Perfecto para desarrollo de software
- ✅ Compatible con APIs y servicios web
- ✅ Legible por humanos y máquinas

**Estructura:**
```json
[
  {
    "id": "uuid-123",
    "fecha_envio": "2025-01-15T10:30:00Z",
    "empresa": "Empresa XYZ",
    "contacto": "Juan Pérez",
    "email": "juan@empresa.com",
    "completado": true,
    "respuestas": {
      "empresa": "Empresa XYZ",
      "contacto": "Juan Pérez",
      "email": "juan@empresa.com",
      "inv_1": "Respuesta inventario 1...",
      "inv_2": "Respuesta inventario 2...",
      "usu_1": "Respuesta usuarios 1...",
      ...
      "gom_5": "Respuesta gobernanza moderna 5..."
    },
    "metadata": {
      "created_at": 1705315800000,
      "updated_at": 1705315800000
    }
  },
  ...más respuestas...
]
```

**Recomendado para:**
- 💻 Desarrollo de software
- 🔌 Integración con APIs
- 🤖 Procesamiento automatizado
- 🔄 Backup completo de datos
- 🧪 Testing y desarrollo

**Cómo usar en JavaScript:**
```javascript
// Leer archivo JSON
fetch('respuestas-assessment-m365.json')
  .then(response => response.json())
  .then(data => {
    console.log(`Total respuestas: ${data.length}`);
    data.forEach(respuesta => {
      console.log(`${respuesta.empresa}: ${respuesta.email}`);
    });
  });
```

**Cómo usar en Python:**
```python
import json

# Leer JSON
with open('respuestas-assessment-m365.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Análisis
print(f"Total respuestas: {len(data)}")
for resp in data:
    print(f"{resp['empresa']}: {resp['email']}")
```

---

## 📋 Datos Exportados

### Campos de Metadata (6):

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| `id` | ID único de la respuesta | `550e8400-e29b-41d4-a716-446655440000` |
| `fecha_envio` | Fecha y hora del envío | `2025-01-15T10:30:00Z` |
| `empresa` | Nombre de la empresa | `ACME Corporation` |
| `contacto` | Nombre del contacto | `Juan Pérez` |
| `email` | Email del contacto | `juan.perez@acme.com` |
| `completado` | Si el formulario está completo | `Sí` / `true` |

### Campos de Respuestas (63):

Las 63 preguntas se exportan organizadas por categorías:

#### Inventario (inv_1 a inv_5) - 5 preguntas
- Volumen y tipo de datos
- Estructura de información
- Contenido obsoleto
- Metadatos
- Dependencias entre archivos

#### Usuarios (usu_1 a usu_5) - 5 preguntas
- Principales usuarios
- Colaboración actual
- Familiaridad con M365
- Usuarios externos
- Campeones internos

#### Requisitos Técnicos (req_1 a req_5) - 5 preguntas
- Limitaciones técnicas
- Estructura de permisos
- Integraciones existentes
- Sistemas operativos
- Historial de versiones

#### Gobernanza (gob_1 a gob_5) - 5 preguntas
- Modelo de gobernanza
- Responsables
- Estructura de sitios
- Ciclo de vida
- Control de creación

#### Adopción (ado_1 a ado_5) - 5 preguntas
- Estrategia de capacitación
- Medición de éxito
- Casos de uso prioritarios
- Soporte post-implementación
- Retroalimentación

#### Inteligencia Artificial (ia_1 a ia_5) - 5 preguntas
- Uso previsto de IA
- Análisis de documentos
- Sugerencias inteligentes
- Microsoft 365 Copilot
- Clasificación automatizada

#### Automatización (auto_1 a auto_5) - 5 preguntas (antes "auto_4")
- Procesos a automatizar
- Aplicaciones personalizadas
- Reportes y visualizaciones
- Automatizaciones actuales
- Integración con M365

#### Cultura Digital (cult_1 a cult_5) - 5 preguntas
- Disposición organizacional
- Lecciones de iniciativas previas
- Equipo de gestión del cambio
- Involucramiento de dirección
- Gestión de inquietudes

#### Seguridad (seg_1 a seg_5) - 5 preguntas
- Controles de seguridad
- Datos confidenciales
- Políticas DLP
- Retención/eliminación
- Supervisión de incidentes

#### Integraciones (int_1 a int_5) - 5 preguntas
- Sistemas empresariales clave
- Necesidad de integración
- Intercambio de información
- Optimización de procesos
- Acceso a datos core

#### Experiencia del Usuario (exp_1 a exp_5) - 5 preguntas
- Acceso a documentos
- Uso de Teams
- Consideraciones de accesibilidad
- Mejoras en búsqueda
- Colaboración externa

#### Gobernanza Moderna (gom_1 a gom_5) - 5 preguntas
- Microsoft Purview
- Esquema de clasificación
- Políticas de sitios
- Alineamiento normativo
- Responsables de gobernanza

**Total: 63 preguntas + 6 campos de metadata = 69 columnas**

---

## 🔒 Seguridad y Privacidad

### Filtrado de Datos

**Como Cliente:**
- Solo exportas TUS propias respuestas
- No puedes ver respuestas de otras empresas
- Protección automática basada en email

**Como Administrador:**
- Exportas TODAS las respuestas
- Vista completa del assessment
- Responsabilidad de proteger datos

### Datos Sensibles

⚠️ **Las exportaciones contienen información sensible:**
- Datos de contacto (emails, nombres)
- Información estratégica de empresas
- Respuestas confidenciales sobre infraestructura

**Recomendaciones:**
- 🔐 Protege los archivos exportados
- 🚫 No los compartas públicamente
- 💾 Almacénalos en ubicaciones seguras
- 🗑️ Elimínalos cuando ya no los necesites

---

## 💡 Casos de Uso

### Análisis de Datos

```
1. Exportar a Excel
2. Crear tablas dinámicas
3. Analizar patrones comunes
4. Generar reportes ejecutivos
```

### Migración a CRM

```
1. Exportar a CSV
2. Mapear columnas a campos del CRM
3. Importar en Salesforce/Dynamics
4. Crear oportunidades de negocio
```

### Integración con Power BI

```
1. Exportar a CSV o JSON
2. Conectar Power BI al archivo
3. Crear dashboards interactivos
4. Compartir insights con equipo
```

### Backup Regular

```
1. Exportar a JSON (formato completo)
2. Guardar en sistema de backup
3. Documentar fecha de exportación
4. Repetir mensualmente
```

---

## 🐛 Troubleshooting

### El archivo no se descarga

**Solución:**
- Verifica que tu navegador permita descargas
- Revisa el bloqueador de pop-ups
- Intenta con otro navegador

### Los acentos se ven mal en Excel

**Solución:**
1. Abre Excel
2. Datos → Obtener datos → De texto/CSV
3. Origen del archivo: **UTF-8**
4. Importar

### JSON no se formatea bien

**Solución:**
- Usa un visor JSON online: jsonviewer.stack.hu
- O usa un editor de código: VS Code, Sublime Text

### Faltan respuestas

**Solución:**
- Como cliente: Solo ves tus respuestas (normal)
- Como admin: Verifica que estés autenticado como administrador
- Comprueba en la consola (F12) si hay errores

---

## 📞 Soporte

¿Problemas con la exportación?
- 🌐 Web: [https://unikal.tech](https://unikal.tech)
- 📧 Contacto: [https://unikal.tech/#contacto](https://unikal.tech/#contacto)

---

## 📊 Resumen Rápido

| Formato | Mejor Para | Peso Aprox. | Compatibilidad |
|---------|-----------|-------------|----------------|
| **Excel** | Análisis rápido, reportes | Media | ⭐⭐⭐⭐⭐ |
| **CSV** | Procesamiento técnico | Ligero | ⭐⭐⭐⭐⭐ |
| **JSON** | Desarrollo, APIs | Media | ⭐⭐⭐ |

**Recomendación general:** Usa **Excel** para análisis manual, **CSV** para procesamiento automatizado.

---

**Versión:** 2.2.0  
**Fecha:** Enero 2025  
**Funcionalidad:** Exportación implementada ✅
