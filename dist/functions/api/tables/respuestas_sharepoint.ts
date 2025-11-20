// Cloudflare Pages Function para manejar respuestas del assessment

interface Env {
  DB: D1Database;
}

// POST: Crear nueva respuesta
export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
    const { DB } = context.env;
    const data = await context.request.json() as any;

    // Validar campos requeridos
    if (!data.id || !data.empresa || !data.contacto || !data.email) {
      return new Response(
        JSON.stringify({ error: 'Faltan campos requeridos' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Insertar en base de datos
    await DB.prepare(`
      INSERT INTO respuestas_sharepoint 
      (id, fecha_envio, empresa, contacto, email, respuestas, completado)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      data.id,
      data.fecha_envio,
      data.empresa,
      data.contacto,
      data.email,
      data.respuestas,
      data.completado ? 1 : 0
    ).run();

    return new Response(
      JSON.stringify({
        success: true,
        id: data.id,
        message: 'Respuesta guardada correctamente'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error al guardar respuesta:', error);
    return new Response(
      JSON.stringify({ error: 'Error al guardar la respuesta', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// GET: Listar respuestas
export async function onRequestGet(context: { request: Request; env: Env }) {
  try {
    const { DB } = context.env;
    const url = new URL(context.request.url);
    const email = url.searchParams.get('email');
    const isAdmin = url.searchParams.get('admin') === 'true';

    let query = 'SELECT * FROM respuestas_sharepoint';
    const params: any[] = [];

    // Si no es admin, filtrar por email
    if (!isAdmin && email) {
      query += ' WHERE email = ?';
      params.push(email);
    }

    query += ' ORDER BY fecha_envio DESC';

    const stmt = params.length > 0 
      ? DB.prepare(query).bind(...params)
      : DB.prepare(query);

    const result = await stmt.all();

    return new Response(
      JSON.stringify({
        success: true,
        data: result.results,
        count: result.results?.length || 0
      }),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        } 
      }
    );
  } catch (error: any) {
    console.error('Error al listar respuestas:', error);
    return new Response(
      JSON.stringify({ error: 'Error al obtener las respuestas', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// OPTIONS: CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
