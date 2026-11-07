// GET /api/github → last cached GitHub JSON from Blobs. 204 when nothing is cached yet;
// the page then falls back to /data/github.json shipped with the site.
import type { Config } from '@netlify/functions';
import { store } from '../lib/github.mts';

export default async () => {
  const data = await store().get('latest', { type: 'json' }).catch(() => null);
  if (!data) return new Response(null, { status: 204 }); // nothing cached yet → client uses /data/github.json
  return Response.json(data, { headers: { 'cache-control': 'public, max-age=600, s-maxage=3600' } });
};

export const config: Config = { path: '/api/github', method: 'GET' };
