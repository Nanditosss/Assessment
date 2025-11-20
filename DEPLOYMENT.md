# 🚀 Guía de Despliegue - Assessment Microsoft 365

Este documento describe cómo desplegar la aplicación Assessment Microsoft 365 en diferentes plataformas.

## 📋 Tabla de Contenidos

- [GitHub Pages](#github-pages)
- [Cloudflare Pages](#cloudflare-pages)
- [Netlify](#netlify)
- [Vercel](#vercel)

---

## 🌐 GitHub Pages

### ✅ Estado: ACTIVO

**URL de Producción:** https://nanditosss.github.io/Assessment

### Configuración Automática

GitHub Pages está configurado para desplegarse automáticamente desde la rama `main`.

### Cómo Actualizar

1. **Hacer cambios en la rama `genspark_ai_developer`**:
   ```bash
   git checkout genspark_ai_developer
   # Realizar cambios...
   git add .
   git commit -m "descripción de cambios"
   git push origin genspark_ai_developer
   ```

2. **Crear Pull Request y hacer merge a main**:
   - Ve a: https://github.com/Nanditosss/Assessment/pulls
   - Crea un PR desde `genspark_ai_developer` → `main`
   - Revisa y aprueba el PR
   - Haz merge

3. **Despliegue Automático**:
   - GitHub Pages desplegará automáticamente en ~1-2 minutos
   - Verifica en: https://nanditosss.github.io/Assessment

### Configuración Manual (si es necesario)

1. Ve a: https://github.com/Nanditosss/Assessment/settings/pages
2. En **Source**, selecciona:
   - Branch: `main`
   - Folder: `/ (root)`
3. Click en **Save**
4. Espera ~2 minutos para que se active

---

## ⚡ Cloudflare Pages

### Estado: PENDIENTE DE CONFIGURACIÓN

Cloudflare Pages ofrece:
- 🚀 CDN global ultra-rápido
- 🔒 HTTPS automático
- 🌍 Múltiples regiones
- 📊 Analytics incluido
- 🆓 Plan gratuito generoso

### Opción A: Conexión con GitHub (Recomendada) ⭐

1. **Accede a Cloudflare Pages**:
   - Ve a: https://dash.cloudflare.com/
   - Si no tienes cuenta, créala (gratis)
   - Click en **Workers & Pages** en el menú lateral

2. **Crear Nuevo Proyecto**:
   - Click en **Create application**
   - Selecciona **Pages**
   - Click en **Connect to Git**

3. **Conectar GitHub**:
   - Autoriza Cloudflare a acceder a GitHub
   - Selecciona el repositorio: **Nanditosss/Assessment**

4. **Configurar Build**:
   ```
   Project name: assessment-m365
   Production branch: main
   Build command: (dejar vacío)
   Build output directory: /
   Root directory: /
   ```

5. **Variables de Entorno** (opcional):
   - No se requieren para este proyecto

6. **Deploy**:
   - Click en **Save and Deploy**
   - Cloudflare construirá y desplegará tu sitio
   - URL final: `https://assessment-m365.pages.dev`

7. **Dominio Personalizado** (opcional):
   - En el dashboard del proyecto
   - Ve a **Custom domains**
   - Agrega tu dominio personalizado

### Opción B: Despliegue con Wrangler CLI

**Requisitos previos**:
- Node.js 16+ instalado
- Cuenta de Cloudflare
- API Token de Cloudflare

**Pasos**:

1. **Instalar Wrangler** (si no está instalado):
   ```bash
   npm install -g wrangler
   ```

2. **Login a Cloudflare**:
   ```bash
   wrangler login
   ```
   - Se abrirá un navegador para autenticarte
   - Autoriza la aplicación

3. **Desplegar**:
   ```bash
   cd /ruta/al/proyecto
   wrangler pages deploy . --project-name=assessment-m365
   ```

4. **Despliegues Subsecuentes**:
   ```bash
   wrangler pages deploy .
   ```

### Configuración de wrangler.toml

El archivo `wrangler.toml` ya está configurado:

```toml
name = "assessment-m365"
compatibility_date = "2024-01-01"

pages_build_output_dir = "."

[site]
bucket = "."
```

### Despliegue Automático con GitHub Actions (Avanzado)

Crea el archivo `.github/workflows/deploy-cloudflare.yml`:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write
    name: Deploy to Cloudflare Pages
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: assessment-m365
          directory: .
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

**Configurar Secrets en GitHub**:
1. Ve a: https://github.com/Nanditosss/Assessment/settings/secrets/actions
2. Agrega:
   - `CLOUDFLARE_API_TOKEN`: Tu API token de Cloudflare
   - `CLOUDFLARE_ACCOUNT_ID`: Tu Account ID de Cloudflare

---

## 🎯 Netlify

### Opción A: Deploy con Git

1. Ve a: https://app.netlify.com/
2. Click en **Add new site** → **Import an existing project**
3. Conecta con GitHub
4. Selecciona **Nanditosss/Assessment**
5. Configuración:
   ```
   Build command: (vacío)
   Publish directory: .
   ```
6. Click **Deploy site**

### Opción B: Deploy con CLI

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=.
```

---

## ▲ Vercel

### Opción A: Deploy con Git

1. Ve a: https://vercel.com/
2. Click **Add New** → **Project**
3. Import desde GitHub: **Nanditosss/Assessment**
4. Configuración:
   ```
   Framework Preset: Other
   Build Command: (vacío)
   Output Directory: .
   ```
5. Click **Deploy**

### Opción B: Deploy con CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## 📊 Comparación de Plataformas

| Característica | GitHub Pages | Cloudflare Pages | Netlify | Vercel |
|---------------|--------------|------------------|---------|--------|
| **Precio (Free)** | ✅ Gratis | ✅ Gratis | ✅ Gratis | ✅ Gratis |
| **CDN Global** | ⚠️ Limitado | ✅ Excelente | ✅ Excelente | ✅ Excelente |
| **HTTPS** | ✅ Auto | ✅ Auto | ✅ Auto | ✅ Auto |
| **Build Time** | N/A | Rápido | Rápido | Rápido |
| **Dominio Custom** | ✅ Sí | ✅ Sí | ✅ Sí | ✅ Sí |
| **Analytics** | ❌ No | ✅ Sí | ✅ Sí | ✅ Sí |
| **Functions** | ❌ No | ✅ Sí | ✅ Sí | ✅ Sí |

---

## 🔧 Requisitos del Proyecto

Este es un proyecto **estático puro**:
- ✅ HTML5
- ✅ CSS3
- ✅ JavaScript (vanilla)
- ❌ No requiere build process
- ❌ No requiere Node.js en producción
- ❌ No requiere servidor backend

---

## 📝 Notas Importantes

### Estructura de Archivos

Todos los archivos deben estar en la raíz del proyecto:
```
/
├── index.html          (página principal)
├── seccion1-6.html     (secciones del formulario)
├── confirmacion.html   (página de confirmación)
├── respuestas.html     (visualización de respuestas)
├── css/
│   ├── style.css
│   └── respuestas.css
├── js/
│   ├── seccion.js
│   ├── confirmacion.js
│   ├── respuestas.js
│   ├── auth.js
│   └── main.js
└── images/
    └── unikal-tech-logo.png
```

### APIs y Backend

⚠️ **IMPORTANTE**: La aplicación usa LocalStorage y una API RESTful externa para almacenar respuestas. Asegúrate de que:

1. **La API está accesible** desde el dominio desplegado
2. **CORS está configurado** correctamente en la API
3. **HTTPS está habilitado** si la API lo requiere

### Configuración de CORS (si es necesario)

Si la API está en un dominio diferente, necesitarás configurar CORS:

```javascript
// En tu servidor API
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type
```

---

## 🆘 Solución de Problemas

### GitHub Pages no muestra el sitio

1. Verifica que GitHub Pages esté habilitado en Settings
2. Asegúrate de que la rama `main` esté actualizada
3. Revisa el estado en: Settings → Pages
4. Espera 2-5 minutos después del push

### Cloudflare Pages - Error de Build

- Este proyecto no requiere build
- Asegúrate de dejar el build command vacío
- Output directory debe ser `.` o `/`

### Imágenes o CSS no cargan

1. Verifica las rutas relativas en HTML
2. Asegúrate de que los archivos estén en Git
3. Revisa la consola del navegador (F12)

### API no responde

1. Verifica la URL de la API en el código
2. Confirma que CORS está habilitado
3. Revisa la consola del navegador para errores

---

## 📞 Soporte

Para problemas específicos de la plataforma:

- **GitHub Pages**: https://docs.github.com/pages
- **Cloudflare Pages**: https://developers.cloudflare.com/pages
- **Netlify**: https://docs.netlify.com
- **Vercel**: https://vercel.com/docs

---

## 🎉 URLs de Producción

Una vez desplegado, tu sitio estará disponible en:

- **GitHub Pages**: https://nanditosss.github.io/Assessment
- **Cloudflare Pages**: https://assessment-m365.pages.dev (pendiente)
- **Netlify**: https://assessment-m365.netlify.app (si configuras)
- **Vercel**: https://assessment-m365.vercel.app (si configuras)

---

**Última actualización**: 2025-11-20  
**Versión del documento**: 1.0.0
