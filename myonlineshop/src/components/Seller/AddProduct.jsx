
import { useState, useRef } from "react";
import { X } from "lucide-react";
import { axiosInstance } from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';

export default function AddProduct({sellerid,BusinessName}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    inventory: "",
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const categories = [
    "T-Shirts & Tops",
    "Shirts & Blouses",
    "Jeans & Trousers",
    "Dresses & Ethnic Wear",
    "Jackets & Hoodies",
    "Activewear & Sportswear",
    "Nightwear & Loungewear",
    "Accessories",
  ];
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // Add new files to existing files
      setImageFiles((prevFiles) => [...prevFiles, ...files]);

      // Generate previews for new files
      const previewUrls = files.map((file) => URL.createObjectURL(file));
      setImagePreviews(previewUrls); // For preview
    }
  };

  const handleImageRemove = (index) => {
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  const handleRemoveAllImages = () => {
    setImageFiles([]);
    setImagePreviews([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Product description is required";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (
      isNaN(formData.price) ||
      Number.parseFloat(formData.price) <= 0
    ) {
      newErrors.price = "Please enter a valid price";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (!formData.inventory) {
      newErrors.inventory = "Inventory quantity is required";
    } else if (
      isNaN(formData.inventory) ||
      Number.parseInt(formData.inventory) < 0
    ) {
      newErrors.inventory = "Please enter a valid inventory quantity";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validateForm()) {
        setIsSubmitting(true);
        const formDataToSubmit = new FormData();
        formDataToSubmit.append("sellerid",sellerid );
        formDataToSubmit.append("BusinessName", BusinessName);
        formDataToSubmit.append("productName", formData.name);
        formDataToSubmit.append("productDescription", formData.description);
        formDataToSubmit.append("productPrice", formData.price);
        formDataToSubmit.append("productCategory", formData.category);
        formDataToSubmit.append("inventory", formData.inventory);
        for (let i = 0; i < imageFiles.length; i++) {
          formDataToSubmit.append("file", imageFiles[i]);
        }
        const { data } = await axiosInstance.post(
          "/api/createproduct",
          formDataToSubmit
        );
        console.log(data)
        toast("Product added successfully!", {
          type: "success",
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          inventory: "",
        })
        fileInputRef.current.value = null;
        setImageFiles([]);
        setImagePreviews([]);
      }
    } catch (error) {
      console.log(error)
      toast("Product cannot be added successfully!", {
        type: "error",
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
    finally{
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-lg font-medium text-gray-800">
        Add New Product
      </h2>

      {submitSuccess && (
        <div className="p-4 mb-4 text-green-700 border border-green-200 rounded-md bg-green-50">
          Product added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="col-span-2">
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="col-span-2">
            <label
              htmlFor="description"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 ${
                errors.description
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            ></textarea>
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="price"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Price ($)
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 ${
                errors.price
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-500">{errors.price}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="category"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 ${
                errors.category
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-500">{errors.category}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="inventory"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Inventory Quantity
            </label>
            <input
              type="number"
              id="inventory"
              name="inventory"
              value={formData.inventory}
              onChange={handleChange}
              min="0"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 ${
                errors.inventory
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.inventory && (
              <p className="mt-1 text-sm text-red-500">{errors.inventory}</p>
            )}
          </div>

          <div className="col-span-2">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Product Images (optional)
            </label>
            <div className="flex flex-col space-y-2">
              <input
                type="file"
                id="image"
                name="file"
                ref={fileInputRef}
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />

              {imagePreviews.length > 0 && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      {imagePreviews.length} image(s) selected
                    </span>
                    <button
                      type="button"
                      onClick={handleRemoveAllImages}
                      className="text-xs text-red-600 hover:text-red-800"
                    >
                      Remove all
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <div className="relative w-full h-32 overflow-hidden border border-gray-200 rounded-md">
                          <img
                            src={preview || "/placeholder.svg"}
                            alt={`Product ${index + 1}`}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleImageRemove(index)}
                          className="absolute p-1 text-white bg-red-500 rounded-full top-1 right-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Adding Product..." : "Add Product"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
