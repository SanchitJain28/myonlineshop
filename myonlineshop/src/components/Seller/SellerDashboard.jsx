import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OrdersList from "./OrderList";
import { axiosInstance } from "../../axiosConfig";
import AddProduct from "./AddProduct";

export default function SellerDashboard() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("orders");
  const [seller, setSeller] = useState(null);
  const getSeller = async () => {
    try {
      setLoading(true);
      const {
        data: { user },
      } = await axiosInstance.get("/api/get-seller");
      console.log(user.sellerId);
      setSeller(user.sellerId);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getSeller();
  }, []);

  if (loading) {
    return (
      <div className="">
        <p className="">Loading</p>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="">
        <p className="">Please become a seller</p>
        <Link to="/becomeaseller" className="p-4 mx-auto my-4 bg-blue-600">
          Become a seller
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-800">
                Seller Dashboard
              </h1>
              <div className="text-sm text-gray-600">
                <p className="font-medium">{seller.businessName}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white rounded-lg shadow">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`py-4 px-6 text-sm font-medium ${
                    activeTab === "orders"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Orders
                </button>
                <button
                  onClick={() => setActiveTab("add-product")}
                  className={`py-4 px-6 text-sm font-medium ${
                    activeTab === "add-product"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Add Product
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "orders" && <OrdersList />}
              {activeTab === "add-product" && <AddProduct sellerid = {seller._id} BusinessName= {seller.businessName}/>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
