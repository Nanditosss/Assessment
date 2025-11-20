# 🔒 Sistema de Seguridad y Control de Acceso

## Descripción General

El cuestionario de migración a SharePoint Online implementa un sistema de control de acceso de dos niveles para proteger la privacidad de los datos de los clientes.

## 🎯 Niveles de Acceso

### 1. 👤 Acceso Cliente (Nivel Usuario)

**Características:**
- Los clientes solo pueden ver **sus propias respuestas**
- Identificación mediante email utilizado en el cuestionario
- No pueden ver respuestas de otros clientes
- No pueden eliminar respuestas

**Flujo de Acceso:**
1. El cliente accede a `acceso-respuestas.html`
2. Ingresa el email usado al completar el cuestionario
3. El sistema filtra y muestra solo las respuestas asociadas a ese email
4. Puede ver el detalle completo de sus respuestas

### 2. 🛡️ Acceso Administrador (UNIKAL.TECH)

**Características:**
- Los administradores pueden ver **todas las respuestas** de todos los clientes
- Acceso protegido por contraseña
- Pueden eliminar respuestas si es necesario
- Vista completa de estadísticas y métricas

**Flujo de Acceso:**
1. El administrador accede a `acceso-respuestas.html`
2. Selecciona la pestaña "Administrador"
3. Ingresa la contraseña de administrador
4. Obtiene acceso completo a todas las respuestas

## 🔐 Credenciales de Administrador

### Contraseña Actual
```
Contraseña: Unikal2025Admin!
Email Admin: admin@unikal.tech
```

### ⚠️ IMPORTANTE - Cambio de Contraseña

**Para cambiar la contraseña de administrador:**

Editar el archivo `js/auth.js` línea 3:

```javascript
const ADMIN_PASSWORD = 'TU_NUEVA_CONTRASEÑA_SEGURA';
```

**Recomendaciones para la contraseña:**
- Mínimo 12 caracteres
- Incluir mayúsculas, minúsculas, números y símbolos
- No usar palabras comunes
- Cambiarla periódicamente (cada 3-6 meses)
- No compartirla públicamente

## 🔒 Características de Seguridad Implementadas

### 1. Filtrado de Datos
```javascript
// Los clientes solo ven sus respuestas
function filterResponsesByUser(responses) {
    if (isAdmin()) {
        return responses; // Admin ve todo
    } else {
        const userEmail = getCurrentUserEmail();
        return responses.filter(r => r.email === userEmail);
    }
}
```

### 2. Control de Sesión
- Uso de `sessionStorage` para mantener la sesión activa
- La sesión se limpia al cerrar el navegador
- Botón de "Cerrar Sesión" disponible en todo momento

### 3. Redirección Automática
- Si un usuario intenta acceder a `respuestas.html` directamente sin autenticación
- Es redirigido automáticamente a `acceso-respuestas.html`

### 4. Interfaz Diferenciada
- Los administradores ven un banner distintivo: "Modo Administrador"
- Los clientes ven: "Sesión iniciada como: [su-email]"
- Botón de eliminar solo visible para administradores

## 📋 Páginas del Sistema

| Página | URL | Propósito | Acceso |
|--------|-----|-----------|--------|
| **Acceso** | `acceso-respuestas.html` | Login cliente/admin | Público |
| **Respuestas** | `respuestas.html` | Ver respuestas filtradas | Autenticado |
| **Formularios** | `seccion1-6.html` | Completar cuestionario | Público |
| **Confirmación** | `confirmacion.html` | Envío y resumen | Público |

## 🚀 Flujo Completo del Usuario

### Cliente:
1. ✅ Completa el cuestionario (secciones 1-6)
2. ✅ Envía el formulario desde `confirmacion.html`
3. ✅ Automáticamente se guarda su email en la sesión
4. ✅ Click en "Ver Mis Respuestas" → acceso directo
5. ✅ Puede ver solo sus respuestas
6. 🔄 Si cierra el navegador y quiere volver:
   - Accede a `acceso-respuestas.html`
   - Ingresa su email
   - Ve sus respuestas

### Administrador UNIKAL.TECH:
1. 🛡️ Accede a `acceso-respuestas.html`
2. 🛡️ Selecciona pestaña "Administrador"
3. 🛡️ Ingresa contraseña: `Unikal2025Admin!`
4. 🛡️ Ve TODAS las respuestas de todos los clientes
5. 🛡️ Puede eliminar respuestas si es necesario
6. 🛡️ Ve estadísticas completas

## 🔧 Configuración Adicional

### Modificar Email de Administrador
Archivo: `js/auth.js` línea 4:
```javascript
const ADMIN_EMAIL = 'tu-admin@unikal.tech';
```

### Personalizar Mensaje de Acceso Denegado
Archivo: `acceso-respuestas.html` línea 135:
```javascript
alert('Contraseña incorrecta. Acceso denegado.');
```

## ⚠️ Limitaciones Actuales

### Nivel de Seguridad: MEDIO

**¿Por qué?**
- La contraseña está almacenada en el código JavaScript del cliente
- Cualquiera que inspeccione el código puede ver la contraseña
- No hay encriptación de contraseña

### 🔐 Para Seguridad ALTA (Recomendación para Producción):

1. **Backend de Autenticación:**
   - Mover la validación de contraseña al servidor
   - Usar tokens JWT para sesiones
   - Implementar bcrypt para hash de contraseñas

2. **Base de Datos de Usuarios:**
   - Tabla de usuarios con roles (cliente/admin)
   - Sistema de permisos granular
   - Autenticación de dos factores (2FA)

3. **Auditoría:**
   - Registrar todos los accesos
   - Log de quién ve qué respuestas
   - Alertas de accesos sospechosos

## 📊 Privacidad y RGPD

✅ **Cumplimiento Implementado:**
- Cada cliente solo ve sus propios datos
- No hay acceso cruzado entre clientes
- Los administradores están identificados
- Propósito legítimo para acceso admin (gestión del servicio)

✅ **Información al Usuario:**
- El footer legal informa sobre el tratamiento de datos
- El cliente es informado que "Solo podrá ver las respuestas asociadas a su email"
- Se indica que UNIKAL.TECH es el responsable del tratamiento

## 🆘 Soporte

**Para problemas de acceso:**
- Cliente olvidó el email usado: Verificar en registros de envío
- Administrador olvidó contraseña: Revisar archivo `js/auth.js`
- Respuestas no visibles: Verificar filtro por email exacto

## 📝 Notas de Implementación

- **Archivo principal:** `js/auth.js` (189 líneas)
- **Página de acceso:** `acceso-respuestas.html`
- **Integración:** `js/respuestas.js` (actualizado)
- **Sesión:** `sessionStorage` (se limpia al cerrar navegador)

---

**Última actualización:** 2025  
**Versión del sistema:** 2.0.0  
**Responsable:** UNIKAL TECH PARTNERS