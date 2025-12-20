# Payment Integration Setup Guide

## Overview

This guide explains how to set up real payment processing for the counselling booking system using Stripe. The current implementation includes a test payment button that simulates the flow - follow these instructions to implement real payments.

---

## Architecture

### Booking Flow
```
User Journey:
1. Click "Book a Private Session" → Opens modal
2. Select Service (Education/Marriage/Life) → Shows pricing
3. Enter Payment Details → Process via Stripe
4. Payment Success → Show Calendly booking widget
5. Book Appointment → Confirmation screen

Payment Failure:
- User stays on payment screen
- Error message displayed
- Retry option available
- No access to Calendly until payment succeeds
```

### Components Structure
```
App.jsx
└── BookingModal.jsx (Main container, state management)
    ├── ServiceSelection.jsx (Step 1: Choose service)
    ├── PaymentForm.jsx (Step 2: Stripe payment)
    ├── Calendly Widget (Step 3: Book time slot)
    └── BookingConfirmation.jsx (Step 4: Success screen)
```

---

## Stripe Setup

### 1. Create Stripe Account

1. Go to [https://stripe.com](https://stripe.com)
2. Click "Start now" and sign up
3. Complete account verification:
   - Business details
   - Bank account information (for payouts)
   - Identity verification
4. Access your Dashboard

### 2. Get API Keys

1. Navigate to: **Dashboard → Developers → API keys**
2. You'll see two types of keys:

   **Test Mode Keys** (for development):
   - Publishable key: `pk_test_...`
   - Secret key: `sk_test_...`

   **Live Mode Keys** (for production):
   - Publishable key: `pk_live_...`
   - Secret key: `sk_live_...`

3. Copy the **Publishable key** for frontend use
4. Copy the **Secret key** for backend use (NEVER use in frontend)

### 3. Install Required Packages

```bash
cd /home/ubuntu/dinesh_pathak_counselling
yarn add @stripe/stripe-js @stripe/react-stripe-js
yarn add react-calendly
```

### 4. Configure Environment Variables

1. Create a `.env` file in the project root:

```bash
cp .env.example .env
```

2. Edit `.env` and add your Stripe keys:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_key_here
```

3. Add `.env` to `.gitignore` (already included)

---

## Backend Setup (Required)

### Why Backend is Needed

Stripe requires a backend to:
1. Create payment intents securely
2. Verify payment completion
3. Handle webhooks for payment confirmations
4. Protect your secret key

### Option 1: Serverless Functions (Recommended)

#### Using Vercel

1. Create `api/create-payment-intent.js`:

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { amount, currency, serviceId, serviceTitle } = req.body

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: currency || 'inr',
      metadata: {
        serviceId,
        serviceTitle
      },
      automatic_payment_methods: {
        enabled: true,
      },
    })

    res.status(200).json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
```

2. Install Stripe on backend:

```bash
yarn add stripe
```

3. Deploy to Vercel:

```bash
vercel
```

4. Add environment variables in Vercel Dashboard:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`

#### Using Netlify Functions

1. Create `netlify/functions/create-payment-intent.js` (similar structure)
2. Deploy to Netlify
3. Configure environment variables in Netlify Dashboard

### Option 2: Traditional Backend Server

#### Node.js/Express Example

```javascript
const express = require('express')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const app = express()

app.use(express.json())

app.post('/api/create-payment-intent', async (req, res) => {
  const { amount, currency, serviceId, serviceTitle } = req.body

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: currency || 'inr',
      metadata: { serviceId, serviceTitle }
    })

    res.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(5000)
```

Deploy to: Heroku, Railway, Render, DigitalOcean, etc.

### Option 3: Payment Links (No Code, Simplest)

**Best for quick MVP without backend:**

1. Go to Stripe Dashboard → Payment Links
2. Create payment links for each service:
   - Education Counselling (₹2,500)
   - Marriage Guidance (₹3,000)
   - Life Guidance (₹2,500)
3. Update `PaymentForm.jsx` to redirect to payment link
4. Set up success/cancel redirect URLs

**Pros:**
- No backend code needed
- Quick setup (5 minutes)
- Stripe handles everything

**Cons:**
- Less customization
- User leaves your site
- Limited control over flow

---

## Frontend Implementation

### Update PaymentForm.jsx

1. Open `/src/components/PaymentForm.jsx`
2. Follow the comments marked `UNCOMMENT FOR REAL STRIPE`
3. Key changes:

```javascript
// Remove the test payment section
// Uncomment the real Stripe Elements code

import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

function PaymentFormWrapper(props) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm {...props} />
    </Elements>
  )
}

export default PaymentFormWrapper
```

4. Uncomment the `handleRealPayment` function
5. Update the API endpoint URL to match your backend

---

## Webhook Setup (Production)

### Why Webhooks?

Webhooks ensure you receive payment confirmations even if:
- User closes browser after payment
- Network issues occur
- Payment is delayed (bank processing)

### Setup Steps

1. **Create Webhook Endpoint**

```javascript
// api/webhook.js (Vercel) or backend route
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  const sig = req.headers['stripe-signature']
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  let event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret)
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  // Handle the event
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object
    
    // TODO: Update database, send confirmation email, etc.
    console.log('Payment succeeded:', paymentIntent.id)
  }

  res.json({ received: true })
}
```

2. **Register Webhook in Stripe**

   - Dashboard → Developers → Webhooks
   - Click "Add endpoint"
   - URL: `https://your-domain.com/api/webhook`
   - Events to listen: `payment_intent.succeeded`, `payment_intent.payment_failed`
   - Copy webhook signing secret

