import { NextResponse } from "next/server";
import { MEMBERSHIP_PLANS } from "@/services/membership-service";

export async function GET() {
  return NextResponse.json({ plans: MEMBERSHIP_PLANS });
}
