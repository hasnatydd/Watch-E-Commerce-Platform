export interface MembershipPlan {
  id: "collector" | "connoisseur" | "patron";
  name: string;
  tierCode: string;
  monthlyFee: number;
  discountPercentage: number;
  badge: string;
  tagline: string;
  perks: string[];
  isPopular?: boolean;
}

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: "collector",
    name: "Collector Circle",
    tierCode: "TIER 01",
    monthlyFee: 499,
    discountPercentage: 15,
    badge: "15% OFF ALL WATCHES",
    tagline: "Designed for passionate enthusiasts starting their curated horology journey.",
    perks: [
      "15% Flat Discount on every wristwatch purchase",
      "Free Insured Express Courier delivery anywhere in Bangladesh",
      "24-Hour early access to limited novelty releases",
      "1 Complimentary annual ultrasonic case & bracelet cleaning",
      "Digital ARVANO Guild Authenticity Certificate",
    ],
  },
  {
    id: "connoisseur",
    name: "Connoisseur VIP",
    tierCode: "TIER 02",
    monthlyFee: 999,
    discountPercentage: 20,
    badge: "20% MASSIVE DISCOUNT",
    tagline: "Our most coveted atelier tier for serious collectors seeking unmatched prestige.",
    isPopular: true,
    perks: [
      "20% Huge Discount on every luxury timepiece (Save up to ৳6,900+ per watch)",
      "Free Laser Caseback Engraving (Custom Initials or Family Crest)",
      "Complimentary ARVANO Italian Leather Single Watch Travel Pouch (Worth ৳3,500)",
      "2-Year Extended Movement Warranty on all acquisitions",
      "Dedicated WhatsApp Concierge with priority Dhaka hand-delivery",
      "Priority invitation to private horology previews in Gulshan",
    ],
  },
  {
    id: "patron",
    name: "Master Patron",
    tierCode: "TIER 03",
    monthlyFee: 1999,
    discountPercentage: 30,
    badge: "30% MASTER VIP ALLOCATION",
    tagline: "The absolute pinnacle of luxury. Private bespoke access and direct atelier patronage.",
    perks: [
      "30% Master VIP Discount on all timepieces (Save up to ৳10,350+ per watch)",
      "Private Atelier Viewing & Consultation Sessions in Gulshan, Dhaka",
      "Free Annual Mechanical Movement Overhaul & Timegrapher Calibration",
      "Guaranteed allocation for serial #001 to #010 limited novelties",
      "24/7 Dedicated Senior Horologist concierge",
      "Complimentary bespoke strap tailoring in Italian calfskin",
    ],
  },
];

export interface MemberSubscription {
  id: string;
  memberId: string;
  customerName: string;
  phone: string;
  email: string;
  address?: string;
  planId: "collector" | "connoisseur" | "patron";
  planName: string;
  monthlyFee: number;
  discountPercentage: number;
  paymentMethod: string;
  transactionId: string;
  senderNumber: string;
  status: "ACTIVE" | "PENDING_VERIFICATION" | "EXPIRED";
  joinedAt: string;
  renewsAt: string;
  totalSavedBDT: number;
}
