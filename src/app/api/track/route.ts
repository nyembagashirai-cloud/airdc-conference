import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { page } = await req.json();

    if (process.env.DATABASE_URL) {
      const { prisma } = await import("@/lib/prisma");
      const userAgent = req.headers.get("user-agent") || undefined;
      const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0] || undefined;
      const referrer = req.headers.get("referer") || undefined;

      await prisma.pageView.create({
        data: { page, userAgent, ip, referrer },
          });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
