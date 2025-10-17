# AWAKENITIS PROJECT - MASTER REFERENCE DOCUMENT

**🚨 COPY THIS ENTIRE DOCUMENT - Save it somewhere safe! Paste it in new conversations to give me full context.**

---

## 📋 PROJECT OVERVIEW

**Project Name**: AWAKENITIS  
**Domain**: awakenitis.com (registered with Namecheap)  
**GitHub Repository**: https://github.com/VeronFero/awakenitis-website  
**Established**: Since June 2025™  
**Current Status**: ✅ Live on GitHub Pages, adding new features

---

## 🌐 CURRENT WEBSITE ACCESS

### Live Website URLs
- **GitHub Pages**: https://veronfero.github.io/awakenitis-website/
- **Custom Domain** (when connected): awakenitis.com

### Admin Analytics Dashboard
- **URL**: https://veronfero.github.io/awakenitis-website/admin/analytics
- **Password**: `awakenitis2025`

---

## 🔑 ALL CREDENTIALS & KEYS

### Supabase Backend
```
SUPABASE_URL: https://fhfnhospzarinmiqrgqn.supabase.co
SUPABASE_PROJECT_ID: fhfnhospzarinmiqrgqn
SUPABASE_ANON_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoZm5ob3NwemFyaW5taXFyZ3FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjEyMzksImV4cCI6MjA3NTMzNzIzOX0.UACPu-O8VHu-B0Su2qVgpzI8Hd7V5OHWzVQMJkrsiw4
SUPABASE_SERVICE_ROLE_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoZm5ob3NwemFyaW5taXFyZ3FuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2MTIzOSwiZXhwIjoyMDc1MzM3MjM5fQ.LEiheeUfV5ELnnVnZkmawrmBJF1khxVx_Sr1tnd8KfM
SUPABASE_ACCESS_TOKEN: sbp_oauth_47f7f85964d1abab55a364f0d775dc19e4d527d9
```

### Google Maps API
```
GOOGLE_MAPS_API_KEY: AIzaSyCO0kKndUNlmQi3B5mxy4dblg_8WYcuKuk
```

### Admin Dashboard
```
Admin Password: awakenitis2025
```

---

## 🎨 WEBSITE FEATURES

### ✅ Core Features (Implemented)
✅ **Dark Theme Design**: Black gradient background with white text  
✅ **Colorful AWAKENITIS Logo**: Integrated with glow effects  
✅ **Daily Inspirational Quotes**: New quote displayed every day  
✅ **Under Construction Banner**: Elegant and playful message  
✅ **Branding**: TM symbol (™) and "Since June 2025"  
✅ **Visitor Tracking System**: Full analytics with admin dashboard  
✅ **Responsive Design**: Works on all devices  
✅ **GitHub Pages Deployment**: Successfully deployed and accessible

### 🚧 New Features (In Progress - October 2025)
🔄 **Chat Widget**: Live customer support/engagement widget  
🔄 **Video Player Section**: Embedded video content showcase  
🔄 **Coming Soon Page**: Preview of upcoming major features  

### 📊 Analytics Features (Implemented)
- Real-time visitor tracking
- Page view statistics
- Session duration tracking
- Device type breakdown (mobile/tablet/desktop)
- Browser and OS information
- Geographic location data
- Referrer tracking
- Event tracking (button clicks, interactions)
- Password-protected admin dashboard
- CSV export functionality

---

## 🌍 DOMAIN SETUP

### Current Status
- **Domain Registrar**: Namecheap
- **Domain Name**: awakenitis.com
- **GitHub Pages URL**: https://veronfero.github.io/awakenitis-website/
- **Status**: ✅ Website live on GitHub Pages, custom domain connection optional

### GitHub Pages Setup (COMPLETED)
✅ GitHub account created (Username: VeronFero)  
✅ Repository created: awakenitis-website  
✅ Website files uploaded  
✅ GitHub Pages enabled  
✅ Website accessible at: https://veronfero.github.io/awakenitis-website/

### To Connect Custom Domain (Optional)
If you want awakenitis.com to show the website instead of the GitHub URL, follow the instructions in the "GitHub Pages Setup" section below.

---

## 🚀 GITHUB PAGES HOSTING SETUP

### Option 1: Quick Namecheap Redirect (5 Minutes)
**This makes awakenitis.com automatically redirect to your live site**

1. Log into Namecheap.com
2. Click "Domain List" → Find "awakenitis.com" → Click "Manage"
3. Scroll to "Redirect Domain" section
4. Click "Add Redirect"
5. Paste this URL: `https://veronfero.github.io/awakenitis-website/`
6. Select "Permanent (301)" redirect
7. Click "Save"
8. Wait 10-30 minutes for DNS to update
9. Test: Type "awakenitis.com" in your browser

