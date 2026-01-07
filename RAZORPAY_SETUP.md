# Razorpay Integration Guide

## 1. Environment Setup

1. Copy `.env.example` to `.env` if you haven't already.
2. Add your Razorpay Key ID to `.env`:
   ```properties
   VITE_RAZORPAY_KEY_ID=rzp_test_...
   ```
   *Note: This key is safe to be exposed in the frontend.*

## 2. Backend Setup (Required)

Razorpay requires creating an Order on the server side to secure the transaction amount.

### Install Dependencies
If you are using Node.js/Vercel:
```bash
npm install razorpay
```

### Vercel Serverless Function Example (`api/create-razorpay-order.js`)

Create a file at `api/create-razorpay-order.js`:

```javascript
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.VITE_RAZORPAY_KEY_ID, // Or process.env.RAZORPAY_KEY_ID
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount, currency } = req.body;

  const options = {
    amount: amount, // Amount in paise
    currency: currency || "INR",
    receipt: "order_rcptid_" + Date.now(),
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

### IMPORTANT: Security
Never expose `RAZORPAY_KEY_SECRET` in your frontend code or `.env` file that is committed to Git. Use environment variables in your deployment platform (Vercel, Netlify, Render, etc.).

## 3. Frontend Flow

The frontend (`src/components/PaymentForm.jsx`) is configured to:
1. Load the Razorpay Checkout script.
2. Call `/api/create-razorpay-order` to get an Order ID.
   - *If this fails (e.g. no backend), it will warn but attempt to open the checkout anyway (note: this may fail in Live mode).*
3. Open the Razorpay Checkout modal.
4. On success, trigger `onPaymentSuccess()` which moves the user to the Booking step.

## 4. Testing

- Use **Test Mode** keys (`rzp_test_...`).
- When the payment modal opens, you can use Razorpay's test card details (usually available in the modal or docs).
- Verify the console logs for "Payment Success" and the payment ID.
