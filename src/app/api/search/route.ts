import { NextResponse } from "next/server";
import { getProducts } from "@/services/product-service";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  if (!q.trim()) {
    return NextResponse.json({ products: [] });
  }

  const products = await getProducts({ search: q, limit: 10 });
  return NextResponse.json({ products });
}
