import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../axiosConfig";
import LoadingScreen from "./UI/LoadingScreen/LoadingScreen";
import { ShoppingCart, User } from "lucide-react";
import { productAPI } from "../contexts/ProductContext";
import Header from "./UI/Header";
import Footer from "./UI/Footer";
// Mock product data for carousels

// Categories with appropriate clothing images
const categories = [
  {
    name: "T-Shirts & Tops",
    img: "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Shirts & Blouses",
    img: "https://images.unsplash.com/photo-1608234808654-2a8875faa7fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Jeans & Trousers",
    img: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Dresses & Ethnic Wear",
    img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Jackets & Hoodies",
    img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Activewear & Sportswear",
    img: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Nightwear & Loungewear",
    img: "https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Accessories",
    img: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
  },
];

// Product Carousel Component
const ProductCarousel = ({ products }) => {
  return (
    <div className="relative">
      <div className="flex gap-4 pb-4 overflow-x-auto snap-x scrollbar-hide">
        {products.map((product) => {
          return (
            <Link
              to={`/product?productid=${product._id}`}
              key={product._id}
              className="min-w-[250px] snap-start flex-shrink-0 group"
            >
              <div className="relative overflow-hidden bg-gray-100 rounded-lg">
                <img
                  src={product.images[0]}
                  alt={product.productName}
                  className="h-[300px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mt-3">
                <h3 className="text-sm font-medium">{product.productName}</h3>
                <p className="text-sm text-gray-500">
                  {product.productCategory}
                </p>
                <p className="mt-1 font-semibold">₹{product.productPrice}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};



export default function LandingPage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchFeaturedProducts = async () => {
    setLoading(true);
    try {
      const category = encodeURIComponent("Shirts & Blouses");
      const {
        data: { data },
      } = await axiosInstance.get(
        `/api/get-product-by-category?category=${category}`
      );
      setFeaturedProducts([...data]);
    } catch (error) {
      console.error("Error fetching products:", error);
      setFeaturedProducts([]);
    } finally {
      setLoading(false);
    }
  };
  const fetchTrendingProducts = async () => {
    setLoading(true);
    try {
      const category = encodeURIComponent("Dresses & Ethnic Wear");
      const {
        data: { data },
      } = await axiosInstance.get(
        `/api/get-product-by-category?category=${category}`
      );
      setTrendingProducts([...data]);
    } catch (error) {
      console.error("Error fetching products:", error);
      setFeaturedProducts([]);
    } finally {
      setLoading(false);
    }
  };
  const fetchInstaStyle = async () => {
    setLoading(true);
    try {
      const category = encodeURIComponent("Jackets & Hoodies");
      const {
        data: { data },
      } = await axiosInstance.get(
        `/api/get-product-by-category?category=${category}`
      );
      const mapImages = data.map((item) => item.images[0]);
      setInstaStyle([...mapImages]);
    } catch (error) {
      console.error("Error fetching products:", error);
      setFeaturedProducts([]);
    } finally {
      setLoading(false);
    }
  };
  const [instaStyle, setInstaStyle] = useState([]);
  useEffect(() => {
    fetchFeaturedProducts();
    fetchTrendingProducts();
    fetchInstaStyle();
  }, []);
  const handleLoadingComplete = () => {
    setLoading(false);
  };
  if (loading) {
    return (
      <LoadingScreen
        onLoadingComplete={handleLoadingComplete}
        minLoadingTime={2500}
        maxLoadingTime={4000}
      />
    );
  }
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-12 overflow-hidden md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 mx-auto md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Elevate Your Style With Our Collection
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Discover the latest fashion trends with free shipping on
                    orders over ₹50. Premium quality at affordable prices.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    to="/sale-page"
                    className="inline-flex items-center justify-center h-12 px-8 text-sm font-medium text-white transition-colors bg-black rounded-md shadow hover:bg-black/90"
                  >
                    Shop Now
                  </Link>
                  <Link
                    to="/sale-page?category=Dresses%20%26%20Ethnic%20Wear"
                    className="inline-flex items-center justify-center h-12 px-8 text-sm font-medium transition-colors bg-white border border-black rounded-md shadow-sm hover:bg-gray-100"
                  >
                    New Arrivals
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  width={600}
                  height={600}
                  alt="Fashion model wearing trendy outfit"
                  className="aspect-[4/3] object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 mx-auto md:px-6">
            <div className="flex flex-col items-center justify-center mb-10 space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 text-sm bg-gray-100 rounded-lg">
                  New Season
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Featured Collection
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl">
                  Discover our handpicked selection of this season's must-have
                  pieces
                </p>
              </div>
            </div>
            <ProductCarousel products={featuredProducts} />
            <div className="flex justify-center mt-8">
              <Link
                to="/sale-page"
                className="inline-flex items-center justify-center h-10 px-6 py-2 text-sm font-medium transition-colors border border-black rounded-md hover:bg-black hover:text-white"
              >
                View All Featured Products
              </Link>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="w-full py-12 md:py-24 bg-gray-50">
          <div className="container px-4 mx-auto md:px-6">
            <div className="flex flex-col items-center justify-center mb-10 space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Shop by Category
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl">
                  Browse our wide selection of clothing and accessories
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {categories.map((category) => {
                const categoryName = encodeURIComponent(category.name);
                return (
                  <Link
                    key={category.name}
                    to={`/sale-page?category=${categoryName}`}
                    className="relative overflow-hidden rounded-lg group"
                  >
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={category.img || "/placeholder.svg"}
                        alt={category.name}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                      <h3 className="font-medium text-white">
                        {category.name}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Trending Products Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 mx-auto md:px-6">
            <div className="flex flex-col items-center justify-center mb-10 space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 text-sm bg-gray-100 rounded-lg">
                  Popular Now
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Trending This Week
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl">
                  The styles everyone's talking about right now
                </p>
              </div>
            </div>
            <ProductCarousel products={trendingProducts} />
            <div className="flex justify-center mt-8">
              <Link
                to="/collections/trending"
                className="inline-flex items-center justify-center h-10 px-6 py-2 text-sm font-medium transition-colors border border-black rounded-md hover:bg-black hover:text-white"
              >
                View All Trending Products
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="w-full py-12 md:py-24 bg-gray-50">
          <div className="container px-4 mx-auto md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex items-center justify-center overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  width={600}
                  height={400}
                  alt="Fashion store interior"
                  className="aspect-[4/3] object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Why Choose STYLISH
                  </h2>
                  <p className="text-gray-500 md:text-xl">
                    We're committed to providing the best shopping experience
                    with quality products and excellent service.
                  </p>
                </div>
                <ul className="grid gap-4">
                  <li className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 text-white bg-black rounded-full">
                      ✓
                    </div>
                    <span className="font-medium">
                      Free shipping on orders over ₹50
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 text-white bg-black rounded-full">
                      ✓
                    </div>
                    <span className="font-medium">
                      30-day money-back guarantee
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 text-white bg-black rounded-full">
                      ✓
                    </div>
                    <span className="font-medium">24/7 customer support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 text-white bg-black rounded-full">
                      ✓
                    </div>
                    <span className="font-medium">
                      Secure payment processing
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 text-white bg-black rounded-full">
                      ✓
                    </div>
                    <span className="font-medium">
                      Ethically sourced materials
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 mx-auto md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                    Join Our Style Community
                  </h2>
                  <p className="text-gray-500 md:text-xl">
                    Subscribe to our newsletter for exclusive offers, style
                    tips, and first access to new collections.
                  </p>
                </div>
                <div className="flex max-w-md flex-col gap-2 min-[400px]:flex-row">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex w-full h-12 px-3 py-2 text-sm bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  <button className="inline-flex items-center justify-center h-12 px-6 text-sm font-medium text-white transition-colors bg-black rounded-md hover:bg-black/90">
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  By subscribing, you agree to our Privacy Policy and consent to
                  receive updates from our company.
                </p>
              </div>
              <div className="flex items-center justify-center overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  width={600}
                  height={400}
                  alt="Woman shopping for clothes"
                  className="aspect-[4/3] object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Instagram Section */}
        <section className="w-full py-12 md:py-24 bg-gray-50">
          <div className="container px-4 mx-auto md:px-6">
            <div className="flex flex-col items-center justify-center mb-10 space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  #STYLISHWEAR
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl">
                  Follow us on Instagram and tag your photos with #STYLISHWEAR
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:gap-4">
              {instaStyle.map((item) => (
                <Link
                  key={item}
                  to="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden group aspect-square"
                >
                  <img
                    src={item}
                    alt={`Instagram post ${item}`}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
