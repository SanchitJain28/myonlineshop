export default function NewCancellationPolicy() {
    return (
      <div className="max-w-4xl px-4 py-8 mx-auto bg-white">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">Order Cancellation Policy</h1>
          <p className="pb-4 text-gray-600 border-b border-gray-200">Last updated: May 3, 2025</p>
        </div>
  
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">Cancellation Timeframe</h2>
          <div className="space-y-4 text-gray-700">
            <p>You can cancel your order anytime before dispatch. During transit, we cannot cancel your order.</p>
            <p>
              Orders can only be cancelled until <span className="font-medium">6 hours</span> after placing the order
              because we provide our customers with 24-hour order shipment.
            </p>
            <p>An order which is picked up by the courier, in transit, or out for delivery, cannot be cancelled.</p>
            <div className="p-4 my-6 border-l-4 border-blue-500 bg-blue-50">
              <p className="font-medium text-blue-700">Average Shipping Time: 6 hours</p>
            </div>
          </div>
        </section>
  
        <section className="p-6 mb-8 rounded-lg bg-gray-50">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">Refund Processing</h2>
          <div className="space-y-4 text-gray-700">
            <p>On receiving a cancellation request, the admin will allow it and process your refund within 1 hour.</p>
            <p>Full refund will be processed for orders cancelled within the specified time frame.</p>
            <div className="flex items-start mt-4">
              <div className="flex-shrink-0 w-6 h-6 text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="ml-3 text-gray-700">Refunds are typically processed within 1 hour of cancellation approval</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="ml-3 text-gray-700">The refund will be credited back to the original payment method</p>
            </div>
          </div>
        </section>
  
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">Order Modifications</h2>
          <div className="space-y-4 text-gray-700">
            <p>Orders cannot be altered after placing.</p>
            <p>Address and contact details cannot be changed after shipment.</p>
            <div className="p-4 my-4 border-l-4 border-yellow-500 bg-yellow-50">
              <p className="font-medium text-yellow-700">Important Note</p>
              <p className="text-yellow-600">
                Please ensure all order details are correct before confirming your purchase, as modifications cannot be
                made afterward.
              </p>
            </div>
          </div>
        </section>
  
        <section className="pt-6 border-t border-gray-200">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">How to Request a Cancellation</h2>
          <div className="p-6 rounded-lg bg-gray-50">
            <ol className="space-y-3 text-gray-700 list-decimal list-inside">
              <li>Log in to your account on our website</li>
              <li>Navigate to "My Orders" section</li>
              <li>Find the order you wish to cancel</li>
              <li>Click on the "Cancel Order" button (only visible for eligible orders)</li>
              <li>Select a reason for cancellation</li>
              <li>Submit your cancellation request</li>
            </ol>
            <p className="mt-4 text-gray-700">
              You can also contact our customer support team for assistance with cancellations:
            </p>
            <p className="mt-2">
              <span className="font-medium">Email:</span>{" "}
              <a href="mailto:sanchitjain00028@gmail.com" className="text-blue-600 hover:underline">
                sanchitjain00028@gmail.com
              </a>
            </p>
            <p>
              <span className="font-medium">Phone:</span>{" "}
              <a href="tel:+919650296375" className="text-blue-600 hover:underline">
                +91 9650296375
              </a>
            </p>
          </div>
        </section>
      </div>
    )
  }