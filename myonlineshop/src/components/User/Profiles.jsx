"use client";

import { useState, useEffect } from "react";
import { axiosInstance } from "../../axiosConfig";

// Icons (you can replace these with your preferred icon library)
const UserIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const EmailIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const ShoppingBagIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
    />
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    className="w-5 h-5 text-green-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const ClockIcon = () => (
  <svg
    className="w-5 h-5 text-yellow-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const TruckIcon = () => (
  <svg
    className="w-5 h-5 text-blue-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);

export default function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");

  const fetchProfile = async () => {
    try {
      const {
        data: { data },
      } = await axiosInstance.get("/api/profile");
      console.log(data.user);
      setUser(data.user);
      setOrders(data.orders || []);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getOrderStatus = (order) => {
    if (order.isDelivered)
      return {
        text: "Delivered",
        icon: <CheckCircleIcon />,
        color: "text-green-600",
      };
    if (order.isPaid)
      return { text: "Shipped", icon: <TruckIcon />, color: "text-blue-600" };
    return {
      text: "Processing",
      icon: <ClockIcon />,
      color: "text-yellow-600",
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            {user?.isSeller && (
              <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                Seller Account
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="p-6 bg-white border rounded-lg shadow-sm">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-20 h-20 mb-4 bg-blue-100 rounded-full">
                  <UserIcon />
                </div>
                <h2 className="mb-1 text-xl font-semibold text-gray-900">
                  {user?.name}
                </h2>
                <p className="mb-4 text-sm text-gray-600">{user?.email}</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "profile"
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Profile Information
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "orders"
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Order History
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <div className="bg-white border rounded-lg shadow-sm">
                <div className="px-6 py-4 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Profile Information
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <UserIcon />
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Full Name
                          </p>
                          <p className="text-gray-900">{user?.name}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <EmailIcon />
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Email Address
                          </p>
                          <p className="text-gray-900">{user?.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <PhoneIcon />
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Phone Number
                          </p>
                          <p className="text-gray-900">{user?.phoneNo}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-gray-50">
                        <h4 className="mb-2 font-medium text-gray-900">
                          Account Status
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              Account Type
                            </span>
                            <span
                              className={`text-sm font-medium ${
                                user?.isSeller
                                  ? "text-blue-600"
                                  : "text-gray-900"
                              }`}
                            >
                              {user?.isSeller ? "Seller" : "Customer"}
                            </span>
                          </div>
                          {user?.isSeller && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">
                                Seller ID
                              </span>
                              <span className="font-mono text-sm text-gray-900">
                                {user?.sellerId}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="space-y-6">
                <div className="bg-white border rounded-lg shadow-sm">
                  <div className="px-6 py-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Order History
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {orders.length} {orders.length === 1 ? "order" : "orders"}{" "}
                      found
                    </p>
                  </div>

                  {orders.length === 0 ? (
                    <div className="p-12 text-center">
                      <div className="w-12 h-12 mx-auto mb-4 text-gray-400">
                        <ShoppingBagIcon />
                      </div>
                      <h4 className="mt-4 text-lg font-medium text-gray-900">
                        No orders yet
                      </h4>
                      <p className="mt-2 text-gray-600">
                        When you place your first order, it will appear here.
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-200">
                      {orders.map((order) => {
                        const status = getOrderStatus(order);
                        return (
                          <div key={order._id} className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h4 className="text-lg font-medium text-gray-900">
                                  Order #{order._id.slice(-8)}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  Placed on {formatDate(order.createdAt)}
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                {status.icon}
                                <span
                                  className={`text-sm font-medium ${status.color}`}
                                >
                                  {status.text}
                                </span>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                              <div>
                                <h5 className="mb-2 font-medium text-gray-900">
                                  Order Items
                                </h5>
                                <div className="space-y-2">
                                  {order.orderItems.map((item) => (
                                    <div
                                      key={item._id}
                                      className="flex justify-between text-sm"
                                    >
                                      <span className="text-gray-600">
                                        {item.product} × {item.quantity}
                                      </span>
                                      <span className="font-medium">
                                        ₹{item.price}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h5 className="mb-2 font-medium text-gray-900">
                                  Shipping Address
                                </h5>
                                <div className="text-sm text-gray-600">
                                  <p>{order.shippingAddress.fullName}</p>
                                  <p>{order.shippingAddress.address}</p>
                                  <p>
                                    {order.shippingAddress.city},{" "}
                                    {order.shippingAddress.postalCode}
                                  </p>
                                  <p>{order.shippingAddress.country}</p>
                                </div>
                              </div>
                            </div>

                            <div className="pt-4 mt-4 border-t border-gray-200">
                              <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-600">
                                  <span>
                                    Items: ₹{order.itemsPrice.toFixed(2)}
                                  </span>
                                  <span className="mx-2">•</span>
                                  <span>Tax: ₹{order.taxPrice.toFixed(2)}</span>
                                  <span className="mx-2">•</span>
                                  <span>
                                    Shipping: ₹{order.shippingPrice.toFixed(2)}
                                  </span>
                                </div>
                                <div className="text-lg font-semibold text-gray-900">
                                  Total: ₹{order.totalPrice.toFixed(2)}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
