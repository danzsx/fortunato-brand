import { NextResponse } from "next/server";
import { briefingSchema, normalizedDraft } from "@/lib/validation/briefing";
import { getSupabaseServerClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";
const MAX_BODY = 30_000;
const visits = new Map<string, { count: number; until: number }>();

function allowed(ip: string) {
  const now = Date.now();
  const previous = visits.get(ip);
  if (!previous || previous.until < now) {
    visits.set(ip, { count: 1, until: now + 60_000 });
    return true;
  }
  previous.count++;
  return previous.count <= 10;
}

export function GET() {
  return NextResponse.json(
    { success: false, code: "METHOD_NOT_ALLOWED" },
    { status: 405, headers: { Allow: "POST" } }
  );
}

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") || 0);
  if (length > MAX_BODY) {
    return NextResponse.json({ success: false, code: "VALIDATION_ERROR" }, { status: 413 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!allowed(ip)) {
    return NextResponse.json({ success: false, code: "SUBMISSION_ERROR" }, { status: 429 });
  }

  let payload: unknown;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).byteLength > MAX_BODY) throw new Error();
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ success: false, code: "VALIDATION_ERROR" }, { status: 400 });
  }

  const parsed = briefingSchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors = Object.fromEntries(
      parsed.error.issues.map((issue) => [issue.path.join("."), issue.message])
    );
    return NextResponse.json(
      { success: false, code: "VALIDATION_ERROR", fieldErrors },
      { status: 422 }
    );
  }

  if (parsed.data.honeypot) {
    return NextResponse.json({ success: true, submissionId: crypto.randomUUID() });
  }

  const data = normalizedDraft(parsed.data);
  const submissionId = crypto.randomUUID();

  // 1. Save to Supabase if configured
  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      const { error: dbError } = await supabase.from("briefings").insert({
        id: submissionId,
        locale: data.locale,
        name: data.personal.name,
        role: data.personal.role || null,
        role_other: data.personal.roleOther || null,
        business_name: data.business.name || null,
        has_name: data.business.hasName,
        segment: data.business.segment,
        stage: data.business.stage,
        primary_need: data.project.primaryNeed,
        naming_status: data.project.namingStatus || null,
        existing_logo: data.project.existingLogo || null,
        rebranding_reasons: data.project.rebrandingReasons || null,
        website_type: data.project.websiteType || null,
        motivation: data.project.motivation,
        desired_change: data.project.desiredChange || null,
        references_text: data.project.references || null,
        timeline: data.planning.timeline,
        specific_date: data.planning.specificDate || null,
        email: data.contact.email,
        phone: data.contact.phone || null,
        preferred_channel: data.contact.preferredChannel,
        business_profile: data.contact.businessProfile || null,
        raw_data: data,
      });

      if (dbError) {
        console.error("Supabase insert error:", dbError);
      }
    } catch (err) {
      console.error("Supabase connection error:", err);
    }
  }

  // 2. Forward to Webhook if configured
  const webhook = process.env.BRIEFING_WEBHOOK_URL;
  const apiKey = process.env.BRIEFING_PROVIDER_API_KEY;

  if (webhook && apiKey) {
    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ submissionId, ...data }),
        signal: AbortSignal.timeout(10_000),
      });
      if (!response.ok) throw new Error("Webhook rejected submission");
    } catch (webhookErr) {
      console.error("Webhook notification error:", webhookErr);
    }
  }

  return NextResponse.json({ success: true, submissionId }, { status: 201 });
}
