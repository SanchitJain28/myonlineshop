import * as React from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../axiosConfig";
import { ShoppingCart, User } from "lucide-react";
import { productAPI } from "../../contexts/ProductContext";

export default function Header() {
  const [user, setUser] = React.useState(null);
  const getUser = async () => {
    try {
      const {
        data: { user },
      } = await axiosInstance.get("/api/getuser",{
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
      img: "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
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
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b">
      <div className="container px-4 mx-auto md:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-lg font-bold">
              Insta Mart
            </Link>
          </div>
          <nav className="hidden gap-6 md:flex">
            {categories.map((category) => {
              const categoryName = encodeURIComponent(category.name);
              return (
                <Link
                  key={category.name}
                  to={`/sale-page?category=${categoryName}`}
                  className="text-sm font-medium transition-colors hover:text-black/80"
                >
                  {category.name}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/sellerdashboard" className="text-sm font-medium">
              Sell
            </Link>
            <Link to="/sale-page" className="text-sm font-medium">
              Categories
            </Link>
            <Link to="/cart-page" className="relative flex inline-block">
              <ShoppingCart />
              {productCart.length > 0 && (
                <span className="absolute flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full -top-2 -right-2">
                  {productCart.length}
                </span>
              )}
            </Link>
            <Link to={`${user ?"/cart-page":"/login"}`} className="text-sm font-medium">
              <User />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
