import { NextResponse } from "next/server";
import { verifyMemberDiscount } from "@/services/membership-service";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ isMember: false, discountPercentage: 0 });
  }

  const result = verifyMemberDiscount(query);
  return NextResponse.json(result);
}
