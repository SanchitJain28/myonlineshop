import * as React from "react";
import { Link, } from "react-router-dom";
import { axiosInstance } from "../../axiosConfig";
import { ShoppingCart } from "lucide-react";
import { productAPI } from "../../contexts/ProductContext";

export default function Header() {
  const [user, setUser] = React.useState(null);
  const getUser = async () => {
    try {
      const { data :{user}} = await axiosInstance.get("/api/getuser");
      setUser(user);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getUser();
  }, []);
  const {productCart}=React.useContext(productAPI)
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">Insta cart</span>
        </div>
        <nav className="hidden gap-6 md:flex">
          <Link
            to="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            to="#"
            className="text-sm font-medium transition-colors text-muted-foreground hover:text-primary"
          >
            Shop
          </Link>
          <Link
            to="#"
            className="text-sm font-medium transition-colors text-muted-foreground hover:text-primary"
          >
            Categories
          </Link>
          <Link
            to="#"
            className="text-sm font-medium transition-colors text-muted-foreground hover:text-primary"
          >
            Deals
          </Link>
          <Link
            to="#"
            className="text-sm font-medium transition-colors text-muted-foreground hover:text-primary"
          >
            About
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {!user && (
            <Link
              to="/login"
              className="text-sm font-medium transition-colors text-muted-foreground hover:text-primary"
            >
              Sign In
            </Link>
          )}
          <Link to="/cart-page" className="relative flex inline-block">
            <ShoppingCart />
            {productCart.length> 0 && (
              <span className="absolute flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full -top-2 -right-2">
                {productCart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
