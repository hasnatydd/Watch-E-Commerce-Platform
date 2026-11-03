import { NextResponse } from "next/server";
import { createMembershipSubscription } from "@/services/membership-service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      customerName,
      phone,
      email,
      address,
      planId,
      paymentMethod,
      transactionId,
      senderNumber,
    } = body;

    if (!customerName || !phone || !email || !planId) {
      return NextResponse.json(
        { error: "Please provide your name, phone number, email, and selected plan." },
        { status: 400 }
      );
    }

    if (!transactionId || !senderNumber) {
      return NextResponse.json(
        { error: "Please enter the bKash/Nagad/Rocket Transaction ID (TrxID) and sender number." },
        { status: 400 }
      );
    }

    const member = createMembershipSubscription({
      customerName,
      phone,
      email,
      address,
      planId,
      paymentMethod: paymentMethod || "BKASH",
      transactionId,
      senderNumber,
    });

    return NextResponse.json({
      success: true,
      message: `Congratulations ${customerName}! Welcome to the ARVANO Horology Guild.`,
      member,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create membership." }, { status: 500 });
  }
}
