import React from 'react'
import { Link } from 'react-router-dom'
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
export default function Footer() {
  return (
    <footer className="w-full text-white bg-black">
    <div className="container px-4 py-12 mx-auto md:px-6">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="mb-4 text-xl font-bold">INSTA MART</h3>
          <p className="mb-4 text-gray-400">
            Premium clothing for the modern individual. Quality, style, and
            comfort in every piece.
          </p>
         
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Shop</h3>
          <ul className="space-y-2">
            {categories.slice(0, 4).map((category) => (
              <li key={category.name}>
                <Link
                  to={`/sale-page?category=${encodeURIComponent(category.name)}`}
                  className="text-gray-400 hover:text-white"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Company</h3>
          <ul className="space-y-2">
            
            <li>
              <Link to="/cancellation-policy" className="text-gray-400 hover:text-white">
                Cancellation policy
              </Link>
            </li>
            <li>
              <Link
                to="/returns-refunds-policy"
                className="text-gray-400 hover:text-white"
              >
                Return and refund policy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Customer Service</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/contact-us"
                className="text-gray-400 hover:text-white"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/shipping-policy"
                className="text-gray-400 hover:text-white"
              >
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="text-gray-400 hover:text-white">
                Privacy policy
              </Link>
            </li>
          
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between pt-8 mt-12 border-t border-gray-800 md:flex-row">
        <p className="text-gray-400">
          © 2025 INSTA MART. All rights reserved.
        </p>
        <div className="flex mt-4 space-x-6 md:mt-0">
          <Link
            to="/terms-and-conditions"
            className="text-sm text-gray-400 hover:text-white"
          >
            Terms & Conditions
          </Link>
          <Link
            to="/privacy-policy"
            className="text-sm text-gray-400 hover:text-white"
          >
            Privacy Policy
          </Link>
          
        </div>
      </div>
    </div>
  </footer>
  )
}
