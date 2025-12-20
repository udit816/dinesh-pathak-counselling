import React, { useState } from 'react'

/*
 * STRIPE PAYMENT INTEGRATION - SETUP INSTRUCTIONS
 * ================================================
 * 
 * This component contains placeholder code for Stripe payment integration.
 * Follow these steps to implement real payment processing:
 * 
 * 1. CREATE STRIPE ACCOUNT:
 *    - Go to https://stripe.com
 *    - Sign up for a free account
 *    - Complete account verification
 *    - Get your API keys from Dashboard > Developers > API keys
 * 
 * 2. INSTALL STRIPE PACKAGES:
 *    Run in terminal:
 *    ```
 *    cd /home/ubuntu/dinesh_pathak_counselling
 *    yarn add @stripe/stripe-js @stripe/react-stripe-js
 *    ```
 * 
 * 3. ADD ENVIRONMENT VARIABLES:
 *    Create/update .env file in project root:
 *    ```
 *    VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
 *    ```
 *    
 *    SECURITY WARNING: NEVER expose your Secret Key in frontend code!
 *    Secret key (sk_test_...) should ONLY be used on backend/serverless functions.
 * 
 * 4. BACKEND SETUP (Required for production):
 *    Stripe payments require a backend to:
 *    - Create payment intents securely
 *    - Verify payment completion
 *    - Handle webhooks for payment confirmations
 *    
 *    Options for this Vite/React app:
 *    a) Serverless Functions (Vercel/Netlify):
 *       - Create API endpoint: /api/create-payment-intent
 *       - Use Stripe Node.js SDK on backend
 *       - Example: https://stripe.com/docs/payments/quickstart
 *    
 *    b) Simple Backend Server:
 *       - Node.js/Express server
 *       - Deploy on Heroku/Railway/Render
 *    
 *    c) Payment Links (Simplest, no code):
 *       - Create payment links in Stripe Dashboard
 *       - Redirect users to Stripe checkout page
 *       - Handle success/cancel redirects
 * 
 * 5. IMPLEMENT STRIPE ELEMENTS:
 *    Uncomment the code sections below marked with "UNCOMMENT FOR REAL STRIPE"
 *    Remove the "Test Payment" button section
 * 
 * 6. TESTING:
 *    Use Stripe test cards:
 *    - Success: 4242 4242 4242 4242
 *    - Decline: 4000 0000 0000 0002
 *    - 3D Secure: 4000 0025 0000 3155
 *    Use any future expiry date and any 3-digit CVC
 * 
 * 7. WEBHOOK SETUP (Important for production):
 *    - Set up webhooks in Stripe Dashboard
 *    - Listen for 'payment_intent.succeeded' event
 *    - Verify payment and update your database
 *    - Send confirmation emails
 * 
 * 8. GO LIVE:
 *    - Switch from test keys to live keys
 *    - Enable live mode in Stripe Dashboard
 *    - Test thoroughly before launching
 * 
 * DOCUMENTATION:
 * - Stripe Docs: https://stripe.com/docs
 * - React Stripe.js: https://stripe.com/docs/stripe-js/react
 * - Payment Intents: https://stripe.com/docs/payments/payment-intents
 */

// UNCOMMENT FOR REAL STRIPE INTEGRATION:
// import { loadStripe } from '@stripe/stripe-js'
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

// Initialize Stripe (uncomment when ready)
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

