import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import ProductCard from './components/ProductCard';
import RegisterPage from './components/RegisterPage';
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import { AuthContext } from './contexts/AuthContext';
import LoginPage from './components/LoginPage';
import { ProductContext } from './contexts/ProductContext';
import FileUpload from './components/FileUpload';
import ProductPage from './components/ProductPage';
import BecomeAseller from './components/BecomeAseller';
import CategoryPage from './components/CategoryPage';
import SellerLogin from './components/SellerLogin';
import Footer from './components/Footer';
import ReactNavbar  from './ImportedComponents/ReactNavbar';
import SellerDashboard from './components/SellerDashboard';
import OrderPage from './components/OrderPage';
import Cart from './components/Cart';
import OrderSuccess from './components/OrderSuccess';
import DashBoard from './components/DashBoard';
import FlowBiteFooter from './ImportedComponents/FlowBiteFooter';
import FlowbiteNavbar from './ImportedComponents/FlowbiteNavbar';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <>
      <FlowbiteNavbar/>
        <Home/>
        <FlowBiteFooter/>
      </>,
    },
    {
      path: "/register",
      element: <>
      <ReactNavbar/>
      <RegisterPage/>

      </>,
    },
    {
      path: "/login",
      element: <>
      <ReactNavbar/>
      <LoginPage />

      </>,
    },
    {
      path: "/addproduct",
      element: <>
      <ReactNavbar/>
      <FileUpload/>

      </>,
    },
    {
      path: "/product",
      element: <>
      <ReactNavbar/>
      <ProductPage/>

      </>,
    },
    {
      path: "/becomeaseller",
      element: <>
      <ReactNavbar/>
      <BecomeAseller/>

      </>,
    },
    {
      path: "/categorypage",
      element: <>
      <FlowbiteNavbar/>
      <CategoryPage/>

      </>,
    },
    {
      path: "/sellerlogin",
      element: <>
      <ReactNavbar/>
      <SellerLogin/>

      </>,
    },
    {
      path: "/sellerdashboard",
      element: <>
      <ReactNavbar/>
      <SellerDashboard/>

      </>,
    },
    {
      path: "/createOrder",
      element: <>
      <ReactNavbar/>
      <OrderPage/>

      </>,
    },
    {
      path: "/cart",
      element: <>
      <ReactNavbar/>
     <Cart/>

      </>,
    },
    {
      path: "/ordersuccess",
      element: <>
      <ReactNavbar/>
     <OrderSuccess/>

      </>,
    },
    {
      path: "/userdashboard",
      element: <>
      <ReactNavbar/>
     <DashBoard/>

      </>,
    }
  ]);
  return (
    <>
      <ProductContext>
        <RouterProvider router={router} />
      </ProductContext>

    </>
  );
}

export default App;
