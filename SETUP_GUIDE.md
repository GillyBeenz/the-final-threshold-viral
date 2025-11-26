# The Final Threshold - Complete Setup Guide
## Step-by-Step Instructions for Beginners

This guide will walk you through setting up your viral book promotion platform from scratch.

---

## 📋 Prerequisites

Before you begin, you'll need:

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Choose the LTS (Long Term Support) version
   - Install with default settings

2. **Git** (for version control)
   - Download from: https://git-scm.com/
   - Install with default settings

3. **A Supabase Account** (free tier)
   - Sign up at: https://supabase.com/
   - No credit card required for free tier

4. **A Vercel Account** (free tier)
   - Sign up at: https://vercel.com/
   - Can sign up with GitHub

5. **A Code Editor** (VS Code recommended)
   - Download from: https://code.visualstudio.com/

---

## 🚀 Part 1: Set Up Supabase (Backend Database)

### Step 1.1: Create a New Supabase Project

1. Go to https://supabase.com/ and sign in
2. Click "New Project"
3. Fill in:
   - **Name**: `the-final-threshold`
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your target audience
4. Click "Create new project"
5. Wait 2-3 minutes for setup to complete

### Step 1.2: Run Database Migrations

1. In your Supabase project, click "SQL Editor" in the left sidebar
2. Click "New Query"
3. Open the file: `supabase/migrations/001_initial_schema.sql`
4. Copy ALL the SQL code from that file
5. Paste it into the Supabase SQL Editor
6. Click "Run" (bottom right)
7. You should see "Success. No rows returned"

### Step 1.3: Get Your Supabase Credentials

1. In Supabase, click "Settings" (gear icon) in the left sidebar
2. Click "API" under Project Settings
3. You'll need these values (keep this tab open):
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **publishable** key (long string starting with `sb_publishable_...`)
   - **secret** key (another long string - keep this SECRET!)

---

## 💻 Part 2: Set Up Your Local Development Environment

### Step 2.1: Install Dependencies

1. Open Terminal/Command Prompt
2. Navigate to your project folder:
   ```bash
   cd "c:\Local Offline Files\Personal\Passive Income\AI Created apps\The Final Threshold Viral"
   ```

3. Install all required packages:
   ```bash
   npm install
   ```
   
   This will take 2-5 minutes. You'll see a progress bar.

### Step 2.2: Configure Environment Variables

1. In your project folder, find `.env.example`
2. Copy it and rename the copy to `.env.local`
3. Open `.env.local` in your code editor
4. Fill in the values:

```env
# From Supabase (Step 1.3)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
SUPABASE_SERVICE_ROLE_KEY=sb_secret_...

# Your local development URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=The Final Threshold

# Your Amazon book URLs (already filled in)
NEXT_PUBLIC_AMAZON_PAPERBACK_URL=https://www.amazon.com/dp/B0DWLJ485W
NEXT_PUBLIC_AMAZON_KINDLE_URL=https://www.amazon.com/dp/B0DWFRKLMZ

# Analytics
NEXT_PUBLIC_ENABLE_ANALYTICS=true

# Your email for admin dashboard access
ADMIN_EMAIL=tbdbooks.publishers@gmail.com

# Generate a random secret (or use this one for now)
NEXTAUTH_SECRET=the-final-threshold-viral-app
NEXTAUTH_URL=http://localhost:3000
```

5. Save the file

### Step 2.3: Test Your Setup

1. In Terminal, run:
   ```bash
   npm run dev
   ```

2. You should see:
   ```
   ▲ Next.js 14.2.0
   - Local:        http://localhost:3000
   - Ready in 2.1s
   ```

3. Open your browser and go to: `http://localhost:3000`
4. You should see your landing page!

---

## 🎨 Part 3: Customize Your Content

### Step 3.1: Add Your Book Cover Image

1. Get a high-quality image of your book cover (1200x1800px recommended)
2. Save it as `book-cover.jpg`
3. Place it in: `public/images/book-cover.jpg`

### Step 3.2: Customize Copy (Text Content)

The main copy is in these files:

**Landing Page** (`app/page.tsx`):
- Headline
- Subheadline
- Book description
- CTA button text

**Share Messages** (`lib/utils/share.ts`):
- Default share message
- Social media text

### Step 3.3: Update Meta Tags (SEO)

Edit `app/layout.tsx`:
- Page title
- Description
- Open Graph images
- Twitter card

---

## 📊 Part 4: Set Up Admin Dashboard

### Step 4.1: Add Your Email as Admin

1. Go to Supabase SQL Editor
2. Run this query (replace with YOUR email):

```sql
INSERT INTO admin_users (email) 
VALUES ('your-email@example.com');
```

3. Click "Run"

### Step 4.2: Access the Dashboard

1. Go to: `http://localhost:3000/admin`
2. You'll see analytics:
   - Total clicks
   - Conversions
   - Top referrers
   - Device breakdown

---

## 🚢 Part 5: Deploy to Production

### Step 5.1: Push to GitHub

