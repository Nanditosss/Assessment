// Cloudflare Pages Function para eliminar respuesta por ID

type EventContext<Env, P extends string, Data> = {
  request: Request;
  env: Env;
  params: Record<P, string>;
  data: Data;
  waitUntil(promise: Promise<any>): void;
  passThroughOnException(): void;
};

interface Env {
  DB: D1Database;
}

// DELETE: Eliminar respuesta por ID
export async function onRequestDelete(context: EventContext<Env, 'id', any>) {
  try {
    const DB = context.env.DB;
    
    if (!DB) {
      console.error('D1 Database binding not found');
      return new Response(
        JSON.stringify({ error: 'Database not configured', details: 'D1 binding is missing' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const id = context.params.id;

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
