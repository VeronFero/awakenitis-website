# GITHUB PAGES SETUP - STEP BY STEP GUIDE

## ✅ STATUS: GitHub Pages Setup COMPLETED!

**Your website is now live at**: https://veronfero.github.io/awakenitis-website/

---

## 🎯 Optional: Connect Custom Domain
If you want "awakenitis.com" to show your website instead of the GitHub URL, follow the instructions below.

---

## ⚡ FASTEST OPTION: Namecheap Redirect (Do This Now!)

**This takes 5 minutes and redirects awakenitis.com to your GitHub Pages site:**

1. Go to https://namecheap.com and log in
2. Click "Domain List" on the left
3. Find "awakenitis.com" and click "MANAGE"
4. Scroll down to find "Redirect Domain"
5. Click "Add Redirect"
6. In the URL box, paste exactly this:
   ```
   https://veronfero.github.io/awakenitis-website/
   ```
7. Choose "Permanent (301)" from the dropdown
8. Click "Save All Changes"
9. **Wait 15-30 minutes**
10. Type "awakenitis.com" in your browser - it should redirect to your site!

**Done! Your domain now works.**

---

## 🚀 BETTER OPTION: GitHub Pages (For Professional Setup)

**This keeps "awakenitis.com" in the browser URL bar permanently.**

### Step 1: Create GitHub Account

1. Go to https://github.com/
2. Click "Sign up" (top right)
3. Enter your email, create a password
4. Complete the verification
5. Choose the free plan

### Step 2: Create New Repository

1. Once logged in, click the **"+" icon** (top right corner)
2. Click "New repository"
3. Fill in the form:
   - **Repository name**: `awakenitis-website`
   - **Description**: "AWAKENITIS official website"
   - Make sure it's set to **Public**
   - ✅ Check "Add a README file"
4. Click **"Create repository"**

### Step 3: Upload Your Website Files

**You have all your files ready in the `github-upload` folder!**

1. In your new repository, click **"Add file"** → **"Upload files"**
2. **Drag and drop** ALL files from the `github-upload` folder:
   - `index.html`
   - `styles` folder
   - `scripts` folder
   - `assets` folder
   - Any other files
3. At the bottom, click **"Commit changes"**
4. Wait for the upload to complete

### Step 4: Enable GitHub Pages

1. In your repository, click **"Settings"** (tab at the top)
2. Scroll down the left sidebar and click **"Pages"**
3. Under **"Source"**, select:
   - Branch: **main**
   - Folder: **/ (root)**
4. Click **"Save"**
5. Wait 2-3 minutes
6. GitHub will show you a URL like: `https://YOURUSERNAME.github.io/awakenitis-website`
7. **Click that URL** to verify your site works!

### Step 5: Add Custom Domain (awakenitis.com)

1. Still in the **Settings → Pages** section
2. Find the **"Custom domain"** box
3. Type: `awakenitis.com` (no https://, just the domain)
4. Click **"Save"**
5. Wait 1 minute, then check the box **"Enforce HTTPS"**

### Step 6: Update Namecheap DNS

**This is the most important step!**

1. Open a new tab and go to https://namecheap.com
2. Log in
3. Click **"Domain List"**
4. Find **"awakenitis.com"** and click **"MANAGE"**
5. Click the **"Advanced DNS"** tab
6. You'll see a list of DNS records

**DELETE these records (if they exist):**
- Any A Records with Host "@"
- Any CNAME Record with Host "www" pointing to old hosting

**ADD these NEW records:**

Click **"Add New Record"** and enter:

```
Record 1:
Type: A Record
Host: @
Value: 185.199.108.153
TTL: Automatic

Record 2:
Type: A Record
Host: @
Value: 185.199.109.153
TTL: Automatic

Record 3:
Type: A Record
Host: @
Value: 185.199.110.153
TTL: Automatic

Record 4:
Type: A Record
Host: @
Value: 185.199.111.153
TTL: Automatic

Record 5:
Type: CNAME
Host: www
Value: YOURUSERNAME.github.io  (replace with your actual GitHub username)
TTL: Automatic
```

7. Click **"Save All Changes"** (green checkmark at the top right)

### Step 7: Wait & Verify

1. **Wait 1-6 hours** for DNS to propagate (sometimes up to 24 hours)
2. Check progress at: https://dnschecker.org/
   - Enter: `awakenitis.com`
   - See if it points to GitHub's IPs globally
3. After DNS propagates:
   - Open your browser
   - Type: `awakenitis.com`
   - **Your new website should appear!** 🎉

---

## 🆘 TROUBLESHOOTING

### "GitHub Pages shows 404"
- Make sure `index.html` is in the root of your repository
- Wait 5 minutes after enabling Pages
- Check Settings → Pages to see the deployment status

### "Custom domain not working"
- Verify you entered exactly: `awakenitis.com` (no www, no https://)
- Make sure DNS records are correct in Namecheap
- Wait longer - DNS can take 24 hours
- Try in incognito mode (Ctrl+Shift+N)

### "Site shows but images/styles missing"
- Make sure you uploaded the `assets`, `styles`, and `scripts` folders
- Check that folder names are lowercase
- Clear your browser cache

### "Certificate error (not secure)"
- Wait 5-10 minutes after adding custom domain
- Then enable "Enforce HTTPS" in GitHub Pages settings
- If still issues, disable and re-enable after 1 hour

---

## ✅ SUCCESS CHECKLIST

- [ ] GitHub account created
- [ ] Repository created and named `awakenitis-website`
- [ ] All files uploaded from `github-upload` folder
- [ ] GitHub Pages enabled (Settings → Pages → main branch)
- [ ] Custom domain added: `awakenitis.com`
- [ ] DNS records updated in Namecheap (4 A records + 1 CNAME)
- [ ] Waited 1-24 hours for DNS propagation
- [ ] Tested: `awakenitis.com` shows new website
- [ ] HTTPS enforced (padlock icon in browser)

---

## 📱 QUICK VERIFICATION

**After setup, your website should:**
1. Load when typing "awakenitis.com"
2. Show dark theme with white text
3. Display your colorful AWAKENITIS logo
4. Show "Since June 2025™"
5. Have daily inspirational quote
6. Show "Under Construction" message
7. Have secure HTTPS (padlock icon)
8. Work on mobile devices

---

## 🔄 UPDATING YOUR WEBSITE IN THE FUTURE

Once GitHub Pages is set up:

1. Go to your GitHub repository
2. Click on the file you want to edit (e.g., `index.html`)
3. Click the pencil icon (Edit)
4. Make your changes
5. Click "Commit changes"
6. Wait 2-3 minutes
7. **Refresh awakenitis.com - changes appear automatically!**

---

## 📞 NEED MORE HELP?

**Start a new conversation and paste:**
```
I'm setting up GitHub Pages for AWAKENITIS (awakenitis.com). 
I'm stuck at: [describe where you're stuck]
```

Then paste the master document so I have all your info!

---

**🎉 Good luck! Your website will be live on awakenitis.com soon!**
