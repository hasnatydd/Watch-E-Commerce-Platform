const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const bcrypt = require("bcryptjs");

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/arvano?schema=public";
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting ARVANO database seed...");

  // 1. Super Admin
  const adminEmail = process.env.INITIAL_ADMIN_EMAIL || "admin@arvano.com";
  const adminPassword = process.env.INITIAL_ADMIN_PASSWORD || "ArvanoSuperAdmin2026!#";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  const superAdmin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash,
      role: "SUPER_ADMIN",
      status: "ACTIVE",
    },
    create: {
      name: "ARVANO Executive Admin",
      email: adminEmail,
      phone: "+8801700000001",
      passwordHash,
      role: "SUPER_ADMIN",
      status: "ACTIVE",
      isVerified: true,
    },
  });
  console.log(`✓ Super Admin created / verified: ${superAdmin.email}`);

  // 2. Site Settings
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      siteName: "ARVANO",
      tagline: "TIME. PRESENCE. PRECISION.",
      logoUrl: "/images/arvano-logo.jpg",
      iconUrl: "/images/arvano-icon.jpg",
      contactEmail: "concierge@arvano.com",
      contactPhone: "+880 1700-000000",
      showroomAddress: "Plot 12, Road 11, Block C, Gulshan 2, Dhaka 1212, Bangladesh",
      facebookUrl: "https://facebook.com/arvano.official",
      instagramUrl: "https://instagram.com/arvano.horology",
      youtubeUrl: "https://youtube.com/@arvano",
      whatsappNumber: "+8801700000000",
      footerText: "ARVANO is an haute horlogerie atelier dedicated to crafting commanding wrist timepieces for those who define their own time.",
      insideDhakaCharge: 80,
      outsideDhakaCharge: 150,
      freeDeliveryThreshold: 10000,
    },
  });
  console.log("✓ Site Settings configured");

  // 3. Payment Methods
  const paymentConfigs = [
    {
      methodKey: "COD",
      displayName: "Cash on Delivery (ক্যাশ অন ডেলিভারি)",
      accountNumber: null,
      instructions: "Pay with cash upon delivery. For orders outside Dhaka, a courier advance fee of ৳150 may be verified by our concierge.",
      requiresTransactionId: false,
      requiresSenderNumber: false,
      isActive: true,
      displayOrder: 1,
      minAdvanceFee: 150,
    },
    {
      methodKey: "BKASH",
      displayName: "bKash (বিকাশ সেন্ড মানি)",
      accountNumber: "01711-234567 (Personal)",
      instructions: "1. Go to your bKash app and select 'Send Money'.\n2. Send the exact amount to the bKash number shown.\n3. Enter your Order Number in the Reference field.\n4. Input the TrxID and your bKash number below.",
      requiresTransactionId: true,
      requiresSenderNumber: true,
      isActive: true,
      displayOrder: 2,
    },
    {
      methodKey: "NAGAD",
      displayName: "Nagad (নগদ সেন্ড মানি)",
      accountNumber: "01811-234567 (Personal)",
      instructions: "1. Open your Nagad app or dial *167#.\n2. Choose 'Send Money' to the Nagad number shown.\n3. Submit your 8-digit Transaction ID and Sender Number.",
      requiresTransactionId: true,
      requiresSenderNumber: true,
      isActive: true,
      displayOrder: 3,
    },
    {
      methodKey: "ROCKET",
      displayName: "Rocket (রকেট সেন্ড মানি)",
      accountNumber: "01911-234567-8 (Personal)",
      instructions: "1. Open Rocket app or dial *322#.\n2. Send Money to the Rocket number.\n3. Enter your TrxID below.",
      requiresTransactionId: true,
      requiresSenderNumber: true,
      isActive: true,
      displayOrder: 4,
    },
    {
      methodKey: "BANK_TRANSFER",
      displayName: "Direct Bank Transfer (ব্যাংক ডিপোজিট)",
      accountNumber: "A/C Name: ARVANO Horology BD | A/C: 1501204899001 | Bank: City Bank PLC | Branch: Gulshan 2 | Routing: 225272654",
      instructions: "Transfer grand total via BEFTN/NPSB. Input your Deposit Slip / Transfer Reference number below.",
      requiresTransactionId: true,
      requiresSenderNumber: false,
      isActive: true,
      displayOrder: 5,
    },
  ];

  for (const cfg of paymentConfigs) {
    await prisma.paymentMethodConfig.upsert({
      where: { methodKey: cfg.methodKey },
      update: cfg,
      create: cfg,
    });
  }
  console.log("✓ Payment Method configurations seeded");

  // 4. Coupons
  await prisma.coupon.upsert({
    where: { code: "ARVANO10" },
    update: {},
    create: {
      code: "ARVANO10",
      type: "PERCENTAGE",
      value: 10,
      minOrderValue: 15000,
      maxDiscount: 3000,
      isActive: true,
      usageLimit: 500,
    },
  });

  await prisma.coupon.upsert({
    where: { code: "TIMELESS1000" },
    update: {},
    create: {
      code: "TIMELESS1000",
      type: "FIXED",
      value: 1000,
      minOrderValue: 20000,
      isActive: true,
      usageLimit: 200,
    },
  });
  console.log("✓ Promotional Coupons seeded");

  // 5. Homepage Hero Slides
  const heroSlide = await prisma.homepageSlide.findFirst({
    where: { title: "TIME, DEFINED BY CHARACTER." },
  });

  if (!heroSlide) {
    await prisma.homepageSlide.create({
      data: {
        eyebrow: "THE ARVANO COLLECTION",
        title: "TIME, DEFINED BY CHARACTER.",
        subtitle: "TIME. PRESENCE. PRECISION.",
        description: "Discover considered design, refined details, and a more personal approach to time. Engineered for commanding presence.",
        ctaText: "EXPLORE COLLECTION",
        ctaUrl: "/shop",
        imageUrl: "/images/watches/chronograph-speedmaster.jpg",
        displayOrder: 1,
        isActive: true,
      },
    });
    console.log("✓ Homepage Hero slide created");
  }

  console.log("✓ Database seeding complete!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