**Note**: The browser URL will change to show the GitHub Pages link, but visitors start at awakenitis.com

---

### Option 2: GitHub Pages Setup (Better Long-Term)
**This keeps "awakenitis.com" in the browser URL permanently**

#### Step 1: Create GitHub Account (if you don't have one)
1. Go to https://github.com/
2. Click "Sign up"
3. Create your free account

#### Step 2: Create Repository
1. Log into GitHub
2. Click the "+" icon (top right) → "New repository"
3. Repository name: `awakenitis-website`
4. Make it **Public**
5. Click "Create repository"

#### Step 3: Upload Website Files
I can do this step for you if you give me GitHub access, OR you can:
1. Click "uploading an existing file"
2. Drag and drop ALL website files:
   - `index.html`
   - `styles/` folder
   - `scripts/` folder
   - `assets/` folder
   - All other files
3. Click "Commit changes"

#### Step 4: Enable GitHub Pages
1. In your repository, click "Settings"
2. Scroll down to "Pages" (left sidebar)
3. Under "Source", select "main" branch
4. Click "Save"
5. GitHub will give you a URL like: `https://yourusername.github.io/awakenitis-website`

#### Step 5: Connect Custom Domain (awakenitis.com)
1. Still in GitHub Pages settings, find "Custom domain" box
2. Type: `awakenitis.com`
3. Click "Save"
4. Check the box "Enforce HTTPS" (wait 5 minutes first)

#### Step 6: Update Namecheap DNS Settings
1. Log into Namecheap
2. Domain List → awakenitis.com → "Manage"
3. Find "Advanced DNS" tab
4. Add these DNS records:

**Delete all existing A records and CNAME for www, then add:**

```
Type: A Record
Host: @
Value: 185.199.108.153
TTL: Automatic

Type: A Record
Host: @
Value: 185.199.109.153
TTL: Automatic

Type: A Record
Host: @
Value: 185.199.110.153
TTL: Automatic

Type: A Record
Host: @
Value: 185.199.111.153
TTL: Automatic

Type: CNAME Record
Host: www
Value: yourusername.github.io
TTL: Automatic
```

5. Click "Save All Changes"
6. Wait 1-24 hours for DNS to fully propagate

#### Step 7: Verify
- After 1-2 hours, type "awakenitis.com" in your browser
- It should show your new website with dark theme and all features!

---

## 📁 PROJECT FILE STRUCTURE

```
awakenitis-website/
├── index.html                          # Main homepage
├── styles/
│   └── main.css                        # Dark theme styling
├── scripts/
│   └── main.js                         # Interactive features
├── assets/
│   ├── awakenitis-logo.jpeg            # Your colorful logo
│   └── logo.jpg                        # Backup logo
├── docs/
│   ├── analytics-system-documentation.md
│   ├── analytics-quick-reference.md
│   └── feature-additions-summary.md
├── supabase/
│   ├── functions/                      # Edge functions for analytics
│   └── tables/                         # Database tables
└── README.md                           # Technical documentation
```

---

## 🎯 QUICK REFERENCE FOR NEW CONVERSATIONS

**Copy-paste this into a new conversation to give me context:**

```
I'm working on the AWAKENITIS project:
- Domain: awakenitis.com (Namecheap)
- GitHub Pages: https://veronfero.github.io/awakenitis-website/
- GitHub Repo: https://github.com/VeronFero/awakenitis-website
- Admin dashboard: https://veronfero.github.io/awakenitis-website/admin/analytics (password: awakenitis2025)
- Supabase Project ID: fhfnhospzarinmiqrgqn
- Hosting: GitHub Pages
- Design: Dark theme with colorful logo
- Features: Analytics, daily quotes, visitor tracking, chat widget, video player

[Then add your specific request here]
```

---

## 🔧 TROUBLESHOOTING

### "My domain still shows the old website"
**Problem**: DNS hasn't updated yet  
**Solution**: 
1. Wait 1-24 hours after changing DNS settings
2. Clear browser cache (Ctrl+Shift+Delete)
3. Try in incognito/private browsing mode
4. Try from your phone (different network)

### "I can't access the admin dashboard"
**Problem**: Wrong password or URL  
**Solution**:
1. URL: https://abzc253c99sj.space.minimax.io/admin/analytics
2. Password: `awakenitis2025` (lowercase, no spaces)
3. Clear browser cache if still issues

### "Analytics not showing visitors"
**Problem**: No recent traffic  
**Solution**:
1. Visit the main website first
2. Wait 30 seconds
3. Refresh analytics dashboard
4. Active visitors only show last 5 minutes

---

## 🎨 DESIGN SPECIFICATIONS

