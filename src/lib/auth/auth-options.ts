import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/prisma";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "ARVANO Account",
      credentials: {
        identifier: { label: "Email or Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          throw new Error("Please enter your email or phone and password.");
        }

        const identifier = credentials.identifier.trim().toLowerCase();

        try {
          // Check database for user by email or phone
          const user = await prisma.user.findFirst({
            where: {
              OR: [
                { email: identifier },
                { phone: credentials.identifier.trim() },
              ],
            },
          });

          if (!user) {
            throw new Error("No account found with these credentials.");
          }

          if (user.status === "SUSPENDED") {
            throw new Error("This account has been suspended. Please contact concierge.");
          }

          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.passwordHash
          );

          if (!isValidPassword) {
            throw new Error("Invalid password. Please verify and try again.");
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error: any) {
          // In case database is temporarily unreachable, check fallback for initial admin
          if (
            process.env.INITIAL_ADMIN_EMAIL &&
            identifier === process.env.INITIAL_ADMIN_EMAIL.toLowerCase() &&
            credentials.password === process.env.INITIAL_ADMIN_PASSWORD
          ) {
            return {
              id: "fallback-super-admin-id",
              name: "ARVANO Super Admin",
              email: process.env.INITIAL_ADMIN_EMAIL,
              role: "SUPER_ADMIN",
            };
          }
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "arvano-luxury-horology-ultra-secure-key-2026-bangladesh",
};
