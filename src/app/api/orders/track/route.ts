import { NextResponse } from "next/server";
import { getOrderByNumber } from "@/services/order-service";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderNumber = searchParams.get("orderNumber");
  const phone = searchParams.get("phone") || undefined;

  if (!orderNumber) {
    return NextResponse.json({ error: "Order number is required." }, { status: 400 });
  }

  const order = await getOrderByNumber(orderNumber, phone);

  if (!order) {
    return NextResponse.json({ error: "No matching order found." }, { status: 404 });
  }

  return NextResponse.json({ order });
}
