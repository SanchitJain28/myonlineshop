
import { Search, X } from "lucide-react";
import React from "react";
import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../axiosConfig";

export default function SearchBar({ isSearchOpen, onSearchClosed }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const debouncedSearchTerm = useDebounce(searchQuery, 300);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!debouncedSearchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const { data } = await axiosInstance.post(
        `/api/search?q=${debouncedSearchTerm}`
      );
      console.log(data);
      setSearchResults(data.searchedProducts|| []);
    } catch (error) {
      console.log(error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product?productid=${productId}`);
    onSearchClosed(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  useEffect(() => {
    handleSearch();
  }, [debouncedSearchTerm]);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isSearchOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onSearchClosed(false)}
      />
      <div className="relative z-10 max-w-2xl px-4 mx-auto mt-20">
        <form onSubmit={onSubmit} className="relative">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 pr-12 text-lg bg-white shadow-2xl rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <button
            type="submit"
            className="absolute p-2 text-gray-600 transition-colors duration-200 transform -translate-y-1/2 right-4 top-1/2 hover:text-gray-900"
          >
            <Search size={20} />
          </button>
        </form>

        {/* Search Results */}
        {searchQuery && (
          <div className="mt-4 overflow-y-auto bg-white shadow-2xl rounded-2xl max-h-96">
            {loading ? (
              <div className="p-4 text-center text-gray-500">
                <div className="w-6 h-6 mx-auto border-b-2 border-blue-500 rounded-full animate-spin"></div>
                <p className="mt-2">Searching...</p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {searchResults.map((product) => (
                  <div
                    key={product._id}
                    onClick={() => handleProductClick(product._id)}
                    className="p-4 transition-colors duration-200 cursor-pointer hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      {product.images && product.images[0] && (
                        <img
                          src={product.images[0]}
                          alt={product.productName}
                          className="flex-shrink-0 object-cover w-12 h-12 rounded-lg"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {product.productName}
                        </h3>
                        <p className="text-sm text-gray-600 truncate">
                          {product.productCategory} • by {product.sellerName}
                        </p>
                        <p className="text-lg font-bold text-blue-600">
                          ₹{product.productPrice}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchQuery && !loading ? (
              <div className="p-8 text-center text-gray-500">
                <Search size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">No products found</p>
                <p className="text-sm">Try searching with different keywords</p>
              </div>
            ) : null}
          </div>
        )}

        <button
          onClick={() => onSearchClosed(false)}
          className="absolute p-2 text-white transition-colors duration-200 -top-12 right-4 hover:text-gray-300"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
}
