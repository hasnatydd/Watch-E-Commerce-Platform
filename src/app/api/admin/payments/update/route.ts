import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { updatePaymentConfig } from "@/services/payment-service";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role;

    // Check admin authorization for live hosted deployments
    if (process.env.VERCEL === "1") {
      if (userRole !== "SUPER_ADMIN" && userRole !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized access." }, { status: 403 });
      }
    }

    const body = await req.json();
    const {
      methodKey,
      displayName,
      accountNumber,
      instructions,
      isActive,
      requiresTransactionId,
      requiresSenderNumber,
      minAdvanceFee,
    } = body;

    if (!methodKey) {
      return NextResponse.json({ error: "Method key is required." }, { status: 400 });
    }

    const updated = await updatePaymentConfig(methodKey, {
      displayName,
      accountNumber,
      instructions,
      isActive,
      requiresTransactionId,
      requiresSenderNumber,
      minAdvanceFee,
    });

    return NextResponse.json({ success: true, config: updated });
  } catch (error: any) {
    console.error("Payment update API error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update payment setting." },
      { status: 500 }
    );
  }
}
