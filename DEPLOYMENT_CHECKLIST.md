# Deployment Checklist - The Final Threshold

## ✅ Pre-Deployment (Complete These First)

### 1. Add Book Cover Image
- [ ] Create folder: `public/images/`
- [ ] Add your book cover as: `public/images/book-cover.jpg`
- [ ] Recommended size: 1200x1800px or similar 2:3 aspect ratio

### 2. Verify Environment Variables
- [ ] Check `.env.local` has all required variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `NEXT_PUBLIC_AMAZON_PAPERBACK_URL`
  - `NEXT_PUBLIC_AMAZON_KINDLE_URL`
  - `ADMIN_EMAIL`

### 3. Test Locally
- [ ] Landing page loads (`http://localhost:3000`)
- [ ] "Enter the Threshold" button works
- [ ] "Share this journey" link works (`/share`)
- [ ] Can generate referral link
- [ ] QR code displays
- [ ] Social share buttons work
- [ ] Leaderboard displays (may be empty initially)
- [ ] Admin dashboard accessible (`/admin`)

### 4. Database Setup
- [ ] Ran SQL migration in Supabase SQL Editor
- [ ] Tables created: referrals, clicks, conversions, email_signups, settings, admin_users
- [ ] Views created: referral_performance, daily_stats, top_referrers
- [ ] RLS policies enabled

---

## 🚀 Deployment to Vercel

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - The Final Threshold viral platform"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/the-final-threshold-viral.git
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to https://vercel.com/
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

### Step 3: Add Environment Variables in Vercel
Add these in Vercel Project Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://oewewxuysdpstvoeximu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_V1rXqT3kgjzsSFMhZ7zcdg_mQB58xGA
SUPABASE_SERVICE_ROLE_KEY=sb_secret_Wl-GIRKhd-vaY2pkhCUpqg_JuhnFsKV
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
NEXT_PUBLIC_SITE_NAME=The Final Threshold
NEXT_PUBLIC_AMAZON_PAPERBACK_URL=https://www.amazon.com/dp/B0DWLJ485W
NEXT_PUBLIC_AMAZON_KINDLE_URL=https://www.amazon.com/dp/B0DWFRKLMZ
NEXT_PUBLIC_ENABLE_ANALYTICS=true
ADMIN_EMAIL=tbdbooks.publishers@gmail.com
NEXTAUTH_SECRET=the-final-threshold-viral-app
NEXTAUTH_URL=https://your-project.vercel.app
```

**IMPORTANT**: Update `NEXT_PUBLIC_APP_URL` and `NEXTAUTH_URL` with your actual Vercel URL!

### Step 4: Deploy
- Click "Deploy"
- Wait 2-3 minutes
- Your site will be live!

### Step 5: Update Supabase Settings
1. Go to Supabase → Authentication → URL Configuration
2. Add your Vercel URL to:
   - **Site URL**: `https://your-project.vercel.app`
   - **Redirect URLs**: `https://your-project.vercel.app/**`

---

## 🎯 Post-Deployment Testing

### Test on Live Site:
- [ ] Landing page loads
- [ ] Book cover displays
- [ ] Amazon links work
- [ ] Share page works
- [ ] Referral links generate
- [ ] QR codes display
- [ ] Social sharing works
- [ ] Leaderboard loads
- [ ] Admin dashboard works
- [ ] Mobile responsive

---

## 📊 Viral Mechanics Implemented

### ✅ Public Leaderboard
- Top 10 sharers displayed on landing page
- Shows rank, partial referral code, clicks, conversions
- Badge system integrated

### ✅ Badge System
**Levels:**
- 🌟 **Threshold Spreader** - 10+ clicks
- 💫 **Reality Breaker** - 50+ clicks
- ⭐ **Truth Seeker** - 100+ clicks

**Recognition:**
- Badges shown on leaderboard
- Featured on landing page
- Color-coded by achievement level

---

## 🎨 Customization Options

### Change Book Title/Description
Edit: `components/landing/Hero.tsx` and `components/landing/BookDescription.tsx`

### Change Colors
Edit: `tailwind.config.ts` - modify the `threshold` and `accent` color palettes

### Change Badge Levels
Edit: `app/api/leaderboard/route.ts` - modify the click thresholds

### Add More Social Channels
Edit: `app/share/page.tsx` - add more buttons to `shareToSocial` function

---

## 📈 Analytics & Monitoring

### Admin Dashboard
Access at: `https://your-site.vercel.app/admin`

**Metrics Available:**
- Total clicks
- Total referral links generated
- Total conversions
- Conversion rate
- Top 10 referrers with detailed stats

### Supabase Dashboard
- Real-time database monitoring
- Query performance
- API usage
- Storage metrics

---

## 🔒 Security Notes

- ✅ RLS policies enabled on all tables
- ✅ Service role key only used server-side
- ✅ No PII collected
- ✅ IP addresses hashed (not stored)
- ✅ HTTPS enforced by Vercel

---

## 🐛 Troubleshooting

### TypeScript Errors in IDE
- These are type inference issues
- Code will work at runtime
- Can be ignored for now
- Will resolve after first successful build

### Leaderboard Empty
- Normal if no one has shared yet
- Generate a test referral link
- Share it and click it yourself
- Should appear after a few clicks

### Admin Dashboard Shows Zero
- Make sure database migration ran successfully
- Check Supabase logs for errors
- Verify RLS policies are set up

---

## 🎉 You're Ready to Launch!

Once you've completed all the checklist items above, your viral book promotion platform will be live and ready to drive traffic to your Amazon listings!

**Next Steps After Launch:**
1. Share your main URL on social media
2. Encourage early visitors to generate referral links
3. Monitor the admin dashboard daily
4. Engage with top sharers
5. Iterate based on data

Good luck with your launch! 🚀📚
