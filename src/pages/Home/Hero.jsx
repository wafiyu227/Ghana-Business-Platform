import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Users,
  Building2,
  TrendingUp,
  Star,
  MapPin,
  Phone,
} from "lucide-react";

const Hero = () => {
  function findBusinessesSection() {
    const findBusinesses = document.getElementById("findBusinesses");
    findBusinesses?.scrollIntoView({ behavior: "smooth" });
  }

  const stats = [
    { icon: Building2, number: "10,000+", label: "Registered Businesses" },
    { icon: Users, number: "50,000+", label: "Happy Customers" },
    { icon: TrendingUp, number: "95%", label: "Success Rate" },
  ];

  return (
    <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Discover & Connect with
              <span className="text-blue-300"> Local Businesses</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Ghana's premier platform for finding trusted local businesses.
              Connect with quality services in your neighborhood.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={findBusinessesSection}
                className="w-1/2 sm:w-auto bg-white hover:bg-gray-100 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                Find Businesses
                <ArrowRight className="h-5 w-5 ml-1" />
              </button>
              <Link to="/register-business">
                <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105">
                  Register Your Business
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start space-x-2 mb-2">
                    <stat.icon className="h-6 w-6 text-blue-300" />
                    <span className="text-2xl font-bold">{stat.number}</span>
                  </div>
                  <p className="text-blue-100 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="bg-gradient-to-r from-blue-50 to-gray-50 rounded-lg p-4 mb-4 border border-blue-100">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Kofi's Restaurant
                    </h3>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-blue-500 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  Authentic Ghanaian cuisine in the heart of Accra. Experience
                  the best local flavors!
                </p>
                <div className="flex items-center text-gray-500 text-sm space-x-4">
                  <span className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>East Legon</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Phone className="h-3 w-3" />
                    <span>024-123-4567</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
                  <Building2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-xs font-medium text-gray-700">
                    Verified Business
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
                  <Users className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                  <p className="text-xs font-medium text-gray-700">
                    1,200+ Reviews
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
