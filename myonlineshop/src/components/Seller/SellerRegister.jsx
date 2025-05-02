import { useContext, useEffect, useState } from "react";
import { authContext } from "../../contexts/AuthContext";
import { axiosInstance } from "../../axiosConfig";
import { useNavigate } from "react-router-dom";

export default function SellerRegistration() {
  const { currentUser } = useContext(authContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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
  const [formData, setFormData] = useState({
    businessName: "",
    businessAddress: "",
    businessPhone: "",
  });
  const onRegister = async () => {
    try {
      const { data } = await axiosInstance.post("/api/seller-register", {
        name:formData.businessName,
        address:formData.businessAddress,
        phone:formData.businessPhone,
        email:user.email,
      });
      console.log(data)
      navigate("/sellerdashboard")
    } catch (error) {
      console.log(error)
    }
    
  };
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required";
    }

    if (!formData.businessAddress.trim()) {
      newErrors.businessAddress = "Business address is required";
    }

    if (!formData.businessPhone.trim()) {
      newErrors.businessPhone = "Business phone is required";
    } else if (!/^\d{10}$/.test(formData.businessPhone.replace(/\D/g, ""))) {
      newErrors.businessPhone = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    console.log(formData)
    e.preventDefault();
    if (validateForm()) {
      onRegister(formData);
    }
  };
  if (!user) {
    return (
      <div className="">
        <p className="">Please login to continue</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="">
        <p className="">Loading</p>
      </div>
    );
  }

  return (
    <div className="max-w-md px-4 py-12 mx-auto">
      <div className="overflow-hidden bg-white rounded-lg shadow-lg">
        <div className="px-6 py-8">
          <h2 className="mb-8 text-2xl font-bold text-center text-gray-800">
            Become a Seller
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="businessName"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Business Name
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.businessName
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                }`}
                placeholder="Your Business Name"
              />
              {errors.businessName && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.businessName}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="businessAddress"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Business Address
              </label>
              <textarea
                id="businessAddress"
                name="businessAddress"
                value={formData.businessAddress}
                onChange={handleChange}
                rows="3"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.businessAddress
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                }`}
                placeholder="Your Business Address"
              ></textarea>
              {errors.businessAddress && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.businessAddress}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="businessPhone"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Business Phone
              </label>
              <input
                type="tel"
                id="businessPhone"
                name="businessPhone"
                value={formData.businessPhone}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.businessPhone
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                }`}
                placeholder="Your Business Phone"
              />
              {errors.businessPhone && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.businessPhone}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 text-white transition duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Register as Seller
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
