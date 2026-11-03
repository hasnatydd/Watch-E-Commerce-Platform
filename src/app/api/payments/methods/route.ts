import { NextResponse } from "next/server";
import { getPaymentMethodConfigs, getAllPaymentConfigsAdmin } from "@/services/payment-service";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all") === "true";
    const methods = all
      ? await getAllPaymentConfigsAdmin()
      : await getPaymentMethodConfigs();
    return NextResponse.json({ methods });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load payment methods" }, { status: 500 });
  }
}
