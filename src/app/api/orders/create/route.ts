import { NextResponse } from "next/server";
import { createOrder } from "@/services/order-service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      customerName,
      phone,
      email,
      division,
      district,
      thana,
      fullAddress,
      paymentMethod,
      transactionId,
      senderNumber,
      customerNotes,
      items,
      couponCode,
      idempotencyKey,
      userId,
    } = body;

    if (!customerName || !phone || !division || !district || !thana || !fullAddress) {
      return NextResponse.json(
        { error: "Please fill in all required shipping fields." },
        { status: 400 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Your shopping bag is empty." },
        { status: 400 }
      );
    }

    const result = await createOrder({
      customerName,
      phone,
      email,
      division,
      district,
      thana,
      fullAddress,
      paymentMethod,
      transactionId,
      senderNumber,
      customerNotes,
      items,
      couponCode,
      idempotencyKey,
      userId,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error("Order API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to place order. Please try again." },
      { status: 500 }
    );
  }
}
