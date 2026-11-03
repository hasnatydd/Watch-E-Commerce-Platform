import { NextResponse } from "next/server";
import { getAllMembers } from "@/services/membership-service";

export async function GET() {
  try {
    const members = getAllMembers();
    return NextResponse.json({ members });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
