import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Building2,
  Users,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  Eye,
} from "lucide-react";
import { supabase } from "../../supabaseClient";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    "All Categories",
    "Agriculture",
    "Manufacturing",
    "Construction",
    "Retail & Wholesale",
    "Restaurants & Food",
    "Technology",
    "Healthcare",
    "Education",
    "Financial Services",
    "Transportation",
    "Tourism & Hospitality",
    "Real Estate",
    "Professional Services",
    "Entertainment",
    "Health & Beauty",
  ];

  const locations = [
    "All Locations",
    "Accra",
    "Tema",
    "Kasoa",
    "Madina",
    "Ashaiman",
    "Cape Coast",
    "Takoradi",
    "Sekondi",
    "Elmina",
    "Winneba",
    "Kumasi",
    "Obuasi",
    "Ejisu",
    "Sunyani",
    "Berekum",
    "Techiman",
    "Kintampo",
    "Goaso",
    "Tamale",
    "Yendi",
    "Savelugu",
    "Gushegu",
    "Wa",
    "Tumu",
    "Nandom",
    "Lawra",
    "Bolgatanga",
    "Navrongo",
    "Bawku",
    "Zebilla",
    "Ho",
    "Hohoe",
    "Kpando",
    "Keta",
    "Sogakope",
    "Denu",
    "Koforidua",
    "Nkawkaw",
    "Suhum",
    "Akim Oda",
    "Begoro",
    "Donkorkrom",
    "Dambai",
    "Nkwanta",
    "Jasikan",
    "Salaga",
    "Damongo",
    "Buipe",
    "Bole",
  ];

  // Note: You'll need to import supabase client
  // import { supabase } from "../../supabaseClient";

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      // Start building the query - select all needed columns
      let query = supabase
        .from("businesses")
        .select(
          "id, business_name, industry, region, district, town, physical_address, contact, email, business_description, employee_count, operating_hours"
        );

      // Search in business name (case-insensitive partial match)
      if (searchQuery.trim() !== "") {
        query = query.ilike("business_name", `%${searchQuery.trim()}%`);
      }

      // Search in location fields (region, district, or town)
      if (location && location !== "All Locations") {
        query = query.or(
          `region.ilike.%${location}%,district.ilike.%${location}%,town.ilike.%${location}%`
        );
      }

      // Search by industry (exact match, but case-insensitive)
      if (category && category !== "All Categories") {
        query = query.ilike("industry", category);
      }

      // Execute the query
      const { data, error } = await query;

      if (error) {
        setError("Failed to fetch businesses. Please try again.");
        console.error("Search error:", error);
      } else {
        setSearchResults(data || []);
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to format location display
  const formatLocation = (business) => {
    const locationParts = [
      business.town,
      business.district,
      business.region,
    ].filter(Boolean);
    return locationParts.join(", ") || "Location not specified";
  };

  // Helper function to handle popular search clicks
  const handlePopularSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
    // You might want to automatically trigger search here
    // handleSearch();
  };

  return (
    <div
      className="bg-gradient-to-r from-blue-50 to-gray-50 py-8"
      id="findBusinesses"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Find Local Businesses
          </h2>
          <p className="text-gray-600 text-lg">
            Discover amazing businesses in your area
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="What business are you looking for?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>

            {/* Location Select */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                list="location-options"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Type or select a location"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
              <datalist id="location-options">
                {locations.map((loc, index) => (
                  <option key={index} value={loc} />
                ))}
              </datalist>
            </div>

            {/* Category Select */}
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-4 flex justify-center">
            <button
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
              onClick={handleSearch}
              disabled={loading}
            >
              <Search className="h-5 w-5" />
              <span>{loading ? "Searching..." : "Search Businesses"}</span>
            </button>
          </div>

          {/* Popular Searches */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-2">Popular searches:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "Restaurants",
                "Hair Salons",
                "Mechanic",
                "Pharmacy",
                "Schools",
                "Hotels",
              ].map((term, index) => (
                <button
                  key={index}
                  onClick={() => handlePopularSearch(term)}
                  className="bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-700 px-3 py-1 rounded-full text-sm cursor-pointer transition-colors border border-gray-200 hover:border-blue-200"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Results Section */}
          <div className="mt-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
                {error}
              </div>
            )}

            {/* Results Count */}
            {!loading && searchResults.length > 0 && (
              <p className="text-gray-600 mb-4 text-center">
                Found {searchResults.length} business
                {searchResults.length !== 1 ? "es" : ""}
              </p>
            )}

            {/* Search Results */}
            {!loading && searchResults.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {searchResults.map((business) => (
                  <div
                    key={business.id}
                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-blue-300 hover:-translate-y-1"
                  >
                    {/* Business Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">
                          {business.business_name}
                        </h3>
                        <div className="flex items-center text-blue-600 text-sm mb-2">
                          <Building2 className="h-4 w-4 mr-1" />
                          <span>
                            {business.industry || "Industry not specified"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center text-gray-600 text-sm mb-3">
                      <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span className="line-clamp-1">
                        {formatLocation(business)}
                      </span>
                    </div>

                    {/* Description */}
                    {business.business_description && (
                      <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                        {business.business_description}
                      </p>
                    )}

                    {/* Additional Info */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      {business.employee_count && (
                        <div className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          <span>{business.employee_count} employees</span>
                        </div>
                      )}
                      {business.operating_hours && (
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{business.operating_hours}</span>
                        </div>
                      )}
                    </div>

                    {/* Contact Actions */}
                    <div className="space-y-3">
                      {/* Primary Action - View Business */}
                      <Link to={`/business/${business.business_name}`}>
                        <button
                          onClick={() => {
                            // Handle view business profile
                            console.log("View business profile:", business.id);
                          }}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center shadow-sm hover:shadow-md"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Business Profile
                        </button>
                      </Link>

                      {/* Secondary Actions */}
                      <div className="grid grid-cols-3 gap-2">
                        {business.contact && (
                          <button
                            onClick={() => {
                              window.open(`tel:${business.contact}`, "_self");
                            }}
                            className="bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 border border-green-200 hover:border-green-300 py-2 px-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center"
                            title="Call business"
                          >
                            <Phone className="h-3.5 w-3.5 mr-1" />
                            Call
                          </button>
                        )}

                        {business.contact && (
                          <button
                            onClick={() => {
                              const message = `Hi! I found your business "${business.business_name}" and I'm interested in your services.`;
                              const whatsappUrl = `https://wa.me/${business.contact.replace(
                                /[^0-9]/g,
                                ""
                              )}?text=${encodeURIComponent(message)}`;
                              window.open(whatsappUrl, "_blank");
                            }}
                            className="bg-green-500 hover:bg-green-600 text-white py-2 px-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center shadow-sm"
                            title="WhatsApp business"
                          >
                            <MessageCircle className="h-3.5 w-3.5 mr-1" />
                            WhatsApp
                          </button>
                        )}

                        {business.email && (
                          <button
                            onClick={() => {
                              const subject = `Inquiry about ${business.business_name}`;
                              const body = `Hi,\n\nI found your business "${business.business_name}" and I'm interested in learning more about your services.\n\nBest regards`;
                              window.open(
                                `mailto:${
                                  business.email
                                }?subject=${encodeURIComponent(
                                  subject
                                )}&body=${encodeURIComponent(body)}`,
                                "_self"
                              );
                            }}
                            className="bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-800 border border-gray-200 hover:border-gray-300 py-2 px-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center"
                            title="Email business"
                          >
                            <Mail className="h-3.5 w-3.5 mr-1" />
                            Email
                          </button>
                        )}
                      </div>

                      {/* Contact Info Display */}
                      {!business.contact && !business.email && (
                        <div className="text-center py-2">
                          <p className="text-gray-500 text-xs">
                            Contact information not available
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {!loading && searchResults.length === 0 && searchQuery && (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <p className="text-gray-600 text-lg">
                  No businesses found matching your search.
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Try adjusting your search terms or location.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
