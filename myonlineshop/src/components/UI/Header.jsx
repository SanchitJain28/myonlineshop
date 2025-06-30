import * as React from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  Search,
  Heart,
  Store,
} from "lucide-react";
import { axiosInstance } from "../../axiosConfig";
import { productAPI } from "../../contexts/ProductContext";
import SearchBar from "./LoadingScreen/SearchBar";

export default function Header() {
  const [user, setUser] = React.useState(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const getUser = async () => {
    try {
      const {
        data: { user },
      } = await axiosInstance.get("/api/getuser", {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      setUser(user);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getUser();
  }, []);

  const categories = [
    {
      name: "T-Shirts & Tops",
      img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTN0NVm10rebj2sRCrQUZEnxCgNO6bB_a56OOOQxuHKqoVRx__SidsKoZHaw-n5R8C5GqHxKYJbeq2RKl_L-Y48MvyGKG1TNuA5X_qQijSkdbMJPGp7aytI",
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

  const { productCart } = React.useContext(productAPI);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page
      console.log("Searching for:", searchQuery);
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 shadow-sm bg-white/95 backdrop-blur-md">
        <div className="container px-4 mx-auto max-w-7xl">
          {/* Main Header */}
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                to="/"
                className="flex items-center gap-2 text-xl font-bold text-gray-900 transition-colors duration-200 lg:text-2xl hover:text-blue-600"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg lg:w-10 lg:h-10 bg-gradient-to-br from-blue-600 to-purple-600">
                  <span className="text-sm font-bold text-white lg:text-base">
                    IM
                  </span>
                </div>
                <span className="hidden sm:block">Insta Mart</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="items-center hidden gap-8 xl:flex">
              {categories.slice(0, 5).map((category) => {
                const categoryName = encodeURIComponent(category.name);
                return (
                  <Link
                    key={category.name}
                    to={`/sale-page?category=${categoryName}`}
                    className="relative text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-gray-900 group"
                  >
                    {category.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                );
              })}
              <div className="relative group">
                <button className="flex items-center gap-1 text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-gray-900">
                  More
                  <svg
                    className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className="absolute left-0 invisible w-48 mt-2 transition-all duration-200 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 top-full group-hover:opacity-100 group-hover:visible">
                  {categories.slice(5).map((category) => {
                    const categoryName = encodeURIComponent(category.name);
                    return (
                      <Link
                        key={category.name}
                        to={`/sale-page?category=${categoryName}`}
                        className="block px-4 py-3 text-sm text-gray-700 transition-colors duration-150 hover:bg-gray-50 hover:text-gray-900"
                      >
                        {category.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 lg:gap-4">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-600 transition-all duration-200 rounded-lg hover:text-gray-900 hover:bg-gray-100"
              >
                <Search size={20} />
              </button>

              {/* Sell Link */}
              <Link
                to="/sellerdashboard"
                className="items-center hidden gap-1 px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 rounded-lg sm:flex hover:text-gray-900 hover:bg-gray-100"
              >
                <Store size={16} />
                <span className="hidden lg:block">Sell</span>
              </Link>

              {/* Categories Link */}
              <Link
                to="/sale-page"
                className="hidden px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 rounded-lg sm:block hover:text-gray-900 hover:bg-gray-100"
              >
                Categories
              </Link>

              {/* Wishlist */}
              <button className="p-2 text-gray-600 transition-all duration-200 rounded-lg hover:text-gray-900 hover:bg-gray-100">
                <Heart size={20} />
              </button>

              {/* Cart */}
              <Link
                to="/cart-page"
                className="relative p-2 text-gray-600 transition-all duration-200 rounded-lg hover:text-gray-900 hover:bg-gray-100"
              >
                <ShoppingCart size={20} />
                {productCart.length > 0 && (
                  <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-1 -right-1 animate-pulse">
                    {productCart.length}
                  </span>
                )}
              </Link>

              {/* User Account */}
              <Link
                to={user ? "/profile" : "/login"}
                className="flex items-center gap-2 p-2 text-gray-600 transition-all duration-200 rounded-lg hover:text-gray-900 hover:bg-gray-100"
              >
                <User size={20} />
                {user && (
                  <span className="hidden text-sm font-medium lg:block">
                    {user.name}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-600 transition-all duration-200 rounded-lg xl:hidden hover:text-gray-900 hover:bg-gray-100"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`xl:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="bg-white border-t border-gray-200">
            <div className="container px-4 mx-auto max-w-7xl">
              <nav className="py-4 space-y-2">
                {categories.map((category) => {
                  const categoryName = encodeURIComponent(category.name);
                  return (
                    <Link
                      key={category.name}
                      to={`/sale-page?category=${categoryName}`}
                      className="block px-4 py-3 text-sm font-medium text-gray-700 transition-colors duration-150 rounded-lg hover:text-gray-900 hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  );
                })}
                <div className="pt-2 border-t border-gray-100">
                  <Link
                    to="/sellerdashboard"
                    className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 transition-colors duration-150 rounded-lg hover:text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Store size={16} />
                    Sell on Insta Mart
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <SearchBar isSearchOpen={isSearchOpen} onSearchClosed={setIsSearchOpen}/>
    </>
  );
}
