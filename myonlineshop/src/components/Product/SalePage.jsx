
import { useEffect, useState } from "react"
import { FiHeart, FiShoppingBag, FiChevronRight, FiFilter, FiList, FiX } from "react-icons/fi"
import { axiosInstance } from "../../axiosConfig"
import {Link, useSearchParams} from 'react-router-dom'

// Product Card Component
function ProductCard({ product }) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <Link to={`/product?productid=${product._id}`} className="flex flex-col h-full overflow-hidden bg-white border border-gray-100 rounded-lg shadow-sm group">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        {isLoading && <div className="absolute inset-0 z-10 bg-gray-200 animate-pulse"></div>}
        <img
          src={
            product.images[0] ||
            `/placeholder.svg?height=400&width=300&text=${encodeURIComponent(product.category || "Product")}`
          }
          alt={product.productName}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
        <div className="absolute z-10 top-3 right-3">
          <button className="p-2 transition-colors rounded-full shadow-sm bg-white/80 backdrop-blur-sm hover:bg-white/90">
            <FiHeart className="w-4 h-4" />
            <span className="sr-only">Add to wishlist</span>
          </button>
        </div>
      </div>
      <div className="flex-grow p-3 sm:p-4">
        <h3 className="text-base font-medium truncate">{product.productName}</h3>
        <p className="mt-1 text-xs text-gray-500 sm:text-sm line-clamp-2">{product.productDescription}</p>
        <div className="flex items-center gap-2 mt-2">
          <p className="text-base font-semibold sm:text-lg">₹{product.productPrice}</p>
        </div>
      </div>
      <div className="flex justify-between p-3 pt-0 sm:p-4">
        <button className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm text-white bg-gray-900 rounded-full hover:bg-gray-800">
          <FiShoppingBag className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>
      </div>
    </Link>
  )
}

// Empty State Component
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="p-4 mb-4 bg-gray-100 rounded-full">
        <FiShoppingBag className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium">No products found</h3>
      <p className="max-w-md mt-2 text-sm text-gray-500">
        We couldn't find any products in this category. Please try another category or check back later.
      </p>
    </div>
  )
}

// Product Skeleton Loader
function ProductSkeleton() {
  return (
    <div className="h-full overflow-hidden bg-white border border-gray-100 rounded-lg shadow-sm">
      <div className="aspect-[3/4] w-full bg-gray-200 animate-pulse"></div>
      <div className="p-4">
        <div className="w-3/4 h-6 mb-2 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-full h-4 mb-1 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-2/3 h-4 mb-3 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-1/3 h-5 mb-3 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-full bg-gray-200 rounded-full h-9 animate-pulse"></div>
      </div>
    </div>
  )
}

// Simple Loading Screen Component
function SimpleLoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-gray-200 rounded-full border-t-gray-800 animate-spin"></div>
        <p className="mt-4 text-gray-600">Loading products...</p>
      </div>
    </div>
  )
}

