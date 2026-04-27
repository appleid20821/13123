export const config = { runtime: "edge" };

const VPS = "https:\\engage.cloudflareclient.com:2408";

export default async function handler(req) {
  try {
    const url = new URL(req.url);
    const target = url.searchParams.get("url");

    if (!target) {
      return new Response("Missing URL", { status: 400 });
    }

    const finalUrl = `${VPS}?url=${encodeURIComponent(target)}`;

    const resp = await fetch(finalUrl, {
      method: "GET",
    });

    return new Response(resp.body, {
      status: resp.status,
      headers: resp.headers,
    });

  } catch (e) {
    return new Response("Proxy error", { status: 500 });
  }
}
