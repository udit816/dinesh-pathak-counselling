# 🧘 Dinesh Pathak Counselling Website

A modern, responsive counselling website built with React, Vite, and Tailwind CSS. Features an integrated booking system with payment processing (Stripe) and appointment scheduling (Calendly).

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4.10-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-06B6D4?logo=tailwindcss)

---

## 📋 Table of Contents

- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Local Setup](#-local-setup)
- [Local Development & Testing Guide](#-local-development--testing-guide)
- [Environment Variables](#-environment-variables)
- [Deployment Options](#-deployment-options)
  - [Vercel (Recommended - FREE)](#1-vercel-recommended---free)
  - [Netlify (FREE)](#2-netlify-free)
  - [AWS S3 + CloudFront](#3-aws-s3--cloudfront-1-5month)
  - [GitHub Pages (FREE)](#4-github-pages-free)
  - [Cloudflare Pages (FREE)](#5-cloudflare-pages-free)
- [Custom Domain Setup](#-custom-domain-setup)
- [Post-Deployment](#-post-deployment)
- [Project Structure](#-project-structure)
- [Troubleshooting](#-troubleshooting)
- [Maintenance](#-maintenance)

---

## ✨ Features

- 🎨 **Modern UI/UX** - Clean, responsive design with Tailwind CSS
- 📱 **Mobile-First** - Fully responsive across all devices
- 📅 **Booking System** - Multi-step booking flow with service selection
- 💳 **Payment Integration** - Stripe payment processing (ready for production)
- 🗓️ **Calendly Integration** - Seamless appointment scheduling
- ⚡ **Fast Performance** - Built with Vite for optimal load times
- 🔒 **Secure** - Environment variable management for sensitive data

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (v7.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** (optional, for version control) - [Download here](https://git-scm.com/)

Check your versions:
```bash
node --version
npm --version
```

---

## 🚀 Local Setup

### Step 1: Navigate to Project Directory

```bash
cd /home/ubuntu/dinesh_pathak_counselling
```

### Step 2: Install Dependencies

```bash
npm install
```

Or if you prefer yarn:
```bash
yarn install
```

### Step 3: Set Up Environment Variables

1. Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your credentials (see [Environment Variables](#-environment-variables) section)

### Step 4: Start Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:5173` (or the port shown in terminal)

### Step 5: Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Step 6: Preview Production Build (Optional)

```bash
npm run preview
```

Preview the production build locally at `http://localhost:4173`

---

## 🧪 Local Development & Testing Guide

This section provides comprehensive guidance for local development, testing, and debugging.

### Development Server Features

#### Hot Module Replacement (HMR)
The Vite dev server includes automatic hot reload:
- **CSS changes**: Instant updates without page refresh
- **Component changes**: Fast refresh preserves React state
- **Configuration changes**: Requires manual server restart

```bash
# Start dev server with HMR
npm run dev

# Server will show:
# ➜  Local:   http://localhost:5173/
# ➜  Network: http://192.168.x.x:5173/
```

#### Custom Port Configuration

If port 5173 is already in use, configure a custom port:

**Option 1: Command Line**
```bash
npm run dev -- --port 3000
```

**Option 2: Update `vite.config.js`**
```javascript
export default {
  server: {
    port: 3000,
    strictPort: true, // Exit if port is already in use
    open: true,       // Auto-open browser on server start
  }
}
```

### Testing on Mobile Devices (Local Network)

To test the website on your phone/tablet while developing:

**Step 1: Start dev server with network access**
```bash
npm run dev -- --host
```

**Step 2: Find your local IP address**
```bash
# On Linux/Mac
hostname -I
# Or
ifconfig | grep "inet "

# On Windows
ipconfig
```

**Step 3: Access from mobile device**
- Ensure your mobile is on the **same WiFi network**
- Open browser and navigate to: `http://YOUR_LOCAL_IP:5173`
- Example: `http://192.168.1.100:5173`

**Troubleshooting Network Access:**
```bash
# If mobile can't connect, check firewall:
sudo ufw allow 5173  # Linux
# Or temporarily disable firewall for testing
```

### Testing the Booking Flow Locally

#### Complete Booking Flow Test

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Test Service Selection:**
   - Click "Book a Session" button (Header or Hero section)
   - Modal should open with three service cards
   - Select a service (Education/Marriage/Life Guidance)
   - Verify service highlights with green border
   - Click "Continue to Payment"

3. **Test Payment Flow (Test Mode):**
   - The PaymentForm component runs in **test mode** by default
   - It simulates payments with 90% success / 10% failure rate
   - **No real payment processing** occurs locally
   - Click "Pay Now" button
   - Wait 2-3 seconds for simulation
   - Should proceed to Calendly booking on success

4. **Test Calendly Integration:**
   - After "payment success", Calendly widget should load
   - If username is not set, you'll see an error message
   - Set `VITE_CALENDLY_USERNAME` in `.env` to test properly

5. **Test Booking Confirmation:**
   - After selecting a Calendly slot, confirmation screen appears
   - Verify service details display correctly
   - Test "Done" button (closes modal)

#### Quick Test Checklist

```bash
# Open browser DevTools (F12) and test:
```

- [ ] Modal opens/closes smoothly
- [ ] Service selection state updates
- [ ] Payment simulation works
- [ ] Calendly widget loads (with valid username)
- [ ] Confirmation screen displays
- [ ] Modal closes on completion
- [ ] Can restart flow by clicking "Book" again

### Testing Payment Integration

#### Test Mode (Default - No Stripe Account Needed)

The app uses **simulated payments** by default for local development:

**How it works:**
- Located in `src/components/PaymentForm.jsx`
- Simulates payment processing with setTimeout
- 90% success rate, 10% failure rate
- No real money or Stripe account required

**Testing both scenarios:**
```javascript
// To test payment success:
// Just click "Pay Now" - works most of the time

// To test payment failure:
// Keep clicking "Pay Now" until you hit the 10% failure rate
// Or temporarily modify PaymentForm.jsx:
const success = Math.random() > 0.5; // 50/50 chance for testing
```

#### Stripe Test Mode (Requires Stripe Account)

To test real Stripe integration locally:

**Step 1: Get Stripe Test Keys**
```bash
# Sign up at stripe.com (free)
# Use TEST MODE keys (not live keys)
```

**Step 2: Add to `.env`**
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51abc...
STRIPE_SECRET_KEY=sk_test_51xyz...
```

**Step 3: Use Stripe Test Cards**
```
✅ Success: 4242 4242 4242 4242
❌ Decline: 4000 0000 0000 0002
🔄 3D Secure: 4000 0027 6000 3184

Expiry: Any future date (e.g., 12/34)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
```

**Step 4: Monitor in Stripe Dashboard**
- Go to Stripe Dashboard → Payments
- All test payments appear here
- Check webhook logs if using webhooks

#### Testing Without Stripe

If you want to skip payment entirely for testing:

**Temporary Bypass (Development Only):**

Edit `src/components/BookingModal.jsx`:
```javascript
// Find the payment stage check
if (currentStep === 2 && paymentStatus === 'success') {
  // Change to:
  // Skip payment, go directly to Calendly
  setCurrentStep(3);
}

// Or set payment as succeeded by default:
const [paymentStatus, setPaymentStatus] = useState('success');
```

⚠️ **Remember to revert before deployment!**

### Testing Calendly Integration

#### Without Calendly Account
```env
# Leave this blank in .env
VITE_CALENDLY_USERNAME=
```
- You'll see an error message in the modal
- Booking flow still works up to the Calendly stage

#### With Calendly Account (Free)

**Step 1: Create Calendly Account**
- Sign up at [calendly.com](https://calendly.com) (free tier available)
- Create an event type (e.g., "Counselling Session")

**Step 2: Get Your Username**
```
Your Calendly link: https://calendly.com/YOUR-USERNAME/event
                                             ^^^^^^^^^^^^
                                             This is your username
```

**Step 3: Add to `.env`**
```env
VITE_CALENDLY_USERNAME=YOUR-USERNAME
```

**Step 4: Restart Dev Server**
```bash
# Vite requires restart for .env changes
npm run dev
```

**Step 5: Test Calendly Widget**
- Complete payment simulation
- Calendly widget should load in modal
- Select a time slot
- Check Calendly dashboard for test booking

#### Calendly Test Mode

Set availability to "test mode" in Calendly:
- Go to Calendly → Event Type Settings
- Set availability to very flexible hours
- Enable "Allow invitees to schedule" immediately
- After testing, update to actual availability

### Browser Developer Tools

#### Essential DevTools Usage

**Open DevTools:**
- **Chrome/Edge**: Press `F12` or `Ctrl+Shift+I` (Windows/Linux) / `Cmd+Option+I` (Mac)
- **Firefox**: Press `F12` or `Ctrl+Shift+I` / `Cmd+Option+I`

#### Console Tab

**View React component logs:**
```javascript
// Add debug logs in components
console.log('Selected service:', selectedService);
console.log('Payment status:', paymentStatus);
```

**Common console messages to watch:**
```
✅ Good:
- "Vite ready in 234ms"
- "[HMR] connected"

⚠️ Issues:
- "Failed to fetch"
- "Uncaught TypeError"
- "Warning: Each child should have a unique key"
```

#### Network Tab

**Monitor API calls:**
1. Open Network tab
2. Filter by "Fetch/XHR"
3. Watch for:
   - Stripe API calls (when using real Stripe)
   - Calendly widget loading
   - Image loading issues

**Check loading performance:**
- Look for slow requests (>1s)
- Identify large files
- Verify CORS issues

#### Elements/Inspector Tab

**Live CSS editing:**
- Right-click any element → Inspect
- Edit Tailwind classes in real-time
- Test responsive design:
  - Click device toolbar icon (Ctrl+Shift+M)
  - Select iPhone, iPad, etc.
  - Test different screen sizes

#### Application Tab

**Check environment variables:**
```javascript
// In console, verify environment variables loaded:
console.log(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
console.log(import.meta.env.VITE_CALENDLY_USERNAME);
```

**Local Storage / Session Storage:**
- Check if any data is persisted
- Clear storage if testing fresh state

#### React Developer Tools (Extension)

**Install:**
- [Chrome Extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [Firefox Add-on](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

**Usage:**
- Opens "Components" and "Profiler" tabs
- Inspect component props and state
- Track component re-renders
- Debug modal state (`isBookingModalOpen`, `currentStep`, etc.)

### Common Development Issues & Solutions

#### Issue: Port Already in Use

**Error:**
```
Error: Port 5173 is already in use
```

**Solutions:**
```bash
# Option 1: Kill process using the port
lsof -ti:5173 | xargs kill -9

# Option 2: Use different port
npm run dev -- --port 3000

# Option 3: Find and kill process manually
# Linux/Mac:
lsof -i :5173
kill -9 <PID>

# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

#### Issue: Environment Variables Not Loading

**Error:**
```javascript
import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY is undefined
```

**Solutions:**
```bash
# 1. Verify .env file exists in project root
ls -la .env

# 2. Check variable names start with VITE_
# ❌ Wrong: STRIPE_KEY=abc
# ✅ Correct: VITE_STRIPE_KEY=abc

# 3. Restart dev server (required for .env changes)
# Press Ctrl+C to stop
npm run dev

# 4. Verify in browser console
console.log(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
```

#### Issue: White Blank Page

**Solutions:**
```bash
# 1. Check browser console for errors
# Right-click → Inspect → Console tab

# 2. Clear Vite cache
rm -rf node_modules/.vite
npm run dev

# 3. Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# 4. Check if index.html exists
ls index.html
```

#### Issue: Modal Not Opening

**Debug steps:**
```javascript
// 1. Check App.jsx state
// Add console.log in App.jsx:
const openBookingModal = () => {
  console.log('Opening modal');
  setIsBookingModalOpen(true);
};

// 2. Verify button onClick is working
// In browser console:
document.querySelector('button').click();

// 3. Check CSS display/visibility
// In Elements tab, verify modal has classes:
// - Not: display: none
// - Not: visibility: hidden
```

#### Issue: Images Not Loading

**Error:**
```
GET http://localhost:5173/dp_01.jpg 404 (Not Found)
```

**Solutions:**
```bash
# 1. Verify image location
ls public/dp_01.jpg

# 2. Check import path in component
# ✅ Correct: src="/dp_01.jpg"
# ❌ Wrong: src="./dp_01.jpg" or src="dp_01.jpg"

# 3. Restart dev server
npm run dev

# 4. Clear browser cache
# Ctrl+Shift+R (hard refresh)
```

#### Issue: Tailwind Classes Not Working

**Solutions:**
```bash
# 1. Verify Tailwind is installed
npm list tailwindcss

# 2. Check tailwind.config.js content paths
# Should include: "./src/**/*.{js,jsx,ts,tsx}"

# 3. Verify index.css has Tailwind directives
cat src/index.css
# Should contain:
# @tailwind base;
# @tailwind components;
# @tailwind utilities;

# 4. Restart dev server
npm run dev
```

#### Issue: Payment Form Stuck Loading

**Debug:**
```javascript
// Open browser console during payment
// Check PaymentForm.jsx logs

// Verify setTimeout is completing:
setTimeout(() => {
  console.log('Payment simulation complete');
}, 2000);

// Check if onPaymentSuccess is called:
console.log('Payment success callback triggered');
```

#### Issue: Calendly Widget Not Loading

**Solutions:**
```bash
# 1. Check VITE_CALENDLY_USERNAME in .env
cat .env | grep CALENDLY

# 2. Verify username is correct
# Test URL directly: https://calendly.com/YOUR-USERNAME

# 3. Check browser console for Calendly errors
# Common: "Failed to load Calendly script"

# 4. Test with public Calendly event
# Try a different Calendly username temporarily

# 5. Check if Calendly script is blocked
# Look in Network tab for blocked requests
```

#### Issue: Hot Reload Not Working

**Solutions:**
```bash
# 1. Check Vite is detecting changes
# Terminal should show:
# "hmr update /src/components/Header.jsx"

# 2. Save file properly (Ctrl+S)
# Some editors need explicit save

# 3. Check file watcher limits (Linux)
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# 4. Restart dev server
# Ctrl+C then npm run dev

# 5. Disable browser cache during development
# DevTools → Network tab → "Disable cache" checkbox
```

### Debugging Tips

#### 1. React State Debugging

**Add debug logs in components:**
```javascript
// In BookingModal.jsx
useEffect(() => {
  console.log('Current step:', currentStep);
  console.log('Payment status:', paymentStatus);
  console.log('Selected service:', selectedService);
}, [currentStep, paymentStatus, selectedService]);
```

#### 2. Conditional Rendering Issues

**Debug render logic:**
```javascript
// Check what's being rendered
console.log('Should render modal:', isBookingModalOpen);
console.log('Current step component:', 
  currentStep === 1 ? 'ServiceSelection' :
  currentStep === 2 ? 'PaymentForm' :
  currentStep === 3 ? 'Calendly' : 'Confirmation'
);
```

#### 3. Performance Debugging

**Identify slow components:**
```bash
# Install React DevTools browser extension
# Use Profiler tab to record component renders
# Look for components rendering too frequently
```

**Check bundle size:**
```bash
# Build and analyze
npm run build

# Check dist/ folder size
du -sh dist/

# Large files indicate optimization needed
ls -lh dist/assets/
```

#### 4. Network Request Debugging

**Mock failed API calls:**
```javascript
// Simulate network failure in PaymentForm.jsx
const simulatePayment = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Network error'));
    }, 2000);
  });
};
```

### Development Workflow Best Practices

#### 1. Code Changes Workflow
```bash
# 1. Make changes in your editor
# 2. Save file (Ctrl+S)
# 3. Check browser auto-refreshes (HMR)
# 4. Check console for errors
# 5. Test the change manually
```

#### 2. Testing Before Deployment
```bash
# Always run production build locally first
npm run build
npm run preview

# Access at http://localhost:4173
# Test entire booking flow
# Check browser console for errors
# Test on mobile view (DevTools)
```

#### 3. Environment-Specific Testing

**Test with production-like settings:**
```bash
# Create .env.production.local
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_production_sim
VITE_CALENDLY_USERNAME=your-production-username

# Build with production env
npm run build
npm run preview
```

#### 4. Git Workflow for Development

```bash
# Create feature branch
git checkout -b feature/payment-testing

# Make changes and commit frequently
git add .
git commit -m "Add payment error handling"

# Test thoroughly before merging
npm run build && npm run preview

# Merge to main when ready
git checkout main
git merge feature/payment-testing
```

### Quick Reference Commands

```bash
# Start development
npm run dev                    # Start dev server (port 5173)
npm run dev -- --port 3000    # Custom port
npm run dev -- --host         # Network access

# Build and preview
npm run build                  # Production build
npm run preview                # Preview build (port 4173)

# Troubleshooting
rm -rf node_modules .vite     # Clear cache
npm install                    # Reinstall dependencies
pkill -f vite                  # Kill all Vite processes

# Debugging
npm run dev -- --debug         # Verbose logging
node --version                 # Check Node.js version
npm list react                 # Check React version
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with these variables:

```env
# Stripe Payment Keys (Get from https://dashboard.stripe.com/apikeys)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here

# Calendly Integration (Your Calendly username)
VITE_CALENDLY_USERNAME=your-calendly-username

# Session Pricing (in INR or your currency)
VITE_SESSION_PRICE_EDUCATION=1500
VITE_SESSION_PRICE_MARRIAGE=2000
VITE_SESSION_PRICE_LIFE=1500

# Contact Information
VITE_CONTACT_EMAIL=contact@dineshpathak.com
VITE_CONTACT_PHONE=+91-XXXXXXXXXX
```

### 🔑 Getting Your Keys:

**Stripe:**
1. Sign up at [stripe.com](https://stripe.com)
2. Go to Developers → API Keys
3. Copy your "Publishable key" (starts with `pk_test_` for test mode)
4. Copy your "Secret key" (starts with `sk_test_` for test mode)

**Calendly:**
1. Sign up at [calendly.com](https://calendly.com)
2. Your username is in your scheduling link: `calendly.com/YOUR-USERNAME`

⚠️ **Security Note:** Never commit `.env` files to version control!

---

## 🌐 Deployment Options

Choose the platform that best fits your needs. All free options include:
- ✅ Automatic HTTPS/SSL
- ✅ CDN for fast global delivery
- ✅ Custom domain support

---

### 1️⃣ Vercel (Recommended - FREE)

**💰 Cost:** Free forever (Generous limits: 100GB bandwidth/month)

#### Method A: Vercel CLI (Fastest)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   cd /home/ubuntu/dinesh_pathak_counselling
   vercel
   ```

4. **Follow the prompts:**
   - "Set up and deploy?" → `Y`
   - "Which scope?" → Select your account
   - "Link to existing project?" → `N`
   - "What's your project's name?" → `dinesh-pathak-counselling`
   - "In which directory is your code located?" → `./`
   - Override settings? → `N`

5. **Add Environment Variables:**
   ```bash
   vercel env add VITE_STRIPE_PUBLISHABLE_KEY
   # Paste your key when prompted
   
   vercel env add VITE_CALENDLY_USERNAME
   # Paste your username when prompted
   ```

6. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

#### Method B: Vercel Dashboard (Beginner-Friendly)

1. **Build the project locally:**
   ```bash
   npm run build
   ```

2. **Go to [vercel.com](https://vercel.com)** and sign up/login

3. **Click "Add New Project"**

4. **Choose deployment method:**
   - **Option 1: Drag & Drop**
     - Drag the `dist` folder to the upload area
   
   - **Option 2: Import Git Repository**
     - Connect GitHub/GitLab/Bitbucket
     - Select your repository
     - Vercel auto-detects Vite settings

5. **Configure Project:**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

6. **Add Environment Variables:**
   - Go to Project Settings → Environment Variables
   - Add each variable from your `.env` file
   - Make sure to select "Production", "Preview", and "Development"

7. **Click "Deploy"**

8. **Your site is live!** 🎉
   - URL: `https://your-project-name.vercel.app`

#### Automatic Deployments (Git Integration)

Once connected to Git:
- Every push to `main` branch → Auto-deploy to production
- Every pull request → Auto-deploy preview URL

---

### 2️⃣ Netlify (FREE)

**💰 Cost:** Free forever (100GB bandwidth/month, 300 build minutes/month)

#### Method A: Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login:**
   ```bash
   netlify login
   ```

3. **Initialize and Deploy:**
   ```bash
   cd /home/ubuntu/dinesh_pathak_counselling
   netlify init
   ```

4. **Follow prompts:**
   - "Create & configure a new site" → `Y`
   - "Team" → Select your team
   - "Site name" → `dinesh-pathak-counselling`
   - "Build command" → `npm run build`
   - "Publish directory" → `dist`

5. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

6. **Add Environment Variables:**
   ```bash
   netlify env:set VITE_STRIPE_PUBLISHABLE_KEY "pk_test_your_key"
   netlify env:set VITE_CALENDLY_USERNAME "your-username"
   ```

#### Method B: Netlify Dashboard

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Go to [netlify.com](https://netlify.com)** and sign up/login

3. **Click "Add new site"**

4. **Choose method:**
   - **Drag & Drop:** Drag `dist` folder
   - **Import from Git:** Connect repository

5. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18` (add in Environment Variables: `NODE_VERSION=18`)

6. **Environment Variables:**
   - Go to Site Settings → Environment Variables
   - Add all variables from `.env`

7. **Click "Deploy site"**

8. **Live URL:** `https://your-site-name.netlify.app`

#### Netlify Configuration File (Optional)

Create `netlify.toml` in root:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### 3️⃣ AWS S3 + CloudFront ($1-5/month)

**💰 Cost:** 
- S3 Storage: ~$0.023/GB/month
- CloudFront: Free tier 50GB/month, then $0.085/GB
- Route 53 (DNS): $0.50/hosted zone/month
- **Estimated Total:** $1-5/month for typical traffic

#### Step-by-Step Setup:

**1. Create S3 Bucket**

```bash
# Install AWS CLI if not already installed
# Follow: https://aws.amazon.com/cli/

# Configure AWS credentials
aws configure
# Enter your Access Key, Secret Key, Region (e.g., us-east-1)

# Create bucket (replace with your domain name)
aws s3 mb s3://dinesh-pathak-counselling --region us-east-1

# Build the project
npm run build

# Upload files to S3
aws s3 sync dist/ s3://dinesh-pathak-counselling --delete
```

**2. Enable Static Website Hosting**

```bash
# Enable website hosting
aws s3 website s3://dinesh-pathak-counselling \
  --index-document index.html \
  --error-document index.html
```

**3. Set Bucket Policy (Make Public)**

Create `bucket-policy.json`:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::dinesh-pathak-counselling/*"
    }
  ]
}
```

Apply policy:
```bash
aws s3api put-bucket-policy \
  --bucket dinesh-pathak-counselling \
  --policy file://bucket-policy.json
```

**4. Set Up CloudFront CDN**

1. **Via AWS Console:**
   - Go to CloudFront → Create Distribution
   - Origin Domain: Select your S3 bucket
   - Origin Path: Leave empty
   - Viewer Protocol Policy: Redirect HTTP to HTTPS
   - Allowed HTTP Methods: GET, HEAD
   - Cache Policy: CachingOptimized
   - Price Class: Use All Edge Locations
   - Alternate Domain Names (CNAMEs): `www.yoursite.com`, `yoursite.com`
   - SSL Certificate: Request certificate (free) via ACM
   - Default Root Object: `index.html`

2. **Configure Custom Error Pages:**
   - Error Pages → Create Custom Error Response
   - HTTP Error Code: 403 and 404
   - Customize Error Response: Yes
   - Response Page Path: `/index.html`
   - HTTP Response Code: 200

**5. SSL Certificate (Free via AWS Certificate Manager)**

```bash
# Request certificate (must be in us-east-1 for CloudFront)
aws acm request-certificate \
  --domain-name yoursite.com \
  --subject-alternative-names www.yoursite.com \
  --validation-method DNS \
  --region us-east-1
```

**6. DNS Configuration (Route 53 or Your DNS Provider)**

If using Route 53:
```bash
# Create hosted zone
aws route53 create-hosted-zone \
  --name yoursite.com \
  --caller-reference $(date +%s)
```

Add A records pointing to CloudFront distribution.

**7. Invalidate Cache After Updates**

```bash
# After uploading new files
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

---

### 4️⃣ GitHub Pages (FREE)

**💰 Cost:** Free (1GB storage, 100GB bandwidth/month)

**Note:** GitHub Pages serves from root or `/docs` folder, so we need an extra step.

#### Setup:

1. **Create GitHub Repository:**
   ```bash
   cd /home/ubuntu/dinesh_pathak_counselling
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/dinesh-pathak-counselling.git
   git push -u origin main
   ```

2. **Install gh-pages Package:**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Update `package.json`:**
   ```json
   {
     "homepage": "https://YOUR_USERNAME.github.io/dinesh-pathak-counselling",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

5. **Configure GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: Deploy from branch `gh-pages`
   - Folder: `/ (root)`
   - Save

6. **Live URL:** `https://YOUR_USERNAME.github.io/dinesh-pathak-counselling`

#### Custom Domain on GitHub Pages:

1. Add `CNAME` file to `public/` folder:
   ```
   yoursite.com
   ```

2. In GitHub repo settings → Pages:
   - Custom domain: `yoursite.com`
   - Enforce HTTPS: ✅

3. Update DNS (see [Custom Domain Setup](#-custom-domain-setup))

---

### 5️⃣ Cloudflare Pages (FREE)

**💰 Cost:** Free (Unlimited bandwidth, 500 builds/month)

#### Method A: Cloudflare Dashboard (Git Integration)

1. **Go to [pages.cloudflare.com](https://pages.cloudflare.com)**

2. **Connect Git:**
   - Click "Create a project"
   - Connect GitHub/GitLab account
   - Select repository

3. **Build Settings:**
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/`

4. **Environment Variables:**
   - Add all variables from `.env`
   - Make sure they start with `VITE_`

5. **Deploy**

6. **Live URL:** `https://your-project.pages.dev`

#### Method B: Direct Upload (Wrangler CLI)

1. **Install Wrangler:**
   ```bash
   npm install -g wrangler
   ```

2. **Login:**
   ```bash
   wrangler login
   ```

3. **Build and Deploy:**
   ```bash
   npm run build
   wrangler pages deploy dist --project-name=dinesh-pathak-counselling
   ```

#### Custom Domain on Cloudflare Pages:

1. Go to Pages project → Custom domains
2. Click "Set up a custom domain"
3. Enter your domain
4. Cloudflare automatically configures DNS if your domain is on Cloudflare

---

## 🌍 Custom Domain Setup

### Prerequisites:
- Own a domain (purchased from GoDaddy, Namecheap, Google Domains, etc.)
- Access to domain's DNS settings

### General DNS Configuration:

#### For Root Domain (yoursite.com):

| Platform | Record Type | Name | Value | TTL |
|----------|-------------|------|-------|-----|
| Vercel | A | @ | 76.76.21.21 | Auto |
| Netlify | A | @ | 75.2.60.5 | 3600 |
| Cloudflare Pages | CNAME | @ | your-project.pages.dev | Auto |
| GitHub Pages | A | @ | 185.199.108.153 | 3600 |
| AWS CloudFront | A (Alias) | @ | CloudFront distribution | Auto |

#### For WWW Subdomain (www.yoursite.com):

| Platform | Record Type | Name | Value | TTL |
|----------|-------------|------|-------|-----|
| Vercel | CNAME | www | cname.vercel-dns.com | Auto |
| Netlify | CNAME | www | your-site.netlify.app | 3600 |
| Cloudflare Pages | CNAME | www | your-project.pages.dev | Auto |
| GitHub Pages | CNAME | www | YOUR_USERNAME.github.io | 3600 |
| AWS CloudFront | CNAME | www | CloudFront distribution | Auto |

### Platform-Specific Instructions:

#### Vercel:
1. Go to Project Settings → Domains
2. Add domain: `yoursite.com`
3. Follow DNS instructions (add A and CNAME records)
4. Add `www.yoursite.com` (Vercel creates redirect automatically)

#### Netlify:
1. Site Settings → Domain Management → Add custom domain
2. Enter domain → Verify ownership
3. Update DNS records as instructed
4. Enable HTTPS (automatic via Let's Encrypt)

#### Cloudflare Pages:
1. Pages project → Custom domains → Set up custom domain
2. If domain is on Cloudflare: Automatic DNS configuration
3. If external: Add CNAME record pointing to `your-project.pages.dev`

#### AWS CloudFront:
1. Request SSL certificate in ACM (must be in us-east-1)
2. Verify domain ownership (DNS or email)
3. Add domain to CloudFront distribution (Alternate Domain Names)
4. Update DNS:
   - Route 53: Create A record (Alias) pointing to distribution
   - External DNS: Create CNAME record

### SSL/HTTPS Setup:

✅ **All platforms provide free SSL certificates automatically!**

- **Vercel/Netlify/Cloudflare:** Auto-provisioned Let's Encrypt
- **GitHub Pages:** Auto HTTPS after DNS propagation
- **AWS:** Free via AWS Certificate Manager (ACM)

### DNS Propagation:

⏰ **DNS changes take 1-48 hours to propagate globally**

Check status:
```bash
# Check DNS propagation
nslookup yoursite.com

# Or use online tools
# https://www.whatsmydns.net
```

---

## 🎯 Post-Deployment

### 1. Configure Stripe for Live Payments

**Switch from Test Mode to Live Mode:**

1. **Complete Stripe Account Activation:**
   - Go to [Stripe Dashboard](https://dashboard.stripe.com)
   - Complete business verification
   - Add bank account details

2. **Get Live API Keys:**
   - Switch from "Test mode" to "Live mode" (toggle in dashboard)
   - Go to Developers → API Keys
   - Copy **Live Publishable Key** (`pk_live_...`)
   - Copy **Live Secret Key** (`sk_live_...`)

3. **Update Environment Variables:**
   - In your deployment platform (Vercel/Netlify/etc.)
   - Update `VITE_STRIPE_PUBLISHABLE_KEY` with live key
   - Update `STRIPE_SECRET_KEY` with live secret (if using backend)
   - Redeploy the site

4. **Test Live Payment:**
   - Use a real card with small amount
   - Verify payment appears in Stripe dashboard

**Important:** Never commit live keys to Git!

### 2. Verify Calendly Integration

1. **Test the Booking Flow:**
   - Complete a test booking (use test payment in Stripe)
   - Verify Calendly widget loads correctly
   - Book a test appointment

2. **Check Calendly Settings:**
   - Go to [calendly.com/app/admin/event_types](https://calendly.com/app/admin/event_types)
   - Ensure event types are active
   - Set availability hours
   - Configure notifications

3. **Update Environment Variable:**
   ```env
   VITE_CALENDLY_USERNAME=your-actual-username
   ```

### 3. Testing Checklist

- [ ] Homepage loads correctly
- [ ] All sections visible (Header, Hero, About, Services, Footer)
- [ ] Responsive design works on mobile
- [ ] "Book a Session" button opens modal
- [ ] Service selection works
- [ ] Payment form submits successfully
- [ ] Calendly widget loads after payment
- [ ] Booking confirmation displays
- [ ] Social media links work
- [ ] Contact email link works
- [ ] Custom domain loads with HTTPS
- [ ] All images load properly

### 4. Set Up Analytics (Optional)

**Google Analytics:**

1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to `index.html` or use `react-ga4` package

**Vercel Analytics:**
```bash
npm install @vercel/analytics
```

Add to `main.jsx`:
```javascript
import { Analytics } from '@vercel/analytics/react';

// In your App component
<Analytics />
```

---

## 📁 Project Structure

```
dinesh_pathak_counselling/
├── public/                  # Static assets
│   ├── dp_01.jpg           # Profile image
│   └── dp_02.JPG           # Alternate profile image
├── src/
│   ├── components/          # React components
│   │   ├── About.jsx       # About section
│   │   ├── BookingConfirmation.jsx
│   │   ├── BookingModal.jsx # Main booking flow
│   │   ├── Footer.jsx       # Footer with social links
│   │   ├── Header.jsx       # Navigation header
│   │   ├── Hero.jsx         # Hero section
│   │   ├── PaymentForm.jsx  # Stripe payment
│   │   ├── ServiceSelection.jsx
│   │   └── Services.jsx     # Services cards
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles (Tailwind)
├── .env                     # Environment variables (create this)
├── .env.example             # Environment template
├── .gitignore               # Git ignore rules
├── index.html               # HTML entry point
├── package.json             # Dependencies and scripts
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.js       # Tailwind customization
├── vite.config.js           # Vite configuration
├── PAYMENT_SETUP.md         # Payment integration guide
└── README.md                # This file
```

### Key Files:

- **`App.jsx`**: Main component managing modal state
- **`BookingModal.jsx`**: Multi-step booking flow logic
- **`PaymentForm.jsx`**: Stripe integration (currently in test mode)
- **`.env`**: Store sensitive API keys (never commit!)
- **`vite.config.js`**: Vite build configuration
- **`tailwind.config.js`**: Tailwind CSS customization

---

## 🔧 Troubleshooting

### Build Errors

**Error: "Cannot find module 'vite'"**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Error: "Failed to resolve import"**
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

**Error: Environment variables not working**
```bash
# Ensure .env file exists and variables start with VITE_
# Restart dev server after .env changes
```

### Deployment Issues

**Vercel: Build fails with "Command not found"**
- Check Node.js version in Project Settings → General
- Set to Node.js 18.x or higher

**Netlify: Site shows blank page**
- Verify build output directory is `dist`
- Add redirect rule in `netlify.toml`:
  ```toml
  [[redirects]]
    from = "/*"
    to = "/index.html"
    status = 200
  ```

**GitHub Pages: 404 on routes**
- GitHub Pages doesn't support SPA routing well
- Consider using hash router or Vercel/Netlify instead

**Stripe: "Invalid API Key"**
- Verify key starts with `pk_test_` or `pk_live_`
- Check environment variable name: `VITE_STRIPE_PUBLISHABLE_KEY`
- Redeploy after changing environment variables

**Calendly: Widget not loading**
- Check username in environment variable
- Test Calendly link directly: `calendly.com/YOUR-USERNAME`
- Check browser console for errors

### Performance Issues

**Slow Loading:**
```bash
# Optimize build
npm run build

# Check bundle size
npm install -g vite-bundle-visualizer
npx vite-bundle-visualizer
```

**Images Too Large:**
- Compress images before uploading (use tinypng.com)
- Serve WebP format instead of JPG/PNG
- Add lazy loading to images:
  ```jsx
  <img src="/dp_01.jpg" loading="lazy" alt="..." />
  ```

### Common Questions

**Q: How do I update content on the live site?**
A: Edit the files locally, rebuild (`npm run build`), and redeploy:
- Vercel/Netlify (Git): Push to main branch
- Manual deploy: Run deploy command again

**Q: Can I use a different payment gateway?**
A: Yes! See `PAYMENT_SETUP.md` for Razorpay, Paytm, and Instamojo guides.

**Q: How do I change pricing?**
A: Update environment variables in `.env` and redeploy:
```env
VITE_SESSION_PRICE_EDUCATION=2000
```

**Q: Can I use this without Calendly?**
A: Yes, but you'll need to build a custom booking backend or integrate another scheduling service.

---

## 🔄 Maintenance

### Updating Content

1. **Edit component files** in `src/components/`
2. **Test locally:**
   ```bash
   npm run dev
   ```
3. **Build and deploy:**
   ```bash
   npm run build
   # Then deploy using your platform's method
   ```

### Updating Dependencies

```bash
# Check for outdated packages
npm outdated

# Update all packages
npm update

# Update specific package
npm install react@latest

# Update major versions (use with caution)
npx npm-check-updates -u
npm install
```

### Redeployment Process

**Vercel (Git):**
```bash
git add .
git commit -m "Update content"
git push origin main
# Auto-deploys to production
```

**Netlify (CLI):**
```bash
npm run build
netlify deploy --prod
```

**AWS S3:**
```bash
npm run build
aws s3 sync dist/ s3://your-bucket-name --delete
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

### Backup Strategy

**Version Control (Recommended):**
```bash
# Initialize git if not done
git init
git add .
git commit -m "Backup $(date +%Y-%m-%d)"

# Push to GitHub (private repository)
git remote add origin https://github.com/YOUR_USERNAME/counselling-site.git
git push -u origin main
```

**Manual Backup:**
```bash
# Create backup archive
tar -czf backup-$(date +%Y%m%d).tar.gz /home/ubuntu/dinesh_pathak_counselling
```

### Monitoring

**Set up uptime monitoring (Free tools):**
- [UptimeRobot](https://uptimerobot.com) - Free, checks every 5 minutes
- [StatusCake](https://www.statuscake.com) - Free tier available
- [Pingdom](https://www.pingdom.com) - Free tier for 1 site

**Check Stripe Dashboard:**
- Monitor successful/failed payments
- Set up email notifications for payments

---

## 📞 Support & Resources

### Documentation:
- [React Docs](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Calendly API](https://developer.calendly.com)

### Deployment Platforms:
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [AWS S3 Static Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages)

### Community:
- [Stack Overflow](https://stackoverflow.com/questions/tagged/react)
- [React Discord](https://discord.gg/react)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

---

## 📄 License

This project is private and proprietary. All rights reserved.

---

## 🙏 Credits

Built with ❤️ using:
- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Stripe](https://stripe.com)
- [Calendly](https://calendly.com)

---

## 📝 Changelog

### Version 1.0.0 (Initial Release)
- ✅ Responsive website with modern UI
- ✅ Multi-step booking system
- ✅ Stripe payment integration (test mode)
- ✅ Calendly appointment scheduling
- ✅ Contact form and social media links
- ✅ Mobile-optimized design

---

**Need help?** Check the [Troubleshooting](#-troubleshooting) section or review `PAYMENT_SETUP.md` for payment integration details.

**Ready to deploy?** Choose your preferred platform from [Deployment Options](#-deployment-options) and follow the step-by-step guide!

---

**🎉 Your counselling website is ready to go live!**

*Remember: When sharing localhost URLs with users, note that they refer to the computer running the application, not the user's local machine. For remote access, deploy to one of the platforms above.*