// Mobile Filter Sheet Component
function MobileFilterSheet({ isOpen, onClose, categories, activeTab, onCategoryChange }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex md:hidden">
      <div className="fixed inset-0 bg-black/30" onClick={onClose}></div>
      <div className="relative w-4/5 h-full max-w-xs p-4 ml-auto overflow-auto bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Categories</h2>
          <button onClick={onClose} className="p-1">
            <FiX className="w-5 h-5" />
          </button>
        </div>
        <div className="grid gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`text-left px-3 py-2 rounded-md flex justify-between items-center ${
                activeTab === category
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
              onClick={() => {
                onCategoryChange(category)
                onClose()
              }}
            >
              {category}
              {activeTab === category && <FiChevronRight className="w-4 h-4 ml-auto" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// Mobile Sort Sheet Component
function MobileSortSheet({ isOpen, onClose, sortOptions, activeSortOption, onSortChange }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex md:hidden">
      <div className="fixed inset-0 bg-black/30" onClick={onClose}></div>
      <div className="relative w-full bg-white rounded-t-xl p-4 max-h-[80vh] overflow-auto mt-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Sort Products</h2>
          <button onClick={onClose} className="p-1">
            <FiX className="w-5 h-5" />
          </button>
        </div>
        <div className="grid gap-2 py-4">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              className={`text-left px-3 py-2 rounded-md ${
                activeSortOption === option.value
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
              onClick={() => {
                onSortChange(option.value)
                onClose()
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// Main Shop Page Component
export default function ShopPage() {
  let [searchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState(searchParams.get('category') || "T-Shirts & Tops")
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortOption, setSortOption] = useState("featured")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [mobileSortOpen, setMobileSortOpen] = useState(false)

  const categories = [
    "T-Shirts & Tops",
    "Shirts & Blouses",
    "Jeans & Trousers",
    "Dresses & Ethnic Wear",
    "Jackets & Hoodies",
    "Activewear & Sportswear",
    "Nightwear & Loungewear",
    "Accessories",
  ]

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "newest", label: "Newest" },
  ]

  const fetchProductsByCategory = async () => {
    setLoading(true)
    try {
      const category = encodeURIComponent(activeTab) 
      console.log(category)
      const {
        data: { data },
      } = await axiosInstance.get(
        `/api/get-product-by-category?category=${category}`
      ); 
      setProducts([...data])
    } catch (error) {
      console.error("Error fetching products:", error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    
    fetchProductsByCategory()
  }, [activeTab, sortOption])

  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveTab(category)
    setMobileFiltersOpen(false)
    searchParams.set('category', category)
    window.history.replaceState({}, '', `?${searchParams.toString()}`)
  }

  if (loading && products.length === 0) {
    return <SimpleLoadingScreen />
  }

  return (
    <div className="container px-4 py-4 mx-auto sm:py-8">
      {/* Mobile Header */}
      <div className="flex items-center justify-between mb-4 md:hidden">
        <h1 className="text-xl font-bold truncate max-w-[60%]">{activeTab}</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileSortOpen(true)}
            className="p-2 border border-gray-200 rounded-full hover:bg-gray-50"
          >
            <FiList className="w-4 h-4" />
            <span className="sr-only">Sort products</span>
          </button>

          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="p-2 border border-gray-200 rounded-full hover:bg-gray-50"
          >
            <FiFilter className="w-4 h-4" />
            <span className="sr-only">Filter products</span>
          </button>
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      <MobileFilterSheet
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        categories={categories}
        activeTab={activeTab}
        onCategoryChange={handleCategoryChange}
      />

      {/* Mobile Sort Sheet */}
      <MobileSortSheet
        isOpen={mobileSortOpen}
        onClose={() => setMobileSortOpen(false)}
        sortOptions={sortOptions}
        activeSortOption={sortOption}
        onSortChange={setSortOption}
      />

      <div className="flex flex-col gap-6 md:flex-row">
        {/* Desktop Sidebar */}
        <div className="hidden w-64 md:block shrink-0">
          <div className="sticky p-4 bg-white border border-gray-100 rounded-lg shadow-sm top-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Categories</h2>
            </div>
            <ul className="space-y-1.5">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors flex justify-between items-center text-sm ${
                      activeTab === category
                        ? "bg-gray-100 text-gray-900 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveTab(category)}
                  >
                    {category}
                    {activeTab === category && <FiChevronRight className="w-4 h-4" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Desktop Header & Sort */}
          <div className="items-center justify-between hidden mb-6 md:flex">
            <div>
              <h1 className="text-2xl font-bold">{activeTab}</h1>
              <p className="mt-1 text-sm text-gray-500">{products.length} products found</p>
            </div>
            <div className="flex items-center gap-2">
              <select
                className="p-2 text-sm border rounded-md"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    Sort by: {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Category Badge (Mobile) */}
          <div className="mb-4 md:hidden">
            <span className="px-2 py-1 text-xs border border-gray-200 rounded-full bg-gray-50">
              {products.length} products
            </span>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
              {Array(8)
                .fill(0)
                .map((_, index) => (
                  <ProductSkeleton key={index} />
                ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  )
}
