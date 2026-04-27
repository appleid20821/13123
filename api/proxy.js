export const config = { runtime: "edge" };

const PROXY = "http://192.248.168.92:8888";

export default async function handler(req) {
  try {
    const url = new URL(req.url);
    const target = url.searchParams.get("url");

    if (!target || !target.startsWith("http")) {
      return new Response("Invalid URL", { status: 400 });
    }

    const headers = new Headers(req.headers);
    headers.delete("host");

    // استفاده از HTTP proxy
    const resp = await fetch(target, {
      method: req.method,
      headers,
      body: req.body,
      redirect: "manual",

      // 👇 مهم: ست کردن proxy (فقط در edge کار می‌کند اگر backend اجازه دهد)
      // NOTE: بعضی runtimeها اینو مستقیم پشتیبانی نمی‌کنن
    });

    return new Response(resp.body, {
      status: resp.status,
      headers: resp.headers,
    });

  } catch (e) {
    return new Response("Proxy error", { status: 500 });
  }
}
