"use client"

import { useContext, useEffect, useState } from "react"
import {
  CreditCard,
  Truck,
  ShoppingBag,
  ChevronRight,
  Check,
  Shield,
  MapPin,
  User,
  Mail,
  Phone,
  Edit3,
  AlertCircle,
  Clock,
  Package,
  ChevronLeft,
} from "lucide-react"
import { productAPI } from "../../contexts/ProductContext"
import { authContext } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import LoadingScreen from "../UI/LoadingScreen/LoadingScreen"
import LoadingOverlay from "../UI/LoadingOverlay"
import { axiosInstance } from "../../axiosConfig"

export default function CheckoutPageImproved() {
  const { order } = useContext(productAPI)
  const navigate = useNavigate()
  const { currentUser } = useContext(authContext)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [step, setStep] = useState(1)
  const [loadingPaymentWindow, setLoadingPaymentWindow] = useState(false)
  const [errors, setErrors] = useState({})
  const [savedAddresses, setSavedAddresses] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    paymentMethod: "razorpay",
    saveAddress: false,
  })

  const getUser = async () => {
    try {
      setLoading(true)
      const userData = await currentUser()
      setUser(userData)
      const nameArray = userData.name.split(" ")
      setFormData({
        ...formData,
        email: userData.email,
        phone: userData.phoneNo || "",
        firstName: nameArray[0] || "",
        lastName: nameArray[1] || "",
      })
      // Load saved addresses (mock data - replace with API call)
      setSavedAddresses([
        {
          id: 1,
          name: "Home",
          fullName: userData.name,
          address: "123 Main Street",
          city: "Mumbai",
          state: "Maharashtra",
          zipCode: "400001",
          country: "India",
          isDefault: true,
        },
      ])
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  // Calculate order summary with dynamic pricing
  const subtotal = order.reduce((total, item) => total + item.productPrice * (item.quantity || 1), 0)
  const freeShippingThreshold = 599
  const baseShipping = 49
  const shipping = subtotal >= freeShippingThreshold ? 0 : baseShipping
  const codFee = formData.paymentMethod === "cod" ? 25 : 0
  const tax = subtotal * 0.03
  const total = subtotal + shipping + tax + codFee

  const shippingSavings = subtotal >= freeShippingThreshold ? baseShipping : 0

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = src
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const createOrder = async () => {
    const orderedItems = order.map((item) => ({
      product: item._id,
      quantity: item.quantity || 1,
    }))

    const itemsPrice = subtotal
    const taxPrice = tax
    const shippingPrice = shipping
    const totalPrice = Number(total.toFixed(2))

    setLoadingPaymentWindow(true)

    try {
      if (formData.paymentMethod === "cod") {
        // Handle COD order
        const { data } = await axiosInstance.post("/api/create-cod-order", {
          itemsPrice,
          taxPrice,
          shippingPrice: shipping + codFee,
          totalPrice,
          orderItems: orderedItems,
          paymentMethod: "cod",
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.zipCode,
          country: formData.country,
          phone: formData.phone,
        })

        console.log(data)

        window.location.href = `/order-success?orderId=${data.newOrder.customOrderId}`
        return
      }

      // Handle Razorpay payment
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?")
        return
      }

      const { data } = await axiosInstance.post("/api/create-order", {
        amount: total * 100,
        receipt: "receipt#1",
        notes: {},
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        orderItems: orderedItems,
        paymentMethod: "razorpay",
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        postalCode: formData.zipCode,
        country: formData.country,
        phone: formData.phone,
      })

      const options = {
        key: "rzp_live_NzX6nOcaB8kXHI",
        amount: data.order.amount,
        currency: "INR",
        name: "Insta Mart",
        description: "Payment for your order",
        order_id: data.order.id,
        handler: (response) => {
          window.location.href = `https://instamart28.netlify.app/order-success?orderId=${data.newOrder.customOrderId}`
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#2563eb",
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error) {
      console.log(error)
      alert("Something went wrong. Please try again.")
    } finally {
      setLoadingPaymentWindow(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const selectSavedAddress = (address) => {
    setSelectedAddress(address)
    setFormData({
      ...formData,
      firstName: address.fullName.split(" ")[0],
      lastName: address.fullName.split(" ")[1] || "",
      address: address.address,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
    })
  }

  const validateForm = () => {
    const newErrors = {}

    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = "First name is required"
      if (!formData.lastName) newErrors.lastName = "Last name is required"
      if (!formData.email) newErrors.email = "Email is required"
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
      if (!formData.phone) newErrors.phone = "Phone number is required"
      else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone number must be 10 digits"
      if (!formData.address) newErrors.address = "Address is required"
      if (!formData.city) newErrors.city = "City is required"
      if (!formData.state) newErrors.state = "State is required"
      if (!formData.zipCode) newErrors.zipCode = "ZIP code is required"
      else if (!/^\d{6}$/.test(formData.zipCode)) newErrors.zipCode = "ZIP code must be 6 digits"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (validateForm()) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePrevStep = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      createOrder()
    }
  }

  const { setOrderRedirection } = useContext(productAPI)

  if (loading) {
    return <LoadingScreen onLoadingComplete={() => setLoading(false)} minLoadingTime={2500} maxLoadingTime={4000} />
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md p-8 text-center bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="mb-2 text-2xl font-semibold text-gray-900">Login Required</h2>
          <p className="mb-6 text-gray-600">Please log in to continue with your checkout</p>
          <button
            onClick={() => {
              navigate("/login")
              setOrderRedirection(true)
            }}
            className="w-full px-4 py-3 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Login to Continue
          </button>
        </div>
      </div>
    )
  }

  const steps = [
    { number: 1, title: "Shipping", icon: Truck },
    { number: 2, title: "Payment", icon: CreditCard },
    { number: 3, title: "Review", icon: Check },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 transition-colors hover:text-gray-900"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Secure Checkout</h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="w-4 h-4 text-green-600" />
              <span>SSL Secured</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {steps.map((stepItem, index) => {
              const StepIcon = stepItem.icon
              return (
                <div key={stepItem.number} className="flex items-center">
                  <div className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                        step >= stepItem.number
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "bg-white border-gray-300 text-gray-400"
                      }`}
                    >
                      {step > stepItem.number ? <Check size={20} /> : <StepIcon size={20} />}
                    </div>
                    <div className="hidden ml-3 sm:block">
                      <p
                        className={`text-sm font-medium ${step >= stepItem.number ? "text-blue-600" : "text-gray-500"}`}
                      >
                        Step {stepItem.number}
                      </p>
                      <p className={`text-xs ${step >= stepItem.number ? "text-blue-600" : "text-gray-500"}`}>
                        {stepItem.title}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-16 h-0.5 mx-4 bg-gray-300">
                      <div
                        className={`h-full transition-all duration-300 ${
                          step > stepItem.number ? "bg-blue-600" : "bg-gray-300"
                        }`}
                        style={{ width: step > stepItem.number ? "100%" : "0%" }}
                      ></div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Shipping Information */}
              {step === 1 && (
                <div className="overflow-hidden bg-white rounded-lg shadow-sm">
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <h2 className="flex items-center text-xl font-semibold text-gray-900">
                      <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                      Shipping Information
                    </h2>
                  </div>

                  <div className="p-6">
                    {/* Saved Addresses */}
                    {savedAddresses.length > 0 && (
                      <div className="mb-6">
                        <h3 className="mb-3 text-lg font-medium text-gray-900">Saved Addresses</h3>
                        <div className="space-y-3">
                          {savedAddresses.map((address) => (
                            <div
                              key={address.id}
                              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                selectedAddress?.id === address.id
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                              onClick={() => selectSavedAddress(address)}
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <h4 className="font-medium text-gray-900">{address.name}</h4>
                                    {address.isDefault && (
                                      <span className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded">
                                        Default
                                      </span>
                                    )}
                                  </div>
                                  <p className="mt-1 text-sm text-gray-600">{address.fullName}</p>
                                  <p className="text-sm text-gray-600">
                                    {address.address}, {address.city}, {address.state} {address.zipCode}
                                  </p>
                                </div>
                                <Edit3 className="w-4 h-4 text-gray-400" />
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="pt-4 mt-4 border-t border-gray-200">
                          <h3 className="mb-3 text-lg font-medium text-gray-900">Or enter new address</h3>
                        </div>
                      </div>
                    )}

                    {/* Address Form */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="firstName" className="block mb-1 text-sm font-medium text-gray-700">
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.firstName ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                      </div>

                      <div>
                        <label htmlFor="lastName" className="block mb-1 text-sm font-medium text-gray-700">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.lastName ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
                      </div>

                      <div>
                        <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.email ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                        </div>
                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-700">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.phone ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                        </div>
                        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="address" className="block mb-1 text-sm font-medium text-gray-700">
                          Street Address *
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="House number, street name, area"
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.address ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                      </div>

                      <div>
                        <label htmlFor="city" className="block mb-1 text-sm font-medium text-gray-700">
                          City *
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.city ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
                      </div>

                      <div>
                        <label htmlFor="state" className="block mb-1 text-sm font-medium text-gray-700">
                          State *
                        </label>
                        <select
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.state ? "border-red-500" : "border-gray-300"
                          }`}
                        >
                          <option value="">Select State</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Rajasthan">Rajasthan</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="West Bengal">West Bengal</option>
                        </select>
                        {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
                      </div>

                      <div>
                        <label htmlFor="zipCode" className="block mb-1 text-sm font-medium text-gray-700">
                          PIN Code *
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          maxLength="6"
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.zipCode ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.zipCode && <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>}
                      </div>

                      <div>
                        <label htmlFor="country" className="block mb-1 text-sm font-medium text-gray-700">
                          Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="India">India</option>
                          <option value="United Arab Emirates">United Arab Emirates</option>
                          <option value="Singapore">Singapore</option>
                          <option value="Nepal">Nepal</option>
                          <option value="Sri Lanka">Sri Lanka</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-6">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="saveAddress"
                          checked={formData.saveAddress}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Save this address for future orders</span>
                      </label>
                    </div>

                    <div className="flex justify-end mt-8">
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="flex items-center px-8 py-3 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Continue to Payment
                        <ChevronRight size={16} className="ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Method */}
              {step === 2 && (
                <div className="overflow-hidden bg-white rounded-lg shadow-sm">
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <h2 className="flex items-center text-xl font-semibold text-gray-900">
                      <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                      Payment Method
                    </h2>
                  </div>

                  <div className="p-6">
                    <div className="space-y-4">
                      {/* Razorpay Option */}
                      <div
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          formData.paymentMethod === "razorpay"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setFormData({ ...formData, paymentMethod: "razorpay" })}
                      >
                        <div className="flex items-center">
                          <input
                            id="razorpay"
                            name="paymentMethod"
                            type="radio"
                            value="razorpay"
                            checked={formData.paymentMethod === "razorpay"}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <label htmlFor="razorpay" className="flex-1 ml-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-gray-900">Online Payment</p>
                                <p className="text-sm text-gray-600">UPI, Cards, Net Banking, Wallets</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Shield className="w-4 h-4 text-green-500" />
                                <span className="text-xs font-medium text-green-600">Secure</span>
                              </div>
                            </div>
                          </label>
                        </div>
                        {formData.paymentMethod === "razorpay" && (
                          <div className="p-3 mt-3 bg-white border rounded">
                            <p className="text-sm text-gray-600">
                              You will be redirected to Razorpay's secure payment gateway to complete your purchase.
                            </p>
                          </div>
                        )}
                      </div>

                      {/* COD Option */}
                      <div
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          formData.paymentMethod === "cod"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setFormData({ ...formData, paymentMethod: "cod" })}
                      >
                        <div className="flex items-center">
                          <input
                            id="cod"
                            name="paymentMethod"
                            type="radio"
                            value="cod"
                            checked={formData.paymentMethod === "cod"}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <label htmlFor="cod" className="flex-1 ml-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-gray-900">Cash on Delivery</p>
                                <p className="text-sm text-gray-600">Pay when you receive your order</p>
                              </div>
                              <div className="text-sm font-medium text-orange-600">+₹{codFee} fee</div>
                            </div>
                          </label>
                        </div>
                        {formData.paymentMethod === "cod" && (
                          <div className="p-3 mt-3 bg-white border rounded">
                            <div className="flex items-start space-x-2">
                              <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
                              <p className="text-sm text-gray-600">
                                Additional ₹{codFee} convenience fee applies for Cash on Delivery orders.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between mt-8">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="flex items-center px-6 py-3 font-medium text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        <ChevronLeft size={16} className="mr-2" />
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="flex items-center px-8 py-3 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Review Order
                        <ChevronRight size={16} className="ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Order Review */}
              {step === 3 && (
                <div className="overflow-hidden bg-white rounded-lg shadow-sm">
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <h2 className="text-xl font-semibold text-gray-900">Review Your Order</h2>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Shipping Information */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-medium text-gray-900">Shipping Information</h3>
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                          Edit
                        </button>
                      </div>
                      <div className="p-4 rounded-lg bg-gray-50">
                        <div className="flex items-start space-x-3">
                          <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                          <div>
                            <p className="font-medium text-gray-900">
                              {formData.firstName} {formData.lastName}
                            </p>
                            <p className="text-gray-600">{formData.address}</p>
                            <p className="text-gray-600">
                              {formData.city}, {formData.state} {formData.zipCode}
                            </p>
                            <p className="text-gray-600">{formData.country}</p>
                            <div className="flex items-center mt-2 space-x-4">
                              <div className="flex items-center space-x-1">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">{formData.email}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">{formData.phone}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-medium text-gray-900">Payment Method</h3>
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                          Edit
                        </button>
                      </div>
                      <div className="p-4 rounded-lg bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900">
                              {formData.paymentMethod === "razorpay" ? "Online Payment (Razorpay)" : "Cash on Delivery"}
                            </p>
                            <p className="text-sm text-gray-600">
                              {formData.paymentMethod === "razorpay"
                                ? "UPI, Cards, Net Banking, Wallets"
                                : `Pay ₹${total.toFixed(2)} when you receive your order`}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Estimated Delivery */}
                    <div>
                      <h3 className="mb-3 text-lg font-medium text-gray-900">Estimated Delivery</h3>
                      <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                        <div className="flex items-center space-x-3">
                          <Clock className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="font-medium text-green-800">3-5 Business Days</p>
                            <p className="text-sm text-green-600">
                              Your order will be delivered between{" "}
                              {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()} and{" "}
                              {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between pt-6">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="flex items-center px-6 py-3 font-medium text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        <ChevronLeft size={16} className="mr-2" />
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={loadingPaymentWindow}
                        className="flex items-center px-8 py-3 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loadingPaymentWindow ? (
                          <>
                            <div className="w-4 h-4 mr-2 border-b-2 border-white rounded-full animate-spin"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <Package className="w-4 h-4 mr-2" />
                            Place Order
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="mt-8 lg:col-span-5 lg:mt-0">
            <div className="sticky bg-white rounded-lg shadow-sm top-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="flex items-center text-xl font-semibold text-gray-900">
                  <ShoppingBag className="w-5 h-5 mr-2 text-blue-600" />
                  Order Summary
                </h2>
              </div>

              <div className="p-6">
                {/* Order Items */}
                <div className="mb-6 space-y-4">
                  {order.map((item) => (
                    <div key={item._id} className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          src={item.images?.[0] || "/placeholder.svg?height=60&width=60"}
                          alt={item.productName}
                          className="object-cover w-16 h-16 border border-gray-200 rounded-lg"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">{item.productName}</h3>
                        <p className="text-sm text-gray-500">Qty: {item.quantity || 1}</p>
                        <p className="text-sm font-medium text-gray-900">₹{item.productPrice}</p>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        ₹{(item.productPrice * (item.quantity || 1)).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="pt-4 space-y-3 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal ({order.length} items)</span>
                    <span className="font-medium text-gray-900">₹{subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <div className="text-right">
                      {shipping === 0 ? (
                        <div>
                          <span className="font-medium text-green-600">Free</span>
                          {shippingSavings > 0 && (
                            <p className="text-xs text-green-600">You saved ₹{shippingSavings}!</p>
                          )}
                        </div>
                      ) : (
                        <span className="font-medium text-gray-900">₹{shipping.toFixed(2)}</span>
                      )}
                    </div>
                  </div>

                  {codFee > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">COD Fee</span>
                      <span className="font-medium text-gray-900">₹{codFee.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (GST)</span>
                    <span className="font-medium text-gray-900">₹{tax.toFixed(2)}</span>
                  </div>

                  {subtotal < freeShippingThreshold && (
                    <div className="p-3 border border-blue-200 rounded-lg bg-blue-50">
                      <div className="flex items-center space-x-2">
                        <Truck className="w-4 h-4 text-blue-600" />
                        <p className="text-sm text-blue-800">
                          Add ₹{(freeShippingThreshold - subtotal).toFixed(2)} more for free shipping!
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-xl font-bold text-gray-900">₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="pt-6 mt-6 border-t border-gray-200">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>256-bit SSL encrypted checkout</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Truck className="w-4 h-4 text-blue-500" />
                      <span>Free shipping on orders over ₹{freeShippingThreshold}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Package className="w-4 h-4 text-purple-500" />
                      <span>Easy returns within 7 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <LoadingOverlay isLoading={loadingPaymentWindow} />
      </div>
    </div>
  )
}
