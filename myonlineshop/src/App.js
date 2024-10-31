import './App.css';
import Home from './components/Home';
import ProductCard from './components/ProductCard';
import RegisterPage from './components/RegisterPage';
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
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
      <FlowbiteNavbar/>
      <RegisterPage/>
      <FlowBiteFooter/>

      </>,
    },
    {
      path: "/login",
      element: <>
      <FlowbiteNavbar/>
      <LoginPage />
      <FlowBiteFooter/>

      </>,
    },
    {
      path: "/addproduct",
      element: <>
      <FlowbiteNavbar/>
      <FileUpload/>
      <FlowBiteFooter/>

      </>,
    },
    {
      path: "/product",
      element: <>
      <FlowbiteNavbar/>
      <ProductPage/>
      <FlowBiteFooter/>

      </>,
    },
    {
      path: "/becomeaseller",
      element: <>
      <FlowbiteNavbar/>
      <BecomeAseller/>
      <FlowBiteFooter/>

      </>,
    },
    {
      path: "/categorypage",
      element: <>
      <FlowbiteNavbar/>
      <CategoryPage/>
      <FlowBiteFooter/>

      </>,
    },
    {
      path: "/sellerlogin",
      element: <>
      <FlowbiteNavbar/>
      <SellerLogin/>
      <FlowBiteFooter/>

      </>,
    },
    {
      path: "/sellerdashboard",
      element: <>
      <FlowbiteNavbar/>
      <SellerDashboard/>
      <FlowBiteFooter/>

      </>,
    },
    {
      path: "/createOrder",
      element: <>
      <FlowbiteNavbar/>
      <OrderPage/>
      <FlowBiteFooter/>

      </>,
    },
    {
      path: "/cart",
      element: <>
      <FlowbiteNavbar/>
      <Cart/>
      <FlowBiteFooter/>

      </>,
    },
    {
      path: "/ordersuccess",
      element: <>
      <FlowbiteNavbar/>
      <OrderSuccess/>
      <FlowBiteFooter/>

      </>,
    },
    {
      path: "/userdashboard",
      element: <>
      <FlowbiteNavbar/>
      <DashBoard/>
      <FlowBiteFooter/>

      </>,
    },
    {
      path: "/updateproduct",
      element: <>
      <FlowbiteNavbar/>
      <UpdateProduct/>
      <FlowBiteFooter/>

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
