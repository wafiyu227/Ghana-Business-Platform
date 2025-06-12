import React, { useState } from "react";
import { Menu, X, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-2 rounded-lg">
              <Link to="/">
                <Building2 className="h-6 w-6 text-white" />
              </Link>
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900">
              Ghana Business
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-bold transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-bold transition-colors"
            >
              Browse Businesses
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-bold transition-colors"
            >
              Categories
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-bold transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-bold transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              <Link to="/register-business">Register Business</Link>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-3">
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-bold"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-bold"
              >
                Browse Businesses
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-bold"
              >
                Categories
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-bold"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-bold"
              >
                Contact
              </a>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium mx-3 transition-colors">
                Register Business
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
