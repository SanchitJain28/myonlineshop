import { Check, Home, Package, Truck } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { axiosInstance } from "../../axiosConfig";
import { useEffect, useState } from "react";
import LoadingScreen from "../UI/LoadingScreen/LoadingScreen";

export default function OrderSuccessPage() {
  // In a real app, you would fetch the order details from your backend
  // or pass them through state management/URL parameters
  const [searchParams] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(
        `/api/get-order-details?orderId=${searchParams.get("orderId")}`
      );
      console.log(data.orderDetails[0]);
      setOrderDetails(data.orderDetails[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);
  if (loading) {
    return (
      <LoadingScreen
        onLoadingComplete={() => setLoading(false)}
        minLoadingTime={2500}
        maxLoadingTime={4000}
      />
    );
  }
  const createdAt = new Date(orderDetails.createdAt); // Convert string to Date
  const deliveryDate = createdAt.setDate(createdAt.getDate() + 5); // Add 5 days
  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-3xl px-4 mx-auto">
        {/* Success Message */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 mb-6 bg-green-100 rounded-full">
            <Check className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Order Placed Successfully!
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>

        {/* Order Information */}
        <div className="p-6 mb-8 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between pb-4 mb-4 border-b">
            <div>
              <h2 className="text-xl font-semibold">
                Order #
                {orderDetails.customOrderId
                  ? orderDetails.customOrderId
                  : "NOT FOUND"}
              </h2>
              <p className="text-gray-600">
                Placed on{" "}
                {orderDetails.createdAt ? orderDetails.createdAt : "Today"}
              </p>
            </div>
            <div className="px-4 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
              Confirmed
            </div>
          </div>

          <div className="mb-6">
            <h3 className="mb-3 text-lg font-medium">Order Details</h3>
            <div className="divide-y divide-gray-200">
              {orderDetails.orderItems.map((item) => (
                <div
                  key={item.product._id}
                  className="flex justify-between py-3"
                >
                  <div>
                    <p className="font-medium">{item.product.productName}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">₹{item.product.productPrice}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mb-6 border-t border-gray-200">
            <div className="flex justify-between py-2">
              <p className="text-gray-600">Subtotal</p>
              <p className="font-medium">₹{orderDetails.itemsPrice}</p>
            </div>
            <div className="flex justify-between py-2">
              <p className="text-gray-600">Shipping</p>
              <p className="font-medium">₹{orderDetails.shippingPrice}</p>
            </div>
            <div className="flex justify-between py-2">
              <p className="text-gray-600">Tax (GST 18%)</p>
              <p className="font-medium">₹{orderDetails.taxPrice}</p>
            </div>
            <div className="flex justify-between py-2 mt-2 border-t border-gray-200">
              <p className="text-lg font-medium">Total</p>
              <p className="text-lg font-bold">₹{orderDetails.totalPrice}</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-lg font-medium">Shipping Address</h3>
              <p className="text-gray-600">
                {orderDetails.shippingAddress.address}
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-medium">Payment Method</h3>
              <p className="text-gray-600">{orderDetails.paymentMethod}</p>
            </div>
          </div>
        </div>

        {/* Delivery Timeline */}
        <div className="p-6 mb-8 bg-white rounded-lg shadow-sm">
          <h3 className="mb-4 text-lg font-medium">Delivery Information</h3>
          <div className="relative">
            <div className="absolute left-8 top-0 h-full w-0.5 bg-gray-200"></div>

            <div className="relative flex items-start mb-6">
              <div className="z-10 flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full">
                <Package className="w-8 h-8 text-white" />
              </div>
              <div className="pt-3 ml-6">
                <h4 className="font-medium">Order Confirmed</h4>
                <p className="text-gray-600">
                  {orderDetails.createdAt ?new Date(orderDetails.createdAt).toLocaleDateString()  : "Today"}
                </p>
              </div>
            </div>

            <div className="relative flex items-start mb-6">
              <div className="z-10 flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full">
                <Package className="w-8 h-8 text-gray-600" />
              </div>
              <div className="pt-3 ml-6">
                <h4 className="font-medium">Processing</h4>
                <p className="text-gray-600">Your order is being processed</p>
              </div>
            </div>

            <div className="relative flex items-start">
              <div className="z-10 flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full">
                <Truck className="w-8 h-8 text-gray-600" />
              </div>
              <div className="pt-3 ml-6">
                <h4 className="font-medium">Estimated Delivery</h4>
                <p className="text-gray-600">
                  {new Date(deliveryDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Support */}
        <div className="p-6 mb-8 bg-white rounded-lg shadow-sm">
          <h3 className="mb-2 text-lg font-medium">Need Help?</h3>
          <p className="mb-4 text-gray-600">
            If you have any questions about your order, please contact our
            customer support.
          </p>
          <div className="flex space-x-4">
            <a
              href="mailto:support@yourstore.com"
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Email Support
            </a>
            <a
              href="tel:+918888888888"
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Call Us
            </a>
          </div>
        </div>

        {/* Continue Shopping Button */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Home className="w-5 h-5 mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
