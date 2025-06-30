"use client"

import { useContext, useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { axiosInstance } from "../../axiosConfig"
import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingCart, Star, Heart, Share2, AlertCircle } from "lucide-react"
import { reviews } from "../../props/reviews"
import { productAPI } from "../../contexts/ProductContext"
import LoadingOverlay from "../UI/LoadingOverlay"

// Separate components for better organization
const ImageGallery = ({ images, productName, currentImage, setCurrentImage }) => {
  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  return (
    <div className="space-y-4">
      <div className="relative group">
        <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-xl overflow-hidden bg-gray-100">
          <img
            src={images[currentImage] || "/placeholder.svg"}
            alt={productName}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.src = "/placeholder.svg"
            }}
          />

          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute p-2 transition-all duration-200 -translate-y-1/2 rounded-full shadow-lg opacity-0 left-4 top-1/2 bg-white/80 backdrop-blur-sm hover:bg-white group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={nextImage}
                className="absolute p-2 transition-all duration-200 -translate-y-1/2 rounded-full shadow-lg opacity-0 right-4 top-1/2 bg-white/80 backdrop-blur-sm hover:bg-white group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </>
          )}
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 pb-2 overflow-x-auto scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                currentImage === index
                  ? "border-rose-500 ring-2 ring-rose-200"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Product thumbnail ${index + 1}`}
                className="object-cover w-full h-full"
                onError={(e) => {
                  e.target.src = "/placeholder.svg"
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const QuantitySelector = ({ quantity, onIncrease, onDecrease, maxQuantity = 10 }) => (
  <div className="space-y-3">
    <h3 className="text-lg font-semibold text-gray-900">Quantity</h3>
    <div className="flex items-center border border-gray-300 rounded-lg w-fit">
      <button
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="p-3 transition-colors rounded-l-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Decrease quantity"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="w-16 px-4 py-3 font-medium text-center border-gray-300 border-x">{quantity}</span>
      <button
        onClick={onIncrease}
        disabled={quantity >= maxQuantity}
        className="p-3 transition-colors rounded-r-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Increase quantity"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
    {quantity >= maxQuantity && (
      <p className="flex items-center gap-1 text-sm text-amber-600">
        <AlertCircle className="w-4 h-4" />
        Maximum quantity reached
      </p>
    )}
  </div>
)

const StarRating = ({ rating, maxRating = 5, size = "w-5 h-5" }) => (
  <div className="flex items-center gap-1">
    {[...Array(maxRating)].map((_, i) => (
      <Star
        key={i}
        className={`${size} ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"}`}
      />
    ))}
  </div>
)

const ReviewCard = ({ review }) => (
  <div className="p-6 transition-shadow bg-white border border-gray-200 rounded-lg hover:shadow-md">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h4 className="font-semibold text-gray-900">{review.name}</h4>
        <p className="text-sm text-gray-500">{review.date}</p>
      </div>
      <StarRating rating={review.rating} size="w-4 h-4" />
    </div>
    <p className="leading-relaxed text-gray-700">{review.comment}</p>
  </div>
)

