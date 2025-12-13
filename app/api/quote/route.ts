// app/api/quote/route.ts
import { NextResponse } from "next/server";

// --- REQUIRED: put your real Formspree endpoint here ---
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xkgpqrzk";

// Make sure this runs on Node (most reliable for form parsing)
export const runtime = "nodejs";
// Don’t cache
export const dynamic = "force-dynamic";

function toUrlEncoded(obj: Record<string, string>) {
  const p = new URLSearchParams();
  Object.entries(obj).forEach(([k, v]) => p.append(k, v));
  return p.toString();
}

export async function POST(req: Request) {
  try {
    const ct = req.headers.get("content-type") || "";
    const fields: Record<string, string> = {};

    if (ct.includes("application/x-www-form-urlencoded")) {
      // Normal <form method="POST">
      const bodyText = await req.text();
      const params = new URLSearchParams(bodyText);
      params.forEach((v, k) => (fields[k] = v));
    } else {
      // Fallback: multipart/form-data or anything else
      const fd = await req.formData();
      for (const [k, v] of fd.entries()) fields[k] = String(v);
    }

    // Fire-and-forget to Formspree (don’t block redirect)
    // @ts-ignore
    Promise.resolve(
      fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: toUrlEncoded(fields),
      })
    ).catch(() => {});
  } catch {
    // ignore — we still redirect
  }

  // Always send the customer to your Call Now page
  return NextResponse.redirect(new URL("/contact", req.url), { status: 303 });
}

// If someone accidentally does a GET on /api/quote, send them to /contact too
export async function GET(req: Request) {
  return NextResponse.redirect(new URL("/contact", req.url), { status: 303 });
}
