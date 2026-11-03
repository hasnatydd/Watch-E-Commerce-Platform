import fs from "node:fs";
import path from "node:path";
import { prisma, isDatabaseAvailable } from "@/lib/db/prisma";
import { INITIAL_PAYMENT_CONFIGS } from "@/lib/data/initial-catalog";
import { PaymentMethod } from "@prisma/client";

const DATA_DIR = path.resolve(process.cwd(), "data");
const CONFIG_FILE_PATH = path.join(DATA_DIR, "payment-configs.json");

// In-memory runtime cache to ensure instant reactivity across requests
let memoryCache: any[] | null = null;

function loadStoredConfigs(): any[] {
  if (memoryCache && memoryCache.length > 0) {
    return memoryCache;
  }

  try {
    if (fs.existsSync(CONFIG_FILE_PATH)) {
      const raw = fs.readFileSync(CONFIG_FILE_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryCache = parsed;
        return parsed;
      }
    }
  } catch (err) {
    console.warn("Notice: reading payment configs file fallback:", err);
  }

  // Pre-populate with initial configs
  memoryCache = INITIAL_PAYMENT_CONFIGS.map((c, i) => ({
    id: `cfg-${c.methodKey.toLowerCase()}`,
    ...c,
  }));
  return memoryCache;
}

function saveStoredConfigs(configs: any[]): void {
  try {
    memoryCache = configs;
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(configs, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed saving payment configs file:", err);
  }
}

export async function getPaymentMethodConfigs() {
  if (await isDatabaseAvailable()) {
    try {
      const configs = await prisma.paymentMethodConfig.findMany({
        where: { isActive: true },
        orderBy: { displayOrder: "asc" },
      });

      if (configs && configs.length > 0) {
        return configs.map((c) => ({
          id: c.id,
          methodKey: c.methodKey,
          displayName: c.displayName,
          accountNumber: c.accountNumber,
          instructions: c.instructions,
          logoUrl: c.logoUrl,
          requiresTransactionId: c.requiresTransactionId,
          requiresSenderNumber: c.requiresSenderNumber,
          isActive: c.isActive,
          displayOrder: c.displayOrder,
          minAdvanceFee: c.minAdvanceFee ? Number(c.minAdvanceFee) : null,
        }));
      }
    } catch {
      // fallback
    }
  }

  const stored = loadStoredConfigs();
  return stored.filter((c) => c.isActive !== false);
}

export async function getAllPaymentConfigsAdmin() {
  if (await isDatabaseAvailable()) {
    try {
      const configs = await prisma.paymentMethodConfig.findMany({
        orderBy: { displayOrder: "asc" },
      });
      if (configs && configs.length > 0) {
        return configs.map((c) => ({
          id: c.id,
          methodKey: c.methodKey,
          displayName: c.displayName,
          accountNumber: c.accountNumber,
          instructions: c.instructions,
          logoUrl: c.logoUrl,
          requiresTransactionId: c.requiresTransactionId,
          requiresSenderNumber: c.requiresSenderNumber,
          isActive: c.isActive,
          displayOrder: c.displayOrder,
          minAdvanceFee: c.minAdvanceFee ? Number(c.minAdvanceFee) : null,
        }));
      }
    } catch {
      // fallback
    }
  }

  return loadStoredConfigs();
}

export async function updatePaymentConfig(
  methodKey: PaymentMethod | string,
  data: {
    displayName?: string;
    accountNumber?: string | null;
    instructions?: string;
    isActive?: boolean;
    requiresTransactionId?: boolean;
    requiresSenderNumber?: boolean;
    minAdvanceFee?: number | null;
  }
) {
  let dbResult: any = null;

  // 1. If database is available, attempt Prisma upsert
  if (await isDatabaseAvailable()) {
    try {
      dbResult = await prisma.paymentMethodConfig.upsert({
        where: { methodKey: methodKey as PaymentMethod },
        update: {
          ...data,
          minAdvanceFee: data.minAdvanceFee !== undefined ? data.minAdvanceFee : undefined,
        },
        create: {
          methodKey: methodKey as PaymentMethod,
          displayName: data.displayName || (methodKey as string),
          accountNumber: data.accountNumber,
          instructions: data.instructions || "",
          isActive: data.isActive !== undefined ? data.isActive : true,
          requiresTransactionId: data.requiresTransactionId ?? true,
          requiresSenderNumber: data.requiresSenderNumber ?? true,
          minAdvanceFee: data.minAdvanceFee,
        },
      });
    } catch (dbErr: any) {
      console.warn("Database upsert skipped/failed, smoothly persisting to local Atelier store:", dbErr?.message || dbErr);
    }
  }

  // 2. Always persist locally so changes immediately take effect and survive restarts
  const currentList = loadStoredConfigs();
  const existingIdx = currentList.findIndex((c) => c.methodKey === methodKey);

  const updatedItem = {
    id: dbResult?.id || currentList[existingIdx]?.id || `cfg-${String(methodKey).toLowerCase()}`,
    methodKey,
    displayName: data.displayName !== undefined ? data.displayName : currentList[existingIdx]?.displayName || methodKey,
    accountNumber: data.accountNumber !== undefined ? data.accountNumber : currentList[existingIdx]?.accountNumber,
    instructions: data.instructions !== undefined ? data.instructions : currentList[existingIdx]?.instructions || "",
    isActive: data.isActive !== undefined ? data.isActive : (currentList[existingIdx]?.isActive ?? true),
    requiresTransactionId:
      data.requiresTransactionId !== undefined
        ? data.requiresTransactionId
        : (currentList[existingIdx]?.requiresTransactionId ?? true),
    requiresSenderNumber:
      data.requiresSenderNumber !== undefined
        ? data.requiresSenderNumber
        : (currentList[existingIdx]?.requiresSenderNumber ?? true),
    displayOrder: currentList[existingIdx]?.displayOrder || 1,
    minAdvanceFee: data.minAdvanceFee !== undefined ? data.minAdvanceFee : currentList[existingIdx]?.minAdvanceFee,
  };

  if (existingIdx >= 0) {
    currentList[existingIdx] = updatedItem;
  } else {
    currentList.push(updatedItem);
  }

  saveStoredConfigs(currentList);

  return dbResult || updatedItem;
}
