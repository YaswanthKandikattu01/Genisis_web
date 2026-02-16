# Deploying Genesis to Production (Vercel)

Follow these steps to deploy your Next.js application to Vercel.

## 1. Push Code to GitHub
You need a GitHub repository to deploy on Vercel.

### Initialize Git (if not done)
Open your terminal in the project folder and run:
```bash
git init
git add .
git commit -m "Initial commit of Genesis platform"
```

### Create a Repo on GitHub
1. go to [github.com/new](https://github.com/new).
2. Name your repository (e.g., `genesis-hackathon`).
3. **Important**: Make it **Private** (since it contains your hard work!).
4. Click **Create repository**.

### Push Local Code
Copy the commands shown on GitHub under "…or push an existing repository from the command line":
```bash
git remote add origin https://github.com/YOUR_USERNAME/genesis-hackathon.git
git branch -M main
git push -u origin main
```

---

## 2. Deploy on Vercel
1. Log in to [vercel.com](https://vercel.com) (you can use your GitHub account).
2. Click **Add New > Project**.
3. Select your `genesis-hackathon` repository and click **Import**.

### Configure Project
In the "Configure Project" screen:
1. **Framework Preset**: Ensure "Next.js" is selected.
2. **Root Directory**: Leave as `./`.
3. **Environment Variables** (expand this section):
   You MUST copy all values from your local `.env.local` file here.
   
   Add these Key-Value pairs one by one:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `CASHFREE_APP_ID`
   - `CASHFREE_SECRET_KEY`
   - `CASHFREE_ENV` (Set to `PRODUCTION` for live payments, or `SANDBOX` for testing)
   - `EMAIL_USER` (Your Gmail address)
   - `EMAIL_PASS` (Your Gmail App Password)
   - `ADMIN_PASSWORD` (Your secure admin password)
   - `ADMIN_SECRET_KEY` (A random secret string)
   - `NEXT_PUBLIC_APP_URL` (**Important**: Set this to your Vercel URL, e.g., `https://genesis-hackathon.vercel.app`. You can update this after deployment if needed.)
   - `NEXT_PUBLIC_GOOGLE_FORM_URL`

4. Click **Deploy**.

---

## 3. Post-Deployment Setup

### Update Cashfree Webhook
Once deployed, Vercel will give you a domain (e.g., `https://genesis-hackathon.vercel.app`).
1. Log in to Cashfree Dashboard.
2. Go to **Developers > Webhooks**.
3. Set the Webhook URL to:
   ```
   https://YOUR_VERCEL_DOMAIN.app/api/payment/webhook
   ```
4. Verify the webhook.

### Test Production
1. Go to your new Vercel URL.
2. Try the Admin Dashboard (`/admin`).
3. (If Sandbox) Try registering for the hackathon.

---

**Congratulations! Your Genesis platform is live! 🚀**
