import fs from "fs";
import path from "path";
import {
  MEMBERSHIP_PLANS,
  MembershipPlan,
  MemberSubscription,
} from "@/lib/data/membership-plans";

export { MEMBERSHIP_PLANS };
export type { MembershipPlan, MemberSubscription };

const DATA_DIR = path.resolve(process.cwd(), "data");
const MEMBERSHIP_FILE = path.join(DATA_DIR, "memberships.json");

const INITIAL_MEMBERS: MemberSubscription[] = [
  {
    id: "mem-1",
    memberId: "ARV-VIP-7001",
    customerName: "Tanvir Chowdhury",
    phone: "01711223344",
    email: "tanvir.c@gmail.com",
    address: "Road 79, Gulshan 2, Dhaka",
    planId: "connoisseur",
    planName: "Connoisseur VIP",
    monthlyFee: 999,
    discountPercentage: 20,
    paymentMethod: "BKASH",
    transactionId: "BLM98234KL1",
    senderNumber: "01711223344",
    status: "ACTIVE",
    joinedAt: "2026-10-15T10:00:00.000Z",
    renewsAt: "2026-11-15T10:00:00.000Z",
    totalSavedBDT: 14250,
  },
  {
    id: "mem-2",
    memberId: "ARV-VIP-7002",
    customerName: "Barrister Shahed Rahman",
    phone: "01844998877",
    email: "shahed.law@gmail.com",
    address: "Banani DOHS, Dhaka",
    planId: "patron",
    planName: "Master Patron",
    monthlyFee: 1999,
    discountPercentage: 30,
    paymentMethod: "BANK_TRANSFER",
    transactionId: "CITY-BEFTN-88129",
    senderNumber: "1501204899001",
    status: "ACTIVE",
    joinedAt: "2026-10-20T12:00:00.000Z",
    renewsAt: "2026-11-20T12:00:00.000Z",
    totalSavedBDT: 20700,
  },
];

let memoryMembers: MemberSubscription[] | null = null;

export function getAllMembers(): MemberSubscription[] {
  if (memoryMembers) return memoryMembers;

  try {
    if (fs.existsSync(MEMBERSHIP_FILE)) {
      const raw = fs.readFileSync(MEMBERSHIP_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryMembers = parsed;
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Failed reading memberships file:", e);
  }

  saveMembers(INITIAL_MEMBERS);
  memoryMembers = INITIAL_MEMBERS;
  return INITIAL_MEMBERS;
}

export function saveMembers(members: MemberSubscription[]): void {
  try {
    memoryMembers = members;
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(MEMBERSHIP_FILE, JSON.stringify(members, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed saving memberships file:", e);
  }
}

export function createMembershipSubscription(input: {
  customerName: string;
  phone: string;
  email: string;
  address?: string;
  planId: "collector" | "connoisseur" | "patron";
  paymentMethod: string;
  transactionId: string;
  senderNumber: string;
}): MemberSubscription {
  const plan = MEMBERSHIP_PLANS.find((p) => p.id === input.planId) || MEMBERSHIP_PLANS[1];
  const members = getAllMembers();

  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  const memberId = `ARV-VIP-${randomDigits}`;

  const now = new Date();
  const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  const newSub: MemberSubscription = {
    id: `mem-${Date.now()}`,
    memberId,
    customerName: input.customerName.trim(),
    phone: input.phone.trim(),
    email: input.email.trim(),
    address: input.address?.trim() || "",
    planId: plan.id,
    planName: plan.name,
    monthlyFee: plan.monthlyFee,
    discountPercentage: plan.discountPercentage,
    paymentMethod: input.paymentMethod,
    transactionId: input.transactionId.trim(),
    senderNumber: input.senderNumber.trim(),
    status: "ACTIVE",
    joinedAt: now.toISOString(),
    renewsAt: nextMonth.toISOString(),
    totalSavedBDT: 0,
  };

  members.unshift(newSub);
  saveMembers(members);
  return newSub;
}

export function verifyMemberDiscount(query: string): {
  isMember: boolean;
  member?: MemberSubscription;
  discountPercentage: number;
} {
  const cleanQuery = query.trim().replace(/[^a-zA-Z0-9-]/g, "");
  const members = getAllMembers();

  const found = members.find(
    (m) =>
      m.status === "ACTIVE" &&
      (m.memberId.toLowerCase() === cleanQuery.toLowerCase() ||
        m.phone.replace(/[^0-9]/g, "") === cleanQuery.replace(/[^0-9]/g, ""))
  );

  if (found) {
    return {
      isMember: true,
      member: found,
      discountPercentage: found.discountPercentage,
    };
  }

  return {
    isMember: false,
    discountPercentage: 0,
  };
}

export function recordMemberSavings(memberId: string, savedAmount: number) {
  const members = getAllMembers();
  const idx = members.findIndex((m) => m.memberId === memberId || m.id === memberId);
  if (idx >= 0) {
    members[idx].totalSavedBDT += Math.round(savedAmount);
    saveMembers(members);
  }
}

export function updateMemberStatus(id: string, status: "ACTIVE" | "PENDING_VERIFICATION" | "EXPIRED") {
  const members = getAllMembers();
  const idx = members.findIndex((m) => m.id === id || m.memberId === id);
  if (idx >= 0) {
    members[idx].status = status;
    saveMembers(members);
    return members[idx];
  }
  return null;
}
