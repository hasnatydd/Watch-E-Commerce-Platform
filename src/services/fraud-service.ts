import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.resolve(process.cwd(), "data");
const BLACKLIST_FILE = path.join(DATA_DIR, "fraud-blacklist.json");

export interface BlacklistEntry {
  id: string;
  phone: string;
  customerName?: string;
  reason: string;
  blockedAt: string;
  riskScore: number;
}

const INITIAL_BLACKLIST: BlacklistEntry[] = [
  {
    id: "bl-1",
    phone: "01999887766",
    customerName: "Unknown Guest",
    reason: "High-value COD parcel refusal history & fraudulent order spam",
    blockedAt: "2026-10-28T14:30:00.000Z",
    riskScore: 95,
  },
  {
    id: "bl-2",
    phone: "01811990011",
    customerName: "Fake Bot Order",
    reason: "Automated script rapid-fire checkout spam (5 attempts in 2 min)",
    blockedAt: "2026-10-30T18:15:00.000Z",
    riskScore: 90,
  },
];

let memoryBlacklist: BlacklistEntry[] | null = null;

export function getBlacklist(): BlacklistEntry[] {
  if (memoryBlacklist) return memoryBlacklist;

  try {
    if (fs.existsSync(BLACKLIST_FILE)) {
      const raw = fs.readFileSync(BLACKLIST_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        memoryBlacklist = parsed;
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Failed reading blacklist file:", e);
  }

  saveBlacklist(INITIAL_BLACKLIST);
  memoryBlacklist = INITIAL_BLACKLIST;
  return INITIAL_BLACKLIST;
}

export function saveBlacklist(entries: BlacklistEntry[]): void {
  try {
    memoryBlacklist = entries;
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(BLACKLIST_FILE, JSON.stringify(entries, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed saving blacklist:", e);
  }
}

export function addToBlacklist(entry: Omit<BlacklistEntry, "id" | "blockedAt">): BlacklistEntry {
  const current = getBlacklist();
  const existingIdx = current.findIndex((b) => b.phone.trim() === entry.phone.trim());

  const newEntry: BlacklistEntry = {
    id: `bl-${Date.now()}`,
    phone: entry.phone.trim(),
    customerName: entry.customerName || "Flagged Customer",
    reason: entry.reason || "Manual admin fraud blacklist flag",
    blockedAt: new Date().toISOString(),
    riskScore: entry.riskScore || 90,
  };

  if (existingIdx >= 0) {
    current[existingIdx] = newEntry;
  } else {
    current.unshift(newEntry);
  }

  saveBlacklist(current);
  return newEntry;
}

export function removeFromBlacklist(phoneOrId: string): boolean {
  const current = getBlacklist();
  const filtered = current.filter((b) => b.id !== phoneOrId && b.phone !== phoneOrId);
  if (filtered.length !== current.length) {
    saveBlacklist(filtered);
    return true;
  }
  return false;
}

export function isPhoneBlacklisted(phone: string): boolean {
  const current = getBlacklist();
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  return current.some((b) => b.phone.replace(/[^0-9]/g, "") === cleanPhone);
}
