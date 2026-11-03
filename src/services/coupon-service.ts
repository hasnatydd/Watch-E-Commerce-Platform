import fs from "fs";
import path from "path";
import { prisma, isDatabaseAvailable } from "@/lib/db/prisma";

export interface CouponItem {
  id: string;
  code: string;
  type: "PERCENTAGE" | "FIXED";
  value: number;
  minOrderValue: number | null;
  maxDiscount: number | null;
  startDate: string | null;
  endDate: string | null;
  usageLimit: number | null;
  usedCount: number;
  perCustomerLimit: number;
  isActive: boolean;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
}

const DATA_DIR = path.resolve(process.cwd(), "data");
const COUPONS_FILE = path.join(DATA_DIR, "coupons.json");

const DEFAULT_COUPONS: CouponItem[] = [
  {
    id: "coup-1",
    code: "ARVANO10",
    type: "PERCENTAGE",
    value: 10,
    minOrderValue: 15000,
    maxDiscount: 3000,
    startDate: "2026-01-01T00:00:00.000Z",
    endDate: "2026-12-31T23:59:59.000Z",
    usageLimit: 100,
    usedCount: 14,
    perCustomerLimit: 1,
    isActive: true,
    description: "Welcome privilege: 10% off purchases over ৳15,000",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "coup-2",
    code: "TIMELESS1000",
    type: "FIXED",
    value: 1000,
    minOrderValue: 20000,
    maxDiscount: null,
    startDate: "2026-01-01T00:00:00.000Z",
    endDate: "2026-12-31T23:59:59.000Z",
    usageLimit: 50,
    usedCount: 8,
    perCustomerLimit: 1,
    isActive: true,
    description: "Flat ৳1,000 instant reduction on flagship acquisitions",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "coup-3",
    code: "NOVELTY2500",
    type: "FIXED",
    value: 2500,
    minOrderValue: 30000,
    maxDiscount: null,
    startDate: "2026-02-01T00:00:00.000Z",
    endDate: "2026-12-31T23:59:59.000Z",
    usageLimit: 30,
    usedCount: 5,
    perCustomerLimit: 1,
    isActive: true,
    description: "High-tier novelty reward voucher for master complications",
    createdAt: "2026-02-01T00:00:00.000Z",
    updatedAt: "2026-02-01T00:00:00.000Z",
  },
];

let memoryCoupons: CouponItem[] | null = null;

function loadFileCoupons(): CouponItem[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(COUPONS_FILE)) {
      fs.writeFileSync(COUPONS_FILE, JSON.stringify(DEFAULT_COUPONS, null, 2), "utf-8");
      return DEFAULT_COUPONS;
    }
    const data = fs.readFileSync(COUPONS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading coupons file:", err);
    return DEFAULT_COUPONS;
  }
}

