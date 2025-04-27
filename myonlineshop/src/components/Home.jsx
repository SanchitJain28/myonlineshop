import { Link } from "react-router-dom";
import ProductCarousel from "./UI/ProductCarousel";
import "swiper/css";

import Header from "./UI/Header";

export default function LandingPage() {
  console.log(process.env.BACKEND_URL)
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Discover Amazing Products for Your Lifestyle
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Shop the latest trends with free shipping on orders over
                    $50. Quality products at affordable prices.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <button className="px-8 py-2 border border-black rounded-xl">
                    Shop Now
                  </button>
                  <button className="px-8 py-2 border border-black rounded-xl">
                    View Deals
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="https://blog.tubikstudio.com/wp-content/uploads/2019/07/fashion_ecommerce_website_design_tubik-1024x768.png"
                  width={550}
                  height={550}
                  alt="Hero img"
                  className="object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 text-sm rounded-lg bg-muted">
                  New Arrivals
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Featured Products
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Check out our latest collection of products that are trending
                  right now
                </p>
              </div>
            </div>
            <div className="mt-8 md:mt-12 lg:mt-16">
              {/* <ProductCarousel category="Clothes"/> */}
            </div>
            <div className="flex justify-center mt-8">
              <button className="gap-1">View All Products</button>
            </div>
          </div>
        </section>

        <section className="w-full py-12 overflow-hidden md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Why Choose Us
                  </h2>
                  <p className=" md:text-xl">
                    We're committed to providing the best shopping
                    <br className="" /> experience with quality products and
                    excellent service.
                  </p>
                </div>
                <ul className="grid gap-4">
                  <li className="flex items-center gap-2">
                    <span className="font-medium">
                      Free shipping on orders over $50
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-medium">
                      30-day money-back guarantee
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-medium">24/7 customer support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-medium">
                      Secure payment processing
                    </span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="https://blog.tubikstudio.com/wp-content/uploads/2019/07/fashion_ecommerce_website_design_tubik-1024x768.png"
                  width={600}
                  height={400}
                  alt="Features img"
                  className="object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Shop by Category
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Browse our wide selection of products by category
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to="#"
                  className="relative overflow-hidden transition-all border rounded-lg group bg-background hover:shadow-lg"
                >
                  <div className="overflow-hidden aspect-square">
                    <img
                      src={category.img || "/placeholder.svg"}
                      alt={category.name}
                      className="object-cover w-[300px] h-[500px] transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-end p-4 text-white bg-gradient-to-t from-black/60 to-transparent">
                    <h3 className="font-medium">{category.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 overflow-hidden md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex items-center justify-center">
                <img
                  src="https://blog.tubikstudio.com/wp-content/uploads/2019/07/fashion_ecommerce_website_design_tubik-1024x768.png"
                  width={600}
                  height={400}
                  alt="Newsletter img"
                  className="object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Join Our Newsletter
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Subscribe to our newsletter to receive updates on new
                    products, special offers, and more.
                  </p>
                </div>
                <div className="flex max-w-md flex-col gap-2 min-[400px]:flex-row">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <button className="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium transition-colors rounded-md whitespace-nowrap bg-primary text-primary-foreground ring-offset-background hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">ShopNow</span>
          </div>
          <nav className="flex gap-4 md:gap-6">
            <Link
              href="#"
              className="text-sm font-medium transition-colors text-muted-foreground hover:text-primary"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm font-medium transition-colors text-muted-foreground hover:text-primary"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-sm font-medium transition-colors text-muted-foreground hover:text-primary"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2023 ShopNow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const categories = [
  {
    name: "Electronics",
    img: "https://www.matric.com/hubfs/classes%20of%20electronics.jpg",
  },
  {
    name: "Clothing",
    img: "https://www.shutterstock.com/image-vector/illustration-graphic-vector-men-clothes-600nw-2082239521.jpg",
  },
  {
    name: "Home & Kitchen",
    img: "https://www.shutterstock.com/image-photo/blue-empty-wooden-table-bright-260nw-2516102707.jpg",
  },
  {
    name: "Beauty",
    img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVhdXR5JTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D",
  },
];
