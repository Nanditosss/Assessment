# ⚡ Guía Rápida: Cloudflare Pages

## 🎯 Configuración en 5 Pasos

### 1️⃣ Crear Cuenta en Cloudflare
- Ve a: **https://dash.cloudflare.com/**
- Click en "Sign Up" (es gratis)
- Verifica tu email

### 2️⃣ Acceder a Pages
- En el dashboard de Cloudflare
- Click en **"Workers & Pages"** en el menú lateral izquierdo
- Click en **"Create application"**
- Selecciona **"Pages"**

### 3️⃣ Conectar con GitHub
- Click en **"Connect to Git"**
- Autoriza Cloudflare a acceder a tu GitHub
- Selecciona el repositorio: **Nanditosss/Assessment**
- Click en **"Begin setup"**

### 4️⃣ Configurar el Proyecto

Usa esta configuración exacta:

```
Project name: assessment-m365
Production branch: main
Build command: [DEJAR VACÍO]
Build output directory: /
Root directory (advanced): [DEJAR VACÍO]
```

**Variables de entorno**: No se necesitan

### 5️⃣ Deploy! 🚀

- Click en **"Save and Deploy"**
- Espera 1-2 minutos
- ¡Tu sitio estará en vivo!

---

## 🌐 URL de Tu Sitio

Después del despliegue, tu sitio estará disponible en:

```
https://assessment-m365.pages.dev
```

También puedes agregar un dominio personalizado desde el dashboard.

---

## 🔄 Actualizaciones Automáticas

Una vez configurado:

1. Cada `git push` a la rama `main`
2. Cloudflare detectará el cambio automáticamente
3. Desplegará la nueva versión en ~1-2 minutos
4. ¡Sin intervención manual necesaria!

---

## 📊 Dashboard de Cloudflare Pages

Desde el dashboard puedes ver:
- ✅ Estado de los despliegues
- 📈 Analytics de tráfico
- 🌍 Configuración de dominios
- 📝 Logs de build
- ⚙️ Variables de entorno

---

## 🆘 ¿Problemas?

### Error: "Build failed"
- **Solución**: Asegúrate de dejar el "Build command" **vacío**
- Este es un sitio estático sin proceso de build

### Error: "404 Not Found"
- **Solución**: Verifica que "Build output directory" sea `/` (raíz)
- Todos los archivos HTML están en la raíz del proyecto

### El sitio no se actualiza
- **Solución**: 
  1. Ve al dashboard de Cloudflare Pages
  2. Mira la pestaña "Deployments"
  3. Verifica que el último commit aparezca
  4. Si no, intenta hacer un nuevo `git push`

---

## 🎁 Ventajas de Cloudflare Pages

✅ **CDN Global**: Tu sitio se replica en 300+ ubicaciones  
✅ **Gratis**: Plan generoso sin costo  
✅ **Rápido**: Tiempos de carga ultra-rápidos  
✅ **HTTPS**: Certificado SSL automático  
✅ **Analytics**: Incluido sin configuración adicional  
✅ **Escalable**: Maneja millones de visitas  

---

## 📱 Siguientes Pasos (Opcional)

### Agregar Dominio Personalizado

1. En el dashboard de tu proyecto
2. Ve a **"Custom domains"**
3. Click en **"Set up a custom domain"**
4. Sigue las instrucciones para configurar DNS

### Ver Analytics

1. En el dashboard de tu proyecto
2. Click en **"Analytics"**
3. Ve métricas de:
   - Visitas
   - Países de origen
   - Páginas más visitadas
   - Performance

---

## 🔗 Enlaces Útiles

- **Dashboard de Cloudflare**: https://dash.cloudflare.com/
- **Documentación**: https://developers.cloudflare.com/pages
- **Soporte**: https://community.cloudflare.com/
- **Status**: https://www.cloudflarestatus.com/

---

## 📞 Necesitas Ayuda?

Si tienes problemas con la configuración:

1. Revisa la documentación completa en `DEPLOYMENT.md`
2. Consulta la comunidad de Cloudflare
3. Verifica el status de Cloudflare

---

**Creado**: 2025-11-20  
**Proyecto**: Assessment Microsoft 365  
**Nombre del Proyecto en Cloudflare**: `assessment-m365`
