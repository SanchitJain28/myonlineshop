import { useToast } from "@chakra-ui/react";
import {
  createContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import React from "react";
import { axiosInstance } from "../axiosConfig";

export const productAPI = createContext(undefined);

const API_BASE_URL = "https://instacart-9fh4.onrender.com/api";

export function ProductContext({ children }) {
  const toast = useToast();

  // State declarations
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [productInfo, setProductInfo] = useState({ data: [] });
  const [currentProduct, setCurrentProduct] = useState(null);
  const [createProductInfo, setCreateProductInfo] = useState({ loader: false });
  const [category, setCategory] = useState("Electronics");
  const [orderProducts, setOrderProducts] = useState([]);
  const [order, setOrder] = useState([]);
  const [productCart, setProductCart] = useState([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(null);
  const [wishList, setWishList] = useState([]);
  const [orderRedirection, setOrderRedirection] = useState(false);

  // Initialize cart from localStorage
  useEffect(() => {
    try {
      const productsInCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setProductCart(productsInCart);
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      setProductCart([]);
    }
  }, []);

  // Utility function for making API calls
  const makeApiCall = useCallback(async (url, options = {}) => {
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API call failed:", error);
      throw error;
    }
  }, []);

  // Get all products
  const getProducts = useCallback(
    async (page = 0) => {
      try {
        const data = await makeApiCall(
          `${API_BASE_URL}/getallproducts?page=${page}`
        );
        setProductInfo({ data });
        return data;
      } catch (error) {
        console.error("Error fetching products:", error);
        toast({
          title: "Error",
          description: "Failed to fetch products",
          status: "error",
        });
      }
    },
    [makeApiCall, toast]
  );

  // Get single product
  const getCurrentProduct = useCallback(
    async (productId) => {
      if (!productId) {
        console.error("Product ID is required");
        return;
      }

      try {
        const data = await makeApiCall(
          `${API_BASE_URL}/getsingleproduct/${productId}`
        );
        setCurrentProduct(data.product);
        return data.product;
      } catch (error) {
        console.error("Error fetching product:", error);
        toast({
          title: "Error",
          description: "Failed to fetch product details",
          status: "error",
        });
      }
    },
    [makeApiCall, toast]
  );

  // Create product
  const createProduct = useCallback(
    async (
      files,
      productName,
      productCategory,
      productPrice,
      productDescription
    ) => {
      try {
        const formData = new FormData();

        // Add files
        if (files && files.length > 0) {
          Array.from(files).forEach((file) => {
            formData.append("file", file);
          });
        }

        // Add other fields
        formData.append("productName", productName);
        formData.append("productCategory", productCategory);
        formData.append("productPrice", productPrice);
        formData.append("productDescription", productDescription);

        const { data } = await axiosInstance.post(
          "/api/createproduct",
          formData
        );

        toast({
          title: "Success",
          description: "Product created successfully",
          status: "success",
        });

        return data;
      } catch (error) {
        console.error("Error creating product:", error);
        toast({
          title: "Error",
          description: "Failed to create product",
          status: "error",
        });
        throw error;
      }
    },
    [toast]
  );

  // Get products by category
  const getProductsByCategory = useCallback(
    async (categoryName) => {
      try {
        const encodedCategory = encodeURIComponent(categoryName);
        const {
          data: { data },
        } = await axiosInstance.get(
          `/api/get-product-by-category?category=${encodedCategory}`
        );
        return data;
      } catch (error) {
        console.error("Error fetching products by category:", error);
        toast({
          title: "Error",
          description: "Failed to fetch products by category",
          status: "error",
        });
      }
    },
    [toast]
  );

  // Get products by seller
  const getProductsbySeller = useCallback(async () => {
    try {
      const sellerId = localStorage.getItem("sellerId");
      if (!sellerId) {
        throw new Error("Seller ID not found");
      }

      const data = await makeApiCall(`${API_BASE_URL}/sellerinfo`, {
        headers: {
          "auth-token": sellerId,
        },
      });
      return data;
    } catch (error) {
      console.error("Error fetching seller products:", error);
      toast({
        title: "Error",
        description: "Failed to fetch seller products",
        status: "error",
      });
    }
  }, [makeApiCall, toast]);

  // Create order
  const createMeAOrder = useCallback(
    async (orderData) => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          throw new Error("User ID not found");
        }

        const data = await makeApiCall(`${API_BASE_URL}/createorder`, {
          method: "POST",
          body: JSON.stringify(orderData),
          headers: {
            "auth-token": userId,
          },
        });

        toast({
          title: "Success",
          description: "Order created successfully",
          status: "success",
        });

        return data;
      } catch (error) {
        console.error("Error creating order:", error);
        toast({
          title: "Error",
          description: "Failed to create order",
          status: "error",
        });
        throw error;
      }
    },
    [makeApiCall, toast]
  );

  // Update seller product
  const UpdateSellerProduct = useCallback(
    async (
      files,
      images,
      productName,
      productDescription,
      productPrice,
      productCategory,
      productId
    ) => {
      try {
        const formData = new FormData();

        if (files && files.length > 0) {
          Array.from(files).forEach((file) => {
            formData.append("file", file);
          });
        }

        formData.append("productName", productName);
        formData.append("productCategory", productCategory);
        formData.append("productPrice", productPrice);
        formData.append("productDescription", productDescription);
        formData.append("images", images);
        formData.append("productId", productId);

        const data = await makeApiCall(`${API_BASE_URL}/updateorder`, {
          method: "POST",
          body: formData,
          headers: {}, // FormData sets its own content-type
        });

        toast({
          title: "Success",
          description: "Product updated successfully",
          status: "success",
        });

        return data;
      } catch (error) {
        console.error("Error updating product:", error);
        toast({
          title: "Error",
          description: "Failed to update product",
          status: "error",
        });
        throw error;
      }
    },
    [makeApiCall, toast]
  );

  // Delete product
  const deleteProduct = useCallback(
    async (productId) => {
      try {
        const data = await makeApiCall(`${API_BASE_URL}/deleteproduct`, {
          method: "DELETE",
          body: JSON.stringify({ productId }),
        });

        toast({
          title: "Success",
          description: "Product deleted successfully",
          status: "success",
        });

        return data;
      } catch (error) {
        console.error("Error deleting product:", error);
        toast({
          title: "Error",
          description: "Failed to delete product",
          status: "error",
        });
      }
    },
    [makeApiCall, toast]
  );

  // Update localStorage cart
  const updateCartInStorage = useCallback((cart) => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error updating cart in localStorage:", error);
    }
  }, []);

  // Add to cart
  const addToCart = useCallback(
    (product) => {
      setProductCart((prevCart) => {
        const isProductInCart = prevCart.some(
          (item) => item._id === product._id
        );

        if (isProductInCart) {
          toast({
            title: "Already in cart",
            description: "Product already in cart",
            status: "info",
          });
          return prevCart;
        }

        const newCart = [...prevCart, { ...product, quantity: 1 }];
        updateCartInStorage(newCart);

        toast({
          title: "Added to cart",
          description: "Product added to cart",
          status: "success",
        });

        return newCart;
      });
    },
    [toast, updateCartInStorage]
  );

  // Remove from cart
  const removeFromCart = useCallback(
    (productId) => {
      setProductCart((prevCart) => {
        const newCart = prevCart.filter((product) => product._id !== productId);
        updateCartInStorage(newCart);

        toast({
          title: "Removed from cart",
          description: "Product removed from cart",
          status: "info",
        });

        return newCart;
      });
    },
    [toast, updateCartInStorage]
  );

  // Check if product is in cart
  const checkInCart = useCallback(
    (productId) => {
      return productCart.some((product) => product._id === productId);
    },
    [productCart]
  );

  // Update cart quantity - FIXED BUG
  const updateCartQuantity = useCallback(
    (productId, quantity) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }

      setProductCart((prevCart) => {
        const newCart = prevCart.map((product) => {
          if (product._id === productId) {
            return { ...product, quantity };
          }
          return product;
        });

        updateCartInStorage(newCart);
        return newCart;
      });
    },
    [removeFromCart, updateCartInStorage]
  );

  // Add order items from cart
  const addOrderItemsFromCart = useCallback(() => {
    setOrder(productCart);
  }, [productCart]);

  // Calculate cart totals
  const cartTotals = useMemo(() => {
    const itemsCount = productCart.reduce(
      (total, item) => total + (item.quantity || 1),
      0
    );
    const totalPrice = productCart.reduce(
      (total, item) => total + item.productPrice * (item.quantity || 1),
      0
    );

    return { itemsCount, totalPrice };
  }, [productCart]);

  // Context value
  const contextValue = useMemo(
    () => ({
      // State
      isCartOpen,
      setIsCartOpen,
      productInfo,
      currentProduct,
      setCurrentProduct,
      createProductInfo,
      setCreateProductInfo,
      category,
      setCategory,
      orderProducts,
      setOrderProducts,
      productCart,
      setProductCart,
      order,
      setOrder,
      updateProduct,
      setUpdateProduct,
      wishList,
      setWishList,
      isCartDrawerOpen,
      setIsCartDrawerOpen,
      orderRedirection,
      setOrderRedirection,

      // API Functions
      getProducts,
      getCurrentProduct,
      createProduct,
      getProductsByCategory,
      getProductsbySeller,
      createMeAOrder,
      UpdateSellerProduct,
      deleteProduct,

      // Cart Functions
      addToCart,
      removeFromCart,
      checkInCart,
      updateCartQuantity,
      addOrderItemsFromCart,

      // Computed values
      cartTotals,
    }),
    [
      isCartOpen,
      productInfo,
      currentProduct,
      createProductInfo,
      category,
      orderProducts,
      productCart,
      order,
      updateProduct,
      wishList,
      isCartDrawerOpen,
      orderRedirection,
      getProducts,
      getCurrentProduct,
      createProduct,
      getProductsByCategory,
      getProductsbySeller,
      createMeAOrder,
      UpdateSellerProduct,
      deleteProduct,
      addToCart,
      removeFromCart,
      checkInCart,
      updateCartQuantity,
      addOrderItemsFromCart,
      cartTotals,
    ]
  );

  return (
    <productAPI.Provider value={contextValue}>{children}</productAPI.Provider>
  );
}
