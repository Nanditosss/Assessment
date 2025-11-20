-- Crear tabla para almacenar respuestas del assessment
CREATE TABLE IF NOT EXISTS respuestas_sharepoint (
  id TEXT PRIMARY KEY,
  fecha_envio TEXT NOT NULL,
  empresa TEXT NOT NULL,
  contacto TEXT NOT NULL,
  email TEXT NOT NULL,
  respuestas TEXT NOT NULL,
  completado INTEGER DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Crear índice por email para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_email ON respuestas_sharepoint(email);

-- Crear índice por fecha para ordenamiento
CREATE INDEX IF NOT EXISTS idx_fecha ON respuestas_sharepoint(fecha_envio);
