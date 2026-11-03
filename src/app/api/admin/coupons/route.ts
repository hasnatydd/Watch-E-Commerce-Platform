import { NextResponse } from "next/server";
import {
  getAllCoupons,
  createCoupon,
  toggleCouponStatus,
  deleteCoupon,
} from "@/services/coupon-service";

export async function GET() {
  try {
    const coupons = await getAllCoupons();

    const activeCount = coupons.filter((c) => c.isActive).length;
    const totalRedemptions = coupons.reduce((sum, c) => sum + (c.usedCount || 0), 0);

    return NextResponse.json({
      coupons,
      metrics: {
        totalCoupons: coupons.length,
        activeCount,
        totalRedemptions,
      },
    });
  } catch (error: any) {
    console.error("GET coupons error:", error);
    return NextResponse.json({ error: error.message || "Failed fetching coupons" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      code,
      type,
      value,
      minOrderValue,
      maxDiscount,
      startDate,
      endDate,
      usageLimit,
      perCustomerLimit,
      description,
      isActive,
    } = body;

    if (!code || !code.trim()) {
      return NextResponse.json({ error: "Coupon code is required." }, { status: 400 });
    }

    if (!value || Number(value) <= 0) {
      return NextResponse.json({ error: "Please specify a positive discount value." }, { status: 400 });
    }

    if (type === "PERCENTAGE" && Number(value) > 100) {
      return NextResponse.json({ error: "Percentage discount cannot exceed 100%." }, { status: 400 });
    }

    const created = await createCoupon({
      code,
      type: type || "PERCENTAGE",
      value: Number(value),
      minOrderValue: minOrderValue ? Number(minOrderValue) : null,
      maxDiscount: maxDiscount ? Number(maxDiscount) : null,
      startDate: startDate || null,
      endDate: endDate || null,
      usageLimit: usageLimit ? Number(usageLimit) : null,
      perCustomerLimit: perCustomerLimit ? Number(perCustomerLimit) : 1,
      description: description || null,
      isActive: isActive !== undefined ? Boolean(isActive) : true,
    });

    return NextResponse.json({ success: true, coupon: created }, { status: 201 });
  } catch (error: any) {
    console.error("POST coupon error:", error);
    return NextResponse.json({ error: error.message || "Failed to create coupon" }, { status: 400 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id") || "";
    const action = searchParams.get("action");

    if (action === "toggle" && id) {
      const updated = await toggleCouponStatus(id);
      if (!updated) {
        return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, coupon: updated });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed updating coupon" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id") || "";

    if (!id) {
      return NextResponse.json({ error: "Coupon identifier required" }, { status: 400 });
    }

    const deleted = await deleteCoupon(id);
    if (!deleted) {
      return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Coupon deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed deleting coupon" }, { status: 500 });
  }
}
