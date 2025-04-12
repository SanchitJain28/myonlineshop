import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <>
             <footer className="w-full border-t bg-background">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">ShopNow</span>
          </div>
          <nav className="flex gap-4 md:gap-6">
            <Link href="#" className="text-sm font-medium transition-colors text-muted-foreground hover:text-primary">
              Terms
            </Link>
            <Link href="#" className="text-sm font-medium transition-colors text-muted-foreground hover:text-primary">
              Privacy
            </Link>
            <Link href="#" className="text-sm font-medium transition-colors text-muted-foreground hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2023 ShopNow. All rights reserved.</p>
          </div>
        </div>
      </footer>
        </>
    )
}
