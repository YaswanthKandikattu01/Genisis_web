# Genesis – Beginner-Friendly AI Platform

A production-ready, scalable website for Genesis — a beginner-friendly LLM platform.  
Built with Next.js 14, Supabase, Razorpay, and modern SaaS design principles.

---

## 🚀 Tech Stack

| Layer       | Technology                    |
|-------------|-------------------------------|
| Frontend    | Next.js 14 (App Router), Tailwind CSS, Framer Motion |
| Backend     | Next.js API Routes (Node.js)  |
| Database    | Supabase (PostgreSQL)         |
| Payment     | Razorpay Orders + Webhooks    |
| Email       | Nodemailer (Queue-based)      |
| Hosting     | Vercel + Supabase Cloud       |

---

## 📂 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home
│   ├── genesis/page.tsx      # Product Page
│   ├── hackathon/page.tsx    # Hackathon + Registration
│   ├── features/page.tsx     # Features
│   ├── about/page.tsx        # About
│   ├── careers/page.tsx      # Careers (Google Form)
│   ├── contact/page.tsx      # Contact
│   ├── admin/page.tsx        # Admin Dashboard
│   ├── terms/page.tsx        # Terms & Conditions
│   ├── privacy/page.tsx      # Privacy Policy
│   ├── refunds/page.tsx      # Refund Policy
│   ├── payment-success/      # Payment Success
│   ├── payment-failure/      # Payment Failure
│   └── api/
│       ├── payment/create/   # Create Razorpay Order
│       ├── payment/verify/   # Verify Razorpay Checkout Signature
│       ├── payment/webhook/  # Razorpay Webhook (Server-to-Server)
│       ├── admin/participants/
│       ├── admin/update-status/
│       ├── admin/send-assessment/
│       └── contact/          # Contact Form API
├── components/
│   ├── Navbar.tsx
│   └── Footer.tsx
└── lib/
    ├── db.ts                 # Supabase Client
    ├── email.ts              # Queue-based Email Service
    ├── rate-limit.ts         # Rate Limiter
    ├── security.ts           # Validation & Webhook Verification
    └── utils.ts              # Utilities
```

---

## 🛠 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Supabase Setup
1. Create a project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the contents of `supabase-schema.sql`
3. Copy your project URL, anon key, and service role key

### 3. Razorpay Setup
1. Sign up at [razorpay.com](https://razorpay.com)
2. Create an account and obtain your **Key ID** and **Key Secret**
3. (Recommended) Create a Webhook with:
   - **URL**: `https://your-domain.com/api/payment/webhook`
   - **Events**: `payment.captured`, `payment.failed`
   - **Secret**: a strong random string (use this as `RAZORPAY_WEBHOOK_SECRET`)

### 4. Google Form Setup
1. Create a Google Form with fields: Full Name, Email, Phone, Resume Upload, Experience, LinkedIn URL
2. Copy the shareable link

### 5. Gmail App Password
1. Enable 2FA on your Gmail account
2. Generate an App Password at https://myaccount.google.com/apppasswords
3. Use this as `EMAIL_PASS`

### 6. Environment Variables
Create `.env.local`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id  # Safe to expose; used by Razorpay Checkout

# Email
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Admin
ADMIN_SECRET_KEY=genesis_admin_2026_secure_key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Google Form
NEXT_PUBLIC_GOOGLE_FORM_URL=https://forms.gle/your-form-id
```

### 7. Run Development Server
```bash
npm run dev
```

### 8. Production Build
```bash
npm run build
npm start
```

---

## 🔐 Security Features

- **Webhook Signature Verification**: HMAC-SHA256 validation for Razorpay webhooks and Checkout signatures
- **Rate Limiting**: In-memory rate limiter (swap with Redis for production scale)
- **Input Sanitization**: All user inputs are sanitized against XSS
- **Admin Auth**: Bearer token authentication on all admin API routes
- **Idempotent Webhook Handling**: Prevents duplicate database entries
- **Server-side Validation**: Email, phone format, and required field validation
- **No Secret Exposure**: All sensitive keys in environment variables

---

## 📈 Scalability

- **Stateless API Routes**: Compatible with serverless (Vercel) auto-scaling
- **Database Indexing**: Indexes on email, order_id, transaction_id, status, created_at
- **Webhook-based Payment**: Server-to-server verification, not client-dependent
- **Queue-based Emails**: Async processing with retry (up to 3 attempts)
- **Optimized Queries**: Paginated admin queries with selective column fetching

---

## 📊 Admin Dashboard

- **URL**: `/admin`
- **Password**: `genesis2026` (maps to ADMIN_PASSWORD env variable)
- **Features**:
  - View all registered participants
  - Search by name/email
  - Filter by candidate status
  - Update candidate status (7 stages)
  - Export data to CSV
  - Send bulk assessment emails

---

## 🔄 Payment Flow

```
User → Register Form → /api/payment/create → Razorpay Order Created
                ↓
        Razorpay Checkout (client-side)
                ↓
        /api/payment/verify → Verify Checkout signature (HMAC-SHA256)
                ↓
        + Supabase Update + Email Queue
                ↓
        /payment-success or /payment-failure

  (In parallel)
  Razorpay Webhook → /api/payment/webhook → HMAC Verify → Supabase Update + Email
```

---

## ⚖️ Legal Disclaimer

> Genesis Hackathon is an independent hiring initiative. Final job offers are subject to internal evaluation and verification.

---

Built with ❤️ by Genesis AI Team
