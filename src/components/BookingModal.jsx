import React, { useState } from 'react'
import ServiceSelection from './ServiceSelection'
import PaymentForm from './PaymentForm'
import BookingConfirmation from './BookingConfirmation'
import { InlineWidget } from 'react-calendly'

function BookingModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedService, setSelectedService] = useState(null)
  const [paymentStatus, setPaymentStatus] = useState(null) // null, 'processing', 'success', 'failed'
  const [bookingComplete, setBookingComplete] = useState(false)

  // Reset modal state when closed
  const handleClose = () => {
    setCurrentStep(1)
    setSelectedService(null)
    setPaymentStatus(null)
    setBookingComplete(false)
    onClose()
  }

  // Handle service selection
  const handleServiceSelect = (service) => {
    setSelectedService(service)
    setCurrentStep(2)
  }

  // Handle payment success
  const handlePaymentSuccess = () => {
    setPaymentStatus('success')
    setCurrentStep(3)
  }

  // Handle payment failure
  const handlePaymentFailure = (error) => {
    setPaymentStatus('failed')
    // Stay on step 2 to allow retry
  }

  // Handle booking completion (after Calendly)
  const handleBookingComplete = () => {
    setBookingComplete(true)
    setCurrentStep(4)
  }

  // Handle retry payment
  const handleRetryPayment = () => {
    setPaymentStatus(null)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Progress Indicator */}
          {!bookingComplete && (
            <div className="px-8 pt-8 pb-4">
              <div className="flex items-center justify-center space-x-2 mb-6">
                {[1, 2, 3].map((step) => (
                  <React.Fragment key={step}>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${currentStep >= step
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-200 text-gray-500'
                          }`}
                      >
                        {step}
                      </div>
                      <span className="text-xs mt-1 text-gray-600">
                        {step === 1 ? 'Service' : step === 2 ? 'Payment' : 'Booking'}
                      </span>
                    </div>
                    {step < 3 && (
                      <div
                        className={`h-1 w-16 transition-all ${currentStep > step ? 'bg-emerald-600' : 'bg-gray-200'
                          }`}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {/* Modal Content */}
          <div className="px-8 pb-8">
            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <ServiceSelection
                onServiceSelect={handleServiceSelect}
                selectedService={selectedService}
              />
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <PaymentForm
                selectedService={selectedService}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentFailure={handlePaymentFailure}
                paymentStatus={paymentStatus}
                onRetry={handleRetryPayment}
                onBack={() => setCurrentStep(1)}
              />
            )}

            {/* Step 3: Calendly Booking */}
            {currentStep === 3 && paymentStatus === 'success' && (
              <div className="py-4">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2 text-center">
                  Payment Successful! ✓
                </h2>
                <p className="text-gray-600 mb-6 text-center">
                  Now, please select your preferred date and time for the session
                </p>

                {/* Calendly Inline Widget */}
                <div className="calendly-container bg-gray-50 rounded-lg p-4">
                  <InlineWidget
                    url="https://calendly.com/dpathak0108/counselling-sessions-with-dinesh-pathak"
                    styles={{
                      height: '700px',
                      minWidth: '100%'
                    }}
                    pageSettings={{
                      backgroundColor: 'ffffff',
                      hideEventTypeDetails: false,
                      hideLandingPageDetails: false,
                      primaryColor: '10b981',
                      textColor: '1f2937'
                    }}
                    prefill={{
                      customAnswers: {
                        a1: selectedService?.title || 'Not specified'
                      }
                    }}
                    utm={{
                      utmCampaign: 'counselling_booking',
                      utmSource: 'website',
                      utmMedium: 'modal'
                    }}
                  />
                </div>

                <div className="mt-4 text-center">
                  <button
                    onClick={handleBookingComplete}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                  >
                    Complete Booking
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && bookingComplete && (
              <BookingConfirmation
                selectedService={selectedService}
                onClose={handleClose}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingModal