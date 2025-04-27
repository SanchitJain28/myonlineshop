import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { authContext } from "../../contexts/AuthContext";

export default function RegisterPage() {
  const toast = useToast();
  //usecontext
  const auth = useContext(authContext);
  //navigate
  const navigate = useNavigate();

  //states
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const handleRegister = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    try {
      const { errors } = await auth.getMeRegistered(
        email,
        password,
        name,
        phoneNo
      );
      if (!errors) {
        setTimeout(() => {
          navigate("/");
        }, 1500);
        return toast({
          title: `Account created Succesfully`,
          status: "success",
          isClosable: true,
        });
      }
      navigate("/login");
      toast({
        title: `Account cannot created`,
        description: errors[0].msg,
        status: "error",
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  //PLEASE ADD HEADER OPTION OTHERWISE it will not work

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create a account
          </h2>
          <p className="mt-2 text-sm text-gray-600">Please sign up</p>
        </div>

        <div className="overflow-hidden bg-white border border-gray-100 rounded-lg shadow-lg">
          <div className="px-6 py-8">
            <h3 className="mb-2 text-xl font-semibold text-center">Sign Up</h3>
            <p className="mb-6 text-sm text-center text-gray-500">
              Enter your credentials to create your account
            </p>

            <form onSubmit={handleRegister} className="space-y-5">
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

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    name
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-10 px-3 py-2 pr-10 transition-colors border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Phone number
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="Phone"
                    type="text"
                    placeholder="Phone"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
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
                {isLoading ? "Signing up" : "Sign Up"}
              </button>
            </form>
          </div>

          <div className="flex justify-center px-6 py-4 border-t border-gray-100 bg-gray-50">
            <p className="text-sm text-gray-600">
              Already have an account?
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