function PaymentForm({ selectedService, onPaymentSuccess, onPaymentFailure, paymentStatus, onRetry, onBack }) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // TEST PAYMENT HANDLER (Remove this when implementing real Stripe)
  const handleTestPayment = async () => {
    setIsProcessing(true)
    setErrorMessage('')

    // Simulate API call delay
    setTimeout(() => {
      // Simulate 90% success rate for testing
      const isSuccess = Math.random() > 0.1

      if (isSuccess) {
        onPaymentSuccess()
      } else {
        setErrorMessage('Payment declined. Please try again or use a different payment method.')
        onPaymentFailure({ message: 'Test payment failed' })
      }
      setIsProcessing(false)
    }, 2000)
  }

  /* REAL STRIPE PAYMENT HANDLER (Uncomment when backend is ready)
  const handleRealPayment = async (event) => {
    event.preventDefault()
    setIsProcessing(true)
    setErrorMessage('')

    const stripe = useStripe()
    const elements = useElements()

    if (!stripe || !elements) {
      return
    }

    try {
      // Step 1: Create payment intent on your backend
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: selectedService?.price?.replace(/[^0-9]/g, '') || '2500', // Amount in smallest currency unit
          currency: 'inr',
          serviceId: selectedService?.id,
          serviceTitle: selectedService?.title
        })
      })

      const { clientSecret, error } = await response.json()

      if (error) {
        throw new Error(error)
      }

      // Step 2: Confirm payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Customer Name', // Get from form
            email: 'customer@example.com' // Get from form
          }
        }
      })

      if (stripeError) {
        setErrorMessage(stripeError.message)
        onPaymentFailure(stripeError)
      } else if (paymentIntent.status === 'succeeded') {
        onPaymentSuccess()
      }
    } catch (error) {
      setErrorMessage('Payment processing failed. Please try again.')
      onPaymentFailure(error)
    } finally {
      setIsProcessing(false)
    }
  }
  */

  return (
    <div className="py-4">
      <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2 text-center">
        Payment Details
      </h2>
      <p className="text-gray-600 mb-8 text-center">
        Secure payment processing
      </p>

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">{selectedService?.title}</span>
            <span className="font-semibold text-gray-900">{selectedService?.price}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Duration</span>
            <span>{selectedService?.duration}</span>
          </div>
          <div className="border-t border-gray-300 pt-2 mt-2">
            <div className="flex justify-between text-lg">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-emerald-600">{selectedService?.price}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Status Messages */}
      {paymentStatus === 'failed' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="font-semibold text-red-800">Payment Failed</h4>
              <p className="text-sm text-red-700 mt-1">{errorMessage || 'An error occurred during payment processing.'}</p>
            </div>
          </div>
        </div>
      )}

      {/* TEST PAYMENT SECTION (Remove when implementing real Stripe) */}
      <div className="border-2 border-dashed border-amber-300 bg-amber-50 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <svg className="w-6 h-6 text-amber-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div className="flex-1">
            <h4 className="font-semibold text-amber-800 mb-1">Test Mode</h4>
            <p className="text-sm text-amber-700">
              This is a demo payment button. Click below to simulate payment processing.
              Real Stripe integration requires backend setup (see code comments).
            </p>
          </div>
        </div>
        
        <button
          onClick={handleTestPayment}
          disabled={isProcessing}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing Payment...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Test Payment (Demo)
            </>
          )}
        </button>
      </div>

      {/* REAL STRIPE PAYMENT FORM (Uncomment when ready) */}
      {/*
      <form onSubmit={handleRealPayment}>
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Card Details
          </label>
          <div className="border border-gray-300 rounded-lg p-4">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#1f2937',
                    '::placeholder': {
                      color: '#9ca3af',
                    },
                  },
                  invalid: {
                    color: '#ef4444',
                  },
                },
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isProcessing || !stripe}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing Payment...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Pay {selectedService?.price}
            </>
          )}
        </button>
      </form>
      */}

      {/* Security Badge */}
      <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-4">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        Secure payment powered by Stripe
      </div>

      {/* Back Button */}
      <div className="mt-6 text-center">
        <button
          onClick={onBack}
          disabled={isProcessing}
          className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
        >
          ← Back to Service Selection
        </button>
      </div>
    </div>
  )
}

// UNCOMMENT THIS WRAPPER WHEN USING REAL STRIPE:
// function PaymentFormWrapper(props) {
//   return (
//     <Elements stripe={stripePromise}>
//       <PaymentForm {...props} />
//     </Elements>
//   )
// }
// export default PaymentFormWrapper

export default PaymentForm