### Colors
- **Background**: Black gradient (#000000 → #0a0a0a → #1a1a1a)
- **Text**: White/light gray (#e8e8e8, #f0f0f0)
- **Logo**: Colorful (integrated in header and footer)
- **Accents**: Subtle glows and shadows for depth

### Typography
- Modern sans-serif fonts
- White text on dark background for contrast
- Larger text for readability

### Logo Placement
- Header: Top navigation bar
- Footer: Bottom with glow effect
- Design: Not overwhelming, tastefully integrated

---

## 📊 ANALYTICS DATABASE STRUCTURE

### Tables in Supabase
1. **analytics_page_views**: Records every page visit
2. **analytics_sessions**: Tracks unique visitor sessions
3. **analytics_events**: Logs user interactions (clicks, etc.)
4. **admin_users**: Stores admin credentials

### Edge Functions
1. **track-page-view**: Records page views
2. **track-event**: Logs user interactions
3. **get-analytics-data**: Fetches data for admin dashboard

---

## 💡 DEVELOPMENT PHASES

### Phase 1 (✅ COMPLETED - October 2025)
✅ Basic website with dark theme  
✅ Logo integration  
✅ Daily inspiration quotes  
✅ Visitor tracking system  
✅ Admin analytics dashboard  
✅ GitHub Pages deployment  

### Phase 2 (🚧 IN PROGRESS - October 2025)
🔄 Chat widget integration  
🔄 Video player section  
🔄 "Coming Soon" page for future features  
⏳ Custom AI chatbot setup  

### Phase 3 (📋 PLANNED)
- E-commerce integration (Video Books, Custom Music)
- Whop platform integration for course sales
- Payment processing (Stripe)
- User account system
- Video streaming capabilities
- Interactive video content

### Phase 4 (📋 PLANNED - Long-term Vision)
- Community features (text/video chat)
- "Safe rooms" for user interactions
- E-learning platform (Grades 1-12)
- Gamification system
- Video-based personality tests
- User-generated content
- Social interactions
- Mascot character development

### Phase 5 (📋 FUTURE)
- AI-powered personalization
- Advanced analytics
- Mobile app development
- International expansion

---

## 📝 IMPORTANT NOTES

1. **Every time I make major updates, a NEW URL is generated**
   - This is why your domain appears unchanged
   - Always check the latest URL I provide
   - Connect your domain to see changes at awakenitis.com

2. **Supabase Backend is Live**
   - All analytics data is being collected
   - Database is actively tracking visitors
   - Admin dashboard works in real-time

3. **GitHub Hosting is Recommended**
   - Free forever
   - Easy to update
   - Reliable uptime
   - Easy custom domain setup

4. **Domain Propagation Takes Time**
   - DNS changes: 10 minutes to 24 hours
   - Be patient after updating settings
   - Test from different devices/networks

---

## 🆘 SUPPORT & HELP

### When Starting a New Conversation
1. Copy this entire document
2. Paste it in the new chat
3. Add: "I need help with [your specific request]"
4. I'll have all the context immediately!

### For Technical Issues
1. Check browser console (F12 → Console tab)
2. Try incognito mode
3. Clear cache and cookies
4. Test on different browser/device

### For Domain/DNS Issues
1. Use DNS checker: https://dnschecker.org/
2. Enter "awakenitis.com"
3. See if changes have propagated globally

---

## 📞 CONTACT & RESOURCES

- **Domain Registrar**: Namecheap.com
- **Backend**: Supabase.co
- **Hosting**: GitHub Pages
- **GitHub Repository**: https://github.com/VeronFero/awakenitis-website
- **Live Website**: https://veronfero.github.io/awakenitis-website/

---

**🌟 PROJECT MOTTO**: "Awakening human potential through innovation and inspiration"

**Last Updated**: October 17, 2025  
**Document Version**: 2.0  
**Status**: ✅ Live on GitHub Pages | 🚧 Adding New Features (Chat, Video, Coming Soon)

---

## 🎉 QUICK ACTION CHECKLIST

**✅ Website is LIVE on GitHub Pages!**

**Current Access:**
- ✅ Website: https://veronfero.github.io/awakenitis-website/
- ✅ Admin Dashboard: https://veronfero.github.io/awakenitis-website/admin/analytics

**Optional - To Connect Custom Domain (awakenitis.com):**

- [ ] Log into Namecheap
- [ ] Choose Option 1 (Quick Redirect) or Option 2 (GitHub Custom Domain)
- [ ] Follow the step-by-step instructions above
- [ ] Wait 10-30 minutes (Option 1) or 1-24 hours (Option 2)
- [ ] Test by typing "awakenitis.com" in your browser
- [ ] Celebrate! 🎊

**Next Steps:**
- [ ] Test the new chat widget
- [ ] Check out the video player section
- [ ] Review the "Coming Soon" page
- [ ] Set up AI chatbot training

---

**END OF MASTER DOCUMENT**

*Save this document! Paste it in new conversations for instant context!*
