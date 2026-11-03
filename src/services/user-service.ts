import { prisma } from "@/lib/db/prisma";
import bcrypt from "bcryptjs";

export async function registerCustomer(data: {
  name: string;
  email: string;
  phone?: string;
  password: string;
}) {
  const { name, email, phone, password } = data;
  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email: normalizedEmail },
        ...(phone ? [{ phone: phone.trim() }] : []),
      ],
    },
  });

  if (existingUser) {
    throw new Error("An account already exists with this email or phone number.");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const newUser = await prisma.user.create({
    data: {
      name: name.trim(),
      email: normalizedEmail,
      phone: phone ? phone.trim() : null,
      passwordHash,
      role: "CUSTOMER",
      status: "ACTIVE",
    },
  });

  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
  };
}

export async function getUserProfile(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      addresses: { orderBy: { isDefault: "desc" } },
      orders: {
        orderBy: { createdAt: "desc" },
        include: { items: true },
      },
    },
  });
}
