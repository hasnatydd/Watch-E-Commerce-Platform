# ARVANO — Premium Luxury Wrist Watch E-Commerce Platform
**Tagline:** TIME. PRESENCE. PRECISION.  
**Market:** Bangladesh (Haute Horlogerie & Luxury Masculine Timepieces)

---

## 1. ARCHITECTURAL OVERVIEW

ARVANO is a production-grade, full-stack luxury wristwatch e-commerce platform built with an architectural focus on **masculine elegance, precision horology, PostgreSQL database integrity, and Bangladesh payment workflows**.

### Permanent Core Technology Stack
- **Framework:** Next.js 15+ (App Router, Server Components & Route Handlers)
- **Language:** TypeScript 5.7+
- **Styling:** Tailwind CSS with custom **Obsidian Charcoal (#17191B)**, **Warm Ivory (#F5F0E7)**, **Champagne Gold (#B89A5E)**, and **Muted Dusty Rose (#BD929A)** design tokens
- **Typography:** Cormorant Garamond (Headings) + Manrope (Body & UI)
- **Database:** PostgreSQL
- **ORM:** Prisma ORM 7 with `@prisma/adapter-pg` driver adapter
- **Authentication:** NextAuth.js / Auth.js with JWT session strategy and bcrypt password hashing
- **Client State:** Zustand with LocalStorage persistence for Cart and Wishlist
- **Icons:** Lucide React

---

## 2. STRICT BRAND IDENTITY & DESIGN SYSTEM

### No Announcement Bar
In strict adherence to brand standards, the website **does not feature any announcement bar, promotional ticker, or rotating ribbon**. It begins immediately with the high-definition luxury navigation header featuring the official ARVANO logo.

### Colour Distribution
- **Obsidian Charcoal (`#17191B`):** Header, hero backgrounds, editorial spotlights, dark cards, footer.
- **Warm Ivory (`#F5F0E7`):** Product listing backgrounds, PDP purchase panels, forms, shopping bag drawer.
- **Champagne Gold (`#B89A5E`):** Fine borders, primary CTAs, watch sub-dial accents, star ratings, luxury badges.
- **Muted Dusty Rose (`#BD929A`):** Restrained promotional tags and luxury unboxing accents.

---

## 3. BANGLADESH PAYMENT SYSTEM & ADMIN CONTROL

The application natively supports Bangladesh payment options, fully manageable via the Admin Panel at `/admin/settings/payments`:

1. **Cash on Delivery (COD):** Collected at customer doorstep with advance courier verification for outside Dhaka.
2. **bKash (বিকাশ সেন্ড মানি):** Dynamic account number and instructions managed from Admin, with Transaction ID (TrxID) and Sender Number verification.
3. **Nagad (নগদ সেন্ড মানি):** Independent account number and step-by-step instructions.
4. **Rocket (রকেট সেন্ড মানি):** Independent personal/merchant account configuration.
5. **Direct Bank Transfer:** Corporate bank account (City Bank PLC, Gulshan Branch) with deposit slip reference submission.

### Admin Payment Management (`/admin/settings/payments`)
- Administrators can independently update each payment method's account number (e.g., updating bKash does not affect Nagad or Rocket).
- Enable/disable payment methods at will.
- Update payment instructions and require/relax TrxID requirements.
- Review submitted transactions in the **Payment Verification Queue** (`/admin/payments`) with one-click Approve / Reject decisions.

---

## 4. MULTI-LAYER FAKE ORDER & FRAUD PREVENTION

To protect operations against chronic courier returns and fraudulent submissions:
- **Idempotency Keys:** Unique client-generated tokens prevent duplicate order creation upon double clicking.
- **Rapid Rate Limiting:** Detects and flags multiple orders placed from the same phone number or IP within 5 minutes.
- **High-Value COD Threshold:** Orders over ৳30,000 via Cash on Delivery are automatically flagged for concierge review.
- **Cascading Bangladesh Address Validation:** Division → District → Thana cascading selectors ensure legitimate address data.
- **Courier Return Risk Check:** Tracks customer previous return history before parcel dispatch.
- **Admin Fraud Review Dashboard (`/admin/fraud`):** Review risk scores and one-click blacklist suspicious numbers.

---

## 5. COMPLETE ADMIN DASHBOARD CAPABILITIES

Protected server-side for `SUPER_ADMIN` and `ADMIN` roles:

| Section | Route | Capabilities |
| :--- | :--- | :--- |
| **Executive Dashboard** | `/admin` | Real-time Gross Revenue, Total Orders, Paid Revenue, Low Stock Alerts, Recent Orders |
| **Products & Variations** | `/admin/products` | Manage watches, individual variation prices, SKUs, and stock quantities |
| **New Watch & Variations** | `/admin/products/new` | Create timepieces with multiple variations, each with dedicated image, sale/regular price, and SKU |
| **Categories** | `/admin/categories` | Manage collections (Men's, Automatic, Chronograph, Classic, Women's, Luxury) |
| **Stock & Inventory** | `/admin/inventory` | Stock In, Stock Out, adjust quantities, set low-stock thresholds, and view audit movement history |
| **Orders Management** | `/admin/orders` | View client orders, update fulfillment workflow, view invoice slips |
| **Payment Verification** | `/admin/payments` | Inspect customer-submitted bKash/Nagad TrxIDs and approve/reject payments |
| **Payment Settings** | `/admin/settings/payments` | Change bKash, Nagad, Rocket send-money numbers and checkout instructions |
| **Fraud Review** | `/admin/fraud` | Inspect suspicious orders, high-value COD flags, and blacklist fraudulent numbers |
| **Promotional Coupons** | `/admin/coupons` | Manage percentage and fixed discount coupons (e.g. `ARVANO10`, `TIMELESS1000`) |
| **Global Settings** | `/admin/settings/site` | Inside/Outside Dhaka delivery charges (৳80 / ৳150), free delivery threshold (৳10,000), showroom contact |

---

## 6. PROJECT SETUP & RUNNING LOCALLY

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env`:
```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/arvano?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="arvano-luxury-horology-ultra-secure-key-2026-bangladesh"
INITIAL_ADMIN_EMAIL="admin@arvano.com"
INITIAL_ADMIN_PASSWORD="ArvanoSuperAdmin2026!#"
```

### 3. Generate Prisma Client
```bash
npx prisma generate
```

### 4. Database Migrations (PostgreSQL)
When your PostgreSQL instance is running:
```bash
npx prisma migrate dev --name init
```
Or to deploy existing migrations in production:
```bash
npm run db:deploy
```

### 5. Seed Initial Data
Seeds the initial Super Admin, categories, watches, variations, payment settings, and promotional coupons:
```bash
npm run db:seed
```

### 6. Provision First Super Admin CLI
```bash
npm run admin:provision
```

### 7. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the luxury storefront.
Admin portal: [http://localhost:3000/admin](http://localhost:3000/admin) (Log in with `admin@arvano.com` / `ArvanoSuperAdmin2026!#`).

---

## 7. PRODUCTION BUILD VERIFICATION

To verify TypeScript compilation, Next.js routing, and production bundle:
```bash
npm run build
npm run start
```
