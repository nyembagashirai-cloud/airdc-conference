import { NextRequest, NextResponse } from "next/server";
import { generateInvoicePdf } from "@/lib/invoice-pdf";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 30;

function getRegistrationFee(delegateType: string): string {
  const feeMap: Record<string, string> = {
    AIRDC_MEMBER: "350.00",
    SUPERVISORY_AUTHORITY_MEMBER: "350.00",
    NON_MEMBER: "500.00",
    SUPERVISORY_AUTHORITY_NON_MEMBER: "500.00",
    MEDIA_SPEAKER_ORGANISER: "0.00",
  };
  return feeMap[delegateType] ?? "0.00";
}

function getDelegateLabel(delegateType: string): string {
  const labels: Record<string, string> = {
    AIRDC_MEMBER: "AIRDC Member",
    NON_MEMBER: "Non Member",
    SUPERVISORY_AUTHORITY_MEMBER: "Supervisory Authority / AIRDC Member",
    SUPERVISORY_AUTHORITY_NON_MEMBER: "Supervisory Authority / Non Member",
    MEDIA_SPEAKER_ORGANISER: "Media / Speaker / Organiser",
  };
  return labels[delegateType] ?? delegateType;
}

/**
 * Loads the AIRDC logo as a base64 data URI for embedding in the PDF.
 * Returns undefined (and logs) if the file isn't present in the deployment.
 */
async function loadLogoBase64(): Promise<{ logo?: string; logoError?: string }> {
  try {
    const fs = await import("fs");
    const path = await import("path");
    const logoPath = path.join(process.cwd(), "public", "images", "logo.png");
    const buf = fs.readFileSync(logoPath);
    return { logo: "data:image/png;base64," + buf.toString("base64") };
  } catch (e) {
    return { logoError: e instanceof Error ? e.message : String(e) };
  }
}

/**
 * GET /api/invoice?code=AIRDC26-XXXXXX
 *   Regenerates and downloads the proforma invoice for a registration.
 *
 * GET /api/invoice?diagnose=1
 *   Renders a sample invoice and reports success/failure as JSON.
 *   Use this to find out why an invoice isn't attaching in production.
 *
 * Both require an admin session.
 */
export async function GET(req: NextRequest) {
  const { auth } = await import("@/auth");
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const diagnose = url.searchParams.get("diagnose");
  const code = url.searchParams.get("code");

  const { logo, logoError } = await loadLogoBase64();

  // ── Diagnostic mode: render a dummy invoice and report what happened ──
  if (diagnose) {
    const report: Record<string, unknown> = {
      nodeVersion: process.version,
      cwd: process.cwd(),
      logoFound: Boolean(logo),
      logoError: logoError ?? null,
      logoBytes: logo ? logo.length : 0,
    };
    try {
      const buf = await generateInvoicePdf({
        fullName: "Diagnostic Test",
        email: "diagnostic@airdczim.co.zw",
        organisation: "AIRDC Secretariat",
        country: "Zimbabwe",
        delegateLabel: "Non Member",
        confirmationCode: "AIRDC26-TEST00",
        fee: "500.00",
        isComplimentary: false,
        logoBase64: logo,
      });
      report.pdfGenerated = true;
      report.pdfBytes = buf.length;
    } catch (e) {
      report.pdfGenerated = false;
      report.error = e instanceof Error ? e.message : String(e);
      report.stack = e instanceof Error ? e.stack : null;
    }
    return NextResponse.json(report, { status: report.pdfGenerated ? 200 : 500 });
  }

  // ── Download mode: real invoice for a real registration ──
  if (!code) {
    return NextResponse.json(
      { error: "Missing ?code= parameter. Use ?diagnose=1 to test PDF rendering." },
      { status: 400 }
    );
  }
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "No database configured" }, { status: 500 });
  }

  try {
    const { prisma } = await import("@/lib/prisma");
    const reg = await prisma.registration.findFirst({ where: { confirmationCode: code } });
    if (!reg) {
      return NextResponse.json({ error: "No registration found for code " + code }, { status: 404 });
    }

    const fee = getRegistrationFee(reg.delegateType);
    const buf = await generateInvoicePdf({
      fullName: (reg.civility ? reg.civility + " " : "") + reg.firstName + " " + reg.lastName,
      email: reg.email,
      organisation: reg.organisation,
      country: reg.country,
      delegateLabel: getDelegateLabel(reg.delegateType),
      confirmationCode: reg.confirmationCode ?? code,
      fee,
      isComplimentary: fee === "0.00",
      logoBase64: logo,
    });

    return new NextResponse(new Uint8Array(buf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="AIRDC2026-Invoice-${reg.confirmationCode ?? code}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    console.error("Invoice generation failed:", e);
    return NextResponse.json(
      {
        error: "Invoice generation failed",
        message: e instanceof Error ? e.message : String(e),
        stack: e instanceof Error ? e.stack : null,
      },
      { status: 500 }
    );
  }
}
