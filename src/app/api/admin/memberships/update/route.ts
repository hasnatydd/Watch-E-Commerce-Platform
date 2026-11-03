import { NextResponse } from "next/server";
import { updateMemberStatus } from "@/services/membership-service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Member ID and status are required." }, { status: 400 });
    }

    const updated = updateMemberStatus(id, status);
    return NextResponse.json({ success: true, member: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
