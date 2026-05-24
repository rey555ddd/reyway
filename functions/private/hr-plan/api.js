// GET  /private/hr-plan/api  → 讀文件（無需驗證，頁面本身有密碼）
// POST /private/hr-plan/api  → 存文件（需帶 Authorization: hr2026）

export async function onRequestGet(context) {
  const doc = await context.env.REYWAY_AUTH.get('doc:hr-plan');
  return new Response(doc || 'null', {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}

export async function onRequestPost(context) {
  const auth = context.request.headers.get('Authorization') || '';
  if (auth !== 'hr2026') {
    return new Response('Unauthorized', { status: 401 });
  }
  try {
    const body = await context.request.json();
    await context.env.REYWAY_AUTH.put('doc:hr-plan', JSON.stringify(body));
    return new Response('OK');
  } catch (e) {
    return new Response('Bad Request', { status: 400 });
  }
}
