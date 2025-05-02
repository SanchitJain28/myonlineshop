"use client";

import { useContext, useEffect, useState } from "react";

import { ChevronLeft, Minus, Plus, X } from "lucide-react";
import { Link } from "react-router-dom";
import { productAPI } from "../../contexts/ProductContext";
// Sample cart data - in a real app, this would come from your state management or API
const initialCartItems = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 249.99,
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    quantity: 2,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    name: "Smart Fitness Watch",
    price: 199.99,
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const { productCart,removeFromCart,setOrder } = useContext(productAPI);
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const createOrder = ()=>{
    setOrder(productCart)
  }

 

  // Calculate totals
  const subtotal = productCart.reduce(
    (sum, item) => sum + item.productPrice * 1,
    0
  );
  const shipping = 10.0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">
        Your Cart has {productCart.length} items
      </h1>

      {productCart.length === 0 ? (
        <div className="py-12 text-center">
          <h2 className="mb-4 text-xl font-medium text-gray-900">
            Your cart is empty
          </h2>
          <p className="mb-8 text-gray-500">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          <div className="lg:col-span-7">
            <div className="border-t border-b border-gray-200 divide-y divide-gray-200">
              {productCart.map((item) => (
                <div key={item.id} className="py-6 sm:flex">
                  <div className="flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md">
                    <img
                      src={item.images[0] || "/placeholder.svg"}
                      alt={item.productName}
                      width={100}
                      height={100}
                      className="object-cover object-center w-full h-full"
                    />
                  </div>

                  <div className="flex-1 mt-4 sm:mt-0 sm:ml-6">
                    <div className="flex justify-between">
                      <h3 className="text-base font-medium text-gray-900">
                        {item.productName}
                      </h3>
                      <p className="ml-4 text-base font-medium text-gray-900">
                      ₹
                      {item.productPrice}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                    ₹
                    {item.productPrice
                      } each
                    </p>

                    <div className="flex justify-between mt-4">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          type="button"
                          className="p-2 text-gray-600 hover:text-gray-500"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="p-2 text-gray-600 hover:text-gray-500"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        type="button"
                        className="flex items-center text-sm font-medium text-red-600 hover:text-red-500"
                        onClick={() => removeFromCart(item._id)}
                      >
                        <X className="w-4 h-4 mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Link
                href="/products"
                className="inline-flex items-center text-blue-600 hover:text-blue-500"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Continue Shopping
              </Link>
            </div>
          </div>

          <div className="mt-10 lg:mt-0 lg:col-span-5">
            <div className="px-6 py-8 rounded-lg bg-gray-50">
              <h2 className="mb-6 text-lg font-medium text-gray-900">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-base text-gray-500">Subtotal</p>
                  <p className="text-base font-medium text-gray-900">
                  ₹
                  {subtotal.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-base text-gray-500">Shipping</p>
                  <p className="text-base font-medium text-gray-900">
                  ₹
                  {shipping.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-base text-gray-500">Tax</p>
                  <p className="text-base font-medium text-gray-900">
                  ₹
                  {tax.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <p className="text-lg font-medium text-gray-900">Total</p>
                  <p className="text-xl font-bold text-gray-900">
                  ₹
                  {total.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  type="button"
                  to="/order"
                  className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={createOrder}
                >
                  Proceed to Checkout
                </Link>
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  We accept all major credit cards and PayPal
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
