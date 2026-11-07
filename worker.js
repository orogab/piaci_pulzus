// Cloudflare Worker: CORS proxy kizárólag a Yahoo Finance chart API-hoz.
// Telepítés: dash.cloudflare.com → Workers → Create → illeszd be → Deploy.
// A kapott https://NEV.FIOK.workers.dev címet írd az index.html CONFIG.proxy mezőjébe.
const ALLOWED = ["query1.finance.yahoo.com", "query2.finance.yahoo.com"];

export default {
  async fetch(request) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });

    const target = new URL(request.url).searchParams.get("url");
    let u;
    try { u = new URL(target); } catch { return new Response("Hibás url", { status: 400, headers: cors }); }
    if (u.protocol !== "https:" || !ALLOWED.includes(u.hostname)) {
      return new Response("Nem engedélyezett cél", { status: 403, headers: cors });
    }

    const upstream = await fetch(u.toString(), {
      headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json" },
      cf: { cacheTtl: 30, cacheEverything: true },
    });
    const body = await upstream.text();
    return new Response(body, {
      status: upstream.status,
      headers: { ...cors, "Content-Type": "application/json; charset=utf-8", "Cache-Control": "public, max-age=30" },
    });
  },
};
