import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useToast } from "@chakra-ui/react";
import { axiosInstance } from "../../axiosConfig";
import { productAPI } from "../../contexts/ProductContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const toast = useToast();
  //context

  //states
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {orderRedirection}=useContext(productAPI)
  const handleSignIn = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    try {
      const {
        data
      } = await axiosInstance.post("/api/loginuser", {
        email,
        password,
      });
      console.log(data)
      if(orderRedirection){
        navigate("/order")
        return
      }
      navigate("/");
      localStorage.setItem("accessToken", data.accessToken);
      toast({
        title: "Login Successful",
        description: "You have successfully logged in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in to your account
          </p>
        </div>

        <div className="overflow-hidden bg-white border border-gray-100 rounded-lg shadow-lg">
          <div className="px-6 py-8">
            <h3 className="mb-2 text-xl font-semibold text-center">Sign In</h3>
            <p className="mb-6 text-sm text-center text-gray-500">
              Enter your credentials to access your account
            </p>

            <form onSubmit={handleSignIn} className="space-y-5">
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 px-3 py-2 transition-colors border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type="text"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-10 px-3 py-2 pr-10 transition-colors border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`w-full h-10 flex items-center justify-center rounded-md text-white font-medium transition-colors ${
                  isLoading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>

          <div className="flex justify-center px-6 py-4 border-t border-gray-100 bg-gray-50">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