3. **Add Secret to Environment**

```env
STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
```

---

## Testing

### Test Cards

Use these card numbers in test mode:

| Card Number | Scenario | CVC | Expiry |
|------------|----------|-----|--------|
| 4242 4242 4242 4242 | Success | Any 3 digits | Any future date |
| 4000 0000 0000 0002 | Decline | Any 3 digits | Any future date |
| 4000 0025 0000 3155 | 3D Secure | Any 3 digits | Any future date |
| 4000 0000 0000 9995 | Insufficient funds | Any 3 digits | Any future date |

### Testing Checklist

- [ ] Payment succeeds with valid card
- [ ] Payment fails with declined card
- [ ] Error messages display correctly
- [ ] User can retry after failure
- [ ] Calendly opens only after payment
- [ ] Booking confirmation shows
- [ ] Webhooks receive events (check Stripe Dashboard)
- [ ] Test on mobile devices
- [ ] Test with slow network

---

## Security Best Practices

### 1. API Keys

✅ **DO:**
- Use test keys in development
- Store keys in environment variables
- Use `.env` file (never commit to Git)
- Rotate keys if compromised

❌ **DON'T:**
- Hardcode keys in source code
- Share keys publicly
- Use secret keys in frontend
- Commit `.env` to Git

### 2. Payment Validation

- Always verify payments on backend
- Don't trust client-side payment status
- Use webhook events for confirmation
- Implement idempotency keys

### 3. Data Protection

- Never store card details (Stripe handles this)
- Use HTTPS only
- Implement rate limiting
- Log all transactions

---

## Going Live

### Pre-Launch Checklist

- [ ] Complete Stripe account verification
- [ ] Add bank account for payouts
- [ ] Switch to live API keys
- [ ] Test with real card (small amount)
- [ ] Set up webhooks in live mode
- [ ] Configure email notifications
- [ ] Add terms of service & refund policy
- [ ] Enable 3D Secure
- [ ] Set up fraud prevention (Stripe Radar)
- [ ] Compliance check (PCI DSS, etc.)

### Switch to Live Mode

1. Update `.env` with live keys:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_key_here
```

2. Redeploy application
3. Test with real payment (use your own card)
4. Monitor Stripe Dashboard for transactions

---

## Troubleshooting

### Common Issues

**"Stripe is not defined"**
- Ensure `@stripe/stripe-js` is installed
- Check import statements
- Verify environment variable is set

**"Payment intent creation failed"**
- Check backend API is running
- Verify STRIPE_SECRET_KEY is correct
- Check API endpoint URL

**"Webhook not receiving events"**
- Verify webhook URL is publicly accessible
- Check webhook secret matches
- Use Stripe CLI for local testing: `stripe listen --forward-to localhost:3000/api/webhook`

**"Card declined"**
- Check if using test card in test mode
- Verify card details format
- Check Stripe Dashboard for decline reason

### Debug Mode

Enable detailed logging:

```javascript
stripe.setMaxNetworkRetries(2)
stripe.setAppInfo({
  name: 'Counselling Booking',
  version: '1.0.0',
})
```

---

## Alternative Payment Gateways (India)

If you prefer Indian payment gateways:

### Razorpay (Most Popular in India)

- Website: https://razorpay.com
- Commission: ~2% per transaction
- Supports: UPI, Cards, Netbanking, Wallets
- Integration: Similar to Stripe, excellent docs

### Paytm

- Website: https://business.paytm.com
- Commission: ~2-3% per transaction
- Best for: Paytm wallet users

### Instamojo

- Website: https://www.instamojo.com
- Commission: ~2% + ₹3 per transaction
- Easiest: Payment links without coding

---

## Support

### Resources

- Stripe Documentation: https://stripe.com/docs
- Stripe Support: https://support.stripe.com
- React Stripe.js: https://stripe.com/docs/stripe-js/react
- Community: https://stackoverflow.com/questions/tagged/stripe-payments

### Contact

For implementation help:
- Check code comments in `PaymentForm.jsx`
- Review Stripe Dashboard logs
- Test with Stripe CLI: `stripe listen`

---

## Summary

**Current State:**
- ✅ Booking flow UI complete
- ✅ Service selection working
- ✅ Test payment simulation
- ✅ Calendly integration ready
- ⏳ Real Stripe payment (needs setup)

**To Complete:**
1. Create Stripe account & get API keys
2. Install Stripe packages
3. Set up backend/serverless function
4. Uncomment real payment code
5. Configure webhooks
6. Test thoroughly
7. Go live

**Time Estimate:**
- Basic setup: 2-3 hours
- Testing: 1-2 hours
- Production deployment: 1 hour

Good luck! 🚀
