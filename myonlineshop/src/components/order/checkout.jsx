"use client";

import { useContext, useEffect, useState } from "react";
import {
  CreditCard,
  Truck,
  ShoppingBag,
  ChevronRight,
  Check,
} from "lucide-react";
import { productAPI } from "../../contexts/ProductContext";
import { authContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../UI/LoadingScreen/LoadingScreen";
import LoadingOverlay from "../UI/LoadingOverlay";
import { axiosInstance } from "../../axiosConfig";
export default function CheckoutPage() {
  const { order } = useContext(productAPI);

  const navigate = useNavigate();
  const { currentUser } = useContext(authContext);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      setLoading(true);
      const user = await currentUser();
      setUser(user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);


  // Calculate order summary
  const subtotal = order.reduce(
    (total, item) => total + item.productPrice * item.quantity,
    0
  );
  const shipping = 49;
  const tax = subtotal * 0.03; // 18% GST
  const total = subtotal + shipping + tax;

  const [loadingPaymentWindow, setLoadingPaymentWindow] = useState(false);


  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const createOrder = async () => {
    const orderedItems = order.map((item) => ({
      product: item._id,
      quantity: item.quantity,
    }));
    const itemsPrice = subtotal
    const taxPrice= tax
    const shippingPrice= shipping
    const totalPrice = total
    setLoadingPaymentWindow(true);
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }
      // Create order by calling the server endpoint
      const { data } = await axiosInstance.post("/api/create-order", {
        amount: 50000,
        receipt: "receipt#1",
        notes: {},
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        orderItems: orderedItems,
        paymentMethod: "razorpay",
        firstName:formData.firstName,
        lastName:formData.lastName,
        address:formData.address,
        city:formData.city,
        state:formData.state,
        postalCode:formData.zipCode,
        country:formData.country
      });
      console.log(data)
      // Open Razorpay Checkout
      const options = {
        key: "rzp_live_NzX6nOcaB8kXHI", // Replace with your Razorpay key_id
        amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Insta mart",
        description: "Test Transaction",
        order_id: data.order.id, // This is the order_id created in the backend
        callback_url: "http://localhost:3000/payment-success", // Your success URL

        prefill: {
          name: "Sanchit jain",
          email: "mythichuman28@gmail.com",
          contact: "9650296375",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingPaymentWindow(false);
    }
  };

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    paymentMethod: "razorpay",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log(order);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Shipping info validation
    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.email) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Email is invalid";
      if (!formData.address) newErrors.address = "Address is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.state) newErrors.state = "State is required";
      if (!formData.zipCode) newErrors.zipCode = "ZIP code is required";
    }

    // Payment info validation
    if (step === 2) {
      if (formData.paymentMethod === "credit-card") {
        if (!formData.cardNumber)
          newErrors.cardNumber = "Card number is required";
        else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, "")))
          newErrors.cardNumber = "Card number must be 16 digits";

        if (!formData.cardName) newErrors.cardName = "Name on card is required";
        if (!formData.expiryDate)
          newErrors.expiryDate = "Expiry date is required";
        else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate))
          newErrors.expiryDate = "Use format MM/YY";

        if (!formData.cvv) newErrors.cvv = "CVV is required";
        else if (!/^\d{3,4}$/.test(formData.cvv))
          newErrors.cvv = "CVV must be 3 or 4 digits";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateForm()) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      createOrder();
      // In a real app, you would submit the order to your backend here
      // window.location.href = "/ordersuccess";
    }
  };

  const { setOrderRedirection } = useContext(productAPI);

  if (loading) {
    return (
      <LoadingScreen
        onLoadingComplete={() => setLoading(false)}
        minLoadingTime={2500}
        maxLoadingTime={4000}
      />
    );
  }

  if (!user) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen bg-gray-50"
        onClick={() => {
          navigate("/login");
          setOrderRedirection(true);
        }}
      >
        <p className="my-4 text-xl text-center">Please login to continue</p>
        <button className="w-24 p-4 text-white bg-blue-700 rounded-xl">
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-8 mx-auto max-w-7xl">
        {/* Checkout Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <div className="flex items-center mt-4">
            <div
              className={`flex items-center ${
                step >= 1 ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                {step > 1 ? <Check size={16} /> : 1}
              </div>
              <span className="ml-2 text-sm font-medium">Shipping</span>
            </div>
            <div className="w-8 h-1 mx-4 bg-gray-200">
              <div
                className={`h-full ${
                  step >= 2 ? "bg-blue-600" : "bg-gray-200"
                }`}
              ></div>
            </div>
            <div
              className={`flex items-center ${
                step >= 2 ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                {step > 2 ? <Check size={16} /> : 2}
              </div>
              <span className="ml-2 text-sm font-medium">Payment</span>
            </div>
            <div className="w-8 h-1 mx-4 bg-gray-200">
              <div
                className={`h-full ${
                  step >= 3 ? "bg-blue-600" : "bg-gray-200"
                }`}
              ></div>
            </div>
            <div
              className={`flex items-center ${
                step >= 3 ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                3
              </div>
              <span className="ml-2 text-sm font-medium">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          {/* Main Content */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Shipping Information */}
              {step === 1 && (
                <div className="p-6 mb-6 bg-white rounded-lg shadow-sm">
                  <h2 className="flex items-center mb-4 text-xl font-semibold">
                    <Truck size={20} className="mr-2" />
                    Shipping Information
                  </h2>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block mb-1 text-sm font-medium text-gray-700"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.firstName
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block mb-1 text-sm font-medium text-gray-700"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.lastName ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label
                        htmlFor="email"
                        className="block mb-1 text-sm font-medium text-gray-700"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label
                        htmlFor="address"
                        className="block mb-1 text-sm font-medium text-gray-700"
                      >
                        Street Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.address ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.address && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.address}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="city"
                        className="block mb-1 text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.city ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.city}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="state"
                        className="block mb-1 text-sm font-medium text-gray-700"
                      >
                        State / Province
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.state ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.state && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.state}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="zipCode"
                        className="block mb-1 text-sm font-medium text-gray-700"
                      >
                        ZIP / Postal Code
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.zipCode ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.zipCode && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.zipCode}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className="block mb-1 text-sm font-medium text-gray-700"
                      >
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="India">India</option>
                        <option value="United Arab Emirates">
                          United Arab Emirates
                        </option>
                        <option value="Singapore">Singapore</option>
                        <option value="Nepal">Nepal</option>
                        <option value="Sri Lanka">Sri Lanka</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end mt-6">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex items-center px-6 py-3 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Continue to Payment
                      <ChevronRight size={16} className="ml-2" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Method */}
              {step === 2 && (
                <div className="p-6 mb-6 bg-white rounded-lg shadow-sm">
                  <h2 className="flex items-center mb-4 text-xl font-semibold">
                    <CreditCard size={20} className="mr-2" />
                    Payment Method
                  </h2>
                  <div className="mb-4">
                    <div className="flex items-center mb-4">
                      <input
                        id="razorpay"
                        name="paymentMethod"
                        type="radio"
                        value="razorpay"
                        checked={formData.paymentMethod === "razorpay"}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="razorpay"
                        className="block ml-3 text-sm font-medium text-gray-700"
                      >
                        Razorpay (UPI/Cards/Netbanking)
                      </label>
                    </div>
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
                      <label
                        htmlFor="cod"
                        className="block ml-3 text-sm font-medium text-gray-700"
                      >
                        Cash on Delivery
                      </label>
                    </div>
                  </div>

                  {formData.paymentMethod === "razorpay" && (
                    <div className="p-4 mt-4 rounded-md bg-gray-50">
                      <p className="text-sm text-gray-600">
                        You will be redirected to Razorpay to complete your
                        purchase securely.
                      </p>
                    </div>
                  )}

                  {formData.paymentMethod === "cod" && (
                    <div className="p-4 mt-4 rounded-md bg-gray-50">
                      <p className="text-sm text-gray-600">
                        Pay with cash when your order is delivered. Additional
                        ₹49 fee applies for Cash on Delivery.
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex items-center px-6 py-3 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Review Order
                      <ChevronRight size={16} className="ml-2" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Order Review */}
              {step === 3 && (
                <div className="p-6 mb-6 bg-white rounded-lg shadow-sm">
                  <h2 className="mb-4 text-xl font-semibold">
                    Review Your Order
                  </h2>

                  <div className="mb-6">
                    <h3 className="mb-2 text-lg font-medium">
                      Shipping Information
                    </h3>
                    <div className="p-4 rounded-md bg-gray-50">
                      <p>
                        {formData.firstName} {formData.lastName}
                      </p>
                      <p>{formData.address}</p>
                      <p>
                        {formData.city}, {formData.state} {formData.zipCode}
                      </p>
                      <p>{formData.country}</p>
                      <p>{formData.email}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="mb-2 text-lg font-medium">Payment Method</h3>
                    <div className="p-4 rounded-md bg-gray-50">
                      {formData.paymentMethod === "razorpay" ? (
                        <p>Razorpay (UPI/Cards/Netbanking)</p>
                      ) : (
                        <p>Cash on Delivery</p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div className="mt-8 lg:col-span-5 lg:mt-0">
            <div className="sticky p-6 bg-white rounded-lg shadow-sm top-6">
              <h2 className="flex items-center mb-4 text-xl font-semibold">
                <ShoppingBag size={20} className="mr-2" />
                Order Summary
              </h2>

              <div className="divide-y divide-gray-200">
                {order.map((item) => (
                  <div key={item._id} className="flex py-4">
                    <img
                      src={item.images[0] || "/placeholder.svg"}
                      alt={item.productName}
                      className="object-cover object-center w-20 h-20 rounded-md"
                    />
                    <div className="flex-1 ml-4">
                      <h3 className="text-sm font-medium text-gray-900">
                        {item.productName}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        ₹{item.productPrice}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 mt-4 border-t border-gray-200">
                <div className="flex justify-between py-2">
                  <p className="text-sm text-gray-600">Subtotal</p>
                  <p className="text-sm font-medium text-gray-900">
                    ₹{subtotal.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between py-2">
                  <p className="text-sm text-gray-600">Shipping</p>
                  <p className="text-sm font-medium text-gray-900">
                    ₹{shipping.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between py-2">
                  <p className="text-sm text-gray-600">Tax</p>
                  <p className="text-sm font-medium text-gray-900">
                    ₹{tax.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between py-2 mt-2 border-t border-gray-200">
                  <p className="text-base font-medium text-gray-900">Total</p>
                  <p className="text-base font-medium text-gray-900">
                    ₹{total.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="p-4 rounded-md bg-gray-50">
                  <div className="flex items-center">
                    <Truck size={20} className="text-gray-400" />
                    <p className="ml-2 text-sm text-gray-600">
                      Free shipping on orders over ₹599
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <LoadingOverlay isLoading={loadingPaymentWindow} />
      </div>
    </div>
  );
}
