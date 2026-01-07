import React, { useState } from 'react'
import { loadRazorpay } from '../utils/razorpay'

/*
 * RAZORPAY PAYMENT INTEGRATION
 * =============================
 * 
 * This component handles Razorpay payment processing.
 * 
 * VARIABLES REQUIRED in .env:
 * VITE_RAZORPAY_KEY_ID=rzp_test_...
 * 
 * BACKEND REQUIREMENT:
 * You must have an API endpoint (e.g., /api/create-razorpay-order) that:
 * 1. Accepts POST request with amount
 * 2. Uses razorpay-node SDK to create an order: instance.orders.create({ amount, currency: "INR", receipt: "..." })
 * 3. Returns { id: "order_..." }
 */

function PaymentForm({ selectedService, onPaymentSuccess, onPaymentFailure, paymentStatus, onRetry, onBack }) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleRazorpayPayment = async () => {
    setIsProcessing(true)
    setErrorMessage('')

    const res = await loadRazorpay()

    if (!res) {
      setErrorMessage('Razorpay SDK failed to load. Please check your internet connection.')
      setIsProcessing(false)
      return
    }

    // Amount in paise (multiply rupees by 100)
    const amountInRupees = parseInt(selectedService?.price?.replace(/[^0-9]/g, ''), 10) || 0
    const amountInPaise = amountInRupees * 100

    const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID

    if (!keyId) {
      setErrorMessage('Razorpay Key ID is missing in .env file.')
      setIsProcessing(false)
      return
    }

    // Try to fetch order from backend
    let order_id = null;
    try {
      const response = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amountInPaise, currency: 'INR' })
      })
      if (response.ok) {
        const data = await response.json()
        order_id = data.id
      } else {
        console.warn('Backend order creation failed or not implemented. Proceeding without order_id (may fail in Live mode).')
      }
    } catch (e) {
      console.warn('Backend unavailable. Using client-side flow.')
    }

    const options = {
      key: keyId,
      amount: amountInPaise,
      currency: "INR",
      name: "Dinesh Pathak Counselling",
      description: selectedService?.title,
      // image: "https://your-logo-url.com/logo.png", 
      order_id: order_id,
      handler: function (response) {
        console.log("Payment Success:", response)
        // You should verify the signature on backend here
        onPaymentSuccess()
      },
      prefill: {
        // We don't have user details, so Razorpay will ask for them
      },
      notes: {
        service_id: selectedService?.id
      },
      theme: {
        color: "#10b981"
      },
      modal: {
        ondismiss: function () {
          setIsProcessing(false)
        }
      }
    }

    try {
      const paymentObject = new window.Razorpay(options)
      paymentObject.on('payment.failed', function (response) {
        setErrorMessage(response.error.description || 'Payment Failed')
        onPaymentFailure(response.error)
        setIsProcessing(false)
      });
      paymentObject.open()
    } catch (e) {
      setErrorMessage('Failed to open Razorpay checkout.')
      setIsProcessing(false)
    }
  }

  return (
    <div className="py-4">
      <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2 text-center">
        Payment Details
      </h2>
      <p className="text-gray-600 mb-8 text-center">
        Secure payment via Razorpay
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

      {/* Pay Button */}
      <div className="mb-6">
        <button
          onClick={handleRazorpayPayment}
          disabled={isProcessing}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
              Pay {selectedService?.price} with Razorpay
            </>
          )}
        </button>
      </div>

      {/* Security Badge */}
      <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-4">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        Secure payment powered by Razorpay
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

export default PaymentForm