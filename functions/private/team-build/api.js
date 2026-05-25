export async function onRequestGet(context) {
  const doc = await context.env.REYWAY_AUTH.get('doc:team-build');
  return new Response(doc || 'null', {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

export async function onRequestPost(context) {
  const auth = context.request.headers.get('Authorization') || '';
  if (auth !== 'team2026') return new Response('Unauthorized', { status: 401 });
  try {
    const body = await context.request.json();
    await context.env.REYWAY_AUTH.put('doc:team-build', JSON.stringify(body));
    return new Response('OK');
  } catch (e) {
    return new Response('Bad Request', { status: 400 });
  }
}
