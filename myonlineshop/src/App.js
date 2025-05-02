import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import Home from './components/Home';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import { ProductContext } from './contexts/ProductContext';
import ProductPage from './components/Product/ProductPage';
import Cart from './components/User/Cart';

import OrderSuccess from './components/order/OrderSuccess';
import FlowbiteNavbar from './components/UI/Header';
import SimpleBottomNavigation from './components/UI/BottomNavbar';
import Wishlist from './components/User/Wishlist';
import CategoryPage from './components/Product/CategoryPage';
import DashBoard from './components/User/DashBoard';
import LoginPage from './components/auth/LoginPage';
import OrderPage from './components/order/OrderPage';
import RegisterPage from './components/auth/RegisterPage';
import UpdateProduct from './components/Product/UpdateProduct';
import FileUpload from './components/Product/FileUpload';
import CartPage from './components/User/cartPage';
import CheckoutPage from './components/order/checkout';
import SellerRegistration from './components/Seller/SellerRegister';
import SellerDashboard from './components/Seller/SellerDashboard';



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <>
        {/* <FlowbiteNavbar /> */}
        <Home />
        {/* <SimpleBottomNavigation /> */}
      </>,
    },
    {
      path: "/register",
      element: <>
        <FlowbiteNavbar />
        <RegisterPage />
        <SimpleBottomNavigation />

      </>,
    },
    {
      path: "/login",
      element: <>
        <FlowbiteNavbar />
        <LoginPage />
        <SimpleBottomNavigation />

      </>,
    },
    {
      path: "/addproduct",
      element: <>
        <FlowbiteNavbar />
        <FileUpload />
        <SimpleBottomNavigation />

      </>,
    },
    {
      path: "/product",
      element: <>
        <FlowbiteNavbar />
        <ProductPage />
        <SimpleBottomNavigation />

      </>,
    },
    {
      path: "/becomeaseller",
      element: <>
        <FlowbiteNavbar />
        <SellerRegistration/>
        <SimpleBottomNavigation />

      </>,
    },
    {
      path: "/categorypage",
      element: <>
        <FlowbiteNavbar />
        <CategoryPage />
        <SimpleBottomNavigation />

      </>,
    },
    {
      path: "/sellerdashboard",
      element: <>
        <FlowbiteNavbar />
        <SellerDashboard/>
        <SimpleBottomNavigation />

      </>,
    },
    {
      path: "/createOrder",
      element: <>
        <FlowbiteNavbar />
        <OrderPage />
        <SimpleBottomNavigation />

      </>,
    },
    {
      path: "/cart",
      element: <>
        <FlowbiteNavbar />
        <Cart />
        <SimpleBottomNavigation />

      </>,
    },
    {
      path: "/ordersuccess",
      element: <>
        <FlowbiteNavbar />
        <OrderSuccess />
        <SimpleBottomNavigation />

      </>,
    },
    {
      path: "/userdashboard",
      element: <>
        <FlowbiteNavbar />
        <DashBoard />
        <SimpleBottomNavigation />

      </>,
    },
    {
      path: "/updateproduct",
      element: <>
        <FlowbiteNavbar />
        <UpdateProduct />
        <SimpleBottomNavigation />

      </>,
    },
    {
      path: "/wishlist",
      element: <>
        <FlowbiteNavbar />
        <Wishlist />
        <SimpleBottomNavigation />
      </>,
    },
    {
      path: "/cart-page",
      element: <>
        <FlowbiteNavbar />
        <CartPage/>
        <SimpleBottomNavigation />
      </>,
    },
    {
      path: "/order",
      element: <>
        <FlowbiteNavbar />
        <CheckoutPage/>
        <SimpleBottomNavigation />
      </>,
    }
  ]);

  const theme = createTheme();

  return (
    <>

      <ThemeProvider theme={theme}>
        <ChakraProvider>
          <ProductContext>
            <RouterProvider router={router} />
          </ProductContext>
        </ChakraProvider>
      </ThemeProvider>

    </>
  );
}

export default App;
