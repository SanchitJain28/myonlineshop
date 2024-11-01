import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import Home from './components/Home';
import ProductCard from './components/ProductCard';
import RegisterPage from './components/RegisterPage';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import LoginPage from './components/LoginPage';
import { ProductContext } from './contexts/ProductContext';
import FileUpload from './components/FileUpload';
import ProductPage from './components/ProductPage';
import BecomeAseller from './components/BecomeAseller';
import CategoryPage from './components/CategoryPage';
import SellerLogin from './components/SellerLogin';
import SellerDashboard from './components/SellerDashboard';
import OrderPage from './components/OrderPage';
import Cart from './components/Cart';
import OrderSuccess from './components/OrderSuccess';
import DashBoard from './components/DashBoard';
import FlowBiteFooter from './ImportedComponents/FlowBiteFooter';
import FlowbiteNavbar from './ImportedComponents/FlowbiteNavbar';
import UpdateProduct from './components/UpdateProduct';
import BottomNavbar from './ImportedComponents/BottomNavbar';
import SimpleBottomNavigation from './ImportedComponents/BottomNavbar';
import Wishlist from './components/Wishlist';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <>
        <FlowbiteNavbar />
        <Home />
        <SimpleBottomNavigation />
      </>,
    },
    {
      path: "/register",
      element: <>
        <FlowbiteNavbar />
        <RegisterPage />
        <FlowBiteFooter />
        <SimpleBottomNavigation />

      </>,
    },
    {
      path: "/login",
      element: <>
        <FlowbiteNavbar />
        <LoginPage />
        <FlowBiteFooter />
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
        <BecomeAseller />
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
      path: "/sellerlogin",
      element: <>
        <FlowbiteNavbar />
        <SellerLogin />
        <SimpleBottomNavigation />

      </>,
    },
    {
      path: "/sellerdashboard",
      element: <>
        <FlowbiteNavbar />
        <SellerDashboard />
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
        <FlowBiteFooter />
        <SimpleBottomNavigation />

      </>,
    },
    {
      path: "/ordersuccess",
      element: <>
        <FlowbiteNavbar />
        <OrderSuccess />
        <FlowBiteFooter />
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
