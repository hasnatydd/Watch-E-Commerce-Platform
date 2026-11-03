import { NextResponse } from "next/server";
import { validateCoupon } from "@/services/coupon-service";

export async function POST(req: Request) {
  try {
    const { code, subtotal } = await req.json();

    if (!code) {
      return NextResponse.json(
        { error: "Please enter a valid coupon code." },
        { status: 400 }
      );
    }

    const numericSubtotal = Number(subtotal) || 0;
    const result = await validateCoupon(code, numericSubtotal);

    if (!result.valid) {
      return NextResponse.json(
        { error: result.error || "Invalid coupon code or expired." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      valid: true,
      code: result.code,
      discountAmount: result.discountAmount,
      type: result.type,
      coupon: result.coupon,
    });
  } catch (error: any) {
    console.error("Coupon validation error:", error);
    return NextResponse.json(
      { error: "Coupon verification service unavailable. Please try again." },
      { status: 500 }
    );
  }
}
