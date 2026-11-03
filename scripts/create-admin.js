const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const bcrypt = require("bcryptjs");
const readline = require("readline");

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/arvano?schema=public";
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function run() {
  console.log("==========================================");
  console.log("  ARVANO — SUPER ADMIN PROVISIONING CLI   ");
  console.log("==========================================");

  try {
    const name = (await question("Enter Admin Full Name [ARVANO Super Admin]: ")) || "ARVANO Super Admin";
    const email = (await question("Enter Admin Email [admin@arvano.com]: ")) || "admin@arvano.com";
    const phone = (await question("Enter Admin Phone [+8801700000001]: ")) || "+8801700000001";
    const password = await question("Enter Strong Admin Password (min 8 chars): ");

    if (!password || password.length < 8) {
      console.error("Error: Password must be at least 8 characters long.");
      process.exit(1);
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.upsert({
      where: { email: email.trim().toLowerCase() },
      update: {
        name,
        phone,
        passwordHash,
        role: "SUPER_ADMIN",
        status: "ACTIVE",
        isVerified: true,
      },
      create: {
        name,
        email: email.trim().toLowerCase(),
        phone,
        passwordHash,
        role: "SUPER_ADMIN",
        status: "ACTIVE",
        isVerified: true,
      },
    });

    console.log("\n✓ SUPER_ADMIN account successfully created/updated!");
    console.log(`ID:    ${user.id}`);
    console.log(`Email: ${user.email}`);
    console.log(`Role:  ${user.role}`);
    console.log(`Status: ${user.status}`);
  } catch (error) {
    console.error("Provisioning failed:", error);
  } finally {
    rl.close();
    await prisma.$disconnect();
  }
}

run();
