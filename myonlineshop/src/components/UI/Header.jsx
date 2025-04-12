import { useContext, useEffect } from "react";
import { authContext } from "../../contexts/AuthContext";
import * as React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const auth = useContext(authContext);
  useEffect(() => {}, [auth.loginDetails]);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">ShopNow</span>
        </div>
        <nav className="hidden gap-6 md:flex">
          <Link
            to="#"
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
          <Link
            to="/login"
            className="text-sm font-medium transition-colors text-muted-foreground hover:text-primary"
          >
            Sign In
          </Link>
          <button></button>
        </div>
      </div>
    </header>
  );
}