export default function ProductPage() {
  const [searchParams] = useSearchParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentImage, setCurrentImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isInCart, setIsInCart] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const { addToCart, setIsCartDrawerOpen, setOrder, productCart } = useContext(productAPI)

  const fetchProduct = async () => {
    setLoading(true)
    setError(null)

    try {
      const productId = searchParams.get("productid")
      if (!productId) {
        throw new Error("Product ID is required")
      }

      const {
        data: { product },
      } = await axiosInstance.get(`/api/getsingleproduct?productid=${productId}`)

      const filteredImages = product.images?.filter((image) => image !== null) || []
      setProduct({ ...product, images: filteredImages })

      // Check if product is already in cart
      const inCart = productCart?.some((item) => item._id === product._id)
      setIsInCart(inCart)
    } catch (error) {
      console.error("Error fetching product:", error)
      setError(error.message || "Failed to load product")
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (!product) return

    const productWithQuantity = { ...product, quantity }
    addToCart(productWithQuantity)
    setIsCartDrawerOpen(true)
    setIsInCart(true)
  }

  const handleBuyNow = () => {
    if (!product) return

    const productWithQuantity = { ...product, quantity }
    setOrder([productWithQuantity])
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.productName,
          text: product.productDescription,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [searchParams])

  if (loading) {
    return <LoadingOverlay isLoading={loading} message="Loading Product" />
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h2 className="mb-2 text-2xl font-bold text-gray-900">Error Loading Product</h2>
          <p className="mb-4 text-gray-600">{error}</p>
          <button
            onClick={fetchProduct}
            className="px-6 py-2 text-white transition-colors rounded-lg bg-rose-600 hover:bg-rose-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">Product Not Found</h2>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Product Section */}
        <div className="overflow-hidden bg-white shadow-sm rounded-2xl">
          <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-2 lg:gap-12 lg:p-8">
            {/* Product Images */}
            <ImageGallery
              images={product.images}
              productName={product.productName}
              currentImage={currentImage}
              setCurrentImage={setCurrentImage}
            />

            {/* Product Details */}
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h1 className="text-3xl font-bold leading-tight text-gray-900 lg:text-4xl">{product.productName}</h1>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className={`p-2 rounded-full transition-colors ${
                        isFavorite ? "text-red-500 bg-red-50" : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                      }`}
                      aria-label="Add to favorites"
                    >
                      <Heart className={`w-6 h-6 ${isFavorite ? "fill-current" : ""}`} />
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-2 text-gray-400 transition-colors rounded-full hover:text-gray-600 hover:bg-gray-50"
                      aria-label="Share product"
                    >
                      <Share2 className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <p className="text-3xl font-bold text-rose-600">₹{product.productPrice?.toLocaleString()}</p>
                  {product.originalPrice && product.originalPrice > product.productPrice && (
                    <div className="flex items-center gap-2">
                      <p className="text-lg text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</p>
                      <span className="px-2 py-1 text-sm font-medium text-green-800 bg-green-100 rounded">
                        {Math.round(((product.originalPrice - product.productPrice) / product.originalPrice) * 100)}%
                        OFF
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <StarRating rating={4} />
                  <span className="text-sm text-gray-600">4.0 • Based on {reviews.length} reviews</span>
                </div>
              </div>

              {/* Description */}
              <div className="prose prose-gray max-w-none">
                <p className="text-lg leading-relaxed text-gray-700">{product.productDescription}</p>
              </div>

              {/* Quantity Selector */}
              <QuantitySelector
                quantity={quantity}
                onIncrease={() => setQuantity((prev) => Math.min(prev + 1, 10))}
                onDecrease={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              />

              {/* Action Buttons */}
              <div className="pt-4 space-y-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isInCart}
                  className={`w-full flex items-center justify-center gap-3 px-8 py-4 font-semibold text-white rounded-xl transition-all duration-200 ${
                    isInCart ? "bg-green-600 hover:bg-green-700" : "bg-rose-600 hover:bg-rose-700 hover:shadow-lg"
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {isInCart ? "Added to Cart" : "Add to Cart"}
                </button>

                <Link
                  to="/order"
                  onClick={handleBuyNow}
                  className="flex items-center justify-center w-full gap-3 px-8 py-4 font-semibold text-white transition-all duration-200 bg-blue-600 hover:bg-blue-700 rounded-xl hover:shadow-lg"
                >
                  Buy Now
                </Link>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                <div className="p-4 text-center rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-600">Free Shipping</p>
                  <p className="font-semibold text-gray-900">On orders over ₹500</p>
                </div>
                <div className="p-4 text-center rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-600">Easy Returns</p>
                  <p className="font-semibold text-gray-900">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <div className="p-6 bg-white shadow-sm rounded-2xl lg:p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 lg:text-3xl">Customer Reviews</h2>
              <div className="flex items-center gap-2">
                <StarRating rating={4} />
                <span className="text-lg font-semibold text-gray-900">4.0</span>
                <span className="text-gray-600">({reviews.length} reviews)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
