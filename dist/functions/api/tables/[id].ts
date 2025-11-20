// Cloudflare Pages Function para eliminar respuesta por ID

interface Env {
  DB: D1Database;
}

// DELETE: Eliminar respuesta por ID
export async function onRequestDelete(context: { request: Request; env: Env; params: { id: string } }) {
  try {
    const { DB } = context.env;
    const { id } = context.params;

    await DB.prepare('DELETE FROM respuestas_sharepoint WHERE id = ?')
      .bind(id)
      .run();

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Respuesta eliminada correctamente'
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
    console.error('Error al eliminar respuesta:', error);
    return new Response(
      JSON.stringify({ error: 'Error al eliminar la respuesta', details: error.message }),
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
      'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
