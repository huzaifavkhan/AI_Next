import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    // Detect current page from URL
    const detectCurrentPage = () => {
      const path = window.location.pathname;
      setCurrentPage(path);
    };

    detectCurrentPage();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("popstate", detectCurrentPage);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("popstate", detectCurrentPage);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent background scrolling when menu is open
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
    }
  };

  // Check if we're on the services page
  const isServicesPage = currentPage === '/services';

  // Determine text colors based on page and scroll state
  const getTextColor = () => {
    if (!isScrolled) {
      return "text-white";
    }
    return "text-gray-700";
  };

  const getNavLinkClass = () => {
    if (!isScrolled) {
      return "nav-link text-white hover:text-[#01a27c]";
    }
    return "nav-link";
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-2 sm:py-3 md:py-4 transition-all duration-300",
        isScrolled 
          ? "bg-white shadow-sm md:bg-white/80 md:backdrop-blur-md" 
          : "bg-transparent"
      )}
    >
      <div className="w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 ">
        <a 
          href="/" 
          className="flex items-center space-x-2"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = '/';
          }}
          aria-label="AI Next"
        >
          <img 
            src="/uploads/logonav.png" 
            alt="AI Next Logo" 
            className="h-10 sm:h-12" 
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a 
            href="/" 
            className={getNavLinkClass()}
          >
            Home
          </a>
          <a href="/about" className={getNavLinkClass()}>About</a>
          <a href="/services" className={getNavLinkClass()}>Services</a>
          <a href="/contact" className={getNavLinkClass()}>Contact</a>
        </nav>

        {/* Mobile menu button - increased touch target */}
        <button 
          className={cn("md:hidden p-3 focus:outline-none", getTextColor())} 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation - improved for better touch experience */}
      <div className={cn(
        "fixed inset-0 z-40 bg-white flex flex-col pt-16 px-6 md:hidden transition-all duration-300 ease-in-out",
        isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
      )}>
        {/* Close button in top right */}
        <button
          className="absolute top-4 right-4 text-gray-700 p-2 focus:outline-none hover:bg-gray-100 rounded-lg"
          onClick={toggleMenu}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        <nav className="flex flex-col space-y-8 items-center mt-8">
          <a 
            href="/" 
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100 text-gray-700" 
            onClick={(e) => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Home
          </a>
          <a 
            href="/about" 
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100 text-gray-700" 
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            About
          </a>
          <a 
            href="/services" 
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100 text-gray-700" 
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Services
          </a>
          <a 
            href="/contact" 
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100 text-gray-700" 
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;