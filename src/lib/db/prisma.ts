import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
  // eslint-disable-next-line no-var
  var isDbConnectedCache: boolean | null | undefined;
  // eslint-disable-next-line no-var
  var lastDbCheckTime: number | undefined;
}

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/arvano?schema=public";

function createPrismaClient(): PrismaClient {
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({
    adapter,
    // Do not log raw errors to avoid noisy console spam when DB is offline
    log: [],
  });
}

export const prisma = global.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

let warnedOfflineOnce = false;

export async function isDatabaseAvailable(): Promise<boolean> {
  const now = Date.now();
  if (
    global.isDbConnectedCache !== undefined &&
    global.isDbConnectedCache !== null &&
    global.lastDbCheckTime &&
    now - global.lastDbCheckTime < 15000
  ) {
    return global.isDbConnectedCache;
  }

  try {
    await prisma.$queryRaw`SELECT 1`;
    global.isDbConnectedCache = true;
    global.lastDbCheckTime = now;
    return true;
  } catch {
    global.isDbConnectedCache = false;
    global.lastDbCheckTime = now;
    if (!warnedOfflineOnce) {
      console.log(
        "\x1b[33m%s\x1b[0m",
        "ℹ [ARVANO Horology] Local PostgreSQL not detected on port 5432. Running smoothly in Resilient Atelier Demo Mode."
      );
      warnedOfflineOnce = true;
    }
    return false;
  }
}

export default prisma;
