import { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  Building2,
  User,
  ChevronDown,
  Home,
  Wallet,
} from "lucide-react"; // ✅ Add Home & Grid icons
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { supabase } from "../../supabaseClient";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, firstName } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

const navigatePricingPage = () => {
  navigate("/pricing")
}

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-10 border-b border-gray-200">
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
          <nav className="hidden md:flex space-x-8 items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-bold transition-colors"
            >
              <Home className="h-4 w-4" /> {/* ✅ Icon for Home */}
              <span>Home</span>
            </Link>
            <button
              onClick={navigatePricingPage}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-bold transition-colors"
            >
              <Wallet className="h-4 w-4" /> {/* ✅ Icon for Pricing */}
              <span>Pricing</span>
            </button>

            {!currentUser ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-bold transition-colors"
                >
                  Login
                </Link>
                <Link to="/signup-required">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Register Business
                  </button>
                </Link>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <div
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full cursor-pointer"
                >
                  <User className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700">{firstName}</span>
                  <ChevronDown className="h-4 w-4 text-gray-600" />
                </div>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50 border">
                    <Link
                      to="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/account-settings"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Account
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>

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
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-bold"
              >
                Home
              </Link>
              <Link
                to="/account-settings"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-bold"
              >
                My Account
              </Link>
              <a
                onClick={navigatePricingPage}
                className="text-gray-700 cursor-pointer hover:text-blue-600 px-3 py-2 text-sm font-bold"
              >
                Pricing
              </a>

              {!currentUser ? (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-bold"
                  >
                    Login
                  </Link>
                  <Link to="/register-business">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium mx-3 transition-colors">
                      Register Business
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-bold"
                  >
                    Dashboard
                  </Link>
                  <div className="flex items-center gap-2 px-3">
                    <User className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-700">{firstName}</span>
                    <button
                      onClick={handleLogout}
                      className="text-red-500 text-xs hover:underline"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