1. Create a new repository on GitHub
2. In Terminal:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/the-final-threshold.git
   git push -u origin main
   ```

### Step 5.2: Deploy to Vercel

1. Go to https://vercel.com/
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

5. Add Environment Variables (click "Environment Variables"):
   - Copy ALL variables from your `.env.local`
   - Paste them one by one
   - **IMPORTANT**: Change `NEXT_PUBLIC_APP_URL` to your Vercel URL
   - **IMPORTANT**: Change `NEXTAUTH_URL` to your Vercel URL

6. Click "Deploy"
7. Wait 2-3 minutes
8. Your site is live! 🎉

### Step 5.3: Update Supabase URL Settings

1. In Supabase, go to "Authentication" → "URL Configuration"
2. Add your Vercel URL to "Site URL"
3. Add your Vercel URL to "Redirect URLs"

---

## 🧪 Part 6: Test Everything

### Test Checklist:

- [ ] Landing page loads
- [ ] "Get the Book" button redirects to Amazon
- [ ] Share button generates referral link
- [ ] QR code displays
- [ ] Social share buttons work
- [ ] Copy link works
- [ ] Referral tracking works (check Supabase database)
- [ ] Admin dashboard shows data
- [ ] Mobile responsive design works

### How to Test Referral Tracking:

1. Click "Share" on landing page
2. Copy your referral link
3. Open it in an incognito/private window
4. Click "Get the Book"
5. Go to Supabase → Table Editor → `clicks`
6. You should see a new row with your referral code!

---

## 🔧 Troubleshooting

### "Module not found" errors
**Solution**: Run `npm install` again

### "Supabase connection failed"
**Solution**: Check your `.env.local` file has correct Supabase URL and keys

### "Page not found" on Vercel
**Solution**: Make sure you deployed from the correct branch (main)

### Referrals not tracking
**Solution**: 
1. Check browser console for errors (F12)
2. Verify Supabase RLS policies are set up correctly
3. Check that API routes are working (`/api/track`)

### Admin dashboard shows no data
**Solution**:
1. Make sure your email is in the `admin_users` table
2. Generate some test traffic first
3. Check Supabase logs for errors

---

## 📈 Part 7: Launch Strategy

### Pre-Launch (1 week before):

1. **Test everything** with friends/family
2. **Collect email signups** for launch announcement
3. **Prepare social media posts**
4. **Create launch graphics** (book cover, quotes, teasers)

### Launch Day:

1. **Post on all your social channels**
2. **Email your list** with your referral link
3. **Engage in relevant communities** (Reddit, Facebook groups, forums)
4. **Ask early readers to share** their referral links

### Post-Launch (ongoing):

1. **Monitor analytics daily**
2. **Engage with sharers** (thank top referrers)
3. **A/B test** different CTAs and copy
4. **Optimize** based on data

---

## 🎯 Growth Hacks

### 1. Incentivize Sharing
- Offer exclusive content to top 10 referrers
- Create a leaderboard
- Give shoutouts to top sharers

### 2. Optimize for Virality
- Make sharing EASY (one-click)
- Use compelling copy
- Create urgency ("Limited time...")

### 3. Leverage Social Proof
- Display total reader count
- Show recent shares
- Highlight testimonials

### 4. Content Marketing
- Write blog posts about dystopian themes
- Create book trailers
- Share character backstories
- Post quotes/excerpts

---

## 📚 Additional Resources

### Learning Resources:
- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

### Tools:
- **QR Code Tester**: https://www.qr-code-generator.com/
- **Link Shortener**: https://bitly.com/ (optional)
- **Analytics**: Built-in dashboard + Vercel Analytics

### Support:
- **Next.js Discord**: https://discord.gg/nextjs
- **Supabase Discord**: https://discord.supabase.com/

---

## ⚖️ Legal Compliance

### Amazon Affiliate Disclosure

If you're using Amazon affiliate links, you MUST include this disclosure:

> "As an Amazon Associate, I earn from qualifying purchases."

Add this to your footer and privacy policy.

### Privacy Policy

You need a privacy policy that covers:
- What data you collect (clicks, referrals)
- How you use it (analytics)
- User rights (GDPR compliance)
- Cookie policy (even if not using cookies)

**Template**: Use a privacy policy generator like:
- https://www.termsfeed.com/privacy-policy-generator/
- https://www.freeprivacypolicy.com/

### Terms of Service

Basic terms covering:
- Acceptable use
- Intellectual property
- Limitation of liability

---

## 🎉 You're Ready to Launch!

Your viral book promotion platform is now set up and ready to drive traffic to your Amazon listings.

### Next Steps:

1. ✅ Complete all setup steps above
2. ✅ Test everything thoroughly
3. ✅ Customize your content
4. ✅ Deploy to production
5. ✅ Start promoting!

### Questions?

If you get stuck, check:
1. This guide's troubleshooting section
2. The code comments in each file
3. The project's GitHub issues
4. Next.js and Supabase documentation

---

**Good luck with your book launch! 📚🚀**

*Remember: The key to virality is making it EASY and REWARDING for people to share. Focus on creating value for your readers, and they'll naturally want to spread the word.*
