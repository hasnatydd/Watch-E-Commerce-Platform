import { NextResponse } from "next/server";
import {
  getBlacklist,
  addToBlacklist,
  removeFromBlacklist,
} from "@/services/fraud-service";

export async function GET() {
  try {
    const blacklist = getBlacklist();
    return NextResponse.json({ blacklist });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, phone, customerName, reason, riskScore, id } = body;

    if (action === "BLACKLIST") {
      if (!phone) {
        return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
      }
      const entry = addToBlacklist({
        phone,
        customerName,
        reason: reason || "Flagged in fraud review as fake order or abusive checkout",
        riskScore: riskScore || 85,
      });
      return NextResponse.json({ success: true, message: `Phone ${phone} blacklisted.`, entry });
    }

    if (action === "UNBLACKLIST") {
      const target = id || phone;
      if (!target) {
        return NextResponse.json({ error: "Target identifier required." }, { status: 400 });
      }
      const removed = removeFromBlacklist(target);
      return NextResponse.json({ success: true, message: `Removed from blacklist.`, removed });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