function saveFileCoupons(coupons: CouponItem[]): void {
  try {
    memoryCoupons = coupons;
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(COUPONS_FILE, JSON.stringify(coupons, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving coupons file:", err);
  }
}

export async function getAllCoupons(): Promise<CouponItem[]> {
  if (await isDatabaseAvailable()) {
    try {
      const dbCoupons = await prisma.coupon.findMany({
        orderBy: { createdAt: "desc" },
      });
      if (dbCoupons && dbCoupons.length > 0) {
        return dbCoupons.map((c) => ({
          id: c.id,
          code: c.code,
          type: c.type as "PERCENTAGE" | "FIXED",
          value: Number(c.value),
          minOrderValue: c.minOrderValue ? Number(c.minOrderValue) : null,
          maxDiscount: c.maxDiscount ? Number(c.maxDiscount) : null,
          startDate: c.startDate ? c.startDate.toISOString() : null,
          endDate: c.endDate ? c.endDate.toISOString() : null,
          usageLimit: c.usageLimit,
          usedCount: c.usedCount,
          perCustomerLimit: c.perCustomerLimit,
          isActive: c.isActive,
          description: null,
          createdAt: c.createdAt.toISOString(),
          updatedAt: c.updatedAt.toISOString(),
        }));
      }
    } catch (err) {
      console.warn("DB coupon fetch failed, using local store:", err);
    }
  }

  if (!memoryCoupons) {
    memoryCoupons = loadFileCoupons();
  }
  return memoryCoupons;
}

export interface CreateCouponInput {
  code: string;
  type: "PERCENTAGE" | "FIXED";
  value: number;
  minOrderValue?: number | null;
  maxDiscount?: number | null;
  startDate?: string | null;
  endDate?: string | null;
  usageLimit?: number | null;
  perCustomerLimit?: number;
  description?: string | null;
  isActive?: boolean;
}

export async function createCoupon(input: CreateCouponInput): Promise<CouponItem> {
  const cleanCode = input.code.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, "");
  if (!cleanCode) {
    throw new Error("Invalid coupon code format. Use letters and numbers.");
  }

  const coupons = await getAllCoupons();
  if (coupons.some((c) => c.code === cleanCode)) {
    throw new Error(`Coupon code '${cleanCode}' already exists.`);
  }

  const now = new Date().toISOString();
  const newCoupon: CouponItem = {
    id: `coup-${Date.now()}`,
    code: cleanCode,
    type: input.type,
    value: Number(input.value),
    minOrderValue: input.minOrderValue !== undefined && input.minOrderValue !== null ? Number(input.minOrderValue) : null,
    maxDiscount: input.type === "PERCENTAGE" && input.maxDiscount !== undefined && input.maxDiscount !== null ? Number(input.maxDiscount) : null,
    startDate: input.startDate || now,
    endDate: input.endDate || null,
    usageLimit: input.usageLimit ? Number(input.usageLimit) : null,
    usedCount: 0,
    perCustomerLimit: input.perCustomerLimit || 1,
    isActive: input.isActive !== undefined ? input.isActive : true,
    description: input.description?.trim() || null,
    createdAt: now,
    updatedAt: now,
  };

  // Try saving to DB if online
  if (await isDatabaseAvailable()) {
    try {
      await prisma.coupon.create({
        data: {
          code: newCoupon.code,
          type: newCoupon.type,
          value: newCoupon.value,
          minOrderValue: newCoupon.minOrderValue,
          maxDiscount: newCoupon.maxDiscount,
          startDate: newCoupon.startDate ? new Date(newCoupon.startDate) : undefined,
          endDate: newCoupon.endDate ? new Date(newCoupon.endDate) : undefined,
          usageLimit: newCoupon.usageLimit,
          usedCount: 0,
          perCustomerLimit: newCoupon.perCustomerLimit,
          isActive: newCoupon.isActive,
        },
      });
    } catch (dbErr) {
      console.warn("DB coupon insert failed, saving to file fallback:", dbErr);
    }
  }

  const fileCoupons = loadFileCoupons();
  fileCoupons.unshift(newCoupon);
  saveFileCoupons(fileCoupons);

  return newCoupon;
}

export async function toggleCouponStatus(idOrCode: string): Promise<CouponItem | null> {
  const fileCoupons = loadFileCoupons();
  const target = fileCoupons.find(
    (c) => c.id === idOrCode || c.code.toUpperCase() === idOrCode.toUpperCase()
  );

  if (!target) return null;

  target.isActive = !target.isActive;
  target.updatedAt = new Date().toISOString();

  if (await isDatabaseAvailable()) {
    try {
      await prisma.coupon.updateMany({
        where: { code: target.code },
        data: { isActive: target.isActive },
      });
    } catch (e) {
      console.warn("DB toggle failed:", e);
    }
  }

  saveFileCoupons(fileCoupons);
  return target;
}

export async function deleteCoupon(idOrCode: string): Promise<boolean> {
  let fileCoupons = loadFileCoupons();
  const target = fileCoupons.find(
    (c) => c.id === idOrCode || c.code.toUpperCase() === idOrCode.toUpperCase()
  );

  if (!target) return false;

  fileCoupons = fileCoupons.filter((c) => c.id !== target.id && c.code !== target.code);

  if (await isDatabaseAvailable()) {
    try {
      await prisma.coupon.deleteMany({
        where: { code: target.code },
      });
    } catch (e) {
      console.warn("DB coupon delete failed:", e);
    }
  }

  saveFileCoupons(fileCoupons);
  return true;
}

export async function validateCoupon(
  code: string,
  subtotal: number
): Promise<{
  valid: boolean;
  code?: string;
  type?: "PERCENTAGE" | "FIXED";
  discountAmount: number;
  error?: string;
  coupon?: CouponItem;
}> {
  if (!code) {
    return { valid: false, discountAmount: 0, error: "Please enter a promo code." };
  }

  const cleanCode = code.trim().toUpperCase();
  const coupons = await getAllCoupons();
  const coupon = coupons.find((c) => c.code === cleanCode);

  if (!coupon) {
    return { valid: false, discountAmount: 0, error: `Invalid coupon code '${cleanCode}'.` };
  }

  if (!coupon.isActive) {
    return { valid: false, discountAmount: 0, error: "This promo code is currently inactive." };
  }

  const now = new Date();
  if (coupon.startDate && new Date(coupon.startDate) > now) {
    return { valid: false, discountAmount: 0, error: "This promo code has not started yet." };
  }

  if (coupon.endDate && new Date(coupon.endDate) < now) {
    return { valid: false, discountAmount: 0, error: "This promo code has expired." };
  }

  if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
    return { valid: false, discountAmount: 0, error: "This coupon has reached its maximum redemption limit." };
  }

  if (coupon.minOrderValue && subtotal < coupon.minOrderValue) {
    return {
      valid: false,
      discountAmount: 0,
      error: `Minimum order spend of ৳${coupon.minOrderValue.toLocaleString()} required for ${coupon.code}.`,
    };
  }

  let discount = 0;
  if (coupon.type === "PERCENTAGE") {
    discount = Math.round((subtotal * coupon.value) / 100);
    if (coupon.maxDiscount && discount > coupon.maxDiscount) {
      discount = coupon.maxDiscount;
    }
  } else {
    discount = Math.min(subtotal, coupon.value);
  }

  return {
    valid: true,
    code: coupon.code,
    type: coupon.type,
    discountAmount: discount,
    coupon,
  };
}

export async function recordCouponUsage(code: string, discountAmount: number): Promise<void> {
  const cleanCode = code.trim().toUpperCase();
  const fileCoupons = loadFileCoupons();
  const coupon = fileCoupons.find((c) => c.code === cleanCode);

  if (coupon) {
    coupon.usedCount = (coupon.usedCount || 0) + 1;
    coupon.updatedAt = new Date().toISOString();
    saveFileCoupons(fileCoupons);
  }

  if (await isDatabaseAvailable()) {
    try {
      await prisma.coupon.updateMany({
        where: { code: cleanCode },
        data: { usedCount: { increment: 1 } },
      });
    } catch (e) {
      console.warn("DB usage increment failed:", e);
    }
  }
}
