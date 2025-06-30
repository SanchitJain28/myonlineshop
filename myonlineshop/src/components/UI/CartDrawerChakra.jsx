"use client";

import React, { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react";
import {
  BottomNavigationAction,
  Badge,
  IconButton,
  Divider,
} from "@mui/material";
import ReactCardForCart from "./ReactCardForCart";
import { productAPI } from "../../contexts/ProductContext";

export default function CartDrawerImproved(props) {
  const btnRef = React.useRef();
  const {
    productCart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
  } = useContext(productAPI);

  console.log(productCart)

  const navigate = useNavigate();

  // Calculate cart totals
  const cartSummary = useMemo(() => {
    const totalItems = productCart.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0
    );
    const totalPrice = productCart.reduce(
      (sum, item) => sum + item.productPrice * (item.quantity || 1),
      0
    );
    return { totalItems, totalPrice };
  }, [productCart]);

  const onOpen = () => {
    setIsCartDrawerOpen(true);
  };

  const onClose = () => {
    setIsCartDrawerOpen(false);
  };

  const handleContinueShopping = () => {
    onClose();
    navigate("/cart-page"); // Adjust route as needed
  };

  return (
    <>
      {/* Cart Icon with Badge */}
      <BottomNavigationAction
        onClick={onOpen}
        ref={btnRef}
        label="Cart"
        icon={
          <Badge
            badgeContent={cartSummary.totalItems}
            color="error"
            max={99}
            sx={{
              "& .MuiBadge-badge": {
                fontSize: "0.75rem",
                minWidth: "18px",
                height: "18px",
              },
            }}
          >
            <ShoppingCartIcon />
          </Badge>
        }
        className={props.className}
      />

      <Drawer
        isOpen={isCartDrawerOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="lg"
      >
        <DrawerOverlay bg="blackAlpha.600" />
        <DrawerContent>
          {/* Custom Header */}
          <DrawerHeader className="px-6 py-4 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-blue-50">
                  <ShoppingCartIcon className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Shopping Cart
                  </h2>
                  <p className="text-sm text-gray-500">
                    {cartSummary.totalItems}{" "}
                    {cartSummary.totalItems === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>
              <IconButton
                onClick={onClose}
                size="small"
                className="text-gray-400 hover:text-gray-600"
              >
                <CloseIcon />
              </IconButton>
            </div>
          </DrawerHeader>

          <DrawerBody className="px-0 py-0">
            {productCart.length === 0 ? (
              /* Empty Cart State */
              <div className="flex flex-col items-center justify-center h-full px-6 py-12">
                <div className="flex items-center justify-center w-24 h-24 mb-6 bg-gray-100 rounded-full">
                  <ShoppingCartOutlinedIcon
                    sx={{ fontSize: 40 }}
                    className="text-gray-400"
                  />
                </div>
                <h3 className="mb-2 text-xl font-medium text-gray-900">
                  Your cart is empty
                </h3>
                <p className="max-w-sm mb-8 text-center text-gray-500">
                  Looks like you haven't added any items to your cart yet. Start
                  shopping to fill it up!
                </p>
                <button
                  onClick={handleContinueShopping}
                  className="px-6 py-3 font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              /* Cart Items */
              <div className="flex flex-col h-full">
                {/* Items List */}
                <div className="flex-1 px-6 py-4 overflow-y-auto">
                  <div className="space-y-4">
                    {productCart.map((product, index) => (
                      <div key={index} className="bg-white">
                        <ReactCardForCart product={product} />
                        {index < productCart.length - 1 && (
                          <Divider className="mt-4" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cart Summary */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        Subtotal ({cartSummary.totalItems} items)
                      </span>
                      <span className="font-medium text-gray-900">
                        ₹{cartSummary.totalPrice}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium text-green-600">Free</span>
                    </div>

                    <Divider />

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-900">
                        Total
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        ₹{cartSummary.totalPrice}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 space-y-3">
                    <button
                      onClick={handleContinueShopping}
                      className="w-full px-4 py-3 font-medium text-gray-700 transition-colors duration-200 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Continue Shopping
                    </button>

                    <div className="text-center">
                      <p className="text-xs text-gray-500">
                        Secure checkout • Free shipping on orders over ₹ 50
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
