"use client"

import { useContext, useState } from "react"
import { ChevronLeft, Minus, Plus, X, ShoppingBag, Truck, Shield, CreditCard } from "lucide-react"
import { Link } from "react-router-dom"
import { productAPI } from "../../contexts/ProductContext"

export default function CartPageImproved() {
  const { productCart, removeFromCart, setOrder, updateCartQuantity } = useContext(productAPI)
  const [isLoading, setIsLoading] = useState(false)
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState(null)

  console.log(productCart)

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return
    // Assuming you have this function in your context
    if (updateCartQuantity) {
      // console.log(id,newQuantity)
      updateCartQuantity(id, newQuantity)
    }
  }

  const applyCoupon = () => {
    // Simple coupon logic - in real app, this would be an API call
    if (couponCode.toLowerCase() === "save10") {
      setAppliedCoupon({ code: "SAVE10", discount: 0.1, type: "percentage" })
    } else if (couponCode.toLowerCase() === "free50") {
      setAppliedCoupon({ code: "FREE50", discount: 50, type: "fixed" })
    } else {
      alert("Invalid coupon code")
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode("")
  }

  const createOrder = async () => {
    setIsLoading(true)
    try {
      await setOrder(productCart)
      // Add any additional order creation logic here
    } catch (error) {
      console.error("Error creating order:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Calculate totals
  const subtotal = productCart.reduce((sum, item) => sum + item.productPrice * (item.quantity || 1), 0)
  const shipping = subtotal > 500 ? 0 : 50 // Free shipping over ₹500
  const tax = subtotal * 0.08

  let discount = 0
  if (appliedCoupon) {
    discount = appliedCoupon.type === "percentage" ? subtotal * appliedCoupon.discount : appliedCoupon.discount
  }

  const total = subtotal + shipping + tax - discount

  const savings = shipping === 0 && subtotal > 500 ? 50 : 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center text-gray-600 transition-colors hover:text-gray-900">
                <ChevronLeft className="w-5 h-5 mr-1" />
                Continue Shopping
              </Link>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="w-4 h-4" />
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600">
            {productCart.length} {productCart.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {productCart.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Your cart is empty</h2>
            <p className="max-w-md mx-auto mb-8 text-gray-600">
              Discover amazing products and add them to your cart to get started with your shopping journey.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-3 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              <div className="overflow-hidden bg-white rounded-lg shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Cart Items</h2>
                </div>

                <div className="divide-y divide-gray-200">
                  {productCart.map((item, index) => (
                    <div key={item._id || index} className="p-6 transition-colors hover:bg-gray-50">
                      <div className="flex items-start space-x-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <div className="w-24 h-24 overflow-hidden bg-gray-200 rounded-lg">
                            <img
                              src={item.images?.[0] || "/placeholder.svg?height=100&width=100"}
                              alt={item.productName}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="mb-1 text-lg font-medium text-gray-900">{item.productName}</h3>
                              <p className="mb-2 text-sm text-gray-600">
                                {item.productDescription?.substring(0, 100)}...
                              </p>
                              <div className="flex items-center space-x-4">
                                <span className="text-lg font-semibold text-gray-900">₹{item.productPrice}</span>
                                {item.originalPrice && item.originalPrice > item.productPrice && (
                                  <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
                                )}
                              </div>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() => removeFromCart(item._id)}
                              className="p-2 text-gray-400 transition-colors hover:text-red-500"
                              title="Remove item"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item._id, (item.quantity || 1) - 1)}
                                className="p-2 text-gray-600 transition-colors hover:text-gray-800 hover:bg-gray-100"
                                disabled={(item.quantity || 1) <= 1}
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-4 py-2 text-gray-900 font-medium min-w-[3rem] text-center">
                                {item.quantity || 1}
                              </span>
                              <button
                                onClick={() => updateQuantity(item._id, (item.quantity || 1) + 1)}
                                className="p-2 text-gray-600 transition-colors hover:text-gray-800 hover:bg-gray-100"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="text-right">
                              <p className="text-lg font-semibold text-gray-900">
                                ₹{(item.productPrice * (item.quantity || 1)).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coupon Section */}
              <div className="p-6 mt-6 bg-white rounded-lg shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Promo Code</h3>
                {!appliedCoupon ? (
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      onClick={applyCoupon}
                      className="px-6 py-2 text-white transition-colors bg-gray-900 rounded-lg hover:bg-gray-800"
                    >
                      Apply
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4 border border-green-200 rounded-lg bg-green-50">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium text-green-800">Coupon "{appliedCoupon.code}" applied</span>
                    </div>
                    <button onClick={removeCoupon} className="font-medium text-green-600 hover:text-green-800">
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="mt-8 lg:col-span-4 lg:mt-0">
              <div className="sticky bg-white rounded-lg shadow-sm top-8">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <div className="text-right">
                      {shipping === 0 ? (
                        <div>
                          <span className="font-medium text-green-600">Free</span>
                          {savings > 0 && <p className="text-xs text-green-600">You saved ₹{savings}!</p>}
                        </div>
                      ) : (
                        <span className="font-medium">₹{shipping.toFixed(2)}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">₹{tax.toFixed(2)}</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex items-center justify-between text-green-600">
                      <span>Discount ({appliedCoupon.code})</span>
                      <span className="font-medium">-₹{discount.toFixed(2)}</span>
                    </div>
                  )}

                  {subtotal < 500 && (
                    <div className="p-3 border border-blue-200 rounded-lg bg-blue-50">
                      <p className="text-sm text-blue-800">
                        <Truck className="inline w-4 h-4 mr-1" />
                        Add ₹{(500 - subtotal).toFixed(2)} more for free shipping!
                      </p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-xl font-bold text-gray-900">₹{total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={createOrder}
                    disabled={isLoading}
                    className="w-full px-6 py-4 font-medium text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 mr-2 border-b-2 border-white rounded-full animate-spin"></div>
                        Processing...
                      </div>
                    ) : (
                      <Link to="/order" className="flex items-center justify-center">
                        <CreditCard className="w-5 h-5 mr-2" />
                        Proceed to Checkout
                      </Link>
                    )}
                  </button>

                  <div className="space-y-2 text-center">
                    <p className="text-sm text-gray-500">We accept all major credit cards and UPI</p>
                    <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
                      <Shield className="w-3 h-3" />
                      <span>256-bit SSL encrypted</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
