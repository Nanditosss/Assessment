import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import { serve } from '@hono/node-server'

const app = new Hono()

// Servir archivos estáticos desde el directorio raíz
app.use('/*', serveStatic({ root: './' }))

// Ruta por defecto que sirve index.html
app.get('/', serveStatic({ path: './index.html' }))

const port = 3000
console.log(`🚀 Servidor corriendo en http://localhost:${port}`)
console.log(`📋 Assessment Microsoft 365 está disponible`)

serve({
  fetch: app.fetch,
  port
})
