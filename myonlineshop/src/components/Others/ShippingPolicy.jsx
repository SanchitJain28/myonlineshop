export default function ShippingPolicy() {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">  
        <main className="flex-1 py-10">
          <div className="container max-w-4xl px-4 mx-auto md:px-6">
            <div className="p-6 bg-white rounded-lg shadow-sm md:p-8">
              <div className="flex items-center justify-center mb-8">
                <div className="text-center">
                  <h1 className="text-3xl font-bold">Shipping Policy</h1>
                  <p className="mt-2 text-gray-500">Last Updated: May 3, 2023</p>
                </div>
              </div>
  
              <div className="prose max-w-none">
                <div className="mb-8">
                  <h2 className="mb-4 text-2xl font-semibold">Shipping Information</h2>
                  <div className="p-4 mb-6 border-l-4 border-black bg-gray-50">
                    <p className="font-medium">
                      At Insta Mart, we strive to deliver your favorite clothing items to your doorstep as quickly and
                      efficiently as possible.
                    </p>
                  </div>
  
                  <div className="grid gap-6 mb-6 md:grid-cols-3">
                    <div className="p-4 text-center bg-white border rounded-lg">
                      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 text-white bg-black rounded-full">
                        ₹
                      </div>
                      <h3 className="font-semibold">Shipping Fee</h3>
                      <p className="text-gray-600">Flat rate of ₹50 across India</p>
                    </div>
  
                    <div className="p-4 text-center bg-white border rounded-lg">
                      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 text-white bg-black rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="font-semibold">Cash on Delivery</h3>
                      <p className="text-gray-600">Available across India</p>
                    </div>
  
                    <div className="p-4 text-center bg-white border rounded-lg">
                      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 text-white bg-black rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="font-semibold">Delivery Time</h3>
                      <p className="text-gray-600">3-7 business days</p>
                    </div>
                  </div>
  
                  <h3 className="mb-3 text-xl font-semibold">Delivery Coverage</h3>
                  <p className="mb-4">
                    We provide home delivery to over 28,000+ PIN codes across India including Jammu and Kashmir, Ladakh,
                    North East states, and other Union Territories like Andaman and Nicobar Islands.
                  </p>
                  <p className="mb-4 font-medium">Shipping charges are the same for all states: ₹50 flat rate.</p>
  
                  <h3 className="mb-3 text-xl font-semibold">Shipping Partners</h3>
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="px-4 py-2 bg-white border rounded-md">Delhivery</div>
                    <div className="px-4 py-2 bg-white border rounded-md">BlueDart</div>
                    <div className="px-4 py-2 bg-white border rounded-md">XpressBees</div>
                  </div>
  
                  <h3 className="mb-3 text-xl font-semibold">Order Tracking</h3>
                  <p className="mb-6">
                    Real-time tracking is available for all orders. The tracking links will be automatically mailed to
                    your registered email address once your order is dispatched.
                  </p>
                </div>
  
                <div className="mb-8">
                  <h2 className="mb-4 text-2xl font-semibold">Cancellations</h2>
                  <div className="p-5 mb-4 rounded-lg bg-gray-50">
                    <p className="mb-2">
                      You can cancel your order anytime before dispatch. During transit, we cannot cancel your order.
                    </p>
                    <p>
                      On receiving a cancellation request, our admin will review it and process your refund within 1 hour
                      if approved.
                    </p>
                  </div>
                </div>
  
                <div className="mb-8">
                  <h2 className="mb-4 text-2xl font-semibold">Shipping Refunds</h2>
                  <div className="p-5 mb-4 rounded-lg bg-gray-50">
                    <p className="mb-2">
                      You will get a full refund on shipping costs if the return reason is genuine as mentioned in the
                      return clause.
                    </p>
                    <p>If the reason is not genuine, then you will bear shipping as well as return shipping costs.</p>
                  </div>
                </div>
  
                <div className="mb-8">
                  <h2 className="mb-4 text-2xl font-semibold">Returns</h2>
                  <div className="p-5 mb-4 rounded-lg bg-gray-50">
                    <p className="mb-4">You have 7 calendar days to return an item from the date you received it.</p>
                    <h4 className="mb-2 font-semibold">To be eligible for a return:</h4>
                    <ul className="pl-5 mb-4 space-y-1 list-disc">
                      <li>Your reason should be genuine (defective product, wrong product, and missing parts)</li>
                      <li>Your item must be unused and in the same condition that you received it</li>
                      <li>Your item must be in its original packaging</li>
                      <li>Your item needs to have a receipt or proof of purchase</li>
                    </ul>
                  </div>
                </div>
  
                <div className="mb-8">
                  <h2 className="mb-4 text-2xl font-semibold">Return Process</h2>
                  <div className="relative overflow-hidden">
                    <div className="ml-4 border-l-2 border-black">
                      <div className="relative mb-8">
                        <div className="absolute -left-[9px] mt-2 w-4 h-4 rounded-full bg-black"></div>
                        <div className="ml-6">
                          <h3 className="font-semibold">Contact Customer Service</h3>
                          <p className="mt-1 text-gray-600">
                            Reach out to our customer service team through email or phone to initiate a return request.
                          </p>
                        </div>
                      </div>
                      <div className="relative mb-8">
                        <div className="absolute -left-[9px] mt-2 w-4 h-4 rounded-full bg-black"></div>
                        <div className="ml-6">
                          <h3 className="font-semibold">Return Approval</h3>
                          <p className="mt-1 text-gray-600">
                            Our team will review your request and approve it if it meets our return policy criteria.
                          </p>
                        </div>
                      </div>
                      <div className="relative mb-8">
                        <div className="absolute -left-[9px] mt-2 w-4 h-4 rounded-full bg-black"></div>
                        <div className="ml-6">
                          <h3 className="font-semibold">Return Shipping</h3>
                          <p className="mt-1 text-gray-600">
                            We'll arrange for pickup of the item from your address or provide instructions for return
                            shipping.
                          </p>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-[9px] mt-2 w-4 h-4 rounded-full bg-black"></div>
                        <div className="ml-6">
                          <h3 className="font-semibold">Refund Processing</h3>
                          <p className="mt-1 text-gray-600">
                            Once we receive and inspect the returned item, we'll process your refund to the original
                            payment method.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
  
                <div className="p-6 bg-gray-100 rounded-lg">
                  <h2 className="mb-4 text-xl font-semibold">Contact Us</h2>
                  <p className="mb-4">If you have any questions about our shipping policy, please contact us:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span>support@instamart.com</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span>+91 98765 43210</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>123 Business Park, Mumbai, Maharashtra, India - 400001</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
  
      </div>
    )
  }
  