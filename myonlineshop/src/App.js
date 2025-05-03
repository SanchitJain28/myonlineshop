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
import ShopPage from './components/Product/SalePage';
import TermsAndConditions from './components/Others/TermsAndConditions';
import Header from './components/UI/Header';
import PrivacyPolicy from './components/Others/PrivacyPolicy';
import ShippingPolicy from './components/Others/ShippingPolicy';
import CancellationPolicy from './components/Others/return-refund-policy';
import ReturnAndRefundPolicy from './components/Others/return-refund-policy';
import NewCancellationPolicy from './components/Others/Cancelltion-policy';



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
      path: "/terms-and-conditions",
      element: <>
        <Header />
        <TermsAndConditions/>
      </>,
    },
    {
      path: "/privacy-policy",
      element: <>
        <Header />
        <PrivacyPolicy/>
      </>,
    },
    {
      path: "/shipping-policy",
      element: <>
        <Header />
        <ShippingPolicy/>
      </>,
    },
    {
      path: "/returns-refunds-policy",
      element: <>
        <Header />
        <ReturnAndRefundPolicy/>
      </>,
    },
    {
      path: "/cancellation-policy",
      element: <>
        <Header />
        <NewCancellationPolicy/>
      </>,
    },
    {
      path: "/ordersuccess",
      element: <>
        <Header />
        <OrderSuccess />
        <SimpleBottomNavigation />

      </>,
    },
    {
      path: "/userdashboard",
      element: <>
        <Header />
        <DashBoard />
        <SimpleBottomNavigation />

      </>,
    },
    {
      path: "/updateproduct",
      element: <>
        <Header />
        <UpdateProduct />
        <SimpleBottomNavigation />

      </>,
    },
    {
      path: "/sale-page",
      element: <>
      
        <FlowbiteNavbar />
        <ShopPage/>

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
