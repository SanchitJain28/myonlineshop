import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { axiosInstance } from "../../axiosConfig";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  Star,
} from "lucide-react";
import { reviews } from "../../props/reviews";
import { productAPI } from "../../contexts/ProductContext";

export default function ProductPage() {
  let [searchParams] = useSearchParams();
  const [product, setProduct] = useState(null);
  const { addToCart, checkInCart, setIsCartDrawerOpen, setOrder,order } =
    useContext(productAPI);
  // const checkInCart = () => {
  //   if (productContext.productCart.map((e) => e._id).indexOf(product._id) !== -1) {
  //     setDisabled(true);
  //   }
  // };
  const [isInCart, setIsInCart] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const createOrder = ()=>{
    console.log(product)
    setOrder((prev)=>[product])
    console.log(order)
  }

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const incrementQuantity = () => {
    if(quantity >=5) return;
    setProduct((prev) => ({ ...prev, quantity: quantity + 1}))
    setQuantity((prev) => prev + 1);

  };

  const decrementQuantity = () => {
    if(quantity <= 1) return;
    setProduct((prev) => ({ ...prev, quantity: quantity - 1}))
    setQuantity((prev) => prev - 1);
  };

  const fetchProduct = async () => {
    try {
      const {data:{product}} = await axiosInstance.get(
        `/api/getsingleproduct?productid=${searchParams.get("productid")}`
      );
      const filteredImages = product.images.filter((image) => image !== null);
      setProduct({...product,quantity:1,images:filteredImages});
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  

  if (!product) {
    return (
      <div className="">
        <p className="text-5xl">Loading</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
      {/* Product Section */}
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Product Images */}
        <div className="relative">
          <div className="relative h-[400px] sm:h-[500px] rounded-lg overflow-hidden">
            <img
              src={product.images[currentImage] || "/placeholder.svg"}
              alt={product.productName}
              fill
              className="object-cover"
              priority
            />
            <button
              onClick={prevImage}
              className="absolute p-2 transition-colors -translate-y-1/2 bg-white rounded-full shadow-md left-4 top-1/2 hover:bg-gray-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute p-2 transition-colors -translate-y-1/2 bg-white rounded-full shadow-md right-4 top-1/2 hover:bg-gray-100"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex gap-4 pb-2 mt-4 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`relative h-20 w-20 rounded-md overflow-hidden border-2 ${
                  currentImage === index
                    ? "border-rose-500"
                    : "border-transparent"
                }`}
              >
                
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Product thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900">
            {product.productName}
          </h1>
          <p className="mt-2 text-2xl font-semibold text-rose-600">
            ₹{product.productPrice}
          </p>

          <div className="flex items-center mt-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < 4
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300 fill-gray-300"
                  }`}
                />
              ))}
            </div>
            {/* <span className="ml-2 text-sm text-gray-600">Based on {product.reviews.length} reviews</span> */}
          </div>

          <p className="mt-6 leading-relaxed text-gray-700">
            {product.productDescription}
          </p>

          {/* <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900">Colors</h3>
            <div className="flex mt-2 space-x-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className="px-4 py-2 border rounded-md hover:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  {color}
                </button>
              ))}
            </div>
          </div> */}

          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900">Quantity</h3>
            <div className="flex items-center mt-2 border rounded-md w-fit">
              <button
                onClick={decrementQuantity}
                className="p-2 hover:bg-gray-100 rounded-l-md"
                aria-label="Decrease quantity"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="w-12 px-4 py-2 text-center">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="p-2 hover:bg-gray-100 rounded-r-md"
                aria-label="Increase quantity"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          <button
            className="flex items-center justify-center gap-2 px-6 py-3 mt-8 font-medium text-white transition-colors rounded-md bg-rose-600 hover:bg-rose-700"
            onClick={() => {
              addToCart(product);
              setIsCartDrawerOpen(true);
              setIsInCart(true);
            }}
          >
            <ShoppingCart className="w-5 h-5" />
            {isInCart ? "Already in cart" : "Add in cart"}
          </button>
          <Link
            to={'/order'}
            className="flex items-center justify-center gap-2 px-6 py-3 mt-3 font-medium text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
            onClick={createOrder}
          >
            <ShoppingCart className="w-5 h-5" />
            Buy Now
          </Link>
        </div>
      </div>

      {/* Features Section */}
      {/* <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900">Features</h2>
        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
          <ul className="pl-5 space-y-2 text-gray-700 list-disc">
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div> */}

      {/* Reviews Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
        <div className="mt-6 space-y-8">
          {reviews.map((review) => (
            <div key={review.id} className="pb-8 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{review.name}</h3>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300 fill-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-4 text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
