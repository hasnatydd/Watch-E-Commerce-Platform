import { NextResponse } from "next/server";
import { registerCustomer } from "@/services/user-service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const user = await registerCustomer({ name, email, phone, password });
    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Registration failed. Please try again." },
      { status: 400 }
    );
  }
}
