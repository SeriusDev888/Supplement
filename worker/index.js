// The public site exposes published content and media only. Editor APIs live in supplement-admin-site.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    if (path.startsWith('/api/editor') || path === '/editor.html') {
      return new Response('Not found', { status: 404 });
    }
    if (path === '/api/content' || path.startsWith('/media/')) {
      if (!['GET', 'HEAD'].includes(request.method)) {
        return new Response('Method not allowed', { status: 405, headers: { allow: 'GET, HEAD' } });
      }
      try {
        const upstream = new URL(path + url.search, env.CONTENT_ORIGIN || 'https://content.internal');
        // Construct a fresh request so visitor identity/cookies never reach the admin service.
        const forwarded = new Request(upstream, { method: 'GET', redirect: 'manual' });
        if (!env.CONTENT_SERVICE && !env.CONTENT_ORIGIN) throw new Error('CONTENT_ORIGIN or CONTENT_SERVICE is required');
        const response = await (env.CONTENT_SERVICE ? env.CONTENT_SERVICE.fetch(forwarded) : fetch(forwarded));
        return request.method === 'HEAD'
          ? new Response(null, { status: response.status, headers: response.headers })
          : response;
      } catch (error) {
        console.error('Published content unavailable:', error.message);
        return Response.json({ error: 'Published content unavailable' }, { status: 503 });
      }
    }
    if (path.startsWith('/api/')) return new Response('Not found', { status: 404 });
    return env.ASSETS.fetch(request);
  },
};
